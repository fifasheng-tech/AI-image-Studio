const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const { execFile } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3487;
const projectRoot = __dirname;
const uploadsDir = path.join(projectRoot, 'tmp', 'uploads');
const outputsDir = path.join(projectRoot, 'tmp', 'outputs');
const logsDir = path.join(projectRoot, 'tmp', 'logs');
const logFilePath = path.join(logsDir, 'app.log');
const scriptPath = '/Users/lee/.hermes/skills/openclaw-imports/figure-gpt-image-2/scripts/generate.py';
const presetPath = path.join(projectRoot, 'data', 'prompt-presets.json');
const hermesConfigPath = path.join(process.env.HOME || '/Users/lee', '.hermes', 'config.yaml');
const promptPresets = JSON.parse(fs.readFileSync(presetPath, 'utf-8'));
const hermesModelConfig = loadHermesModelConfig();
const promptLlmBaseUrl = pickFirstNonEmpty(
  process.env.PROMPT_LLM_BASE_URL,
  process.env.OPENAI_BASE_URL,
  hermesModelConfig.base_url,
  'https://api.openai.com/v1'
).replace(/\/$/, '');
const promptLlmModel = pickFirstNonEmpty(
  process.env.GPT_PROMPT_MODEL,
  process.env.OPENAI_MODEL,
  hermesModelConfig.default,
  'gpt-5.4'
);
const promptLlmApiKey = pickFirstNonEmpty(
  process.env.OPENAI_API_KEY,
  process.env.PROMPT_LLM_API_KEY,
  hermesModelConfig.api_key,
  ''
);

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(outputsDir, { recursive: true });
fs.mkdirSync(logsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 6,
  },
});

app.use(express.json({ limit: '2mb' }));
app.use('/outputs', express.static(outputsDir));
app.use('/uploads', express.static(uploadsDir));
app.use(express.static(path.join(projectRoot, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    scriptPath,
    outputsDir,
    promptLlm: {
      configured: Boolean(promptLlmApiKey),
      baseUrl: promptLlmBaseUrl,
      model: promptLlmModel,
      source: promptLlmApiKey === hermesModelConfig.api_key && hermesModelConfig.api_key ? 'hermes-config' : 'env-or-default',
    },
    now: new Date().toISOString(),
  });
});

app.get('/api/presets', (_req, res) => {
  res.json({ ok: true, categories: promptPresets });
});

app.get('/api/logs', (_req, res) => {
  try {
    const exists = fs.existsSync(logFilePath);
    const text = exists ? fs.readFileSync(logFilePath, 'utf-8') : '';
    const lines = text ? text.trimEnd().split('\n') : [];
    res.json({
      ok: true,
      logFilePath,
      totalLines: lines.length,
      tail: lines.slice(-200).join('\n'),
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: '读取日志失败', detail: error.message });
  }
});

app.post('/api/prompt-assist', async (req, res) => {
  const body = req.body || {};
  const action = body.action === 'improve' ? 'improve' : 'generate';
  const category = (body.category || '').trim();
  const subject = (body.subject || '').trim();
  const targetUse = (body.targetUse || '').trim();
  const style = (body.style || '').trim();
  const constraints = (body.constraints || '').trim();
  const originalPrompt = (body.originalPrompt || '').trim();

  if (!promptLlmApiKey) {
    return res.status(500).json({ ok: false, error: '未配置可用的 GPT-5.4 API Key，无法调用 prompt 助手' });
  }

  if (action === 'generate' && !subject) {
    return res.status(400).json({ ok: false, error: '请至少填写主题/主体描述' });
  }

  if (action === 'improve' && !originalPrompt) {
    return res.status(400).json({ ok: false, error: '优化模式需要提供原始 prompt' });
  }

  try {
    const prompt = buildPromptAssistantInstruction({ action, category, subject, targetUse, style, constraints, originalPrompt });
    const result = await callPromptModel(prompt);
    return res.json({
      ok: true,
      model: promptLlmModel,
      action,
      prompt: result,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'GPT-5.4 prompt 生成失败', detail: error.message });
  }
});

app.post('/api/generate', upload.fields([
  { name: 'images', maxCount: 4 },
  { name: 'mask', maxCount: 1 },
]), async (req, res) => {
  const requestId = `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const body = req.body || {};
  const prompt = (body.prompt || '').trim();
  const mode = body.mode === 'edit' ? 'edit' : 'generate';
  const files = req.files || {};
  const images = files.images || [];
  const mask = files.mask?.[0] || null;

  if (!prompt) {
    return res.status(400).json({ ok: false, error: 'prompt 不能为空' });
  }

  if (mode === 'edit' && images.length === 0) {
    return res.status(400).json({ ok: false, error: '改图模式至少要上传 1 张原图' });
  }

  const model = (body.model || 'gpt-image-2').trim();
  const size = (body.size || '1536x1024').trim();
  const quality = (body.quality || 'high').trim();
  const background = (body.background || 'opaque').trim();
  const prefix = `webui-${Date.now()}`;

  appendLog({
    type: 'generate-request',
    requestId,
    mode,
    model,
    size,
    quality,
    background,
    imageCount: images.length,
    hasMask: Boolean(mask),
    promptPreview: prompt.slice(0, 240),
  });

  const pyArgs = [scriptPath];
  if (mode === 'edit') {
    pyArgs.push('--edit');
    for (const file of images) {
      pyArgs.push('--image', file.path);
    }
    if (mask) {
      pyArgs.push('--mask', mask.path);
    }
  }

  pyArgs.push('--model', model);
  pyArgs.push('--size', size);
  pyArgs.push('--quality', quality);
  pyArgs.push('--background', background);
  pyArgs.push('--output-dir', outputsDir);
  pyArgs.push('--prefix', prefix);
  pyArgs.push('--print-json');
  pyArgs.push(prompt);

  const command = `source ~/.zshrc >/dev/null 2>&1; python3 ${pyArgs.map(shellEscape).join(' ')}`;
  const retryAttempts = 3;

  appendLog({ type: 'generate-command', requestId, commandPreview: command.slice(0, 400), retryAttempts });

  execFile('zsh', ['-lc', command], { maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
    if (error) {
      const failure = classifyGenerateFailure(stderr || stdout || error.message);
      appendLog({
        type: 'generate-error',
        requestId,
        exitMessage: error.message,
        stdout: truncateText(stdout, 4000),
        stderr: truncateText(stderr, 4000),
        failure,
      });
      return res.status(500).json({
        ok: false,
        error: '生成失败',
        detail: stderr || stdout || error.message,
        requestId,
        failure,
        retryAttempts,
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(stdout);
    } catch (e) {
      const failure = classifyGenerateFailure(stdout || stderr || e.message);
      appendLog({
        type: 'generate-invalid-json',
        requestId,
        stdout: truncateText(stdout, 4000),
        stderr: truncateText(stderr, 4000),
        parseError: e.message,
        failure,
      });
      return res.status(500).json({
        ok: false,
        error: '脚本返回不是合法 JSON',
        detail: stdout || stderr || e.message,
        requestId,
        failure,
        retryAttempts,
      });
    }

    const outputFiles = (parsed.saved_files || []).map((filePath) => ({
      path: filePath,
      url: `/outputs/${path.basename(filePath)}`,
      name: path.basename(filePath),
    }));

    appendLog({
      type: 'generate-success',
      requestId,
      outputCount: outputFiles.length,
      outputFiles: outputFiles.map((item) => item.path),
      revisedPrompts: parsed.revised_prompts || [],
      retryAttempts,
    });

    return res.json({
      ok: true,
      mode,
      request: { model, size, quality, background },
      result: parsed,
      outputFiles,
      prompt,
      requestId,
      retryAttempts,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Figure Image Studio running at http://localhost:${PORT}`);
});

function shellEscape(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function buildPromptAssistantInstruction({ action, category, subject, targetUse, style, constraints, originalPrompt }) {
  if (action === 'improve') {
    return `你是一个专业的图片生成 prompt 设计助手。请把用户已有的 prompt 优化成更适合图片模型执行的版本。\n\n要求：\n1. 输出只给最终 prompt，不要解释。\n2. 保留用户原意，不要擅自改任务目标。\n3. 如果是修图/改图类，要强调 faithful / conservative / preserve identity / preserve composition。\n4. 如果是商业海报/电商类，要补足构图、光线、材质、背景、禁止项等关键约束。\n5. 输出语言默认用中文，必要时可混合英文关键词。\n\n分类：${category || '未指定'}\n用途：${targetUse || '未指定'}\n风格：${style || '未指定'}\n额外约束：${constraints || '未指定'}\n\n原始 prompt：\n${originalPrompt}`;
  }

  return `你是一个专业的图片生成 prompt 设计助手。请根据用户需求，生成一个高质量、可直接用于图片模型的最终 prompt。\n\n要求：\n1. 输出只给最终 prompt，不要解释，不要加标题。\n2. prompt 要完整、可执行，避免空泛词。\n3. 要自动补足：主体、构图、视角、光线、材质、背景、风格、细节、禁止项。\n4. 如果用户需求偏修图/保守修复，要强调 faithful restoration、preserve identity、preserve composition、不要重绘面部。\n5. 如果是电商/海报/封面，要强调商业视觉目标、留白、质感、避免廉价 AI 感。\n6. 输出语言默认用中文，必要时可混合英文关键词。\n\n分类：${category || '未指定'}\n主体/主题：${subject}\n使用场景：${targetUse || '未指定'}\n期望风格：${style || '未指定'}\n额外约束：${constraints || '未指定'}`;
}

async function callPromptModel(input) {
  const response = await fetch(`${promptLlmBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${promptLlmApiKey}`,
    },
    body: JSON.stringify({
      model: promptLlmModel,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: 'You generate concise, high-quality image prompts. Return only the final prompt text.',
        },
        {
          role: 'user',
          content: input,
        },
      ],
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `HTTP ${response.status}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (_error) {
    throw new Error(`Prompt model returned non-JSON response: ${text}`);
  }

  const content = parsed?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error(`Prompt model response missing content: ${text}`);
  }
  return content;
}

function loadHermesModelConfig() {
  try {
    if (!fs.existsSync(hermesConfigPath)) return {};
    const parsed = yaml.load(fs.readFileSync(hermesConfigPath, 'utf-8')) || {};
    return parsed.model || {};
  } catch (_error) {
    return {};
  }
}

function pickFirstNonEmpty(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function appendLog(payload) {
  const line = JSON.stringify({ time: new Date().toISOString(), ...payload }, null, 0);
  fs.appendFileSync(logFilePath, `${line}\n`, 'utf-8');
}

function truncateText(text, limit = 4000) {
  const value = String(text || '');
  return value.length > limit ? `${value.slice(0, limit)}...<truncated>` : value;
}

function classifyGenerateFailure(text) {
  const source = String(text || '');
  const lowered = source.toLowerCase();
  if (lowered.includes('model_not_found') || lowered.includes('no available channel for model')) {
    return {
      kind: 'model_unavailable',
      title: '模型通道不可用',
      message: '当前图片模型通道暂时不可用，不是你的 prompt 写错了。',
    };
  }
  if (lowered.includes('stream disconnected before completion') || lowered.includes('stream error:') || lowered.includes('internal_server_error')) {
    return {
      kind: 'upstream_stream_error',
      title: '上游返回中断',
      message: '图片服务在返回结果时中断，本地已自动重试，仍未拿到完整图片数据。',
    };
  }
  if (lowered.includes('timed out') || lowered.includes('read operation timed out')) {
    return {
      kind: 'upstream_timeout',
      title: '上游响应超时',
      message: '图片服务响应超时，本地已自动重试，但本次仍失败。',
    };
  }
  if (lowered.includes('file not found')) {
    return {
      kind: 'local_file_missing',
      title: '本地文件不存在',
      message: '参考图或 mask 文件在提交时已不存在。',
    };
  }
  if (lowered.includes('no image data returned')) {
    return {
      kind: 'empty_image_data',
      title: '未返回图片数据',
      message: '上游接口没有返回可保存的图片数据。',
    };
  }
  return {
    kind: 'unknown_error',
    title: '未知错误',
    message: '暂时无法自动分类，请看下方日志和返回参数。',
  };
}
