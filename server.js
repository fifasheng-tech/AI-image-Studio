const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const crypto = require('crypto');
const { execFile, execFileSync } = require('child_process');

function loadLocalEnvFile() {
  const envPath = path.join(__dirname, '.env');
  try {
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch (_error) {
    // ignore malformed local env
  }
}

loadLocalEnvFile();

const app = express();
const PORT = process.env.PORT || 3487;
const projectRoot = __dirname;
const uploadsDir = path.join(projectRoot, 'tmp', 'uploads');
const downloadsDir = path.join(process.env.HOME || projectRoot, 'Downloads');
const outputsDir = process.env.IMAGE_STUDIO_OUTPUT_DIR || path.join(projectRoot, 'tmp', 'outputs');
const logsDir = path.join(projectRoot, 'tmp', 'logs');
const logFilePath = path.join(logsDir, 'app.log');
const localAuthPath = path.join(projectRoot, 'data', 'local-auth.json');
const scriptPath = pickFirstNonEmpty(
  process.env.GENERATE_SCRIPT_PATH,
  path.join(projectRoot, 'scripts', 'generate.py')
);
const presetPath = path.join(projectRoot, 'data', 'prompt-presets.json');
const hermesConfigPath = path.join(process.env.HOME || '', '.hermes', 'config.yaml');
const promptPresets = JSON.parse(fs.readFileSync(presetPath, 'utf-8'));
const hermesModelConfig = loadHermesModelConfig();
const shellFigureConfig = loadShellFigureConfig();
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
  'gpt-5.5'
);
const promptLlmApiKey = pickFirstNonEmpty(
  process.env.OPENAI_API_KEY,
  process.env.PROMPT_LLM_API_KEY,
  hermesModelConfig.api_key,
  ''
);
const authSessions = new Map();
const generationPolicy = {
  maxAttemptsPerBase: clampInteger(process.env.IMAGE_STUDIO_IMAGE_ATTEMPTS, 1, 5, 3),
  disableFallback: ['1', 'true', 'yes'].includes(String(process.env.IMAGE_STUDIO_DISABLE_FALLBACK || '').toLowerCase()),
};

const IMAGE_PROVIDERS = [
  {
    id: 'figure',
    name: 'Figure (默认)',
    baseUrl: pickFirstNonEmpty(process.env.FIGURE_BASE_URL, shellFigureConfig.FIGURE_BASE_URL, 'https://api.figure.jiangsuocean.cn'),
    fallbackBaseUrl: pickFirstNonEmpty(process.env.FIGURE_FALLBACK_BASE_URL, shellFigureConfig.FIGURE_FALLBACK_BASE_URL, 'https://figure.jiangsuocean.cn'),
    apiKey: pickFirstNonEmpty(process.env.FIGURE_API_KEY, shellFigureConfig.FIGURE_API_KEY, ''),
    model: pickFirstNonEmpty(process.env.FIGURE_IMAGE_MODEL, shellFigureConfig.FIGURE_IMAGE_MODEL, 'gpt-image-2'),
  },
  {
    id: 'youmisub-image-2',
    name: 'youmisub-image-2',
    baseUrl: process.env.YOUMISUB_IMAGE_BASE_URL || 'https://youmisub.cloud',
    fallbackBaseUrl: process.env.YOUMISUB_IMAGE_FALLBACK_BASE_URL || process.env.YOUMISUB_IMAGE_BASE_URL || 'https://youmisub.cloud',
    apiKey: process.env.YOUMISUB_IMAGE_KEY || process.env.YOUMISUB_API_KEY || '',
    model: process.env.YOUMISUB_IMAGE_MODEL || 'gpt-image-2',
  },
].map(normalizeImageProvider);

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
    files: 8,
  },
});

const editorUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 120 * 1024 * 1024,
    files: 2,
  },
});

app.use(express.json({ limit: '140mb' }));
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

app.get('/api/providers', (_req, res) => {
  res.json({
    ok: true,
    providers: IMAGE_PROVIDERS.map(p => ({
      id: p.id,
      name: p.name,
      baseUrl: p.baseUrl,
      model: p.model,
      configured: Boolean(p.apiKey),
      builtIn: true,
    })),
  });
});

app.get('/api/account', (req, res) => {
  const authStore = readAuthStore();
  const session = getAuthSession(req);
  const account = session ? authStore.account : null;
  res.json({
    ok: true,
    setupRequired: !authStore.account,
    authenticated: Boolean(account),
    account: publicAccount(account),
    team: account ? authStore.team : null,
  });
});

app.post('/api/account/setup', (req, res) => {
  const authStore = readAuthStore();
  if (authStore.account) {
    return res.status(409).json({ ok: false, error: '本地账户已创建，请直接登录' });
  }

  const body = req.body || {};
  const email = normalizeEmail(body.email || 'local@image.studio');
  const name = normalizeDisplayName(body.name || 'Image Studio');
  const password = String(body.password || '');
  if (!email) return res.status(400).json({ ok: false, error: '请填写有效邮箱' });
  if (password.length < 6) return res.status(400).json({ ok: false, error: '密码至少 6 位' });

  const passwordRecord = hashPassword(password);
  const account = {
    id: `acct_${Date.now().toString(36)}`,
    name,
    email,
    role: 'Owner',
    avatarText: initialsFromName(name),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    password: passwordRecord,
  };
  const team = createDefaultTeam(account);
  writeAuthStore({ account, team });
  const sessionId = createAuthSession(account.id);
  setSessionCookie(res, sessionId);
  res.json({ ok: true, authenticated: true, account: publicAccount(account), team });
});

app.post('/api/account/login', (req, res) => {
  const authStore = readAuthStore();
  if (!authStore.account) {
    return res.status(404).json({ ok: false, error: '还没有本地账户，请先创建' });
  }
  const body = req.body || {};
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');
  if (email !== authStore.account.email || !verifyPassword(password, authStore.account.password)) {
    return res.status(401).json({ ok: false, error: '邮箱或密码不正确' });
  }
  const sessionId = createAuthSession(authStore.account.id);
  setSessionCookie(res, sessionId);
  res.json({ ok: true, authenticated: true, account: publicAccount(authStore.account), team: authStore.team });
});

app.post('/api/account/logout', (req, res) => {
  const sessionId = getCookie(req, 'image_studio_session');
  if (sessionId) authSessions.delete(sessionId);
  clearSessionCookie(res);
  res.json({ ok: true, authenticated: false });
});

app.post('/api/account/reset', (_req, res) => {
  try {
    authSessions.clear();
    if (fs.existsSync(localAuthPath)) fs.unlinkSync(localAuthPath);
    clearSessionCookie(res);
    res.json({ ok: true, setupRequired: true, authenticated: false });
  } catch (error) {
    res.status(500).json({ ok: false, error: `重置本地账户失败：${error.message}` });
  }
});

app.post('/api/account/profile', (req, res) => {
  const session = getAuthSession(req);
  if (!session) return res.status(401).json({ ok: false, error: '请先登录' });
  const authStore = readAuthStore();
  if (!authStore.account || authStore.account.id !== session.accountId) {
    clearSessionCookie(res);
    return res.status(401).json({ ok: false, error: '登录已失效' });
  }

  const body = req.body || {};
  const name = normalizeDisplayName(body.name || authStore.account.name);
  const email = normalizeEmail(body.email || authStore.account.email);
  const teamName = normalizeDisplayName(body.teamName || authStore.team?.name || 'Image Studio Team').slice(0, 80);
  if (!email) return res.status(400).json({ ok: false, error: '请填写有效邮箱' });

  authStore.account.name = name;
  authStore.account.email = email;
  authStore.account.avatarText = initialsFromName(name);
  authStore.account.updatedAt = new Date().toISOString();
  authStore.team = {
    ...(authStore.team || createDefaultTeam(authStore.account)),
    name: teamName,
    updatedAt: new Date().toISOString(),
  };
  authStore.team.members = [{
    id: authStore.account.id,
    name: authStore.account.name,
    email: authStore.account.email,
    role: authStore.account.role || 'Owner',
  }];
  writeAuthStore(authStore);
  res.json({ ok: true, account: publicAccount(authStore.account), team: authStore.team });
});

app.get('/api/outputs', (_req, res) => {
  try {
    const files = fs.readdirSync(outputsDir)
      .filter(name => /\.(png|jpe?g|webp|gif)$/i.test(name))
      .map(name => {
        const filePath = path.join(outputsDir, name);
        const stat = fs.statSync(filePath);
        return {
          name,
          path: filePath,
          url: `outputs/${name}`,
          kind: 'image',
          size: stat.size,
          mtimeMs: stat.mtimeMs,
          metadata: readOutputMetadata(filePath),
        };
      })
      .sort((a, b) => b.mtimeMs - a.mtimeMs)
      .slice(0, 60);
    res.json({ ok: true, outputsDir, files });
  } catch (error) {
    res.status(500).json({ ok: false, error: '读取输出目录失败', detail: error.message });
  }
});

app.get('/api/editor/config', (_req, res) => {
  const iopaintUrl = (process.env.IOPAINT_URL || 'http://127.0.0.1:8080').replace(/\/+$/, '');
  res.json({
    ok: true,
    miniPaintUrl: 'vendor/minipaint/index.html',
    iopaintUrl,
    outputsDir,
  });
});

app.get('/api/iopaint/status', async (_req, res) => {
  const iopaintUrl = (process.env.IOPAINT_URL || 'http://127.0.0.1:8080').replace(/\/+$/, '');
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const response = await fetch(iopaintUrl, { signal: controller.signal });
    clearTimeout(timer);
    return res.json({
      ok: true,
      available: response.ok,
      url: iopaintUrl,
      status: response.status,
    });
  } catch (error) {
    return res.json({
      ok: true,
      available: false,
      url: iopaintUrl,
      error: error.name === 'AbortError' ? '连接超时' : error.message,
    });
  }
});

app.post('/api/iopaint/inpaint', async (req, res) => {
  const iopaintUrl = (process.env.IOPAINT_URL || 'http://127.0.0.1:8080').replace(/\/+$/, '');
  const body = req.body || {};
  const image = String(body.image || '');
  const mask = String(body.mask || '');

  if (!image || !mask) {
    return res.status(400).json({ ok: false, error: '缺少 image 或 mask 数据' });
  }

  const timeout = clampInteger(body.timeout, 30, 900, 600);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout * 1000);

  try {
    const response = await fetch(`${iopaintUrl}/api/v1/inpaint`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image,
        mask,
        prompt: String(body.prompt || ''),
        negative_prompt: String(body.negativePrompt || ''),
        hd_strategy: String(body.hdStrategy || 'Crop'),
        hd_strategy_crop_trigger_size: clampInteger(body.cropTriggerSize, 256, 8192, 800),
        hd_strategy_crop_margin: clampInteger(body.cropMargin, 0, 1024, 128),
        sd_steps: clampInteger(body.steps, 1, 150, 30),
        sd_guidance_scale: Number.isFinite(Number(body.guidanceScale)) ? Number(body.guidanceScale) : 7.5,
        sd_strength: Number.isFinite(Number(body.strength)) ? Number(body.strength) : 0.85,
        sd_seed: clampInteger(body.seed, -1, 2147483647, -1),
      }),
    });
    clearTimeout(timer);

    const contentType = response.headers.get('content-type') || '';
    const buffer = Buffer.from(await response.arrayBuffer());
    if (!response.ok) {
      const detail = contentType.includes('application/json')
        ? buffer.toString('utf-8')
        : truncateText(buffer.toString('utf-8'), 2000);
      appendLog({
        type: 'iopaint-error',
        status: response.status,
        detail: truncateText(detail, 2000),
      });
      return res.status(response.status).json({
        ok: false,
        error: 'IOPaint 处理失败',
        detail,
      });
    }

    const ext = contentType.includes('jpeg') ? 'jpg' : 'png';
    const stamp = formatDateStamp(new Date());
    const fileName = `iopaint-${stamp}.${ext}`;
    const filePath = path.join(outputsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    appendLog({
      type: 'iopaint-success',
      outputPath: filePath,
      bytes: buffer.length,
      contentType,
    });

    return res.json({
      ok: true,
      outputFile: {
        path: filePath,
        url: `outputs/${fileName}`,
        name: fileName,
      },
      image: `data:${contentType || 'image/png'};base64,${buffer.toString('base64')}`,
    });
  } catch (error) {
    clearTimeout(timer);
    const isTimeout = error.name === 'AbortError';
    appendLog({
      type: 'iopaint-proxy-error',
      error: error.message,
      timeout: isTimeout,
      iopaintUrl,
    });
    return res.status(isTimeout ? 504 : 502).json({
      ok: false,
      error: isTimeout ? 'IOPaint 等待超时' : '无法连接 IOPaint',
      detail: isTimeout ? `等待超过 ${timeout} 秒，已停止本次本地 IOPaint 请求。` : error.message,
    });
  }
});

app.post('/api/editor/save', editorUpload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'project', maxCount: 1 },
]), (req, res) => {
  const files = req.files || {};
  const image = files.image?.[0] || null;
  const project = files.project?.[0] || null;

  if (!image) {
    return res.status(400).json({ ok: false, error: '缺少编辑后的图片文件' });
  }

  const sourceName = sanitizeOutputBaseName(req.body?.sourceName || 'edited-image');
  const stamp = formatDateStamp(new Date());
  const baseName = `edited-${sourceName}-${stamp}`;
  const imageName = `${baseName}.png`;
  const imagePath = path.join(outputsDir, imageName);
  fs.writeFileSync(imagePath, image.buffer);

  let projectFile = null;
  if (project) {
    const projectName = `${baseName}.minipaint.json`;
    const projectPath = path.join(outputsDir, projectName);
    fs.writeFileSync(projectPath, project.buffer);
    projectFile = {
      path: projectPath,
      url: `outputs/${projectName}`,
      name: projectName,
    };
  }

  appendLog({
    type: 'editor-save',
    imagePath,
    projectPath: projectFile?.path || null,
    sourceName,
    imageSize: image.size,
    projectSize: project?.size || 0,
  });

  res.json({
    ok: true,
    outputFile: {
      path: imagePath,
      url: `outputs/${imageName}`,
      name: imageName,
    },
    projectFile,
  });
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
  { name: 'images' },
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

  const model = normalizeModelValue(body.model, 'gpt-image-2');
  const size = normalizeSizeValue(body.size, '1536x1024');
  const quality = normalizeChoice(body.quality, ['high', 'medium', 'low'], 'high');
  const background = normalizeChoice(body.background, ['opaque', 'transparent'], 'opaque');
  const imageCount = clampInteger(body.n, 1, 4, 1);
  const timeout = clampInteger(body.timeout, 30, 900, 600);
  const prefix = `webui-${Date.now()}`;

  const providerId = (body.provider || 'figure').trim();
  let provider;
  try {
    provider = resolveImageProvider(providerId, body.providerConfig);
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message, requestId });
  }

  appendLog({
    type: 'generate-request',
    requestId,
    provider: provider.id,
    mode,
    model,
    size,
    quality,
    background,
    n: imageCount,
    timeout,
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
  pyArgs.push('--n', String(imageCount));
  pyArgs.push('--timeout', String(timeout));
  pyArgs.push('--output-dir', outputsDir);
  pyArgs.push('--prefix', prefix);
  pyArgs.push('--print-json');
  pyArgs.push(prompt);

  if (!provider.apiKey) {
    return res.status(500).json({
      ok: false,
      error: `服务商 ${provider.name} 未配置 API Key`,
      requestId,
    });
  }

  const providerEnv = {
    FIGURE_BASE_URL: provider.baseUrl,
    FIGURE_FALLBACK_BASE_URL: provider.fallbackBaseUrl || provider.baseUrl,
    FIGURE_API_KEY: provider.apiKey,
    FIGURE_IMAGE_MODEL: provider.model,
    FIGURE_MAX_ATTEMPTS_PER_BASE: String(generationPolicy.maxAttemptsPerBase),
    FIGURE_DISABLE_FALLBACK: generationPolicy.disableFallback ? '1' : '0',
  };
  // Commercial branch: pass env explicitly to the child via the env option
  // of execFile. We do NOT spawn a login shell (`zsh -lc "source ~/.zshrc"`)
  // because that couples the runtime to a specific developer's macOS shell
  // and to the contents of ~/.zshrc. The portable equivalent is direct
  // execFile with the provider's env merged into the inherited env.
  const retryAttempts = generationPolicy.maxAttemptsPerBase;
  const processTimeoutMs = (timeout + 45) * 1000;

  appendLog({ type: 'generate-command', requestId, commandPreview: redactSecrets(`python3 ${pyArgs.map(shellEscape).join(' ')}`).slice(0, 400), retryAttempts, processTimeoutMs });

  execFile('python3', pyArgs, { env: { ...process.env, ...providerEnv }, maxBuffer: 20 * 1024 * 1024, timeout: processTimeoutMs, killSignal: 'SIGTERM' }, (error, stdout, stderr) => {
    if (error) {
      const timedOut = error.killed && error.signal === 'SIGTERM';
      const failure = timedOut
        ? classifyGenerateFailure(`process timeout after ${processTimeoutMs}ms`)
        : classifyGenerateFailure(stderr || stdout || error.message);
      const detail = redactSecrets(stderr || stdout || error.message);
      appendLog({
        type: 'generate-error',
        requestId,
        exitMessage: truncateText(redactSecrets(error.message), 4000),
        stdout: truncateText(redactSecrets(stdout), 4000),
        stderr: truncateText(redactSecrets(stderr), 4000),
        timedOut,
        failure,
      });
      return res.status(500).json({
        ok: false,
        error: '生成失败',
        detail: timedOut ? `本地等待超过 ${timeout + 45} 秒，已停止本次请求。上游可能仍已计费，但没有返回可保存图片。` : detail,
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
      const detail = redactSecrets(stdout || stderr || e.message);
      appendLog({
        type: 'generate-invalid-json',
        requestId,
        stdout: truncateText(redactSecrets(stdout), 4000),
        stderr: truncateText(redactSecrets(stderr), 4000),
        parseError: e.message,
        failure,
      });
      return res.status(500).json({
        ok: false,
        error: '脚本返回不是合法 JSON',
        detail,
        requestId,
        failure,
        retryAttempts,
      });
    }

    const outputFiles = (parsed.saved_files || []).map((filePath, index) => ({
      path: filePath,
      url: `outputs/${path.basename(filePath)}`,
      name: path.basename(filePath),
      metadata: {
        prompt,
        revisedPrompt: parsed.revised_prompts?.[index] || '',
        request: { provider: provider.id, model, size, quality, background, n: imageCount, timeout },
        mode,
        requestId,
        createdAt: new Date().toISOString(),
      },
    }));

    if (!outputFiles.length) {
      const failure = classifyGenerateFailure('no image data returned');
      appendLog({
        type: 'generate-empty-output',
        requestId,
        stdout: truncateText(redactSecrets(stdout), 4000),
        stderr: truncateText(redactSecrets(stderr), 4000),
        parsedKeys: Object.keys(parsed || {}),
        failure,
      });
      return res.status(502).json({
        ok: false,
        error: '上游未返回可保存图片',
        detail: '请求结束了，但脚本没有拿到 saved_files，本地没有图片可写入。',
        requestId,
        failure,
        retryAttempts,
      });
    }

    appendLog({
      type: 'generate-success',
      requestId,
      outputCount: outputFiles.length,
      outputFiles: outputFiles.map((item) => item.path),
      revisedPrompts: parsed.revised_prompts || [],
      retryAttempts,
    });
    outputFiles.forEach((file) => writeOutputMetadata(file.path, file.metadata));

    return res.json({
      ok: true,
      mode,
      request: { provider: provider.id, model, size, quality, background, n: imageCount, timeout },
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

function readAuthStore() {
  try {
    if (!fs.existsSync(localAuthPath)) return { account: null, team: null };
    const parsed = JSON.parse(fs.readFileSync(localAuthPath, 'utf-8'));
    return {
      account: parsed.account || null,
      team: parsed.team || null,
    };
  } catch (_error) {
    return { account: null, team: null };
  }
}

function writeAuthStore(store) {
  fs.mkdirSync(path.dirname(localAuthPath), { recursive: true });
  fs.writeFileSync(localAuthPath, `${JSON.stringify(store, null, 2)}\n`, 'utf-8');
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 210000;
  const digest = 'sha256';
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, digest).toString('hex');
  return { salt, hash, iterations, digest };
}

function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) return false;
  const digest = record.digest || 'sha256';
  const iterations = Number(record.iterations) || 210000;
  const candidate = crypto.pbkdf2Sync(String(password || ''), record.salt, iterations, 32, digest).toString('hex');
  const stored = Buffer.from(record.hash, 'hex');
  const incoming = Buffer.from(candidate, 'hex');
  return stored.length === incoming.length && crypto.timingSafeEqual(stored, incoming);
}

function createAuthSession(accountId) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  authSessions.set(sessionId, {
    accountId,
    createdAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 14,
  });
  return sessionId;
}

function getAuthSession(req) {
  const sessionId = getCookie(req, 'image_studio_session');
  if (!sessionId) return null;
  const session = authSessions.get(sessionId);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    authSessions.delete(sessionId);
    return null;
  }
  return session;
}

function setSessionCookie(res, sessionId) {
  res.setHeader('Set-Cookie', [
    `image_studio_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 14}`,
  ]);
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'image_studio_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
}

function getCookie(req, name) {
  const cookies = String(req.headers.cookie || '').split(';');
  for (const cookie of cookies) {
    const index = cookie.indexOf('=');
    if (index === -1) continue;
    const key = cookie.slice(0, index).trim();
    if (key === name) return decodeURIComponent(cookie.slice(index + 1).trim());
  }
  return '';
}

function publicAccount(account) {
  if (!account) return null;
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role || 'Owner',
    avatarText: account.avatarText || initialsFromName(account.name),
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

function createDefaultTeam(account) {
  return {
    id: `team_${Date.now().toString(36)}`,
    name: 'Image Studio Team',
    plan: 'Local',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    members: [{
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role || 'Owner',
    }],
  };
}

function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase().slice(0, 160);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function normalizeDisplayName(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 80) || 'Image Studio';
}

function initialsFromName(value) {
  const text = normalizeDisplayName(value);
  const ascii = text.match(/[a-z0-9]/ig)?.slice(0, 2).join('') || '';
  return (ascii || text.slice(0, 2)).toUpperCase();
}

function shellEscape(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function normalizeImageProvider(provider) {
  return {
    ...provider,
    id: sanitizeProviderId(provider.id || provider.name || 'custom-provider'),
    name: String(provider.name || provider.id || 'Custom Provider').trim().slice(0, 80),
    model: normalizeModelValue(provider.model, 'gpt-image-2'),
    apiKey: String(provider.apiKey || '').trim(),
    baseUrl: normalizeImageBaseUrl(provider.baseUrl),
    fallbackBaseUrl: normalizeImageBaseUrl(provider.fallbackBaseUrl || provider.baseUrl),
  };
}

function normalizeImageBaseUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '').replace(/\/v1$/, '');
}

function redactSecrets(text) {
  return String(text || '')
    .replace(/((?:FIGURE_API_KEY|OPENAI_API_KEY|apiKey|api_key|authorization|Authorization)\s*[:=]\s*)'[^']*'/g, "$1'<redacted>'")
    .replace(/((?:FIGURE_API_KEY|OPENAI_API_KEY|apiKey|api_key|authorization|Authorization)"?\s*[:=]\s*"?)[A-Za-z0-9._-]{16,}/g, '$1<redacted>')
    .replace(/\bsk-[A-Za-z0-9._-]{12,}\b/g, 'sk-<redacted>');
}

function resolveImageProvider(providerId, providerConfigText) {
  const builtIn = IMAGE_PROVIDERS.find(p => p.id === providerId);
  if (builtIn) return builtIn;

  const dynamicProvider = parseDynamicImageProvider(providerConfigText);
  if (dynamicProvider) return dynamicProvider;

  return IMAGE_PROVIDERS[0];
}

function parseDynamicImageProvider(providerConfigText) {
  if (!providerConfigText) return null;

  let raw;
  try {
    raw = typeof providerConfigText === 'string' ? JSON.parse(providerConfigText) : providerConfigText;
  } catch (_error) {
    throw new Error('自定义服务商配置不是合法 JSON');
  }

  if (!raw || typeof raw !== 'object') {
    throw new Error('自定义服务商配置格式不正确');
  }

  const provider = normalizeImageProvider({
    id: raw.id,
    name: raw.name,
    baseUrl: raw.baseUrl || raw.apiUrl,
    fallbackBaseUrl: raw.fallbackBaseUrl,
    apiKey: raw.apiKey,
    model: raw.model,
  });

  if (!provider.baseUrl || !/^https?:\/\//i.test(provider.baseUrl)) {
    throw new Error('自定义服务商需要填写有效的 API URL');
  }

  if (!provider.apiKey) {
    throw new Error('自定义服务商需要填写 API Key');
  }

  return {
    ...provider,
    id: provider.id.startsWith('custom-') ? provider.id : `custom-${provider.id}`,
  };
}

function sanitizeProviderId(value) {
  const id = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
  return id || `custom-${Date.now()}`;
}

function normalizeModelValue(value, fallback) {
  const model = String(value || fallback || '').trim();
  return model ? model.slice(0, 120) : fallback;
}

function normalizeSizeValue(value, fallback) {
  const size = String(value || '').trim().toLowerCase();
  if (/^\d{2,5}x\d{2,5}$/.test(size)) return size;
  return fallback;
}

function sanitizeOutputBaseName(value) {
  const name = path.basename(String(value || 'edited-image'))
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return name || 'edited-image';
}

function formatDateStamp(date) {
  const pad = (number) => String(number).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    '-',
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('');
}

function normalizeChoice(value, allowed, fallback) {
  const normalized = String(value || '').trim();
  return allowed.includes(normalized) ? normalized : fallback;
}

function clampInteger(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
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
    const model = parsed.model || {};
    const providerName = String(model.provider || '').replace(/^custom:/i, '').trim().toLowerCase();
    const provider = (parsed.custom_providers || []).find(item =>
      String(item?.name || '').trim().toLowerCase() === providerName
    );
    return {
      default: model.default,
      base_url: provider?.base_url || model.base_url,
      api_key: provider?.api_key || model.api_key,
    };
  } catch (_error) {
    return {};
  }
}

function loadShellFigureConfig() {
  // Commercial branch: previously this function forked a login shell to
  // discover credentials via `source ~/.zshrc`. That couples the runtime
  // to a specific developer's macOS shell. In the commercial branch we
  // read directly from process.env (populated by dotenv at boot). If a
  // deployment truly needs shell-discovered keys, the operator should
  // put them in .env at provisioning time.
  const keys = ['FIGURE_API_KEY', 'FIGURE_BASE_URL', 'FIGURE_FALLBACK_BASE_URL', 'FIGURE_IMAGE_MODEL'];
  return keys.reduce((config, key) => {
    config[key] = String(process.env[key] || '').trim();
    return config;
  }, {});
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

function outputMetadataPath(filePath) {
  return `${filePath}.meta.json`;
}

function readOutputMetadata(filePath) {
  const metaPath = outputMetadataPath(filePath);
  try {
    if (!fs.existsSync(metaPath)) return null;
    const parsed = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_error) {
    return null;
  }
}

function writeOutputMetadata(filePath, metadata) {
  try {
    fs.writeFileSync(outputMetadataPath(filePath), JSON.stringify(metadata || {}, null, 2), 'utf-8');
  } catch (error) {
    appendLog({ type: 'metadata-write-error', filePath, error: error.message });
  }
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
  if (lowered.includes('stream disconnected before completion') || lowered.includes('stream error:') || lowered.includes('internal_server_error') || lowered.includes('incompleteread')) {
    return {
      kind: 'upstream_stream_error',
      title: '上游返回中断',
      message: '图片服务在返回结果时中断，本地已自动重试，仍未拿到完整图片数据。',
    };
  }
  if (lowered.includes('timed out') || lowered.includes('read operation timed out') || lowered.includes('process timeout')) {
    return {
      kind: 'upstream_timeout',
      title: '上游响应超时',
      message: '图片服务响应超时，本地已停止等待，没有拿到可保存图片。',
    };
  }
  if (lowered.includes('remote end closed connection') || lowered.includes('connection without response')) {
    return {
      kind: 'upstream_connection_closed',
      title: '上游连接断开',
      message: '图片服务直接断开了连接，通常是请求体过大（4K + 超长 prompt + 参考图）。建议降低分辨率或精简 prompt。',
    };
  }
  if (lowered.includes('http 403') || lowered.includes('error code: 1010')) {
    return {
      kind: 'upstream_forbidden',
      title: '上游拒绝请求',
      message: '图片服务拒绝了本次请求，可能是服务商拦截、API URL 不匹配或 Key 权限未开通。',
    };
  }
  if (lowered.includes('file not found')) {
    return {
      kind: 'local_file_missing',
      title: '本地文件不存在',
      message: '参考图或 mask 文件在提交时已不存在。',
    };
  }
  if (lowered.includes('no image data returned') || lowered.includes('retryable empty data response')) {
    return {
      kind: 'empty_image_data',
      title: '未返回图片数据',
      message: '上游接口返回成功但 data 为空，本地没有可保存的图片数据。已按配置重试/切换备用地址。',
    };
  }
  return {
    kind: 'unknown_error',
    title: '未知错误',
    message: '暂时无法自动分类，请看下方日志和返回参数。',
  };
}
