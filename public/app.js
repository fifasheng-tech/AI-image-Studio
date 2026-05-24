const $ = (id) => document.getElementById(id);

const promptInput = $('promptInput');
const submitBtn = $('submitBtn');
const conversationArea = $('conversationArea');
const welcomeSection = $('welcomeSection');
const resultsThread = $('resultsThread');
const statusDot = $('statusDot');
const overlayBackdrop = $('overlayBackdrop');
const composerAttachments = $('composerAttachments');
const imagesInput = $('imagesInput');
const maskInput = $('maskInput');
const imagesDropZone = $('imagesDropZone');
const imagesDropSurface = $('imagesDropSurface');
const maskDropZone = $('maskDropZone');
const maskDropSurface = $('maskDropSurface');
const pickImagesBtn = $('pickImagesBtn');
const pickMaskBtn = $('pickMaskBtn');
const imagesThumbGrid = $('imagesThumbGrid');
const maskThumbWrap = $('maskThumbWrap');
const templatesBody = $('templatesBody');
const modelSelect = $('modelSelect');
const sizeSelect = $('sizeSelect');
const qualitySelect = $('qualitySelect');
const backgroundSelect = $('backgroundSelect');
const assistCategory = $('assistCategory');
const assistSubject = $('assistSubject');
const assistTargetUse = $('assistTargetUse');
const assistStyle = $('assistStyle');
const assistConstraints = $('assistConstraints');
const assistOutput = $('assistOutput');
const generatePromptBtn = $('generatePromptBtn');
const applyAssistPromptBtn = $('applyAssistPromptBtn');
const wandToolBtn = $('wandToolBtn');
const debugPanel = $('debugPanel');
const debugCloseBtn = $('debugCloseBtn');
const refreshLogsBtn = $('refreshLogsBtn');
const logOutput = $('logOutput');
const commandPalette = $('commandPalette');
const commandList = $('commandList');

const state = {
  isGenerating: false,
  activeDrawer: null,
  uploadedImages: [],
  uploadedMask: null,
  imageThumbUrls: [],
  maskThumbUrls: [],
  commandMode: null,
  commandIndex: -1,
};

// Auto-resize textarea
promptInput.addEventListener('input', () => {
  promptInput.style.height = 'auto';
  promptInput.style.height = Math.min(promptInput.scrollHeight, 150) + 'px';
  handleCommandInput();
});

// Submit on Cmd+Enter
promptInput.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    handleSubmit();
    return;
  }
  if (state.commandMode) {
    if (e.key === 'ArrowDown') { e.preventDefault(); navigateCommand(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); navigateCommand(-1); }
    else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); selectCommand(); }
    else if (e.key === 'Escape') { hideCommandPalette(); }
  }
});

promptInput.addEventListener('blur', () => {
  setTimeout(hideCommandPalette, 150);
});

submitBtn.addEventListener('click', handleSubmit);

// Drawer management
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', closeDrawer);
});
overlayBackdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});

$('uploadToolBtn').addEventListener('click', () => openDrawer('upload'));
$('templatesToolBtn').addEventListener('click', () => openDrawer('templates'));
$('settingsToolBtn').addEventListener('click', () => openDrawer('settings'));
wandToolBtn.addEventListener('click', handleQuickEnhance);
wandToolBtn.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  openDrawer('assistant');
});

// Long press on wand opens full assistant
let wandTimer = null;
wandToolBtn.addEventListener('mousedown', () => {
  wandTimer = setTimeout(() => openDrawer('assistant'), 500);
});
wandToolBtn.addEventListener('mouseup', () => clearTimeout(wandTimer));
wandToolBtn.addEventListener('mouseleave', () => clearTimeout(wandTimer));

// Upload handling
pickImagesBtn.addEventListener('click', () => imagesInput.click());
pickMaskBtn.addEventListener('click', () => maskInput.click());
imagesInput.addEventListener('change', () => {
  state.uploadedImages = Array.from(imagesInput.files || []);
  renderUploadState();
});
maskInput.addEventListener('change', () => {
  state.uploadedMask = maskInput.files?.[0] || null;
  renderMaskThumbs();
});

setupDropZone(imagesDropZone, imagesDropSurface, true, (files) => {
  const dt = new DataTransfer();
  files.forEach(f => dt.items.add(f));
  imagesInput.files = dt.files;
  state.uploadedImages = files;
  renderUploadState();
});
setupDropZone(maskDropZone, maskDropSurface, false, (files) => {
  const dt = new DataTransfer();
  files.forEach(f => dt.items.add(f));
  maskInput.files = dt.files;
  state.uploadedMask = files[0] || null;
  renderMaskThumbs();
});

// Prompt assistant
generatePromptBtn.addEventListener('click', () => runPromptAssist('generate'));
applyAssistPromptBtn.addEventListener('click', () => {
  if (assistOutput.value.trim()) {
    promptInput.value = assistOutput.value.trim();
    promptInput.dispatchEvent(new Event('input'));
    closeDrawer();
  }
});

// Debug panel (Ctrl+Shift+D)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'D') {
    e.preventDefault();
    debugPanel.classList.toggle('open');
  }
});
debugCloseBtn.addEventListener('click', () => {
  debugPanel.classList.remove('open');
});
refreshLogsBtn.addEventListener('click', loadLogs);

// --- Core Functions ---

async function handleSubmit() {
  const prompt = promptInput.value.trim();
  if (!prompt || state.isGenerating) return;

  const hasImages = state.uploadedImages.length > 0;
  const mode = hasImages ? 'edit' : 'generate';

  welcomeSection.classList.add('hidden');
  setGenerating(true);
  addPromptBubble(prompt);
  const loadingEl = addLoadingCard();

  const formData = new FormData();
  formData.append('prompt', prompt);
  formData.append('mode', mode);
  formData.append('model', modelSelect.value);
  formData.append('size', sizeSelect.value);
  formData.append('quality', qualitySelect.value);
  formData.append('background', backgroundSelect.value);

  state.uploadedImages.forEach(file => formData.append('images', file));
  if (state.uploadedMask) formData.append('mask', state.uploadedMask);

  try {
    const response = await fetch('/api/generate', { method: 'POST', body: formData });
    const data = await response.json();
    loadingEl.remove();

    if (!response.ok || !data.ok) {
      addErrorCard(data.failure?.message || data.detail || data.error || '生成失败');
    } else {
      addResultCards(data.outputFiles || []);
      promptInput.value = '';
      promptInput.style.height = 'auto';
      clearAttachments();
    }
  } catch (error) {
    loadingEl.remove();
    addErrorCard(error.message);
  }

  setGenerating(false);
  scrollToBottom();
}

function setGenerating(generating) {
  state.isGenerating = generating;
  submitBtn.disabled = generating;
}

function addPromptBubble(text) {
  const el = document.createElement('div');
  el.className = 'result-entry';
  el.innerHTML = `<div class="result-prompt-bubble">${escapeHtml(text)}</div>`;
  resultsThread.appendChild(el);
  scrollToBottom();
}

function addLoadingCard() {
  const el = document.createElement('div');
  el.className = 'result-entry';
  el.innerHTML = `<div class="result-loading"><div class="spinner"></div>生成中...</div>`;
  resultsThread.appendChild(el);
  scrollToBottom();
  return el;
}

function addErrorCard(message) {
  const el = document.createElement('div');
  el.className = 'result-entry';
  el.innerHTML = `<div class="result-error">${escapeHtml(message)}</div>`;
  resultsThread.appendChild(el);
}

function addResultCards(files) {
  if (!files.length) {
    addErrorCard('接口成功了，但没拿到图片');
    return;
  }
  const el = document.createElement('div');
  el.className = 'result-entry';
  const grid = files.length > 1 ? 'result-images-grid' : '';
  el.innerHTML = `<div class="result-ai-row">
    <div class="result-ai-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>
    <div class="result-ai-content"><div class="result-card"><div class="${grid}">${files.map(f =>
    `<img src="${f.url}" alt="${escapeHtml(f.name)}" />`
  ).join('')}</div><div class="result-card-meta"><div class="result-card-info"><span class="result-card-name">${escapeHtml(files[0].name)}${files.length > 1 ? ` 等 ${files.length} 张` : ''}</span><span class="result-card-sub">${modelSelect.value} · ${sizeSelect.value}</span></div><div class="result-card-actions">${files.map(f =>
    `<a href="${f.url}" target="_blank" rel="noreferrer">查看</a>`
  ).join('')}</div></div></div></div>
  </div>`;
  resultsThread.appendChild(el);
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    conversationArea.scrollTop = conversationArea.scrollHeight;
  });
}

// --- Drawer Management ---

function openDrawer(name) {
  closeDrawer();
  const drawer = document.querySelector(`[data-drawer="${name}"]`);
  if (!drawer) return;
  state.activeDrawer = name;
  drawer.classList.add('open');
  overlayBackdrop.classList.add('visible');
}

function closeDrawer() {
  if (!state.activeDrawer) return;
  const drawer = document.querySelector(`[data-drawer="${state.activeDrawer}"]`);
  if (drawer) drawer.classList.remove('open');
  overlayBackdrop.classList.remove('visible');
  state.activeDrawer = null;
}

// --- Upload & Attachments ---

function setupDropZone(zone, surface, multiple, onDrop) {
  ['dragenter', 'dragover'].forEach(ev => {
    zone.addEventListener(ev, (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
  });
  ['dragleave', 'dragend', 'drop'].forEach(ev => {
    zone.addEventListener(ev, (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
    });
  });
  zone.addEventListener('drop', (e) => {
    const files = Array.from(e.dataTransfer?.files || []).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    onDrop(multiple ? files : files.slice(0, 1));
  });
  zone.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    if (multiple) imagesInput.click();
    else maskInput.click();
  });
}

function renderUploadState() {
  renderImageThumbs();
  renderComposerAttachments();
}

function renderImageThumbs() {
  revokeUrls(state.imageThumbUrls);
  imagesThumbGrid.innerHTML = '';
  state.uploadedImages.forEach(file => {
    const url = URL.createObjectURL(file);
    state.imageThumbUrls.push(url);
    const item = document.createElement('div');
    item.className = 'thumb-item';
    item.innerHTML = `<img src="${url}" alt="${escapeHtml(file.name)}" />`;
    imagesThumbGrid.appendChild(item);
  });
}

function renderMaskThumbs() {
  revokeUrls(state.maskThumbUrls);
  maskThumbWrap.innerHTML = '';
  if (!state.uploadedMask) return;
  const url = URL.createObjectURL(state.uploadedMask);
  state.maskThumbUrls.push(url);
  maskThumbWrap.innerHTML = `<div class="thumb-item"><img src="${url}" alt="mask" /></div>`;
}

function renderComposerAttachments() {
  composerAttachments.innerHTML = '';
  state.uploadedImages.forEach((file, i) => {
    const url = state.imageThumbUrls[i] || URL.createObjectURL(file);
    const thumb = document.createElement('div');
    thumb.className = 'attachment-thumb';
    thumb.innerHTML = `<img src="${url}" alt="${escapeHtml(file.name)}" /><button class="remove-btn" data-index="${i}">&times;</button>`;
    thumb.querySelector('.remove-btn').addEventListener('click', () => {
      state.uploadedImages.splice(i, 1);
      const dt = new DataTransfer();
      state.uploadedImages.forEach(f => dt.items.add(f));
      imagesInput.files = dt.files;
      renderUploadState();
    });
    composerAttachments.appendChild(thumb);
  });
}

function clearAttachments() {
  state.uploadedImages = [];
  state.uploadedMask = null;
  imagesInput.value = '';
  maskInput.value = '';
  revokeUrls(state.imageThumbUrls);
  revokeUrls(state.maskThumbUrls);
  composerAttachments.innerHTML = '';
  imagesThumbGrid.innerHTML = '';
  maskThumbWrap.innerHTML = '';
}

function revokeUrls(urls) {
  while (urls.length) URL.revokeObjectURL(urls.pop());
}

// --- Templates ---

async function loadPresets() {
  try {
    const res = await fetch('/api/presets');
    const data = await res.json();
    if (!data.ok) throw new Error('加载失败');
    renderPresets(data.categories || []);
  } catch (e) {
    templatesBody.innerHTML = `<div class="muted">模板加载失败</div>`;
  }
}

function renderPresets(categories) {
  const allCategories = [...new Set(GALLERY_TEMPLATES.map(t => t.category))];
  let html = '';

  allCategories.forEach(cat => {
    const items = GALLERY_TEMPLATES.filter(t => t.category === cat);
    html += `<div class="gallery-section"><div class="gallery-section-title">${escapeHtml(cat)}</div><div class="gallery-templates">${items.map(t => `
      <div class="gallery-template-card" data-prompt="${escapeAttr(t.prompt)}">
        <img src="${t.img}" alt="${escapeHtml(t.title)}" loading="lazy" />
        <div class="card-info">
          <div class="card-title">${escapeHtml(t.title)}</div>
        </div>
      </div>
    `).join('')}</div></div>`;
  });

  templatesBody.innerHTML = html;

  templatesBody.querySelectorAll('.gallery-template-card').forEach(card => {
    card.addEventListener('click', () => {
      promptInput.value = card.dataset.prompt || '';
      promptInput.dispatchEvent(new Event('input'));
      closeDrawer();
    });
  });
}

// --- Prompt Assistant ---

async function handleQuickEnhance() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    openDrawer('assistant');
    return;
  }
  wandToolBtn.classList.add('active');
  try {
    const res = await fetch('/api/prompt-assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'improve',
        originalPrompt: prompt,
        category: '',
        subject: '',
        targetUse: '',
        style: '',
        constraints: '',
      }),
    });
    const data = await res.json();
    if (data.ok && data.prompt) {
      promptInput.value = data.prompt;
      promptInput.dispatchEvent(new Event('input'));
    }
  } catch (_) {}
  wandToolBtn.classList.remove('active');
}

async function runPromptAssist(action) {
  const payload = {
    action,
    category: assistCategory.value,
    subject: assistSubject.value,
    targetUse: assistTargetUse.value,
    style: assistStyle.value,
    constraints: assistConstraints.value,
    originalPrompt: promptInput.value,
  };
  assistOutput.value = '生成中...';
  try {
    const res = await fetch('/api/prompt-assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.detail || data.error || '失败');
    assistOutput.value = data.prompt || '';
  } catch (e) {
    assistOutput.value = `失败：${e.message}`;
  }
}

// --- Health & Logs ---

async function checkHealth() {
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    if (data.ok) {
      statusDot.title = `服务正常 · ${data.promptLlm?.model || ''}`;
      statusDot.className = 'status-dot';
    } else {
      statusDot.title = '服务异常';
      statusDot.className = 'status-dot error';
    }
  } catch (_) {
    statusDot.title = '服务未启动';
    statusDot.className = 'status-dot error';
  }
}

async function loadLogs() {
  try {
    const res = await fetch('/api/logs');
    const data = await res.json();
    logOutput.textContent = data.tail || '日志为空';
  } catch (e) {
    logOutput.textContent = `加载失败：${e.message}`;
  }
}

// --- Command Palette ---

const SLASH_COMMANDS = [
  { id: 'portrait', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', color: 'blue', title: '/portrait', desc: '人像 / 头像生成', prompt: 'Generate a professional portrait photo: ' },
  { id: 'product', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>', color: 'orange', title: '/product', desc: '电商产品主图', prompt: 'Generate a premium e-commerce product photo, clean background, studio lighting: ' },
  { id: 'poster', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>', color: 'purple', title: '/poster', desc: '海报 / 封面设计', prompt: 'Design a modern poster with clear visual hierarchy, suitable for social media cover: ' },
  { id: 'anime', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', color: 'pink', title: '/anime', desc: '动漫 / 二次元风格', prompt: 'Create an anime-style illustration with vibrant colors and detailed character design: ' },
  { id: 'photo', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>', color: 'green', title: '/photo', desc: '真实摄影风格', prompt: 'Photorealistic image, shot on full-frame camera, 85mm lens, shallow depth of field: ' },
  { id: 'edit', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>', color: 'blue', title: '/edit', desc: '图片编辑 / 修复模式', action: 'openUpload' },
  { id: 'settings', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>', color: 'purple', title: '/settings', desc: '打开生成设置', action: 'openSettings' },
  { id: 'enhance', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l1.09 3.26L16.36 6l-3.27 1.09L12 10.36l-1.09-3.27L7.64 6l3.27-1.09L12 2z"/><path d="M5 15l.54 1.63L7.18 17l-1.64.54L5 19.18l-.54-1.64L2.82 17l1.64-.54L5 15z"/></svg>', color: 'orange', title: '/enhance', desc: 'AI 优化当前 Prompt', action: 'enhance' },
];

const AT_COMMANDS = [
  { id: 'cinematic', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>', color: 'purple', title: '@cinematic', desc: '电影质感风格', insert: 'cinematic lighting, film grain, dramatic shadows, anamorphic lens flare' },
  { id: 'minimal', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>', color: 'blue', title: '@minimal', desc: '极简设计风格', insert: 'minimalist composition, clean lines, ample negative space, muted color palette' },
  { id: 'vintage', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', color: 'orange', title: '@vintage', desc: '复古胶片风格', insert: 'vintage film photography, warm tones, slight grain, Kodak Portra 400 color science' },
  { id: 'cyberpunk', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', color: 'pink', title: '@cyberpunk', desc: '赛博朋克风格', insert: 'cyberpunk aesthetic, neon lights, rain-slicked streets, holographic UI elements' },
  { id: 'watercolor', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19c-4 0-7-3-7-7a7 7 0 0114 0c0 4-3 7-7 7z"/><path d="M12 2v3"/></svg>', color: 'green', title: '@watercolor', desc: '水彩画风格', insert: 'delicate watercolor painting style, soft washes, visible paper texture, flowing pigments' },
  { id: 'isometric', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>', color: 'blue', title: '@isometric', desc: '等距 3D 风格', insert: 'isometric 3D render, clean geometric shapes, soft shadows, pastel color scheme' },
  { id: '3d', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/><line x1="2" y1="12" x2="22" y2="12"/></svg>', color: 'purple', title: '@3d', desc: 'Pixar 3D 渲染', insert: 'Pixar-quality 3D render, subsurface scattering, global illumination, smooth stylized proportions' },
  { id: 'ink', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>', color: 'orange', title: '@ink', desc: '水墨 / 国风', insert: 'traditional Chinese ink painting style, flowing brushstrokes, elegant composition, rice paper texture' },
];

function handleCommandInput() {
  const val = promptInput.value;
  const cursorPos = promptInput.selectionStart;
  const textBeforeCursor = val.substring(0, cursorPos);

  const slashMatch = textBeforeCursor.match(/^\/(\w*)$/);
  const atMatch = textBeforeCursor.match(/(^|\s)@(\w*)$/);

  if (slashMatch) {
    const query = slashMatch[1].toLowerCase();
    const filtered = SLASH_COMMANDS.filter(c => c.id.includes(query) || c.title.includes(query) || c.desc.includes(query));
    showCommandPalette('slash', filtered);
  } else if (atMatch) {
    const query = atMatch[2].toLowerCase();
    const filtered = AT_COMMANDS.filter(c => c.id.includes(query) || c.title.includes(query) || c.desc.includes(query));
    showCommandPalette('at', filtered);
  } else {
    hideCommandPalette();
  }
}

function showCommandPalette(mode, items) {
  if (!items.length) { hideCommandPalette(); return; }
  state.commandMode = mode;
  state.commandIndex = 0;
  const label = mode === 'slash' ? '命令' : '风格';
  commandList.innerHTML = `<div class="command-section-label">${label}</div>` +
    items.map((item, i) => `
      <div class="command-item${i === 0 ? ' active' : ''}" data-index="${i}" data-id="${item.id}">
        <div class="command-item-icon ${item.color}">${item.icon}</div>
        <div class="command-item-text">
          <div class="command-item-title">${escapeHtml(item.title)}</div>
          <div class="command-item-desc">${escapeHtml(item.desc)}</div>
        </div>
      </div>
    `).join('');
  commandPalette.classList.add('visible');
  commandList.querySelectorAll('.command-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      state.commandIndex = parseInt(el.dataset.index);
      updateCommandHighlight();
    });
    el.addEventListener('click', selectCommand);
  });
}

function hideCommandPalette() {
  commandPalette.classList.remove('visible');
  state.commandMode = null;
  state.commandIndex = -1;
}

function navigateCommand(dir) {
  const items = commandList.querySelectorAll('.command-item');
  if (!items.length) return;
  state.commandIndex = (state.commandIndex + dir + items.length) % items.length;
  updateCommandHighlight();
}

function updateCommandHighlight() {
  commandList.querySelectorAll('.command-item').forEach((el, i) => {
    el.classList.toggle('active', i === state.commandIndex);
  });
}

function selectCommand() {
  const items = commandList.querySelectorAll('.command-item');
  const selected = items[state.commandIndex];
  if (!selected) return;
  const id = selected.dataset.id;
  const commands = state.commandMode === 'slash' ? SLASH_COMMANDS : AT_COMMANDS;
  const cmd = commands.find(c => c.id === id);
  if (!cmd) return;

  if (cmd.action) {
    promptInput.value = '';
    promptInput.dispatchEvent(new Event('input'));
    if (cmd.action === 'openUpload') openDrawer('upload');
    else if (cmd.action === 'openSettings') openDrawer('settings');
    else if (cmd.action === 'enhance') handleQuickEnhance();
  } else if (cmd.prompt) {
    promptInput.value = cmd.prompt;
    promptInput.dispatchEvent(new Event('input'));
    promptInput.focus();
    promptInput.selectionStart = promptInput.selectionEnd = promptInput.value.length;
  } else if (cmd.insert) {
    const val = promptInput.value;
    const cursorPos = promptInput.selectionStart;
    const atStart = val.lastIndexOf('@', cursorPos - 1);
    const before = val.substring(0, atStart);
    const after = val.substring(cursorPos);
    promptInput.value = before + cmd.insert + (after ? ' ' + after.trimStart() : '');
    promptInput.dispatchEvent(new Event('input'));
    const newPos = before.length + cmd.insert.length;
    promptInput.selectionStart = promptInput.selectionEnd = newPos;
    promptInput.focus();
  }
  hideCommandPalette();
}

// --- External Gallery Templates (awesome-gpt-image-2) ---

const GALLERY_TEMPLATES = [
  // 产品营销
  { title: 'VR 产品爆炸图', category: '产品营销', img: 'https://cms-assets.youmind.com/media/1776658772018_lukyfw_HGSUfldbIAEiMWZ.jpg', prompt: 'High-tech exploded view diagram of a VR headset showing internal components with labeled callouts, promotional layout with header text area and footer specs, 3D render style on dark gradient background' },
  { title: '电商直播 UI', category: '产品营销', img: 'https://cms-assets.youmind.com/media/1776699445498_ga2ry5_HGO7H0DWkAApdKK.jpg', prompt: 'Realistic social media live stream interface mockup, portrait of a host with chat messages overlay, gift animations, product purchase card, viewer count, bottom action bar' },
  // 信息图
  { title: '城市美食地图', category: '信息图', img: 'https://cms-assets.youmind.com/media/1776662673014_nf0taw_HGRMNDybsAAGG88.jpg', prompt: 'Hand-drawn watercolor tourist food map of a city, bird-eye view, numbered food spots with small illustrations, landmarks, decorative border with legend, warm inviting colors' },
  { title: '进化阶梯信息图', category: '信息图', img: 'https://cms-assets.youmind.com/media/1776661968404_8a5flm_HGQc_KOaMAA2vt0.jpg', prompt: 'Realistic 3D stone staircase evolutionary timeline infographic, photorealistic organism renders on each step, sidebar legend, educational scientific illustration style' },
  { title: '日式解说图', category: '信息图', img: 'https://cms-assets.youmind.com/media/1776699414289_t6mebs_HGQQxukbUAA_qc0.jpg', prompt: 'Explanatory ponchi-e diagram fusing cute Irasutoya illustration aesthetic with dense Japanese government slide information style, colorful icons, flow arrows, structured layout' },
  // 人像摄影
  { title: '电影感人像', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612381174_enf5z4_HJEhzT-aoAAHCn4.jpg', prompt: 'Cinematic editorial portrait, photorealistic, detailed skin texture, Rembrandt lighting, full-frame camera 85mm f/1.4 shallow depth of field, Vogue magazine quality, natural expression' },
  { title: '金色时光人像', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612390736_m9vsd9_HJCp79tawAACpiz.jpg', prompt: 'Dreamy golden hour portrait, warm sunlight streaming through, pastel pink tones, film photography aesthetic, soft bokeh background, natural relaxed pose, Kodak Portra color science' },
  { title: '教室午后', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612373594_n41ee6_HI1uVLxW8AAHXqS.jpg', prompt: 'Cinematic moment of a student stretching in a classroom bathed in golden late afternoon light, dust particles in air, Kodak Portra 400 film stock, nostalgic warm tones' },
  { title: '樱花人像', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612391674_7p1vbp_HI7RTMVaAAA3Fmp.jpg', prompt: 'Romantic sunset portrait under cherry blossom trees, DSLR quality, soft pink petals falling, warm golden backlight, shallow depth of field, dreamy atmosphere' },
  { title: '高管商务照', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612366284_mc94ya_HJACiIWaEAEgFZR.jpg', prompt: 'Premium corporate executive headshot, Forbes/GQ style, luxury studio lighting, Italian suit, confident expression, shot on Hasselblad medium format, shallow DOF' },
  { title: '蓝调河畔人像', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612375008_x22rj7_HJArDWlbgAAz71F.jpg', prompt: 'Moody ultra-realistic portrait at a European riverside during blue hour, vintage lamp posts, city reflections in water, cinematic color grading, 35mm film look' },
  { title: '海边日落人像', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612375435_khrc4c_HJApVOUbMAES8O8.jpg', prompt: 'Cinematic seaside portrait at sunset with wind-blown hair, flying seagulls, red lens flare, film grain, warm golden tones, full-frame 85mm shallow DOF' },
  { title: '运动人像', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612352869_k2sbl4_HJAALj0bYAAiIRr.jpg', prompt: 'Dynamic sports action portrait with explosive energy, dramatic lighting, customized team jersey, mid-air pose, motion blur background, high-speed photography feel' },
  { title: '公园长椅人像', category: '人像摄影', img: 'https://cms-assets.youmind.com/media/1779612368728_mj9w4a_HI_D2bSa4AA4YVX.jpg', prompt: 'Photorealistic lifestyle portrait on a park bench with golden-hour light, creamy bokeh, 50mm f/1.8 look, natural candid expression, autumn leaves' },
  // 动漫风格
  { title: '动漫格斗场景', category: '动漫', img: 'https://cms-assets.youmind.com/media/1776756799880_c8u8w7_HGUKjjaasAAvVRa.jpg', prompt: 'Dynamic high-impact anime illustration of two fighters in a traditional dojo, elemental energy effects, speed lines, dramatic lighting, vibrant colors, manga action style' },
  { title: '赛博朋克动漫', category: '动漫', img: 'https://cms-assets.youmind.com/media/1779612423008_pqu2uu_HI-mKwNWQAAiVek.jpg', prompt: 'Polished anime cyberpunk character with braided hair, dragon embroidered bomber jacket, standing in a rainy neon-lit Korean alley, reflective wet ground, vibrant neon signs' },
  { title: '赛博紫辫人像', category: '动漫', img: 'https://cms-assets.youmind.com/media/1779612423123_goyupk_HI-l9njWEAAW6lZ.jpg', prompt: 'Ultra-detailed 3D realistic cyberpunk fashion portrait with long purple braids, wet neon alley, holographic accessories, rain droplets, volumetric lighting' },
  { title: '天使动漫', category: '动漫', img: 'https://cms-assets.youmind.com/media/1779612411698_jm1zql_HJCHYp0akAAleHS.jpg', prompt: 'Luminous fantasy anime illustration of a radiant angel blessing a kneeling figure in a celestial flower garden, ethereal light rays, soft pastel palette' },
  { title: '暗黑柴郡猫', category: '动漫', img: 'https://cms-assets.youmind.com/media/1779612409355_wi3svv_HJDnduPa4AAXEu4.jpg', prompt: 'Saturated dark-pop anime fantasy of a mischievous Cheshire Cat girl on a glowing enchanted forest branch, neon accents, magical particles, dramatic composition' },
  { title: '星空伞动漫', category: '动漫', img: 'https://cms-assets.youmind.com/media/1779612426037_ruad1b_HJCjy8obQAA5lzM.jpg', prompt: 'Dreamy blue-toned anime character under a transparent celestial umbrella with smartphone scan UI overlays, starry night, soft glow effects' },
  { title: '彩虹装饰卡', category: '动漫', img: 'https://cms-assets.youmind.com/media/1779612405099_gsstpk_HI-KNIQbQAAUD-n.jpg', prompt: 'Colorful kawaii decora-kei anime portrait inside a doodled pastel Polaroid-style photo-card frame, rainbow stickers, sparkles, cute accessories' },
  // 3D / 头像
  { title: '3D 卡通头像', category: '3D 头像', img: 'https://cms-assets.youmind.com/media/1779612364757_xthb1o_HI-W69jWcAA56ia.jpg', prompt: 'Pixar-style 3D caricature portrait, exaggerated proportions, oversized head, mischievous expression, polished CGI rendering, subsurface scattering on skin, studio lighting' },
  { title: '表情包贴纸', category: '3D 头像', img: 'https://cms-assets.youmind.com/media/1779612354243_9umx2d_HI-Qt_gboAAZhiy.jpg', prompt: '12-expression sticker pack in a 4x3 grid layout, cute character with die-cut white borders, various emotions (happy, sad, angry, surprised, sleepy, love), neutral background' },
  { title: '3D 家庭合照', category: '3D 头像', img: 'https://cms-assets.youmind.com/media/1779612374530_7r0tku_HI-MRPPacAAKDq3.jpg', prompt: 'High-end 3D animated family portrait, warm studio lighting, playful hand-drawn doodle overlays, elevated camera angle, Pixar-quality rendering, cheerful expressions' },
  // 社交媒体
  { title: '日式早餐平铺', category: '社交媒体', img: 'https://cms-assets.youmind.com/media/1779612400979_nz2tms_HJCkTh4bgAAPFjU.jpg', prompt: 'Overhead flat-lay of Japanese breakfast spread with handwritten diary-style annotations, warm morning light, wooden table, aesthetic food photography for lifestyle social media' },
  { title: '街拍时尚', category: '社交媒体', img: 'https://cms-assets.youmind.com/media/1779612412671_kb7tno_HJCevtZaUAAavE4.jpg', prompt: 'Candid street fashion portrait, morning light, documentary photography style, handheld 35mm camera feel, shallow depth of field, urban background with natural bokeh' },
  { title: '双胞胎对比图', category: '社交媒体', img: 'https://cms-assets.youmind.com/media/1779612420027_yb2e1q_HJChQcrbkAEjHeV.jpg', prompt: 'Vertical split-screen comparing a realistic café portrait with a matching anime version below, same composition and colors, photo-to-anime transformation showcase' },
  // 创意 / 超现实
  { title: '超现实漂浮人', category: '创意', img: 'https://cms-assets.youmind.com/media/1779612429175_dev69z_HJA2VB9bQAA-e0T.jpg', prompt: 'Hyper-realistic surreal art of a weightless male figure disintegrating into smoke and debris against teal-orange gradient background, dramatic lighting, fine art photography' },
  { title: '超现实图书馆', category: '创意', img: 'https://cms-assets.youmind.com/media/1779612367439_h5db7t_HI_o3PMagAAuFgM.jpg', prompt: 'Surreal library scene with floating pages and amber light, character shown from four different angles maintaining consistency, magical realism, warm tones' },
  // 照片修复 (with representative images)
  { title: '旧照修复', category: '照片修复', img: 'https://cms-assets.youmind.com/media/1779612378488_9o1fig_HJAz2OJXoAAmTwx.jpg', prompt: 'Faithfully restore this old photograph: fix scratches, remove stains, enhance clarity while preserving the original composition and identity of all subjects. Do not alter faces or add new elements. Conservative restoration only.' },
  { title: '模糊照片增强', category: '照片修复', img: 'https://cms-assets.youmind.com/media/1779612378603_grm1fd_HJAz2ONXwAAo3HK.jpg', prompt: 'Enhance this blurry photograph: sharpen details, improve clarity, correct exposure while maintaining natural look. Preserve all original elements, do not add or remove anything. Faithful enhancement only.' },
  // 电商
  { title: '办公穿搭展示', category: '电商', img: 'https://cms-assets.youmind.com/media/1779612411936_i9jtbn_HJBBxrfaoAAgvzC.jpg', prompt: 'Professional e-commerce fashion product photo, clean white background, studio lighting, model wearing office outfit, multiple angles, high-end commercial photography quality' },
  { title: '潜水装备插画', category: '电商', img: 'https://cms-assets.youmind.com/media/1779612383109_kidmem_HJCJRxvbcAAIUbU.jpg', prompt: 'Colorful product illustration for scuba diving equipment, character wearing full gear in coral reef setting, clean vector-style rendering, suitable for e-commerce listing' },
];

// --- Utilities ---

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(text) {
  return escapeHtml(text).replaceAll('\n', '&#10;');
}

// --- Init ---
checkHealth();
loadPresets();
