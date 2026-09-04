const $ = (id) => document.getElementById(id);

const BASE_PATH = new URL('.', location.href).pathname.replace(/\/$/, '');
function apiUrl(path) {
  return `${BASE_PATH}${path}`;
}
function toAppUrl(value) {
  const url = String(value || '');
  if (!url || url.startsWith('blob:') || /^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  return `${BASE_PATH}/${url.replace(/^\/+/, '')}`;
}

const promptInput = $('promptInput');
const submitBtn = $('submitBtn');
const composer = $('composer');
const conversationArea = $('conversationArea');
const welcomeSection = $('welcomeSection');
const resultsThread = $('resultsThread');
const statusDot = document.getElementById('statusDot');
const themeMenuItem = $('themeMenuItem');
const userAvatar = $('userAvatar');
const userAvatarText = $('userAvatarText');
const userMenu = $('userMenu');
const userMenuAvatar = $('userMenuAvatar');
const userMenuName = $('userMenuName');
const userMenuEmail = $('userMenuEmail');
const userMenuLogoutBtn = $('userMenuLogoutBtn');
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
const providerSelect = $('providerSelect');
const providerSummary = $('providerSummary');
const customProviderName = $('customProviderName');
const customProviderModel = $('customProviderModel');
const customProviderBaseUrl = $('customProviderBaseUrl');
const customProviderApiKey = $('customProviderApiKey');
const customProviderFallbackUrl = $('customProviderFallbackUrl');
const resetProviderFormBtn = $('resetProviderFormBtn');
const saveProviderBtn = $('saveProviderBtn');
const deleteProviderBtn = $('deleteProviderBtn');
const modelSelect = $('modelSelect');
const sizeSelect = $('sizeSelect');
const customSizeWrap = $('customSizeWrap');
const customSizeInput = $('customSizeInput');
const qualitySelect = $('qualitySelect');
const backgroundSelect = $('backgroundSelect');
const nInput = $('nInput');
const timeoutInput = $('timeoutInput');
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
const accountStatusCard = $('accountStatusCard');
const authForm = $('authForm');
const authNameInput = $('authNameInput');
const authEmailInput = $('authEmailInput');
const authPasswordInput = $('authPasswordInput');
const authSubmitBtn = $('authSubmitBtn');
const authResetBtn = $('authResetBtn');
const authLogoutBtn = $('authLogoutBtn');
const authMessage = $('authMessage');
const profileForm = $('profileForm');
const profileNameInput = $('profileNameInput');
const profileEmailInput = $('profileEmailInput');
const profileTeamInput = $('profileTeamInput');
const profileMessage = $('profileMessage');
const teamDrawerBody = $('teamDrawerBody');
const contactOutputDir = $('contactOutputDir');
const contactServiceUrl = $('contactServiceUrl');
const chatModeBtn = $('chatModeBtn');
const canvasModeBtn = $('canvasModeBtn');
const projectModeBtn = $('projectModeBtn');
const projectWorkspace = $('projectWorkspace');
const projectGeneratedGrid = $('projectGeneratedGrid');
const projectUploadsGrid = $('projectUploadsGrid');
const projectGeneratedCount = $('projectGeneratedCount');
const projectUploadsCount = $('projectUploadsCount');
const projectPreviewBackdrop = $('projectPreviewBackdrop');
const projectPreviewCloseBtn = $('projectPreviewCloseBtn');
const projectPreviewMedia = $('projectPreviewMedia');
const projectPreviewSource = $('projectPreviewSource');
const projectPreviewTitle = $('projectPreviewTitle');
const projectPreviewPrompt = $('projectPreviewPrompt');
const projectPreviewMeta = $('projectPreviewMeta');
const projectPreviewImportBtn = $('projectPreviewImportBtn');
const projectPreviewReferenceBtn = $('projectPreviewReferenceBtn');
const projectPreviewCopyPromptBtn = $('projectPreviewCopyPromptBtn');
const projectPreviewDownloadLink = $('projectPreviewDownloadLink');
const canvasWorkspace = $('canvasWorkspace');
const canvasStageWrap = $('canvasStageWrap');
const canvasStage = $('canvasStage');
const canvasConnections = $('canvasConnections');
const canvasEmpty = $('canvasEmpty');
const addCanvasTextBtn = $('addCanvasTextBtn');
const addCanvasTemplateBtn = $('addCanvasTemplateBtn');
const addCanvasOptimizeBtn = $('addCanvasOptimizeBtn');
const addCanvasImageBtn = $('addCanvasImageBtn');
const addCanvasParamsBtn = $('addCanvasParamsBtn');
const addCanvasGenerateBtn = $('addCanvasGenerateBtn');
const canvasImageInput = $('canvasImageInput');
const canvasFolderInput = $('canvasFolderInput');
const canvasAddNodeBtn = $('canvasAddNodeBtn');
const canvasImportOutputBtn = $('canvasImportOutputBtn');
const canvasImportMenu = $('canvasImportMenu');
const canvasZoomOutBtn = $('canvasZoomOutBtn');
const canvasZoomResetBtn = $('canvasZoomResetBtn');
const canvasZoomInBtn = $('canvasZoomInBtn');
const canvasAgentPanel = $('canvasAgentPanel');
const canvasAgentState = $('canvasAgentState');
const canvasAgentLog = $('canvasAgentLog');
const canvasAgentAssets = $('canvasAgentAssets');
const canvasAgentInput = $('canvasAgentInput');
const canvasAgentReferenceTile = $('canvasAgentReferenceTile');
const canvasAgentTemplateSelect = $('canvasAgentTemplateSelect');
const canvasAgentTemplatesBtn = $('canvasAgentTemplatesBtn');
const canvasAgentSizeSelect = $('canvasAgentSizeSelect');
const canvasAgentCountSelect = $('canvasAgentCountSelect');
const composerSizeSelect = $('composerSizeSelect');
const composerCountSelect = $('composerCountSelect');
const composerPlanBtn = $('composerPlanBtn');
const composerAddMenu = $('composerAddMenu');
const composerTemplateSelect = $('composerTemplateSelect');
const canvasAgentPlanBtn = $('canvasAgentPlanBtn');
const canvasAgentGenerateBtn = $('canvasAgentGenerateBtn');
const canvasAgentAddBtn = $('canvasAgentAddBtn');
const canvasAgentAddMenu = $('canvasAgentAddMenu');
const canvasAgentCollapseBtn = $('canvasAgentCollapseBtn');
const appToast = $('appToast');
const projectPickerBackdrop = $('projectPickerBackdrop');
const projectPickerCloseBtn = $('projectPickerCloseBtn');
const projectPickerBody = $('projectPickerBody');
const projectPickerFooter = $('projectPickerFooter');
const projectPickerCancelBtn = $('projectPickerCancelBtn');
const projectPickerConfirmBtn = $('projectPickerConfirmBtn');
const projectPickerSelectedCount = $('projectPickerSelectedCount');
const templatePickerBackdrop = $('templatePickerBackdrop');
const templatePickerCloseBtn = $('templatePickerCloseBtn');
const templatePickerBody = $('templatePickerBody');

const CUSTOM_PROVIDERS_KEY = 'imageProviders';
const SETTINGS_KEY = 'imageGenerationSettings';
const CANVAS_AGENT_COLLAPSED_KEY = 'canvasAgentCollapsed';
const PROJECT_VIEW_KEY = 'imageStudioProjectView';
const THEME_KEY = 'imageStudioTheme';
const IMAGE_SIZE_OPTIONS = [
  { value: '1536x1024', label: '1536 x 1024 - 3:2 横图' },
  { value: '1024x1536', label: '1024 x 1536 - 2:3 竖图' },
  { value: '1024x1024', label: '1024 x 1024 - 1:1 方图' },
  { value: '1280x720', label: '1280 x 720 - 16:9 横图 HD' },
  { value: '720x1280', label: '720 x 1280 - 9:16 竖图 HD' },
  { value: '1920x1080', label: '1920 x 1080 - 16:9 横图 FHD' },
  { value: '1080x1920', label: '1080 x 1920 - 9:16 竖图 FHD' },
  { value: '1600x900', label: '1600 x 900 - 16:9 横图' },
  { value: '900x1600', label: '900 x 1600 - 9:16 竖图' },
  { value: '1792x1024', label: '1792 x 1024 - 7:4 横图' },
  { value: '1024x1792', label: '1024 x 1792 - 4:7 竖图' },
  { value: '2048x1536', label: '2048 x 1536 - 4:3 横图 2K' },
  { value: '1536x2048', label: '1536 x 2048 - 3:4 竖图 2K' },
  { value: '2048x2048', label: '2048 x 2048 - 1:1 方图 2K' },
  { value: '2560x1440', label: '2560 x 1440 - 16:9 横图 2.5K' },
  { value: '1440x2560', label: '1440 x 2560 - 9:16 竖图 2.5K' },
  { value: '3840x2160', label: '3840 x 2160 - 16:9 横图 4K' },
  { value: '2160x3840', label: '2160 x 3840 - 9:16 竖图 4K' },
  { value: '4096x4096', label: '4096 x 4096 - 1:1 方图 4K' },
  { value: 'custom', label: '自定义尺寸' },
];
const CANVAS_AGENT_RATIO_OPTIONS = [
  { value: '1536x1024', label: '3:2 横图 · 1536' },
  { value: '1024x1536', label: '2:3 竖图 · 1536' },
  { value: '1024x1024', label: '1:1 方图 · 1024' },
  { value: '1280x720', label: '16:9 横图 · HD' },
  { value: '720x1280', label: '9:16 竖图 · HD' },
  { value: '1920x1080', label: '16:9 横图 · FHD' },
  { value: '1080x1920', label: '9:16 竖图 · FHD' },
  { value: '1600x900', label: '16:9 横图 · 1600' },
  { value: '900x1600', label: '9:16 竖图 · 1600' },
  { value: '1792x1024', label: '7:4 横图 · 1792' },
  { value: '1024x1792', label: '4:7 竖图 · 1792' },
  { value: '2048x1536', label: '4:3 横图 · 2K' },
  { value: '1536x2048', label: '3:4 竖图 · 2K' },
  { value: '2048x2048', label: '1:1 方图 · 2K' },
  { value: '2560x1440', label: '16:9 横图 · 2.5K' },
  { value: '1440x2560', label: '9:16 竖图 · 2.5K' },
  { value: '3840x2160', label: '16:9 横图 · 4K' },
  { value: '2160x3840', label: '9:16 竖图 · 4K' },
  { value: '4096x4096', label: '1:1 方图 · 4K' },
];
const CANVAS_NODE_MENU_OPTIONS = [
  { type: 'text', icon: 'T', title: '文本节点', desc: '普通文本、画面描述或局部要求' },
  { type: 'template', icon: 'M', title: '模板节点', desc: '从常用模板开始改 prompt' },
  { type: 'optimize', icon: 'W', title: 'Prompt 优化', desc: '接入文本后优化提示词' },
  { type: 'image', icon: 'I', title: '参考图节点', desc: '承载参考图、原图或风格图' },
  { type: 'params', icon: 'P', title: '参数/服务商', desc: '模型、尺寸、质量、超时等参数' },
  { type: 'generate', icon: 'G', title: '生成节点', desc: '汇总上游节点并发起生成' },
  { type: 'result', icon: 'R', title: '结果节点', desc: '承接生成输出并展示图片' },
];
const CANVAS_NODE_MIN_WIDTH = 220;
const CANVAS_NODE_MIN_HEIGHT = 128;
const CANVAS_NODE_DEFAULT_WIDTH = 260;
const CANVAS_NODE_DEFAULT_HEIGHT = 0;
const CANVAS_NODE_SNAP_THRESHOLD = 8;
const CANVAS_NODE_WORKSPACE_PADDING = 1200;
const CANVAS_EDGE_HIT_WIDTH = 34;
const CANVAS_EDGE_NEAR_THRESHOLD = 24;

const state = {
  isGenerating: false,
  activeDrawer: null,
  uploadedImages: [],
  uploadedMask: null,
  sessionUploads: [],
  imageThumbUrls: [],
  maskThumbUrls: [],
  sessionUploadThumbUrls: [],
  projectPickerThumbUrls: [],
  projectPickerAssets: [],
  projectPickerSelectedIds: new Set(),
  templatePickerTarget: 'chat',
  commandMode: null,
  commandIndex: -1,
  builtInProviders: [],
  customProviders: [],
  providers: [],
  editingProviderId: null,
  account: null,
  team: null,
  setupRequired: false,
  authenticated: false,
  theme: 'light',
  appMode: localStorage.getItem('imageStudioMode') || 'chat',
  projectView: localStorage.getItem(PROJECT_VIEW_KEY) || 'grid',
  projectPreview: null,
  projectPickerTarget: 'chat',
  projectMasonryTimer: null,
  composerAddPointerHandled: false,
  projectAssets: {
    outputsDir: '',
    generated: [],
    projects: [],
    loaded: false,
  },
  canvas: {
    nodes: [],
    edges: [],
    nodeSeq: 0,
    selectedNodeId: null,
    selectedEdgeKey: null,
    connectFromId: null,
    snapTargetId: null,
    pointer: null,
    pendingImageNodeId: null,
    dragToolType: null,
    nodeMenu: null,
    activeImage: null,
    quickEditPrompt: '',
    quickEditTool: '',
    quickEditOpen: false,
    objectUrls: [],
    viewport: { x: 0, y: 0, scale: 1 },
    agentCollapsed: localStorage.getItem(CANVAS_AGENT_COLLAPSED_KEY) === '1',
    lastAgentPrompt: '',
    lastAgentGenerateNodeId: null,
    agentMessages: [
      { kind: 'system', text: 'Agent 画布已就绪。描述想法或上传参考图后，可以拆成节点再生成。' },
    ],
  },
};

const preferredDarkScheme = window.matchMedia?.('(prefers-color-scheme: dark)');

// Auto-resize textarea
promptInput.addEventListener('input', () => {
  resizePromptInput();
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
if (preferredDarkScheme?.addEventListener) {
  preferredDarkScheme.addEventListener('change', handlePreferredThemeChange);
} else if (preferredDarkScheme?.addListener) {
  preferredDarkScheme.addListener(handlePreferredThemeChange);
}

chatModeBtn.addEventListener('click', () => setAppMode('chat'));
canvasModeBtn.addEventListener('click', () => setAppMode('canvas'));
projectModeBtn.addEventListener('click', () => setAppMode('project'));
document.querySelectorAll('[data-project-view]').forEach(btn => {
  btn.addEventListener('click', () => setProjectView(btn.dataset.projectView));
});
projectPreviewCloseBtn?.addEventListener('click', closeProjectPreview);
projectPreviewBackdrop?.addEventListener('click', (e) => {
  if (e.target === projectPreviewBackdrop) closeProjectPreview();
});
projectPickerCloseBtn?.addEventListener('click', closeProjectPicker);
projectPickerCancelBtn?.addEventListener('click', closeProjectPicker);
projectPickerConfirmBtn?.addEventListener('click', confirmProjectPickerSelection);
projectPickerBackdrop?.addEventListener('click', (e) => {
  if (e.target === projectPickerBackdrop) closeProjectPicker();
});
templatePickerCloseBtn?.addEventListener('click', closeTemplatePicker);
templatePickerBackdrop?.addEventListener('click', (e) => {
  if (e.target === templatePickerBackdrop) closeTemplatePicker();
});
projectPreviewImportBtn?.addEventListener('click', () => importProjectPreviewToCanvas(false));
projectPreviewReferenceBtn?.addEventListener('click', () => importProjectPreviewToCanvas(true));
projectPreviewCopyPromptBtn?.addEventListener('click', copyProjectPreviewPrompt);
userAvatar.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleUserMenu();
});
userMenu.querySelectorAll('[data-user-action]').forEach(btn => {
  btn.addEventListener('click', () => handleUserMenuAction(btn.dataset.userAction));
});
authForm.addEventListener('submit', handleAuthSubmit);
authResetBtn.addEventListener('click', handleAuthReset);
authLogoutBtn.addEventListener('click', handleLogout);
profileForm.addEventListener('submit', handleProfileSubmit);
document.querySelectorAll('[data-account-section]').forEach(btn => {
  btn.addEventListener('click', () => handleAccountSectionClick(btn));
});
document.querySelectorAll('[data-plan]').forEach(btn => {
  btn.addEventListener('click', () => handlePlanClick(btn.dataset.plan));
});
addCanvasTextBtn.addEventListener('click', () => addCanvasNode('text'));
addCanvasTemplateBtn.addEventListener('click', () => addCanvasNode('template'));
addCanvasOptimizeBtn.addEventListener('click', () => addCanvasNode('optimize'));
addCanvasImageBtn.addEventListener('click', () => addCanvasNode('image'));
addCanvasParamsBtn.addEventListener('click', () => addCanvasNode('params'));
addCanvasGenerateBtn.addEventListener('click', () => addCanvasNode('generate'));
document.querySelectorAll('[data-canvas-tool]').forEach(btn => {
  btn.addEventListener('dragstart', (e) => {
    state.canvas.dragToolType = btn.dataset.canvasTool;
    e.dataTransfer.setData('application/x-canvas-node', btn.dataset.canvasTool);
    e.dataTransfer.effectAllowed = 'copy';
  });
  btn.addEventListener('dragend', () => {
    setTimeout(() => {
      state.canvas.dragToolType = null;
    }, 0);
  });
});
canvasAddNodeBtn.addEventListener('click', () => openCanvasNodeMenuAtViewportCenter());
canvasImportOutputBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleCanvasImportMenu();
});
canvasImportMenu.addEventListener('click', handleCanvasImportMenuClick);
canvasZoomOutBtn.addEventListener('click', () => zoomCanvasBy(0.85, ...canvasZoomButtonOrigin()));
canvasZoomResetBtn.addEventListener('click', resetCanvasView);
canvasZoomInBtn.addEventListener('click', () => zoomCanvasBy(1.15, ...canvasZoomButtonOrigin()));
canvasAgentPlanBtn.addEventListener('click', () => planCanvasAgentPrompt());
canvasAgentGenerateBtn.addEventListener('click', () => runCanvasAgentGenerate());
canvasAgentReferenceTile.addEventListener('click', uploadCanvasImageFromAgent);
canvasAgentAddBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleCanvasAgentAddMenu();
});
canvasAgentAddMenu.addEventListener('click', handleCanvasAgentAddMenuClick);
canvasAgentCollapseBtn.addEventListener('click', () => {
  state.canvas.agentCollapsed = !state.canvas.agentCollapsed;
  localStorage.setItem(CANVAS_AGENT_COLLAPSED_KEY, state.canvas.agentCollapsed ? '1' : '0');
  renderCanvasAgent();
});
canvasAgentTemplatesBtn?.addEventListener('click', () => openTemplatePicker('canvas'));
canvasAgentTemplateSelect?.addEventListener('change', applyCanvasAgentTemplate);
canvasAgentSizeSelect.addEventListener('change', applyCanvasAgentSize);
canvasAgentCountSelect.addEventListener('change', applyCanvasAgentCount);
composerSizeSelect.addEventListener('change', () => applySharedSize(composerSizeSelect.value));
composerCountSelect.addEventListener('change', () => applySharedCount(composerCountSelect.value));
composerPlanBtn.addEventListener('click', () => enterCanvasFromChat(promptInput.value.trim(), { plan: true }));
composerAddMenu.addEventListener('click', handleComposerAddMenuClick);
composerTemplateSelect?.addEventListener('change', applyComposerTemplate);
setupComposerDropTarget();
canvasAgentInput.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    planCanvasAgentPrompt();
  }
});
canvasAgentInput.addEventListener('input', renderCanvasAgent);
canvasImageInput.addEventListener('change', handleCanvasImageSelection);
canvasFolderInput.addEventListener('change', handleCanvasFolderSelection);
document.addEventListener('click', closeCanvasAgentAddMenuFromDocument);
document.addEventListener('click', closeComposerAddMenuFromDocument);
document.addEventListener('click', closeCanvasImportMenuFromDocument);
document.addEventListener('pointerdown', handleComposerAddButtonPointer, true);
document.addEventListener('mousedown', handleComposerAddButtonPointer, true);
canvasStageWrap.addEventListener('dragover', (e) => {
  const types = Array.from(e.dataTransfer?.types || []);
  const hasImage = Array.from(e.dataTransfer?.items || []).some(item => item.type.startsWith('image/'));
  if (state.appMode === 'canvas' || types.includes('application/x-canvas-node') || hasImage) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }
});
canvasStageWrap.addEventListener('drop', handleCanvasDrop);
canvasStageWrap.addEventListener('dblclick', handleCanvasDoubleClick);
canvasStageWrap.addEventListener('wheel', handleCanvasWheel, { passive: false });
canvasStageWrap.addEventListener('pointerdown', startCanvasPan);
document.addEventListener('pointerdown', closeCanvasNodeMenuFromOutside);
document.addEventListener('pointerdown', closeUserMenuFromOutside);
document.addEventListener('pointermove', handleCanvasPointerMove);
document.addEventListener('pointerup', finishCanvasConnection);
document.addEventListener('pointercancel', finishCanvasConnection);
window.addEventListener('resize', renderCanvasConnections);
window.addEventListener('resize', scheduleProjectMasonryLayout);
window.addEventListener('resize', resizePromptInput);
window.addEventListener('resize', () => {
  if (composerAddMenu && !composerAddMenu.hidden) positionComposerAddMenu();
});

// Drawer management
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', closeDrawer);
});
overlayBackdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectPicker();
    closeTemplatePicker();
    if (state.projectPreview) closeProjectPreview();
    if (state.canvas.activeImage) exitCanvasImageEditing();
    if (state.canvas.selectedEdgeKey) {
      state.canvas.selectedEdgeKey = null;
      renderCanvasConnections();
    }
    closeCanvasAgentAddMenu();
    closeCanvasImportMenu();
    closeUserMenu();
    closeDrawer();
  }
  if (
    state.appMode === 'canvas' &&
    state.canvas.selectedEdgeKey &&
    (e.key === 'Backspace' || e.key === 'Delete') &&
    !isEditableTarget(e.target)
  ) {
    e.preventDefault();
    removeCanvasEdgeByKey(state.canvas.selectedEdgeKey);
  }
});

$('uploadToolBtn').addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
});
$('composerReferenceTile')?.addEventListener('click', () => pickChatReferenceImages());
$('templatesToolBtn').addEventListener('click', () => openTemplatePicker('chat'));
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

function toggleUserMenu() {
  userMenu.classList.toggle('open');
}

function closeUserMenu() {
  userMenu.classList.remove('open');
}

function closeUserMenuFromOutside(e) {
  if (!userMenu.classList.contains('open')) return;
  if (e.target.closest('#userMenu') || e.target.closest('#userAvatar')) return;
  closeUserMenu();
}

function handleUserMenuAction(action) {
  closeUserMenu();
  if (action === 'account') {
    renderAccountCenter();
    openDrawer('account');
    return;
  }
  if (action === 'upgrade') {
    openDrawer('upgrade');
    return;
  }
  if (action === 'guide') {
    window.open(toAppUrl('/guide.html'), '_blank', 'noopener');
    return;
  }
  if (action === 'contact') {
    renderContactDrawer();
    openDrawer('contact');
    return;
  }
  if (action === 'theme') {
    toggleTheme();
    return;
  }
  if (action === 'language') {
    showToast('当前已是简体中文。英文界面会在后续版本开放。');
    return;
  }
  if (action === 'team') {
    renderTeamDrawer();
    openDrawer('team');
    return;
  }
  if (action === 'about') {
    renderContactDrawer();
    openDrawer('contact');
    showToast('Image Studio 本地版：生成、画布、项目素材和轻量账户已启用。');
    return;
  }
  if (action === 'logout') {
    handleLogout();
  }
}

function showToast(message, kind = '') {
  if (!appToast) return;
  window.clearTimeout(showToast.timer);
  appToast.textContent = message || '';
  appToast.classList.toggle('error', kind === 'error');
  appToast.classList.toggle('success', kind === 'success');
  appToast.classList.add('visible');
  showToast.timer = window.setTimeout(() => {
    appToast.classList.remove('visible', 'error', 'success');
  }, 2600);
}

async function loadAccountState() {
  try {
    const res = await fetch(apiUrl('/api/account'));
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || '账户状态读取失败');
    state.account = data.account || null;
    state.team = data.team || null;
    state.setupRequired = Boolean(data.setupRequired);
    state.authenticated = Boolean(data.authenticated);
  } catch (_error) {
    state.account = null;
    state.team = null;
    state.setupRequired = false;
    state.authenticated = false;
  }
  renderUserIdentity();
  renderAccountCenter();
  renderTeamDrawer();
}

function renderUserIdentity() {
  const account = state.account;
  const name = account?.name || 'LemonGir Canvas';
  const email = account?.email || (state.setupRequired ? '首次使用，请创建本地账户' : '未登录');
  const avatar = account?.avatarText || 'IS';
  userMenuAvatar.textContent = avatar;
  userMenuName.textContent = name;
  userMenuEmail.textContent = email;
  userAvatarText.textContent = avatar;
  userAvatarText.hidden = !state.authenticated;
  userAvatar.querySelector('svg').hidden = state.authenticated;
  userAvatar.classList.toggle('logged-in', state.authenticated);
  userMenuLogoutBtn.hidden = !state.authenticated;
  userMenuLogoutBtn.previousElementSibling.hidden = !state.authenticated;
}

function renderAccountCenter() {
  const account = state.account;
  const isAuthed = state.authenticated && account;
  accountStatusCard.innerHTML = isAuthed
    ? `<div class="account-status-avatar">${escapeHtml(account.avatarText || 'IS')}</div><div><strong>${escapeHtml(account.name)}</strong><span>${escapeHtml(account.email)} · ${escapeHtml(account.role || 'Owner')}</span></div>`
    : `<div class="account-status-avatar muted">IS</div><div><strong>${state.setupRequired ? '创建本地账户' : '登录本地账户'}</strong><span>${state.setupRequired ? '首次使用会在本机保存账号资料' : '登录后可管理账户和团队资料'}</span></div>`;
  authNameInput.closest('.setting-field').style.display = state.setupRequired ? 'grid' : 'none';
  authEmailInput.closest('.setting-field').style.display = isAuthed ? 'none' : 'grid';
  authPasswordInput.closest('.setting-field').style.display = isAuthed ? 'none' : 'grid';
  authNameInput.value = account?.name || authNameInput.value || 'LemonGir Canvas';
  authEmailInput.value = account?.email || authEmailInput.value || 'local@image.studio';
  authPasswordInput.value = '';
  authSubmitBtn.textContent = state.setupRequired ? '创建并登录' : '登录';
  authSubmitBtn.hidden = isAuthed;
  authForm.hidden = false;
  authResetBtn.hidden = isAuthed || state.setupRequired;
  authLogoutBtn.hidden = !isAuthed;
  profileForm.hidden = !isAuthed;
  if (isAuthed) {
    profileNameInput.value = account.name || '';
    profileEmailInput.value = account.email || '';
    profileTeamInput.value = state.team?.name || 'LemonGir Canvas';
  }
}

async function handleAuthReset() {
  if (!window.confirm('确定要重置本地账户吗？这只会删除本机登录资料，不会删除服务商配置、输出图片和项目文件。')) return;
  setAccountMessage(authMessage, '正在重置本地账户...', '');
  try {
    const res = await fetch(apiUrl('/api/account/reset'), { method: 'POST' });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || '重置失败');
    state.account = null;
    state.team = null;
    state.setupRequired = true;
    state.authenticated = false;
    authNameInput.value = 'LemonGir Canvas';
    authEmailInput.value = 'local@image.studio';
    authPasswordInput.value = '';
    setAccountMessage(authMessage, '已重置。现在可以创建新的本地账户。', 'success');
    renderUserIdentity();
    renderAccountCenter();
    renderTeamDrawer();
    showToast('本地账户已重置，可以重新创建。', 'success');
  } catch (error) {
    setAccountMessage(authMessage, error.message, 'error');
    showToast(error.message, 'error');
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  setAccountMessage(authMessage, '处理中...', '');
  const endpoint = state.setupRequired ? '/api/account/setup' : '/api/account/login';
  const wasSetupRequired = state.setupRequired;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: authNameInput.value,
        email: authEmailInput.value,
        password: authPasswordInput.value,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || '登录失败');
    state.account = data.account || null;
    state.team = data.team || null;
    state.setupRequired = false;
    state.authenticated = true;
    setAccountMessage(authMessage, '已登录', 'success');
    renderUserIdentity();
    renderAccountCenter();
    renderTeamDrawer();
    showToast(wasSetupRequired ? '本地账户已创建并登录。' : '已登录。', 'success');
  } catch (error) {
    setAccountMessage(authMessage, error.message, 'error');
    showToast(error.message, 'error');
  }
}

async function handleLogout() {
  try {
    await fetch(apiUrl('/api/account/logout'), { method: 'POST' });
  } catch (_error) {
    // Local logout should still clear the UI if the server is unreachable.
  }
  state.account = null;
  state.team = null;
  state.authenticated = false;
  await loadAccountState();
  renderAccountCenter();
  openDrawer('account');
  showToast('已退出登录。');
}

async function handleProfileSubmit(e) {
  e.preventDefault();
  setAccountMessage(profileMessage, '保存中...', '');
  try {
    const res = await fetch(apiUrl('/api/account/profile'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profileNameInput.value,
        email: profileEmailInput.value,
        teamName: profileTeamInput.value,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || '保存失败');
    state.account = data.account || state.account;
    state.team = data.team || state.team;
    setAccountMessage(profileMessage, '已保存', 'success');
    renderUserIdentity();
    renderAccountCenter();
    renderTeamDrawer();
    showToast('账户资料已保存。', 'success');
  } catch (error) {
    setAccountMessage(profileMessage, error.message, 'error');
    showToast(error.message, 'error');
  }
}

function handleAccountSectionClick(btn) {
  document.querySelectorAll('[data-account-section]').forEach(item => {
    item.classList.toggle('active', item === btn);
  });
  const section = btn.dataset.accountSection;
  if (section === 'profile') {
    showToast('正在查看个人主页。');
    return;
  }
  if (section === 'subscription') {
    openDrawer('upgrade');
    showToast('订阅管理已并入升级页。');
    return;
  }
  if (section === 'billing') {
    showToast('本地版还没有接入支付账单。上线接入 Stripe 或 Lemon Squeezy 后可在这里查看。');
  }
}

function handlePlanClick(plan) {
  showToast(`${plan || '套餐'} 已选择。本地版暂未接入支付，后续可绑定真实收款服务。`);
}

function renderTeamDrawer() {
  if (!teamDrawerBody) return;
  if (!state.authenticated || !state.team) {
    teamDrawerBody.innerHTML = `<div class="account-empty"><strong>还没有团队空间</strong><p>登录或创建本地账户后，会自动生成一个轻量团队空间，用于后续项目协作入口。</p><button type="button" class="btn-primary" data-open-account>登录账户</button></div>`;
    teamDrawerBody.querySelector('[data-open-account]')?.addEventListener('click', () => {
      renderAccountCenter();
      openDrawer('account');
    });
    return;
  }
  const members = state.team.members || [];
  teamDrawerBody.innerHTML = `
    <div class="team-summary-card">
      <span>团队空间</span>
      <strong>${escapeHtml(state.team.name || 'LemonGir Canvas')}</strong>
      <p>${escapeHtml(state.team.plan || 'Local')} · ${members.length || 1} 位成员</p>
    </div>
    <div class="team-member-list">
      ${members.map(member => `<div class="team-member"><div class="team-member-avatar">${escapeHtml(initialsFromText(member.name || member.email))}</div><div><strong>${escapeHtml(member.name || 'Member')}</strong><span>${escapeHtml(member.email || '')}</span></div><em>${escapeHtml(member.role || 'Member')}</em></div>`).join('')}
    </div>
  `;
}

function renderContactDrawer() {
  contactServiceUrl.textContent = location.origin;
  contactOutputDir.textContent = state.projectAssets.outputsDir || '读取中...';
  fetch(apiUrl('/api/health'))
    .then(res => res.json())
    .then(data => {
      if (data.outputsDir) contactOutputDir.textContent = data.outputsDir;
    })
    .catch(() => {
      contactOutputDir.textContent = '读取失败';
    });
}

function setAccountMessage(el, text, kind) {
  el.textContent = text || '';
  el.classList.toggle('error', kind === 'error');
  el.classList.toggle('success', kind === 'success');
}

function loadThemePreference() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme = storedTheme === 'dark' || storedTheme === 'light'
    ? storedTheme
    : (preferredDarkScheme?.matches ? 'dark' : 'light');
  applyTheme(initialTheme);
}

function applyTheme(theme, persist = false) {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  state.theme = nextTheme;
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  if (themeMenuItem) themeMenuItem.textContent = nextTheme === 'dark' ? '浅色模式' : '深色模式';
  if (persist) localStorage.setItem(THEME_KEY, nextTheme);
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark', true);
}

function handlePreferredThemeChange(event) {
  if (localStorage.getItem(THEME_KEY)) return;
  applyTheme(event.matches ? 'dark' : 'light');
}

function initialsFromText(value) {
  const text = String(value || 'IS').trim();
  const ascii = text.match(/[a-z0-9]/ig)?.slice(0, 2).join('') || '';
  return (ascii || text.slice(0, 2)).toUpperCase();
}

// --- Canvas Mode ---

function setAppMode(mode) {
  state.appMode = ['chat', 'canvas', 'project'].includes(mode) ? mode : 'chat';
  localStorage.setItem('imageStudioMode', state.appMode);
  document.body.classList.toggle('chat-mode', state.appMode === 'chat');
  document.body.classList.toggle('canvas-mode', state.appMode === 'canvas');
  document.body.classList.toggle('project-mode', state.appMode === 'project');
  chatModeBtn.classList.toggle('active', state.appMode === 'chat');
  canvasModeBtn.classList.toggle('active', state.appMode === 'canvas');
  projectModeBtn.classList.toggle('active', state.appMode === 'project');
  renderCanvasViewport();
  renderCanvasConnections();
  renderCanvasAgent();
  if (state.appMode === 'project') loadProjectAssets({ force: true });
}

function addSessionUploads(files = []) {
  const images = files.filter(file => file?.type?.startsWith('image/'));
  if (!images.length) return;
  const seen = new Set(state.sessionUploads.map(file => sessionFileKey(file)));
  const merged = state.sessionUploads.slice();
  images.forEach(file => {
    const key = sessionFileKey(file);
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(file);
  });
  state.sessionUploads = merged;
  if (state.appMode === 'project') renderProjectAssets();
}

function sessionFileKey(file) {
  return [file.name || '', file.size || 0, file.lastModified || 0].join(':');
}

function addCanvasNode(type, overrides = {}) {
  const id = overrides.id || `node_${++state.canvas.nodeSeq}`;
  const defaults = {
    text: { title: '文本', text: '' },
    template: { title: '模板', templateIndex: 0, prompt: GALLERY_TEMPLATES[0]?.prompt || '' },
    optimize: { title: 'Prompt 优化', style: '', constraints: '', output: '', status: '' },
    image: { title: '参考图', files: [], urls: [] },
    params: {
      title: '参数/服务商',
      collapsed: true,
      provider: providerSelect.value || 'figure',
      model: modelSelect.value || 'gpt-image-2',
      size: getSelectedSize(),
      sizePreset: getCanvasSizePresetValue(getSelectedSize()),
      customSize: IMAGE_SIZE_OPTIONS.some(option => option.value === getSelectedSize()) ? '' : getSelectedSize(),
      quality: qualitySelect.value,
      background: backgroundSelect.value,
      n: nInput.value,
      timeout: timeoutInput.value || '600',
    },
    generate: { title: '生成', status: '' },
    result: { title: '结果', files: [], status: '' },
  }[type];
  if (!defaults) throw new Error(`Unknown canvas node type: ${type}`);
  const offset = state.canvas.nodes.length * 24;
  const node = {
    id,
    type,
    x: overrides.x ?? 120 + offset,
    y: overrides.y ?? 120 + offset,
    width: overrides.width ?? (type === 'result' ? 360 : CANVAS_NODE_DEFAULT_WIDTH),
    height: overrides.height ?? CANVAS_NODE_DEFAULT_HEIGHT,
    ...defaults,
    ...overrides,
  };
  state.canvas.nodes.push(node);
  state.canvas.selectedNodeId = id;
  renderCanvas();
  return node;
}

function renderCanvas() {
  canvasEmpty.style.display = state.canvas.nodes.length ? 'none' : 'flex';
  canvasStage.querySelectorAll('.canvas-node').forEach(node => node.remove());
  clearCanvasGuides();
  canvasStageWrap.querySelector('.canvas-floating-editor')?.remove();
  state.canvas.nodes.forEach(node => canvasStage.appendChild(createCanvasNodeElement(node)));
  if (state.canvas.nodeMenu) renderCanvasNodeMenu();
  renderCanvasFloatingEditor();
  renderCanvasAgent();
  renderCanvasViewport();
  renderCanvasConnections();
}

function renderCanvasAgent() {
  if (!canvasAgentPanel) return;
  const messages = state.canvas.agentMessages.slice(-9);
  canvasWorkspace.classList.toggle('agent-collapsed', state.canvas.agentCollapsed);
  canvasAgentPanel.classList.toggle('collapsed', state.canvas.agentCollapsed);
  canvasAgentCollapseBtn.setAttribute('aria-expanded', String(!state.canvas.agentCollapsed));
  canvasAgentCollapseBtn.setAttribute('aria-label', state.canvas.agentCollapsed ? '展开 Agent 画布' : '收起 Agent 画布');
  canvasAgentCollapseBtn.title = state.canvas.agentCollapsed ? '展开 Agent 画布' : '收起 Agent 画布';
  canvasAgentState.textContent = state.isGenerating ? '生成中' : `${state.canvas.nodes.length} 节点`;
  canvasAgentState.classList.toggle('loading', state.isGenerating);
  canvasAgentLog.innerHTML = messages.map(message => `
    <div class="canvas-agent-message ${escapeAttr(message.kind || 'info')}">
      <span>${escapeHtml(canvasAgentMessageLabel(message.kind))}</span>
      <p>${escapeHtml(message.text)}</p>
    </div>
  `).join('');
  renderCanvasAgentAssets();
  renderCanvasAgentReferenceTile();
  syncCanvasAgentControls();

  const hasPrompt = Boolean(canvasAgentInput.value.trim());
  const hasGenerateNode = state.canvas.nodes.some(node => node.type === 'generate');
  canvasAgentPlanBtn.disabled = state.isGenerating;
  canvasAgentAddBtn.disabled = state.isGenerating;
  if (state.isGenerating) closeCanvasAgentAddMenu();
  canvasAgentGenerateBtn.disabled = state.isGenerating || (!hasGenerateNode && !hasPrompt);
}

function canvasAgentMessageLabel(kind) {
  return {
    system: '系统',
    info: '信息',
    success: '完成',
    warning: '提示',
    error: '错误',
  }[kind] || '信息';
}

function pushCanvasAgentMessage(kind, text) {
  state.canvas.agentMessages.push({ kind, text });
  if (state.canvas.agentMessages.length > 24) {
    state.canvas.agentMessages = state.canvas.agentMessages.slice(-24);
  }
  renderCanvasAgent();
}

function toggleCanvasImportMenu(forceOpen) {
  if (canvasImportOutputBtn.disabled) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : canvasImportMenu.hidden;
  canvasImportMenu.hidden = !shouldOpen;
  canvasImportOutputBtn.setAttribute('aria-expanded', String(shouldOpen));
}

function closeCanvasImportMenu() {
  if (!canvasImportMenu || canvasImportMenu.hidden) return;
  canvasImportMenu.hidden = true;
  canvasImportOutputBtn.setAttribute('aria-expanded', 'false');
}

function closeCanvasImportMenuFromDocument(e) {
  if (canvasImportMenu.hidden) return;
  if (e.target.closest('.canvas-import-wrap')) return;
  closeCanvasImportMenu();
}

async function handleCanvasImportMenuClick(e) {
  e.stopPropagation();
  const actionBtn = e.target.closest('[data-canvas-import]');
  if (!actionBtn) return;
  const action = actionBtn.dataset.canvasImport;
  closeCanvasImportMenu();

  if (action === 'file') {
    state.canvas.pendingImageNodeId = null;
    canvasImageInput.click();
    return;
  }
  if (action === 'folder') {
    canvasFolderInput.click();
    return;
  }
  if (action === 'project') {
    await openProjectPicker('canvas');
  }
}

function toggleCanvasAgentAddMenu(forceOpen) {
  if (canvasAgentAddBtn.disabled) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : canvasAgentAddMenu.hidden;
  canvasAgentAddMenu.hidden = !shouldOpen;
  canvasAgentAddBtn.setAttribute('aria-expanded', String(shouldOpen));
}

function closeCanvasAgentAddMenu() {
  if (!canvasAgentAddMenu || canvasAgentAddMenu.hidden) return;
  canvasAgentAddMenu.hidden = true;
  canvasAgentAddBtn.setAttribute('aria-expanded', 'false');
}

function closeCanvasAgentAddMenuFromDocument(e) {
  if (canvasAgentAddMenu.hidden) return;
  if (e.target.closest('.canvas-agent-add-menu-wrap')) return;
  closeCanvasAgentAddMenu();
}

function toggleComposerAddMenu(forceOpen) {
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : composerAddMenu.hidden;
  if (shouldOpen && composerAddMenu.parentElement !== document.body) {
    document.body.appendChild(composerAddMenu);
  }
  composerAddMenu.hidden = !shouldOpen;
  $('uploadToolBtn').setAttribute('aria-expanded', String(shouldOpen));
  if (shouldOpen) positionComposerAddMenu();
  else resetComposerAddMenuPosition();
}

function closeComposerAddMenu() {
  if (!composerAddMenu || composerAddMenu.hidden) return;
  composerAddMenu.hidden = true;
  $('uploadToolBtn').setAttribute('aria-expanded', 'false');
  resetComposerAddMenuPosition();
}

function closeComposerAddMenuFromDocument(e) {
  if (!composerAddMenu || composerAddMenu.hidden) return;
  if (e.target.closest('.composer-add-menu-wrap') || e.target.closest('#composerAddMenu')) return;
  closeComposerAddMenu();
}

function handleComposerAddButtonPointer(e) {
  const button = e.target.closest?.('#uploadToolBtn');
  if (!button) return;
  if (e.type === 'mousedown' && state.composerAddPointerHandled) {
    state.composerAddPointerHandled = false;
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  state.composerAddPointerHandled = e.type === 'pointerdown';
  e.preventDefault();
  e.stopPropagation();
  toggleComposerAddMenu();
}

function positionComposerAddMenu() {
  const button = $('uploadToolBtn');
  if (!button || !composerAddMenu) return;
  const buttonRect = button.getBoundingClientRect();
  const menuRect = composerAddMenu.getBoundingClientRect();
  const margin = 10;
  const viewportPadding = 12;
  const left = Math.max(
    viewportPadding,
    Math.min(window.innerWidth - menuRect.width - viewportPadding, buttonRect.left)
  );
  const top = Math.max(viewportPadding, buttonRect.top - menuRect.height - margin);
  composerAddMenu.style.left = `${Math.round(left)}px`;
  composerAddMenu.style.top = `${Math.round(top)}px`;
}

function resetComposerAddMenuPosition() {
  if (!composerAddMenu) return;
  composerAddMenu.style.left = '';
  composerAddMenu.style.top = '';
}

async function handleCanvasAgentAddMenuClick(e) {
  e.stopPropagation();
  const actionBtn = e.target.closest('[data-agent-add]');
  if (!actionBtn) return;

  const action = actionBtn.dataset.agentAdd;
  closeCanvasAgentAddMenu();
  await handleAgentAddAction(action);
}

async function handleComposerAddMenuClick(e) {
  e.stopPropagation();
  const actionBtn = e.target.closest('[data-agent-add]');
  if (!actionBtn) return;
  closeComposerAddMenu();
  await handleComposerAddAction(actionBtn.dataset.agentAdd);
}

async function handleComposerAddAction(action) {
  if (action === 'image') {
    pickChatReferenceImages();
    return;
  }
  if (action === 'folder') {
    pushCanvasAgentMessage('info', '选择文件夹后，会把里面的图片批量放进一个参考图节点。');
    setAppMode('canvas');
    canvasFolderInput.click();
    return;
  }
  if (action === 'assets') {
    await openProjectPicker('chat');
  }
}

function pickChatReferenceImages() {
  imagesInput.click();
}

async function handleAgentAddAction(action) {
  if (action === 'image') {
    uploadCanvasImageFromAgent();
    return;
  }
  if (action === 'folder') {
    pushCanvasAgentMessage('info', '选择文件夹后，会把里面的图片批量放进一个参考图节点。');
    setAppMode('canvas');
    canvasFolderInput.click();
    return;
  }
  if (action === 'assets') {
    await openProjectPicker('canvas');
  }
}

function uploadCanvasImageFromAgent() {
  const point = getCanvasAgentSpawnPoint();
  const node = addCanvasNode('image', {
    x: point.x,
    y: point.y,
    title: '参考图',
  });
  state.canvas.pendingImageNodeId = node.id;
  pushCanvasAgentMessage('info', '选择图片后会放入新的参考图节点。');
  canvasImageInput.click();
}

function renderCanvasAgentAssets() {
  const items = getCanvasResultAssets().slice(0, 8);
  if (!items.length) {
    canvasAgentAssets.hidden = true;
    canvasAgentAssets.innerHTML = '';
    return;
  }
  canvasAgentAssets.hidden = false;
  canvasAgentAssets.innerHTML = `
    <div class="canvas-agent-assets-title">结果图</div>
    <div class="canvas-agent-asset-grid">
      ${items.map(item => {
        const active = state.canvas.activeImage?.nodeId === item.nodeId && Number(state.canvas.activeImage?.fileIndex) === item.fileIndex;
        return `<button type="button" class="canvas-agent-asset${active ? ' active' : ''}" data-agent-asset-node="${escapeAttr(item.nodeId)}" data-agent-asset-index="${item.fileIndex}" title="${escapeAttr(item.file.name || '结果图')}">
          <img src="${escapeAttr(toAppUrl(item.file.url))}" alt="${escapeAttr(item.file.name || '结果图')}" />
        </button>`;
      }).join('')}
    </div>
  `;
  canvasAgentAssets.querySelectorAll('[data-agent-asset-node]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectCanvasResultImage(btn.dataset.agentAssetNode, btn.dataset.agentAssetIndex);
      pushCanvasAgentMessage('info', '已选中结果图，可在图片上方工具栏编辑，也可以在结果节点中转为参考图。');
    });
  });
}

function renderCanvasAgentReferenceTile() {
  const imageNode = [...state.canvas.nodes].reverse().find(node => node.type === 'image' && node.urls?.length);
  const total = imageNode?.urls?.length || 0;
  const url = imageNode?.urls?.[0] || '';
  canvasAgentReferenceTile.classList.toggle('has-image', Boolean(url));
  if (!url) {
    canvasAgentReferenceTile.innerHTML = `
      <span class="canvas-agent-ref-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      </span>
      <span class="canvas-agent-ref-label">参考图</span>
    `;
    return;
  }
  canvasAgentReferenceTile.innerHTML = `
    <img src="${escapeAttr(url)}" alt="参考图" />
    <span class="canvas-agent-ref-label">${total} 张参考图</span>
  `;
}

function renderCanvasAgentControls() {
  const templateOptions = '<option value="">模板</option>' + GALLERY_TEMPLATES.map((template, index) => (
    `<option value="${index}">${escapeHtml(template.category)} · ${escapeHtml(template.title)}</option>`
  )).join('');
  if (canvasAgentTemplateSelect) canvasAgentTemplateSelect.innerHTML = templateOptions;
  if (composerTemplateSelect) composerTemplateSelect.innerHTML = templateOptions;
  const ratioOptions = CANVAS_AGENT_RATIO_OPTIONS.map(option => (
    `<option value="${escapeAttr(option.value)}">${escapeHtml(option.label)}</option>`
  )).join('');
  canvasAgentSizeSelect.innerHTML = ratioOptions;
  composerSizeSelect.innerHTML = ratioOptions;
  syncCanvasAgentControls();
}

function syncCanvasAgentControls() {
  if (!canvasAgentSizeSelect.options.length) return;
  const size = getSelectedSize();
  const sizeOption = Array.from(canvasAgentSizeSelect.options).find(option => option.value === size)
    || Array.from(canvasAgentSizeSelect.options).find(option => option.value === '1536x1024')
    || canvasAgentSizeSelect.options[0];
  canvasAgentSizeSelect.value = sizeOption.value;
  if (composerSizeSelect.options.length) composerSizeSelect.value = sizeOption.value;
  const count = String(clampInputValue(nInput.value, 1, 4, 1));
  canvasAgentCountSelect.value = count;
  composerCountSelect.value = count;
}

function applyCanvasAgentTemplate() {
  if (!canvasAgentTemplateSelect) return;
  const template = GALLERY_TEMPLATES[Number(canvasAgentTemplateSelect.value)];
  if (!template) return;
  applyTemplateToTarget(template, 'canvas');
  canvasAgentTemplateSelect.value = '';
  closeCanvasAgentAddMenu();
}

function applyComposerTemplate() {
  if (!composerTemplateSelect) return;
  const template = GALLERY_TEMPLATES[Number(composerTemplateSelect.value)];
  if (!template) return;
  applyTemplateToTarget(template, 'chat');
  composerTemplateSelect.value = '';
  closeComposerAddMenu();
}

function openTemplatePicker(target = state.appMode === 'canvas' ? 'canvas' : 'chat') {
  if (!templatePickerBackdrop || !templatePickerBody) return;
  state.templatePickerTarget = target === 'canvas' ? 'canvas' : 'chat';
  closeComposerAddMenu();
  closeCanvasAgentAddMenu();
  renderTemplatePicker();
  templatePickerBackdrop.hidden = false;
}

function closeTemplatePicker() {
  if (!templatePickerBackdrop) return;
  templatePickerBackdrop.hidden = true;
  if (templatePickerBody) templatePickerBody.innerHTML = '';
}

function renderTemplatePicker() {
  if (!templatePickerBody) return;
  const categories = [...new Set(GALLERY_TEMPLATES.map(template => template.category || '通用'))];
  templatePickerBody.innerHTML = categories.map(category => {
    const items = GALLERY_TEMPLATES
      .map((template, index) => ({ ...template, index }))
      .filter(template => (template.category || '通用') === category);
    return `<section class="template-picker-section">
      <div class="template-picker-section-head">
        <h4>${escapeHtml(category)}</h4>
        <span>${items.length}</span>
      </div>
      <div class="template-picker-grid">
        ${items.map(template => renderTemplatePickerItem(template)).join('')}
      </div>
    </section>`;
  }).join('');
  templatePickerBody.querySelectorAll('[data-template-picker-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const template = GALLERY_TEMPLATES[Number(btn.dataset.templatePickerIndex)];
      if (!template) return;
      applyTemplateToTarget(template, state.templatePickerTarget);
      closeTemplatePicker();
    });
  });
}

function renderTemplatePickerItem(template) {
  return `<button type="button" class="template-picker-item" data-template-picker-index="${template.index}">
    <img src="${escapeAttr(template.img || '')}" alt="${escapeAttr(template.title || '模板')}" loading="lazy" />
    <span>
      <strong>${escapeHtml(template.title || '未命名模板')}</strong>
      <small>${escapeHtml(summarizeText(template.prompt || '', 34))}</small>
    </span>
  </button>`;
}

function applyTemplateToTarget(template, target = 'chat') {
  const prompt = template?.prompt || '';
  if (target === 'canvas') {
    canvasAgentInput.value = prompt;
    canvasAgentInput.dispatchEvent(new Event('input'));
    canvasAgentInput.focus();
    pushCanvasAgentMessage('info', `已套用模板：${template.title || '模板'}`);
    return;
  }
  promptInput.value = prompt;
  promptInput.dispatchEvent(new Event('input'));
  promptInput.focus();
}

function applyCanvasAgentSize() {
  applySharedSize(canvasAgentSizeSelect.value);
}

function applySharedSize(size) {
  if (!size) return;
  const existing = Array.from(sizeSelect.options).some(option => option.value === size);
  if (existing) {
    sizeSelect.value = size;
    customSizeInput.value = '';
  } else {
    sizeSelect.value = 'custom';
    customSizeInput.value = size;
  }
  updateCustomSizeVisibility();
  saveGenerationSettings();
}

function applyCanvasAgentCount() {
  applySharedCount(canvasAgentCountSelect.value);
}

function applySharedCount(value) {
  nInput.value = clampInputValue(value, 1, 4, 1);
  saveGenerationSettings();
}

function getCanvasResultAssets() {
  const assets = [];
  state.canvas.nodes.forEach(node => {
    if (node.type !== 'result') return;
    (node.files || []).forEach((file, fileIndex) => {
      if (file?.url) assets.push({ nodeId: node.id, fileIndex, file, node });
    });
  });
  return assets.reverse();
}

async function planCanvasAgentPrompt(options = {}) {
  const text = canvasAgentInput.value.trim() || promptInput.value.trim();
  if (!text) {
    pushCanvasAgentMessage('warning', '先在右侧输入一个创作需求，再拆成节点。');
    canvasAgentInput.focus();
    return null;
  }

  setAppMode('canvas');
  const point = getCanvasAgentSpawnPoint();
  const textNode = addCanvasNode('text', {
    x: point.x,
    y: point.y,
    title: 'Agent 文本',
    text,
  });
  const paramsNode = addCanvasNode('params', {
    x: point.x,
    y: point.y + 210,
    collapsed: true,
  });
  const generateNode = addCanvasNode('generate', {
    x: point.x + 350,
    y: point.y + 110,
    title: 'Agent 生成',
  });
  connectCanvasNodes(textNode.id, generateNode.id);
  connectCanvasNodes(paramsNode.id, generateNode.id);

  const explicitImageNode = getCanvasNode(options.imageNodeId);
  const selectedImageNode = options.skipImplicitImage ? null : getCanvasNode(state.canvas.selectedNodeId);
  if (explicitImageNode?.type === 'image') {
    connectCanvasNodes(explicitImageNode.id, generateNode.id);
  } else if (selectedImageNode?.type === 'image') {
    connectCanvasNodes(selectedImageNode.id, generateNode.id);
  } else if (!options.skipImplicitImage && state.canvas.activeImage) {
    const refNode = await createReferenceNodeFromResult(state.canvas.activeImage.nodeId, state.canvas.activeImage.fileIndex);
    if (refNode) connectCanvasNodes(refNode.id, generateNode.id);
  }

  state.canvas.selectedNodeId = generateNode.id;
  state.canvas.lastAgentPrompt = text;
  state.canvas.lastAgentGenerateNodeId = generateNode.id;
  pushCanvasAgentMessage('success', '已拆成文本、参数、生成节点。需要付费生成时再点“生成”。');
  renderCanvas();
  return generateNode;
}

function getCanvasAgentSpawnPoint() {
  const wrapRect = canvasStageWrap.getBoundingClientRect();
  const point = screenToCanvasPoint(
    wrapRect.left + Math.min(520, wrapRect.width * 0.38),
    wrapRect.top + Math.min(260, wrapRect.height * 0.32),
  );
  const offset = Math.min(180, state.canvas.nodes.length * 18);
  return {
    x: Math.max(24, point.x + offset),
    y: Math.max(24, point.y + offset),
  };
}

async function runCanvasAgentGenerate(options = {}) {
  if (state.isGenerating) return;
  const draft = canvasAgentInput.value.trim();
  let generateNode = getCanvasNode(state.canvas.selectedNodeId);
  if (options.forcePlan || (draft && state.canvas.lastAgentPrompt !== draft)) {
    generateNode = await planCanvasAgentPrompt(options);
  }
  if (generateNode?.type !== 'generate') {
    generateNode = getCanvasNode(state.canvas.lastAgentGenerateNodeId);
  }
  if (generateNode?.type !== 'generate') {
    generateNode = [...state.canvas.nodes].reverse().find(node => node.type === 'generate');
  }
  if (!generateNode) {
    generateNode = await planCanvasAgentPrompt(options);
  }
  if (!generateNode) return;

  pushCanvasAgentMessage('info', '开始生成。本次不会自动重试。');
  const result = await runCanvasGenerate(generateNode.id);
  if (result?.ok) {
    pushCanvasAgentMessage('success', `生成完成，已新增结果节点：${result.files.length || 0} 张图。`);
  } else if (result?.error) {
    pushCanvasAgentMessage('error', result.error);
  }
}

function openCanvasNodeMenuAtViewportCenter() {
  const rect = canvasStageWrap.getBoundingClientRect();
  const clientX = rect.left + rect.width / 2;
  const clientY = rect.top + rect.height / 2;
  openCanvasNodeMenu(clientX, clientY);
}

function handleCanvasDoubleClick(e) {
  if (
    e.target.closest('.canvas-node') ||
    e.target.closest('.canvas-node-menu') ||
    e.target.closest('.canvas-toolbar') ||
    e.target.closest('.canvas-floating-editor')
  ) return;
  e.preventDefault();
  openCanvasNodeMenu(e.clientX, e.clientY);
}

function openCanvasNodeMenu(clientX, clientY, options = {}) {
  const point = screenToCanvasPoint(clientX, clientY);
  const margin = 12;
  const menuWidth = 260;
  const menuHeight = 380;
  const viewport = state.canvas.viewport;
  const wrapRect = canvasStageWrap.getBoundingClientRect();
  const visibleLeft = Math.max(margin, -viewport.x / viewport.scale + margin);
  const visibleTop = Math.max(margin, -viewport.y / viewport.scale + margin);
  const visibleRight = (wrapRect.width - viewport.x) / viewport.scale;
  const visibleBottom = (wrapRect.height - viewport.y) / viewport.scale;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));
  state.canvas.nodeMenu = {
    clientX,
    clientY,
    x: clamp(point.x - menuWidth / 2, visibleLeft, visibleRight - menuWidth - margin),
    y: clamp(point.y - 36, visibleTop, visibleBottom - menuHeight - margin),
    connectFromId: options.connectFromId || null,
  };
  renderCanvasNodeMenu();
}

function renderCanvasNodeMenu() {
  const menuState = state.canvas.nodeMenu;
  removeCanvasNodeMenuElement();
  if (!menuState) return;

  const menu = document.createElement('div');
  menu.className = 'canvas-node-menu';
  menu.style.left = `${menuState.x}px`;
  menu.style.top = `${menuState.y}px`;
  const title = menuState.connectFromId ? '连接到新节点' : '添加节点';
  const options = canvasNodeMenuOptions(menuState);
  menu.innerHTML = `
    <div class="canvas-node-menu-title">${escapeHtml(title)}</div>
    <div class="canvas-node-menu-list">
      ${options.map(option => `
        <button type="button" class="canvas-node-menu-item" data-node-type="${escapeAttr(option.type)}">
          <span class="canvas-tool-icon">${escapeHtml(option.icon)}</span>
          <span>
            <strong>${escapeHtml(option.title)}</strong>
            <small>${escapeHtml(option.desc)}</small>
          </span>
        </button>
      `).join('')}
    </div>
  `;
  menu.addEventListener('wheel', handleCanvasNodeMenuWheel, { passive: false });
  menu.querySelectorAll('[data-node-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.nodeType;
      const node = addCanvasNode(type, { x: menuState.x, y: menuState.y });
      if (menuState.connectFromId) connectCanvasNodes(menuState.connectFromId, node.id);
      closeCanvasNodeMenu();
      if (type === 'image') {
        state.canvas.pendingImageNodeId = node.id;
        canvasImageInput.click();
      }
    });
  });
  canvasStage.appendChild(menu);
}

function handleCanvasNodeMenuWheel(e) {
  const list = e.currentTarget.querySelector('.canvas-node-menu-list');
  if (!list) return;
  e.preventDefault();
  e.stopPropagation();
  list.scrollTop += e.deltaY;
}

function canvasNodeMenuOptions(menuState) {
  const sourceNode = getCanvasNode(menuState.connectFromId);
  if (sourceNode?.type !== 'generate') return CANVAS_NODE_MENU_OPTIONS;
  const resultOption = CANVAS_NODE_MENU_OPTIONS.find(option => option.type === 'result');
  return [
    resultOption,
    ...CANVAS_NODE_MENU_OPTIONS.filter(option => option.type !== 'result'),
  ].filter(Boolean);
}

function closeCanvasNodeMenu() {
  state.canvas.nodeMenu = null;
  removeCanvasNodeMenuElement();
}

function removeCanvasNodeMenuElement() {
  canvasStage.querySelector('.canvas-node-menu')?.remove();
}

function closeCanvasNodeMenuFromOutside(e) {
  if (!state.canvas.nodeMenu) return;
  if (e.target.closest('.canvas-node-menu') || e.target.closest('#canvasAddNodeBtn')) return;
  closeCanvasNodeMenu();
}

function createCanvasNodeElement(node) {
  const el = document.createElement('div');
  el.className = `canvas-node selected-${node.type}`;
  if (state.canvas.selectedNodeId === node.id) el.classList.add('selected');
  if (state.canvas.snapTargetId === node.id) el.classList.add('connect-target');
  el.dataset.nodeId = node.id;
  el.style.left = `${node.x}px`;
  el.style.top = `${node.y}px`;
  el.style.width = `${node.width || (node.type === 'result' ? 360 : CANVAS_NODE_DEFAULT_WIDTH)}px`;
  if (node.height) el.style.minHeight = `${node.height}px`;
  el.innerHTML = `
    <div class="canvas-port input" data-port="input" title="输入"></div>
    <div class="canvas-node-header" data-drag-handle>
      <div>
        <div class="canvas-node-title">${escapeHtml(node.title)}</div>
        <div class="canvas-node-type">${escapeHtml(canvasTypeLabel(node.type))}</div>
      </div>
      <button type="button" class="drawer-close" data-canvas-remove title="删除节点">&times;</button>
    </div>
    <div class="canvas-node-body">${canvasNodeBodyHtml(node)}</div>
    <div class="canvas-port output${node.type === 'result' ? ' disabled' : ''}" data-port="output" title="输出"></div>
    <div class="canvas-node-resize-handle east" data-canvas-resize="east" title="横向拉伸"></div>
    <div class="canvas-node-resize-handle south" data-canvas-resize="south" title="纵向拉伸"></div>
    <div class="canvas-node-resize-handle corner" data-canvas-resize="corner" title="拉伸节点"></div>
  `;

  el.addEventListener('pointerdown', (e) => startCanvasDrag(e, node.id));
  el.querySelectorAll('[data-canvas-resize]').forEach(handle => {
    handle.addEventListener('pointerdown', (e) => startCanvasResize(e, node.id, handle.dataset.canvasResize));
  });
  el.querySelector('[data-canvas-remove]').addEventListener('click', () => removeCanvasNode(node.id));
  el.querySelectorAll('.canvas-port').forEach(port => {
    port.addEventListener('pointerdown', (e) => startCanvasConnection(e, node.id, port.dataset.port));
  });
  el.querySelector('.canvas-node-body')?.addEventListener('wheel', handleCanvasNodeBodyWheel, { passive: false });
  bindCanvasNodeInputs(el, node);
  return el;
}

function canvasTypeLabel(type) {
  return {
    text: 'TEXT',
    template: 'TEMPLATE',
    optimize: 'PROMPT',
    image: 'IMAGE',
    params: 'PARAMS',
    generate: 'GENERATE',
    result: 'RESULT',
  }[type] || type.toUpperCase();
}

function canvasNodeBodyHtml(node) {
  if (node.type === 'text') {
    return `<textarea data-field="text" placeholder="输入普通文本、画面描述或局部要求">${escapeHtml(node.text || node.prompt || '')}</textarea>`;
  }
  if (node.type === 'template') {
    return `
      <label><span>模板</span><select data-field="templateIndex">${canvasTemplateOptions(node.templateIndex)}</select></label>
      <textarea data-field="prompt" placeholder="可编辑模板 prompt">${escapeHtml(node.prompt || selectedCanvasTemplatePrompt(node.templateIndex))}</textarea>
    `;
  }
  if (node.type === 'optimize') {
    return `
      <label><span>风格</span><input data-field="style" value="${escapeAttr(node.style || '')}" placeholder="例如：电影感、商业摄影" /></label>
      <label><span>额外约束</span><input data-field="constraints" value="${escapeAttr(node.constraints || '')}" placeholder="例如：保留构图，避免文字错误" /></label>
      <button type="button" class="btn-primary" data-canvas-optimize>${node.statusKind === 'loading' ? '优化中...' : '优化 Prompt'}</button>
      <textarea data-field="output" placeholder="优化后的 prompt 会显示在这里">${escapeHtml(node.output || '')}</textarea>
      <div class="canvas-node-status${node.statusKind === 'error' ? ' error' : node.statusKind === 'success' ? ' success' : ''}">${escapeHtml(node.status || '连接文本或模板节点后优化，也可直接编辑输出')}</div>
    `;
  }
  if (node.type === 'image') {
    return `
      <button type="button" class="btn-secondary" data-canvas-pick-images>选择或拖入参考图</button>
      <div class="canvas-image-preview">${(node.urls || []).map((url, i) => `<img src="${escapeAttr(url)}" alt="参考图 ${i + 1}" />`).join('')}</div>
      <div class="canvas-node-status">${node.files?.length ? `${node.files.length} 张参考图` : '未添加图片'}</div>
    `;
  }
  if (node.type === 'params') {
    const sizePreset = getCanvasSizePresetValue(node.sizePreset || node.size || getSelectedSize());
    const customSize = node.customSize || (sizePreset === 'custom' && getCanvasSizePresetValue(node.size) === 'custom' ? node.size : '');
    const params = normalizeCanvasParams({ ...node, sizePreset, customSize });
    const provider = state.providers.find(item => item.id === params.provider);
    const providerName = provider?.name || params.provider || 'Figure';
    const summary = `${providerName} · ${params.model} · ${params.size} · ${params.quality} · ${params.n}张`;
    const collapsed = node.collapsed !== false;
    const fields = `
      <label><span>服务商</span><select data-field="provider">${canvasProviderOptions(node.provider)}</select></label>
      <label><span>模型</span><input data-field="model" value="${escapeAttr(node.model || 'gpt-image-2')}" /></label>
      <label><span>尺寸</span><select data-field="sizePreset">${canvasSizeOptions(sizePreset)}</select></label>
      <label class="canvas-custom-size${sizePreset === 'custom' ? '' : ' hidden-field'}"><span>自定义尺寸</span><input data-field="customSize" value="${escapeAttr(customSize || '')}" placeholder="例如：1280x720" /></label>
      <label><span>质量</span><select data-field="quality">${optionHtml(['high', 'medium', 'low'], node.quality)}</select></label>
      <label><span>背景</span><select data-field="background">${optionHtml(['opaque', 'transparent'], node.background)}</select></label>
      <label><span>张数</span><input type="number" min="1" max="4" data-field="n" value="${escapeAttr(node.n || '1')}" /></label>
      <label><span>超时秒数</span><input type="number" min="30" max="900" data-field="timeout" value="${escapeAttr(node.timeout || '600')}" /></label>
    `;
    return `
      <div class="canvas-param-toolbar">
        <div class="canvas-param-summary">${escapeHtml(summary)}</div>
        <button type="button" class="btn-secondary compact" data-canvas-toggle-params>${collapsed ? '展开' : '收起'}</button>
      </div>
      ${collapsed ? '<div class="canvas-node-status">参数已折叠，点击展开可修改服务商和尺寸。</div>' : fields}
    `;
  }
  if (node.type === 'generate') {
    return `
      <button type="button" class="btn-primary" data-canvas-generate>${state.isGenerating ? '生成中...' : '生成图片'}</button>
      <div class="canvas-node-status${node.statusKind === 'error' ? ' error' : ''}">${escapeHtml(node.status || '连接文本、图片、参数节点后点击生成')}</div>
    `;
  }
  if (node.type === 'result') {
    const files = node.files || [];
    const active = state.canvas.activeImage;
    return `
      <div class="canvas-result-images">${files.map((file, index) => {
        const selected = active?.nodeId === node.id && Number(active.fileIndex) === index;
        return `<div class="canvas-result-image-shell${selected ? ' active' : ''}">
          <button type="button" class="canvas-result-image-btn${selected ? ' active' : ''}" data-canvas-select-result="${index}" title="选择图片进行二次编辑"><img src="${escapeAttr(toAppUrl(file.url))}" alt="${escapeAttr(file.name)}" /></button>
          ${canvasImageEditorOverlayHtml(node, index)}
        </div>`;
      }).join('')}</div>
      ${canvasResultEditWorkbenchHtml(node)}
      <div class="canvas-result-actions">${files.map((file, index) => `<a href="${escapeAttr(toAppUrl(file.url))}" target="_blank" rel="noreferrer">查看</a><button type="button" data-canvas-select-result="${index}">画布编辑</button><button type="button" data-canvas-reference-result="${index}">作为参考图</button>`).join('')}</div>
      <div class="canvas-node-status success">${escapeHtml(node.status || `${files.length} 张结果`)}</div>
    `;
  }
  return '';
}

function canvasFloatingEditorHtml(file) {
  const activeTool = state.canvas.quickEditTool || '';
  const tools = [
    ['quick', '快捷'],
    ['background', '去背景'],
    ['erase', '局部重绘'],
    ['elements', '元素'],
    ['text', '文字'],
    ['angles', '多角度'],
  ];
  return `
    <div class="canvas-floating-editor-bar">
      ${tools.map(([value, label]) => `<button type="button" class="canvas-editor-tool${activeTool === value ? ' active' : ''}" data-canvas-edit-tool="${escapeAttr(value)}">${escapeHtml(label)}</button>`).join('')}
      <button type="button" class="canvas-editor-more" data-canvas-toggle-edit-panel title="更多操作">...</button>
      <button type="button" class="canvas-editor-close" data-canvas-close-editor title="退出编辑">&times;</button>
    </div>
    <div class="canvas-floating-more-menu${state.canvas.quickEditOpen ? ' open' : ''}">
      <button type="button" data-canvas-reference-active>作为参考图</button>
      <a href="${escapeAttr(file?.url || '#')}" target="_blank" rel="noreferrer">查看原图</a>
    </div>
  `;
}

function canvasResultEditWorkbenchHtml(node) {
  const active = state.canvas.activeImage;
  if (active?.nodeId !== node.id) return '';
  const fileIndex = Number(active.fileIndex) || 0;
  const file = node.files?.[fileIndex];
  if (!file) return '';
  const tool = state.canvas.quickEditTool || '';
  const editor = getCanvasImageEditor(node, fileIndex);
  const title = {
    quick: '快捷编辑',
    background: '去背景',
    erase: '局部重绘',
    elements: '元素编辑',
    text: '文字编辑',
    angles: '多角度',
  }[tool] || '选择编辑方式';

  if (!tool) {
    return `
      <div class="canvas-edit-workbench compact">
        <div class="canvas-edit-workbench-head">
          <strong>${escapeHtml(file.name || '生成图片')}</strong>
          <button type="button" class="canvas-mini-close" data-canvas-close-editor title="退出编辑">&times;</button>
        </div>
        <div class="canvas-edit-hint">选择图片上方工具。点画布空白处或按 Esc 可退出编辑。</div>
      </div>
    `;
  }

  if (tool === 'elements' || tool === 'text') {
    const isText = tool === 'text';
    const layerCount = editor.layers.filter(layer => layer.type === tool).length;
    return `
      <div class="canvas-edit-workbench">
        <div class="canvas-edit-workbench-head">
          <strong>${escapeHtml(title)}</strong>
          <button type="button" class="canvas-mini-close" data-canvas-close-editor title="退出编辑">&times;</button>
        </div>
        <div class="canvas-edit-hint">${isText ? '点击图片添加文字层，拖动文字框边缘移动，直接改字。' : '在图片上拖拽框选元素，松手后会生成可移动图层。'} 自动识别服务接入后会直接生成这些层。</div>
        <div class="canvas-edit-actions inline">
          <button type="button" class="btn-secondary compact" data-canvas-suggest-layers>${isText ? '文字候选' : '元素候选'}</button>
          ${isText ? '<button type="button" class="btn-secondary compact" data-canvas-add-text-layer>添加文字</button>' : ''}
          <button type="button" class="btn-secondary compact" data-canvas-clear-selection ${editor.selection ? '' : 'disabled'}>清除选区</button>
        </div>
        <textarea class="canvas-edit-prompt" data-canvas-edit-prompt placeholder="${isText ? '例如：把标题改成“小黄 28岁 正义”，保持字体风格和位置自然' : '例如：把选中的人物往右移动一点，保持背景自然补全'}">${escapeHtml(state.canvas.quickEditPrompt || '')}</textarea>
        <div class="canvas-edit-actions">
          <button type="button" class="btn-primary" data-canvas-run-edit>${state.isGenerating ? '编辑中...' : '生成编辑版本'}</button>
          <button type="button" class="btn-secondary compact" data-canvas-reference-active>作为参考图</button>
        </div>
        <div class="canvas-edit-hint">${escapeHtml(editor.status || (layerCount ? `当前 ${layerCount} 个可编辑层。` : '先在图片上框选或添加一层。'))} 真正抠出人物边缘/自动 OCR 需要接分割和文字识别服务。</div>
      </div>
    `;
  }

  return `
    <div class="canvas-edit-workbench">
      <div class="canvas-edit-workbench-head">
        <strong>${escapeHtml(title)}</strong>
        <button type="button" class="canvas-mini-close" data-canvas-close-editor title="退出编辑">&times;</button>
      </div>
      <textarea class="canvas-edit-prompt" data-canvas-edit-prompt placeholder="这次想怎么改？例如：把背景换成纯白，保留人物和横版 16:9 构图">${escapeHtml(state.canvas.quickEditPrompt || '')}</textarea>
      <div class="canvas-edit-actions">
        <button type="button" class="btn-primary" data-canvas-run-edit>${state.isGenerating ? '编辑中...' : '生成编辑版本'}</button>
        <button type="button" class="btn-secondary compact" data-canvas-reference-active>作为参考图</button>
      </div>
    </div>
  `;
}

function canvasImageEditorOverlayHtml(node, fileIndex) {
  const active = state.canvas.activeImage;
  const selected = active?.nodeId === node.id && Number(active.fileIndex) === Number(fileIndex);
  if (!selected) return '';
  const tool = state.canvas.quickEditTool || '';
  const interactive = ['elements', 'text', 'erase'].includes(tool);
  const editor = getCanvasImageEditor(node, fileIndex);
  const layers = editor.layers || [];
  return `
    <div class="canvas-image-edit-layer${interactive ? ' active' : ''} tool-${escapeAttr(tool || 'idle')}" data-canvas-editor-overlay="${fileIndex}">
      ${layers.map(layer => canvasEditorLayerHtml(editor, layer)).join('')}
      ${editor.selection ? `<div class="canvas-edit-selection" style="${unitRectStyle(editor.selection)}"></div>` : ''}
      ${interactive && layers.length === 0 && !editor.selection ? `<div class="canvas-edit-empty-hint">${tool === 'text' ? '点击添加文字层' : tool === 'erase' ? '拖拽框选重绘区域' : '拖拽框选元素'}</div>` : ''}
    </div>
  `;
}

function canvasEditorLayerHtml(editor, layer) {
  const selected = editor.selectedLayerId === layer.id ? ' selected' : '';
  if (layer.type === 'text') {
    return `
      <div class="canvas-edit-layer text${selected}" data-canvas-layer-id="${escapeAttr(layer.id)}" style="${unitRectStyle(layer)}">
        <span class="canvas-layer-grip" title="拖动文字层"></span>
        <div class="canvas-layer-text" contenteditable="true" spellcheck="false" data-canvas-layer-text="${escapeAttr(layer.id)}">${escapeHtml(layer.text || '双击改字')}</div>
        <button type="button" class="canvas-layer-delete" data-canvas-layer-delete="${escapeAttr(layer.id)}" title="删除">&times;</button>
      </div>
    `;
  }
  return `
    <button type="button" class="canvas-edit-layer element${selected}" data-canvas-layer-id="${escapeAttr(layer.id)}" style="${unitRectStyle(layer)}" title="${escapeAttr(layer.name || '元素')}">
      <span>${escapeHtml(layer.name || '元素')}</span>
      <span class="canvas-layer-grip" title="拖动元素层"></span>
      <span class="canvas-layer-delete" data-canvas-layer-delete="${escapeAttr(layer.id)}">&times;</span>
    </button>
  `;
}

function canvasProviderOptions(selectedValue) {
  const providers = state.providers.length ? state.providers : [
    { id: providerSelect.value || 'figure', name: providerSelect.options[providerSelect.selectedIndex]?.textContent || 'Figure' },
  ];
  return providers.map(provider => `<option value="${escapeAttr(provider.id)}"${provider.id === selectedValue ? ' selected' : ''}>${escapeHtml(provider.name || provider.id)}</option>`).join('');
}

function optionHtml(values, selectedValue) {
  return values.map(value => `<option value="${escapeAttr(value)}"${value === selectedValue ? ' selected' : ''}>${escapeHtml(value)}</option>`).join('');
}

function canvasSizeOptions(selectedValue) {
  return IMAGE_SIZE_OPTIONS.map(option => `<option value="${escapeAttr(option.value)}"${option.value === selectedValue ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('');
}

function getCanvasSizePresetValue(size) {
  const normalized = String(size || '').trim().toLowerCase();
  return IMAGE_SIZE_OPTIONS.some(option => option.value === normalized) ? normalized : 'custom';
}

function resolveCanvasNodeSize(node) {
  const preset = node?.sizePreset || getCanvasSizePresetValue(node?.size || getSelectedSize());
  if (preset === 'custom') {
    const custom = String(node?.customSize || node?.size || '').trim().toLowerCase();
    return /^\d{2,5}x\d{2,5}$/i.test(custom) ? custom : getSelectedSize();
  }
  return preset;
}

function canvasTemplateOptions(selectedIndex) {
  return GALLERY_TEMPLATES.map((template, index) => {
    const label = `${template.category} · ${template.title}`;
    return `<option value="${index}"${String(index) === String(selectedIndex) ? ' selected' : ''}>${escapeHtml(label)}</option>`;
  }).join('');
}

function selectedCanvasTemplatePrompt(index) {
  return GALLERY_TEMPLATES[Number(index) || 0]?.prompt || '';
}

function handleCanvasNodeBodyWheel(e) {
  e.stopPropagation();
}

function bindCanvasNodeInputs(el, node) {
  el.querySelectorAll('[data-field]').forEach(input => {
    input.addEventListener('input', () => {
      node[input.dataset.field] = input.value;
    });
    input.addEventListener('change', () => {
      node[input.dataset.field] = input.value;
      if (node.type === 'template' && input.dataset.field === 'templateIndex') {
        node.prompt = selectedCanvasTemplatePrompt(input.value);
        renderCanvas();
      } else if (node.type === 'params' && input.dataset.field === 'sizePreset') {
        node.sizePreset = input.value;
        if (input.value !== 'custom') node.size = input.value;
        renderCanvas();
      }
    });
  });
  const paramsToggle = el.querySelector('[data-canvas-toggle-params]');
  if (paramsToggle) {
    paramsToggle.addEventListener('click', () => {
      node.collapsed = node.collapsed === false;
      renderCanvas();
    });
  }
  const pickBtn = el.querySelector('[data-canvas-pick-images]');
  if (pickBtn) {
    pickBtn.addEventListener('click', () => {
      state.canvas.pendingImageNodeId = node.id;
      canvasImageInput.click();
    });
  }
  const generateBtn = el.querySelector('[data-canvas-generate]');
  if (generateBtn) generateBtn.addEventListener('click', () => runCanvasGenerate(node.id));
  const optimizeBtn = el.querySelector('[data-canvas-optimize]');
  if (optimizeBtn) optimizeBtn.addEventListener('click', () => runCanvasPromptOptimize(node.id));
  el.querySelectorAll('[data-canvas-select-result]').forEach(btn => {
    btn.addEventListener('click', () => selectCanvasResultImage(node.id, btn.dataset.canvasSelectResult));
  });
  el.querySelectorAll('[data-canvas-reference-result]').forEach(btn => {
    btn.addEventListener('click', () => createReferenceNodeFromResult(node.id, btn.dataset.canvasReferenceResult));
  });
  if (node.type === 'result') bindCanvasResultEditor(el, node);
}

function renderCanvasFloatingEditor() {
  canvasStageWrap.querySelector('.canvas-floating-editor')?.remove();
  const active = state.canvas.activeImage;
  if (!active) return;
  const node = getCanvasNode(active.nodeId);
  const file = node?.files?.[Number(active.fileIndex) || 0];
  const target = getActiveCanvasImageElement();
  if (!node || !file || !target) return;

  const targetRect = target.getBoundingClientRect();
  const wrapRect = canvasStageWrap.getBoundingClientRect();
  const toolbarWidth = 430;
  const left = targetRect.left - wrapRect.left + targetRect.width / 2;
  const aboveTop = targetRect.top - wrapRect.top - 54;
  const belowTop = targetRect.bottom - wrapRect.top + 8;
  const maxLeft = Math.max(12, wrapRect.width - toolbarWidth - 12);
  const top = aboveTop > 12 ? aboveTop : Math.min(wrapRect.height - 58, belowTop);

  const editor = document.createElement('div');
  editor.className = 'canvas-floating-editor';
  editor.style.left = `${Math.min(maxLeft, Math.max(12, left - toolbarWidth / 2))}px`;
  editor.style.top = `${Math.max(12, top)}px`;
  editor.innerHTML = canvasFloatingEditorHtml(file);
  bindCanvasFloatingEditor(editor, node.id);
  canvasStageWrap.appendChild(editor);
}

function getActiveCanvasImageElement() {
  const active = state.canvas.activeImage;
  if (!active) return null;
  return canvasStage.querySelector(`[data-node-id="${active.nodeId}"] [data-canvas-select-result="${Number(active.fileIndex) || 0}"]`);
}

function bindCanvasFloatingEditor(editor, nodeId) {
  editor.querySelectorAll('[data-canvas-edit-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextTool = btn.dataset.canvasEditTool || 'quick';
      state.canvas.quickEditTool = state.canvas.quickEditTool === nextTool ? '' : nextTool;
      state.canvas.quickEditOpen = false;
      renderCanvas();
    });
  });
  editor.querySelectorAll('[data-canvas-run-edit]').forEach(btn => {
    btn.addEventListener('click', () => runCanvasImageEdit(nodeId));
  });
  editor.querySelectorAll('[data-canvas-reference-active]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = state.canvas.activeImage;
      if (active) createReferenceNodeFromResult(active.nodeId, active.fileIndex);
    });
  });
  editor.querySelectorAll('[data-canvas-close-editor]').forEach(btn => {
    btn.addEventListener('click', exitCanvasImageEditing);
  });
  const panelToggle = editor.querySelector('[data-canvas-toggle-edit-panel]');
  if (panelToggle) {
    panelToggle.addEventListener('click', () => {
      state.canvas.quickEditOpen = !state.canvas.quickEditOpen;
      renderCanvas();
    });
  }
  const editPrompt = editor.querySelector('[data-canvas-edit-prompt]');
  if (editPrompt) {
    editPrompt.addEventListener('input', () => {
      state.canvas.quickEditPrompt = editPrompt.value;
    });
  }
}

function bindCanvasResultEditor(el, node) {
  el.querySelectorAll('[data-canvas-close-editor]').forEach(btn => {
    btn.addEventListener('click', exitCanvasImageEditing);
  });
  el.querySelectorAll('[data-canvas-run-edit]').forEach(btn => {
    btn.addEventListener('click', () => runCanvasImageEdit(node.id));
  });
  el.querySelectorAll('[data-canvas-reference-active]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = state.canvas.activeImage;
      if (active) createReferenceNodeFromResult(active.nodeId, active.fileIndex);
    });
  });
  el.querySelectorAll('[data-canvas-edit-prompt]').forEach(input => {
    input.addEventListener('input', () => {
      state.canvas.quickEditPrompt = input.value;
    });
  });
  el.querySelectorAll('[data-canvas-clear-selection]').forEach(btn => {
    btn.addEventListener('click', () => {
      const editor = getActiveCanvasImageEditor();
      if (!editor) return;
      editor.selection = null;
      editor.status = '已清除选区';
      renderCanvas();
    });
  });
  el.querySelectorAll('[data-canvas-add-text-layer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = state.canvas.activeImage;
      if (!active) return;
      addCanvasTextLayer(node, active.fileIndex, { x: 0.24, y: 0.18, width: 0.48, height: 0.09 });
      renderCanvas();
    });
  });
  el.querySelectorAll('[data-canvas-suggest-layers]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = state.canvas.activeImage;
      if (!active) return;
      addCanvasSuggestedLayers(node, active.fileIndex);
      renderCanvas();
    });
  });
  el.querySelectorAll('[data-canvas-layer-delete]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const active = state.canvas.activeImage;
      const editor = active ? getCanvasImageEditor(node, active.fileIndex) : null;
      if (!editor) return;
      editor.layers = editor.layers.filter(layer => layer.id !== btn.dataset.canvasLayerDelete);
      if (editor.selectedLayerId === btn.dataset.canvasLayerDelete) editor.selectedLayerId = null;
      editor.status = '已删除图层';
      renderCanvas();
    });
  });
  el.querySelectorAll('[data-canvas-layer-text]').forEach(textEl => {
    textEl.addEventListener('pointerdown', (e) => e.stopPropagation());
    textEl.addEventListener('input', () => {
      const active = state.canvas.activeImage;
      const editor = active ? getCanvasImageEditor(node, active.fileIndex) : null;
      const layer = editor?.layers.find(item => item.id === textEl.dataset.canvasLayerText);
      if (layer) layer.text = textEl.textContent.trim() || ' ';
    });
  });
  el.querySelectorAll('[data-canvas-layer-id]').forEach(layerEl => {
    layerEl.addEventListener('pointerdown', (e) => startCanvasLayerPointer(e, node, layerEl.dataset.canvasLayerId));
  });
  el.querySelectorAll('[data-canvas-editor-overlay]').forEach(overlay => {
    overlay.addEventListener('pointerdown', (e) => startCanvasOverlayPointer(e, node, Number(overlay.dataset.canvasEditorOverlay) || 0));
  });
}

function exitCanvasImageEditing() {
  if (!state.canvas.activeImage && !state.canvas.quickEditTool && !state.canvas.quickEditOpen) return;
  state.canvas.activeImage = null;
  state.canvas.quickEditTool = '';
  state.canvas.quickEditOpen = false;
  renderCanvas();
}

function getActiveCanvasImageEditor() {
  const active = state.canvas.activeImage;
  const node = active ? getCanvasNode(active.nodeId) : null;
  return node ? getCanvasImageEditor(node, active.fileIndex) : null;
}

function getCanvasImageEditor(node, fileIndex = 0) {
  if (!node.editors) node.editors = {};
  const key = String(Number(fileIndex) || 0);
  if (!node.editors[key]) {
    node.editors[key] = {
      layers: [],
      selectedLayerId: null,
      selection: null,
      status: '',
    };
  }
  return node.editors[key];
}

function startCanvasOverlayPointer(e, node, fileIndex) {
  const tool = state.canvas.quickEditTool || '';
  if (e.button !== 0 || !['elements', 'text', 'erase'].includes(tool)) return;
  if (e.target.closest('[data-canvas-layer-id]') || e.target.closest('[data-canvas-layer-delete]')) return;
  e.preventDefault();
  e.stopPropagation();

  const overlay = e.currentTarget;
  const rect = overlay.getBoundingClientRect();
  const start = overlayPointToUnit(e, rect);
  const liveSelection = ensureLiveCanvasSelection(overlay);
  let latest = { x: start.x, y: start.y, width: 0, height: 0 };
  applyUnitRectStyle(liveSelection, latest);

  const move = (moveEvent) => {
    latest = normalizeUnitRect(start, overlayPointToUnit(moveEvent, rect));
    applyUnitRectStyle(liveSelection, latest);
  };
  const up = (upEvent) => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', up);
    document.removeEventListener('pointercancel', up);
    latest = normalizeUnitRect(start, overlayPointToUnit(upEvent, rect));
    liveSelection.remove();

    const editor = getCanvasImageEditor(node, fileIndex);
    const tiny = latest.width < 0.018 || latest.height < 0.018;
    if (tool === 'text') {
      const textRect = tiny
        ? clampUnitRect({ x: start.x - 0.16, y: start.y - 0.045, width: 0.32, height: 0.09 })
        : latest;
      addCanvasTextLayer(node, fileIndex, textRect);
      return renderCanvas();
    }
    if (tool === 'elements') {
      if (tiny) {
        editor.status = '框选太小，请拖出一个元素范围';
        return renderCanvas();
      }
      addCanvasElementLayer(node, fileIndex, latest);
      return renderCanvas();
    }
    if (tool === 'erase') {
      if (tiny) {
        editor.status = '框选太小，请拖出需要重绘的区域';
      } else {
        editor.selection = latest;
        editor.status = '已选中局部重绘区域';
      }
      return renderCanvas();
    }
  };

  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', up);
  document.addEventListener('pointercancel', up);
}

function startCanvasLayerPointer(e, node, layerId) {
  if (e.button !== 0 || e.target.closest('[data-canvas-layer-delete]') || e.target.closest('[data-canvas-layer-text]')) return;
  const active = state.canvas.activeImage;
  if (!active) return;
  const overlay = e.currentTarget.closest('[data-canvas-editor-overlay]');
  const editor = getCanvasImageEditor(node, active.fileIndex);
  const layer = editor.layers.find(item => item.id === layerId);
  if (!overlay || !layer) return;
  e.preventDefault();
  e.stopPropagation();

  editor.selectedLayerId = layer.id;
  editor.selection = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
  const overlayRect = overlay.getBoundingClientRect();
  const start = overlayPointToUnit(e, overlayRect);
  const original = { x: layer.x, y: layer.y };
  const layerEl = e.currentTarget;

  const move = (moveEvent) => {
    const current = overlayPointToUnit(moveEvent, overlayRect);
    layer.x = clamp(original.x + current.x - start.x, 0, 1 - layer.width);
    layer.y = clamp(original.y + current.y - start.y, 0, 1 - layer.height);
    editor.selection = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
    applyUnitRectStyle(layerEl, layer);
  };
  const up = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', up);
    document.removeEventListener('pointercancel', up);
    editor.status = `${layer.name || '图层'} 已移动`;
    renderCanvas();
  };

  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', up);
  document.addEventListener('pointercancel', up);
}

function addCanvasElementLayer(node, fileIndex, rect) {
  const editor = getCanvasImageEditor(node, fileIndex);
  const layer = {
    id: `layer_${Date.now()}_${Math.round(Math.random() * 1000)}`,
    type: 'elements',
    name: `元素 ${editor.layers.filter(item => item.type === 'elements').length + 1}`,
    ...clampUnitRect(rect),
  };
  editor.layers.push(layer);
  editor.selectedLayerId = layer.id;
  editor.selection = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
  editor.status = `${layer.name} 已添加，可直接拖动`;
}

function addCanvasTextLayer(node, fileIndex, rect) {
  const editor = getCanvasImageEditor(node, fileIndex);
  const layer = {
    id: `text_${Date.now()}_${Math.round(Math.random() * 1000)}`,
    type: 'text',
    name: `文字 ${editor.layers.filter(item => item.type === 'text').length + 1}`,
    text: '双击改字',
    ...clampUnitRect(rect),
  };
  editor.layers.push(layer);
  editor.selectedLayerId = layer.id;
  editor.selection = { x: layer.x, y: layer.y, width: layer.width, height: layer.height };
  editor.status = `${layer.name} 已添加，可直接改字`;
}

function addCanvasSuggestedLayers(node, fileIndex) {
  const tool = state.canvas.quickEditTool || 'elements';
  const editor = getCanvasImageEditor(node, fileIndex);
  if (tool === 'text') {
    addCanvasTextLayer(node, fileIndex, { x: 0.16, y: 0.08, width: 0.68, height: 0.09 });
    addCanvasTextLayer(node, fileIndex, { x: 0.18, y: 0.82, width: 0.64, height: 0.08 });
    editor.status = '已添加文字候选层；真实 OCR 接入后会自动填充文字位置和内容';
    return;
  }
  addCanvasElementLayer(node, fileIndex, { x: 0.28, y: 0.16, width: 0.44, height: 0.66 });
  editor.status = '已添加主体候选层；真实分割接入后会自动生成精确元素层';
}

function overlayPointToUnit(event, rect) {
  return {
    x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
    y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
  };
}

function normalizeUnitRect(a, b) {
  return clampUnitRect({
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(b.x - a.x),
    height: Math.abs(b.y - a.y),
  });
}

function clampUnitRect(rect) {
  const width = clamp(rect.width, 0.02, 1);
  const height = clamp(rect.height, 0.02, 1);
  return {
    x: clamp(rect.x, 0, 1 - width),
    y: clamp(rect.y, 0, 1 - height),
    width,
    height,
  };
}

function unitRectStyle(rect) {
  return `left:${rect.x * 100}%; top:${rect.y * 100}%; width:${rect.width * 100}%; height:${rect.height * 100}%;`;
}

function applyUnitRectStyle(el, rect) {
  const safe = clampUnitRect(rect);
  el.style.left = `${safe.x * 100}%`;
  el.style.top = `${safe.y * 100}%`;
  el.style.width = `${safe.width * 100}%`;
  el.style.height = `${safe.height * 100}%`;
}

function ensureLiveCanvasSelection(overlay) {
  let selection = overlay.querySelector('.canvas-edit-selection.live');
  if (!selection) {
    selection = document.createElement('div');
    selection.className = 'canvas-edit-selection live';
    overlay.appendChild(selection);
  }
  return selection;
}

function startCanvasDrag(e, nodeId) {
  if (e.button !== 0) return;
  const node = getCanvasNode(nodeId);
  if (!node) return;
  selectCanvasNode(nodeId, { preserveActiveImage: true });
  if (isCanvasNodeInteractiveDragTarget(e.target)) return;
  e.preventDefault();
  e.stopPropagation();
  state.canvas.pointer = {
    kind: 'drag',
    nodeId,
    startX: e.clientX,
    startY: e.clientY,
    nodeX: node.x,
    nodeY: node.y,
    nodeWidth: getCanvasNodeWidth(node),
    nodeHeight: getCanvasNodeHeight(node),
  };
  try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
}

function startCanvasResize(e, nodeId, edge) {
  if (e.button !== 0) return;
  const node = getCanvasNode(nodeId);
  if (!node) return;
  e.preventDefault();
  e.stopPropagation();
  selectCanvasNode(nodeId, { preserveActiveImage: true });
  state.canvas.pointer = {
    kind: 'resize',
    nodeId,
    edge,
    startX: e.clientX,
    startY: e.clientY,
    nodeWidth: getCanvasNodeWidth(node),
    nodeHeight: getCanvasNodeHeight(node),
  };
  try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
}

function isCanvasNodeInteractiveDragTarget(target) {
  return Boolean(target.closest([
    'button',
    'input',
    'select',
    'textarea',
    'a',
    '[contenteditable="true"]',
    '.canvas-port',
    '.canvas-edit-layer',
    '.canvas-image-edit-layer',
    '[data-canvas-select-result]',
    '[data-canvas-reference-result]',
    '[data-canvas-pick-images]',
    '[data-canvas-optimize]',
    '[data-canvas-toggle-params]',
    '[data-canvas-resize]',
  ].join(',')));
}

function selectCanvasNode(nodeId, options = {}) {
  const hadSelectedEdge = Boolean(state.canvas.selectedEdgeKey);
  if (state.canvas.selectedNodeId === nodeId && !hadSelectedEdge) return;
  const previous = state.canvas.selectedNodeId;
  state.canvas.selectedNodeId = nodeId;
  state.canvas.selectedEdgeKey = null;
  if (!options.preserveActiveImage) state.canvas.activeImage = null;
  if (previous) canvasStage.querySelector(`[data-node-id="${previous}"]`)?.classList.remove('selected');
  canvasStage.querySelector(`[data-node-id="${nodeId}"]`)?.classList.add('selected');
  if (hadSelectedEdge) renderCanvasConnections();
  renderCanvasAgent();
}

function getCanvasNodeWidth(node) {
  const fallback = node?.type === 'result' ? 360 : CANVAS_NODE_DEFAULT_WIDTH;
  return Math.max(CANVAS_NODE_MIN_WIDTH, Number(node?.width) || fallback);
}

function getCanvasNodeHeight(node) {
  const el = node?.id ? canvasStage.querySelector(`[data-node-id="${node.id}"]`) : null;
  return Math.max(CANVAS_NODE_MIN_HEIGHT, Number(node?.height) || el?.offsetHeight || CANVAS_NODE_DEFAULT_HEIGHT || CANVAS_NODE_MIN_HEIGHT);
}

function clampCanvasNodePosition(x, y, width = CANVAS_NODE_DEFAULT_WIDTH, height = CANVAS_NODE_MIN_HEIGHT) {
  const stageWidth = canvasStage?.offsetWidth || 3200;
  const stageHeight = canvasStage?.offsetHeight || 2200;
  const minX = -CANVAS_NODE_WORKSPACE_PADDING;
  const minY = -CANVAS_NODE_WORKSPACE_PADDING;
  const maxX = Math.max(minX, stageWidth - width + CANVAS_NODE_WORKSPACE_PADDING);
  const maxY = Math.max(minY, stageHeight - height + CANVAS_NODE_WORKSPACE_PADDING);
  return {
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY),
  };
}

function snapCanvasNodeRect(nodeId, rect) {
  const threshold = CANVAS_NODE_SNAP_THRESHOLD / state.canvas.viewport.scale;
  const moving = {
    left: rect.x,
    centerX: rect.x + rect.width / 2,
    right: rect.x + rect.width,
    top: rect.y,
    centerY: rect.y + rect.height / 2,
    bottom: rect.y + rect.height,
  };
  let bestX = null;
  let bestY = null;
  state.canvas.nodes.forEach(node => {
    if (node.id === nodeId) return;
    const width = getCanvasNodeWidth(node);
    const height = getCanvasNodeHeight(node);
    const anchors = {
      x: [
        { key: 'left', value: node.x },
        { key: 'centerX', value: node.x + width / 2 },
        { key: 'right', value: node.x + width },
      ],
      y: [
        { key: 'top', value: node.y },
        { key: 'centerY', value: node.y + height / 2 },
        { key: 'bottom', value: node.y + height },
      ],
    };
    anchors.x.forEach(anchor => {
      ['left', 'centerX', 'right'].forEach(key => {
        const diff = anchor.value - moving[key];
        if (Math.abs(diff) <= threshold && (!bestX || Math.abs(diff) < Math.abs(bestX.diff))) {
          bestX = { diff, line: anchor.value };
        }
      });
    });
    anchors.y.forEach(anchor => {
      ['top', 'centerY', 'bottom'].forEach(key => {
        const diff = anchor.value - moving[key];
        if (Math.abs(diff) <= threshold && (!bestY || Math.abs(diff) < Math.abs(bestY.diff))) {
          bestY = { diff, line: anchor.value };
        }
      });
    });
  });
  const guides = [];
  if (bestX) {
    rect.x += bestX.diff;
    guides.push({ axis: 'x', value: bestX.line });
  }
  if (bestY) {
    rect.y += bestY.diff;
    guides.push({ axis: 'y', value: bestY.line });
  }
  return { ...rect, guides };
}

function snapCanvasNodeResize(nodeId, rect, edge) {
  const threshold = CANVAS_NODE_SNAP_THRESHOLD / state.canvas.viewport.scale;
  const moving = {
    centerX: rect.x + rect.width / 2,
    right: rect.x + rect.width,
    centerY: rect.y + rect.height / 2,
    bottom: rect.y + rect.height,
  };
  let bestX = null;
  let bestY = null;
  state.canvas.nodes.forEach(node => {
    if (node.id === nodeId) return;
    const width = getCanvasNodeWidth(node);
    const height = getCanvasNodeHeight(node);
    [
      node.x,
      node.x + width / 2,
      node.x + width,
    ].forEach(value => {
      ['right', 'centerX'].forEach(key => {
        const diff = value - moving[key];
        if (Math.abs(diff) <= threshold && (!bestX || Math.abs(diff) < Math.abs(bestX.diff))) {
          bestX = { diff, line: value, key };
        }
      });
    });
    [
      node.y,
      node.y + height / 2,
      node.y + height,
    ].forEach(value => {
      ['bottom', 'centerY'].forEach(key => {
        const diff = value - moving[key];
        if (Math.abs(diff) <= threshold && (!bestY || Math.abs(diff) < Math.abs(bestY.diff))) {
          bestY = { diff, line: value, key };
        }
      });
    });
  });
  const guides = [];
  if ((edge === 'east' || edge === 'corner') && bestX) {
    rect.width += bestX.key === 'centerX' ? bestX.diff * 2 : bestX.diff;
    guides.push({ axis: 'x', value: bestX.line });
  }
  if ((edge === 'south' || edge === 'corner') && bestY) {
    rect.height += bestY.key === 'centerY' ? bestY.diff * 2 : bestY.diff;
    guides.push({ axis: 'y', value: bestY.line });
  }
  rect.width = Math.max(CANVAS_NODE_MIN_WIDTH, rect.width);
  rect.height = Math.max(CANVAS_NODE_MIN_HEIGHT, rect.height);
  return { ...rect, guides };
}

function ensureCanvasGuidesLayer() {
  let layer = canvasStage.querySelector('.canvas-guides');
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'canvas-guides';
    canvasStage.appendChild(layer);
  }
  return layer;
}

function renderCanvasGuides(guides = []) {
  const layer = ensureCanvasGuidesLayer();
  layer.innerHTML = guides.map(guide => {
    const style = guide.axis === 'x'
      ? `left:${guide.value}px;top:0;width:0;height:100%;`
      : `left:0;top:${guide.value}px;width:100%;height:0;`;
    return `<div class="canvas-guide ${guide.axis === 'x' ? 'vertical' : 'horizontal'}" style="${style}"></div>`;
  }).join('');
}

function clearCanvasGuides() {
  canvasStage.querySelector('.canvas-guides')?.remove();
}

function startCanvasPan(e) {
  if (
    e.button !== 0 ||
    e.target.closest('.canvas-node') ||
    e.target.closest('.canvas-node-menu') ||
    e.target.closest('.canvas-connections') ||
    e.target.closest('.canvas-toolbar') ||
    e.target.closest('.canvas-floating-editor')
  ) return;
  const nearbyEdge = findNearestCanvasEdge(e.clientX, e.clientY);
  if (nearbyEdge) {
    e.preventDefault();
    selectCanvasEdge(nearbyEdge);
    return;
  }
  if (state.canvas.activeImage) {
    e.preventDefault();
    exitCanvasImageEditing();
    return;
  }
  e.preventDefault();
  state.canvas.selectedNodeId = null;
  state.canvas.selectedEdgeKey = null;
  state.canvas.pointer = {
    kind: 'pan',
    startX: e.clientX,
    startY: e.clientY,
    viewX: state.canvas.viewport.x,
    viewY: state.canvas.viewport.y,
  };
  canvasStageWrap.classList.add('panning');
  try { canvasStageWrap.setPointerCapture(e.pointerId); } catch (_) {}
}

function handleCanvasPointerMove(e) {
  const pointer = state.canvas.pointer;
  if (!pointer) return;
  if (pointer.kind === 'drag') {
    const node = getCanvasNode(pointer.nodeId);
    if (!node) return;
    const scale = state.canvas.viewport.scale;
    const nextPosition = clampCanvasNodePosition(
      pointer.nodeX + (e.clientX - pointer.startX) / scale,
      pointer.nodeY + (e.clientY - pointer.startY) / scale,
      pointer.nodeWidth,
      pointer.nodeHeight,
    );
    const desired = {
      x: nextPosition.x,
      y: nextPosition.y,
      width: pointer.nodeWidth,
      height: pointer.nodeHeight,
    };
    const snapped = snapCanvasNodeRect(pointer.nodeId, desired);
    const clamped = clampCanvasNodePosition(snapped.x, snapped.y, pointer.nodeWidth, pointer.nodeHeight);
    node.x = clamped.x;
    node.y = clamped.y;
    const el = canvasStage.querySelector(`[data-node-id="${node.id}"]`);
    if (el) {
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;
    }
    renderCanvasGuides(snapped.guides);
    renderCanvasConnections();
  } else if (pointer.kind === 'resize') {
    const node = getCanvasNode(pointer.nodeId);
    if (!node) return;
    const scale = state.canvas.viewport.scale;
    const deltaX = (e.clientX - pointer.startX) / scale;
    const deltaY = (e.clientY - pointer.startY) / scale;
    const desired = {
      x: node.x,
      y: node.y,
      width: pointer.nodeWidth,
      height: pointer.nodeHeight,
    };
    if (pointer.edge === 'east' || pointer.edge === 'corner') {
      desired.width = Math.max(CANVAS_NODE_MIN_WIDTH, pointer.nodeWidth + deltaX);
    }
    if (pointer.edge === 'south' || pointer.edge === 'corner') {
      desired.height = Math.max(CANVAS_NODE_MIN_HEIGHT, pointer.nodeHeight + deltaY);
    }
    const snapped = snapCanvasNodeResize(pointer.nodeId, desired, pointer.edge);
    node.width = snapped.width;
    node.height = snapped.height;
    const el = canvasStage.querySelector(`[data-node-id="${node.id}"]`);
    if (el) {
      el.style.width = `${node.width}px`;
      el.style.minHeight = `${node.height}px`;
    }
    renderCanvasGuides(snapped.guides);
    renderCanvasConnections();
  } else if (pointer.kind === 'connect') {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    updateCanvasSnapTarget(findCanvasConnectionTarget(e.clientX, e.clientY, pointer.nodeId)?.nodeId || null);
    renderCanvasConnections();
  } else if (pointer.kind === 'pan') {
    state.canvas.viewport.x = pointer.viewX + e.clientX - pointer.startX;
    state.canvas.viewport.y = pointer.viewY + e.clientY - pointer.startY;
    clampCanvasViewport();
    renderCanvasViewport();
  }
}

function startCanvasConnection(e, nodeId, portType) {
  const node = getCanvasNode(nodeId);
  if (!node || portType !== 'output' || node.type === 'result') return;
  e.preventDefault();
  e.stopPropagation();
  state.canvas.selectedEdgeKey = null;
  state.canvas.connectFromId = nodeId;
  state.canvas.snapTargetId = null;
  state.canvas.pointer = { kind: 'connect', nodeId, x: e.clientX, y: e.clientY };
  try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
  renderCanvasConnections();
}

function finishCanvasConnection(e) {
  const pointer = state.canvas.pointer;
  if (!pointer) return;
  if (pointer.kind === 'connect') {
    const target = findCanvasConnectionTarget(e.clientX, e.clientY, pointer.nodeId);
    if (target?.nodeId) {
      connectCanvasNodes(pointer.nodeId, target.nodeId);
    } else {
      openCanvasNodeMenu(e.clientX, e.clientY, { connectFromId: pointer.nodeId });
    }
  }
  state.canvas.pointer = null;
  canvasStageWrap.classList.remove('panning');
  state.canvas.connectFromId = null;
  updateCanvasSnapTarget(null);
  clearCanvasGuides();
  renderCanvasConnections();
}

function findCanvasConnectionTarget(clientX, clientY, fromNodeId) {
  const directEl = document.elementFromPoint(clientX, clientY);
  const portNode = directEl?.closest('.canvas-port.input')?.closest('.canvas-node');
  if (isValidCanvasConnectionTarget(fromNodeId, portNode?.dataset.nodeId)) {
    return { nodeId: portNode.dataset.nodeId, mode: 'port' };
  }

  const nodeEl = directEl?.closest('.canvas-node');
  if (isValidCanvasConnectionTarget(fromNodeId, nodeEl?.dataset.nodeId)) {
    return { nodeId: nodeEl.dataset.nodeId, mode: 'node' };
  }

  return findNearestCanvasInputTarget(clientX, clientY, fromNodeId, 96);
}

function findNearestCanvasInputTarget(clientX, clientY, fromNodeId, threshold) {
  let best = null;
  canvasStage.querySelectorAll('.canvas-port.input').forEach(port => {
    const nodeEl = port.closest('.canvas-node');
    const nodeId = nodeEl?.dataset.nodeId;
    if (!isValidCanvasConnectionTarget(fromNodeId, nodeId)) return;
    const rect = port.getBoundingClientRect();
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance <= threshold && (!best || distance < best.distance)) {
      best = { nodeId, distance, mode: 'near' };
    }
  });
  return best;
}

function findNearestCanvasEdge(clientX, clientY, thresholdPx = CANVAS_EDGE_NEAR_THRESHOLD) {
  if (!state.canvas.edges.length) return null;
  const point = screenToCanvasPoint(clientX, clientY);
  const threshold = thresholdPx / state.canvas.viewport.scale;
  let best = null;
  state.canvas.edges.forEach(edge => {
    const distance = distanceToCanvasEdge(point, edge);
    if (distance <= threshold && (!best || distance < best.distance)) {
      best = { edge, distance };
    }
  });
  return best?.edge || null;
}

function distanceToCanvasEdge(point, edge) {
  const endpoints = connectionEndpoints(edge.from, edge.to);
  if (!endpoints) return Number.POSITIVE_INFINITY;
  const { start, end } = endpoints;
  const dx = Math.max(80, Math.abs(end.x - start.x) * 0.45);
  const c1 = { x: start.x + dx, y: start.y };
  const c2 = { x: end.x - dx, y: end.y };
  let previous = start;
  let best = Number.POSITIVE_INFINITY;
  for (let index = 1; index <= 28; index += 1) {
    const current = cubicPoint(start, c1, c2, end, index / 28);
    best = Math.min(best, pointToSegmentDistance(point, previous, current));
    previous = current;
  }
  return best;
}

function pointToSegmentDistance(point, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (!dx && !dy) return Math.hypot(point.x - a.x, point.y - a.y);
  const t = clamp(((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy), 0, 1);
  return Math.hypot(point.x - (a.x + dx * t), point.y - (a.y + dy * t));
}

function isValidCanvasConnectionTarget(fromNodeId, toNodeId) {
  if (!toNodeId || toNodeId === fromNodeId) return false;
  return !wouldCreateCanvasCycle(fromNodeId, toNodeId);
}

function updateCanvasSnapTarget(nodeId) {
  if (state.canvas.snapTargetId === nodeId) return;
  const previous = state.canvas.snapTargetId;
  state.canvas.snapTargetId = nodeId;
  if (previous) {
    canvasStage.querySelector(`[data-node-id="${previous}"]`)?.classList.remove('connect-target');
  }
  if (nodeId) {
    canvasStage.querySelector(`[data-node-id="${nodeId}"]`)?.classList.add('connect-target');
  }
}

function connectCanvasNodes(from, to) {
  if (from === to) return;
  if (wouldCreateCanvasCycle(from, to)) return;
  const exists = state.canvas.edges.some(edge => edge.from === from && edge.to === to);
  if (!exists) state.canvas.edges.push({ from, to });
  renderCanvasConnections();
}

function canvasEdgeKey(edge) {
  return `${edge.from}->${edge.to}`;
}

function selectCanvasEdge(edge) {
  state.canvas.selectedEdgeKey = canvasEdgeKey(edge);
  state.canvas.selectedNodeId = null;
  renderCanvas();
}

function removeCanvasEdgeByKey(edgeKey) {
  const before = state.canvas.edges.length;
  state.canvas.edges = state.canvas.edges.filter(edge => canvasEdgeKey(edge) !== edgeKey);
  if (state.canvas.selectedEdgeKey === edgeKey) state.canvas.selectedEdgeKey = null;
  if (state.canvas.edges.length !== before) renderCanvasConnections();
}

function wouldCreateCanvasCycle(from, to) {
  const stack = [to];
  const seen = new Set();
  while (stack.length) {
    const id = stack.pop();
    if (id === from) return true;
    if (seen.has(id)) continue;
    seen.add(id);
    state.canvas.edges.filter(edge => edge.from === id).forEach(edge => stack.push(edge.to));
  }
  return false;
}

function renderCanvasConnections() {
  if (!canvasConnections) return;
  canvasConnections.innerHTML = '';
  state.canvas.edges.forEach(edge => {
    const group = canvasConnectionGroup(edge);
    if (group) canvasConnections.appendChild(group);
  });
  if (state.canvas.pointer?.kind === 'connect') {
    const path = connectionPath(state.canvas.pointer.nodeId, null, state.canvas.pointer);
    if (path) {
      path.classList.add('pending');
      canvasConnections.appendChild(path);
    }
  }
  renderCanvasFloatingEditor();
}

function canvasConnectionGroup(edge) {
  const visiblePath = connectionPath(edge.from, edge.to);
  const hitPath = connectionPath(edge.from, edge.to);
  if (!visiblePath || !hitPath) return null;
  const key = canvasEdgeKey(edge);
  const selected = state.canvas.selectedEdgeKey === key;
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('class', `canvas-connection-group${selected ? ' selected' : ''}`);
  group.dataset.edgeKey = key;

  hitPath.setAttribute('class', 'canvas-connection-hit');
  hitPath.style.strokeWidth = `${CANVAS_EDGE_HIT_WIDTH / state.canvas.viewport.scale}px`;
  hitPath.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectCanvasEdge(edge);
  });

  visiblePath.classList.toggle('selected', selected);
  visiblePath.style.strokeWidth = `${(selected ? 3.2 : 2.4) / state.canvas.viewport.scale}px`;
  group.appendChild(hitPath);
  group.appendChild(visiblePath);

  if (selected) {
    const control = canvasEdgeDeleteControl(edge);
    if (control) group.appendChild(control);
  }
  return group;
}

function canvasEdgeDeleteControl(edge) {
  const point = connectionMidpoint(edge.from, edge.to);
  if (!point) return null;
  const key = canvasEdgeKey(edge);
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('class', 'canvas-edge-delete');
  group.setAttribute('transform', `translate(${point.x} ${point.y})`);
  group.setAttribute('role', 'button');
  group.setAttribute('aria-label', '删除连线');
  group.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeCanvasEdgeByKey(key);
  });

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('r', '11');
  circle.setAttribute('transform', `scale(${1 / state.canvas.viewport.scale})`);
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'central');
  text.setAttribute('transform', `scale(${1 / state.canvas.viewport.scale})`);
  text.textContent = '×';
  group.appendChild(circle);
  group.appendChild(text);
  return group;
}

function connectionMidpoint(fromId, toId) {
  const points = connectionEndpoints(fromId, toId);
  if (!points) return null;
  const { start, end } = points;
  const dx = Math.max(80, Math.abs(end.x - start.x) * 0.45);
  const c1 = { x: start.x + dx, y: start.y };
  const c2 = { x: end.x - dx, y: end.y };
  return cubicPoint(start, c1, c2, end, 0.5);
}

function cubicPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function connectionPath(fromId, toId, pointer = null) {
  const points = connectionEndpoints(fromId, toId, pointer);
  if (!points) return null;
  const { start, end } = points;
  const dx = Math.max(80, Math.abs(end.x - start.x) * 0.45);
  const d = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', 'canvas-connection');
  return path;
}

function connectionEndpoints(fromId, toId, pointer = null) {
  const fromEl = canvasStage.querySelector(`[data-node-id="${fromId}"] .canvas-port.output`);
  if (!fromEl) return null;
  const start = portCenter(fromEl);
  let end;
  if (toId) {
    const toEl = canvasStage.querySelector(`[data-node-id="${toId}"] .canvas-port.input`);
    if (!toEl) return null;
    end = portCenter(toEl);
  } else {
    const snapPort = state.canvas.snapTargetId
      ? canvasStage.querySelector(`[data-node-id="${state.canvas.snapTargetId}"] .canvas-port.input`)
      : null;
    end = snapPort ? portCenter(snapPort) : screenToCanvasPoint(pointer.x, pointer.y);
  }
  return { start, end };
}

function portCenter(portEl) {
  const stageRect = canvasStage.getBoundingClientRect();
  const rect = portEl.getBoundingClientRect();
  const scale = state.canvas.viewport.scale;
  return {
    x: (rect.left - stageRect.left + rect.width / 2) / scale,
    y: (rect.top - stageRect.top + rect.height / 2) / scale,
  };
}

function screenToCanvasPoint(clientX, clientY) {
  const stageRect = canvasStage.getBoundingClientRect();
  const scale = state.canvas.viewport.scale;
  return {
    x: (clientX - stageRect.left) / scale,
    y: (clientY - stageRect.top) / scale,
  };
}

function renderCanvasViewport() {
  clampCanvasViewport();
  const { x, y, scale } = state.canvas.viewport;
  canvasStage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  canvasStage.style.setProperty('--canvas-scale', scale);
  canvasStage.style.setProperty('--canvas-inverse-scale', 1 / scale);
  canvasStageWrap.style.setProperty('--canvas-grid-x', `${x}px`);
  canvasStageWrap.style.setProperty('--canvas-grid-y', `${y}px`);
  canvasStageWrap.style.setProperty('--canvas-grid-size', `${28 * scale}px`);
  canvasZoomResetBtn.textContent = `${Math.round(scale * 100)}%`;
  renderCanvasFloatingEditor();
}

function handleCanvasWheel(e) {
  e.preventDefault();
  if (e.ctrlKey || e.metaKey || e.altKey) {
    const factor = Math.exp(-e.deltaY * 0.0025);
    zoomCanvasBy(factor, e.clientX, e.clientY);
    return;
  }
  panCanvasBy(-e.deltaX, -e.deltaY);
}

function zoomCanvasBy(factor, originClientX, originClientY) {
  const viewport = state.canvas.viewport;
  const previousScale = viewport.scale;
  const nextScale = Math.min(2.2, Math.max(0.35, previousScale * factor));
  const wrapRect = canvasStageWrap.getBoundingClientRect();
  const originX = originClientX ?? wrapRect.left + wrapRect.width / 2;
  const originY = originClientY ?? wrapRect.top + wrapRect.height / 2;
  const canvasX = (originX - wrapRect.left - viewport.x) / previousScale;
  const canvasY = (originY - wrapRect.top - viewport.y) / previousScale;
  viewport.scale = nextScale;
  viewport.x = originX - wrapRect.left - canvasX * nextScale;
  viewport.y = originY - wrapRect.top - canvasY * nextScale;
  clampCanvasViewport();
  renderCanvasViewport();
  renderCanvasConnections();
}

function canvasZoomButtonOrigin() {
  const selected = state.canvas.selectedNodeId ? canvasStage.querySelector(`[data-node-id="${state.canvas.selectedNodeId}"]`) : null;
  const rect = selected?.getBoundingClientRect();
  if (rect?.width && rect?.height) {
    return [rect.left + rect.width / 2, rect.top + rect.height / 2];
  }
  const wrapRect = canvasStageWrap.getBoundingClientRect();
  return [wrapRect.left + wrapRect.width / 2, wrapRect.top + wrapRect.height / 2];
}

function panCanvasBy(deltaX, deltaY) {
  state.canvas.viewport.x += deltaX;
  state.canvas.viewport.y += deltaY;
  clampCanvasViewport();
  renderCanvasViewport();
  renderCanvasConnections();
}

function clampCanvasViewport() {
  const viewport = state.canvas.viewport;
  if (!canvasStageWrap || !canvasStage) return;
  viewport.scale = Math.min(2.2, Math.max(0.35, Number(viewport.scale) || 1));
  const wrapRect = canvasStageWrap.getBoundingClientRect();
  const virtualMinX = -CANVAS_NODE_WORKSPACE_PADDING;
  const virtualMinY = -CANVAS_NODE_WORKSPACE_PADDING;
  const virtualMaxX = canvasStage.offsetWidth + CANVAS_NODE_WORKSPACE_PADDING;
  const virtualMaxY = canvasStage.offsetHeight + CANVAS_NODE_WORKSPACE_PADDING;
  const padding = 220;
  const minX = Math.min(
    padding - virtualMinX * viewport.scale,
    wrapRect.width - padding - virtualMaxX * viewport.scale,
  );
  const minY = Math.min(
    padding - virtualMinY * viewport.scale,
    wrapRect.height - padding - virtualMaxY * viewport.scale,
  );
  const maxX = Math.max(
    wrapRect.width - padding - virtualMinX * viewport.scale,
    padding - virtualMinX * viewport.scale,
  );
  const maxY = Math.max(
    wrapRect.height - padding - virtualMinY * viewport.scale,
    padding - virtualMinY * viewport.scale,
  );
  viewport.x = Math.min(maxX, Math.max(minX, viewport.x));
  viewport.y = Math.min(maxY, Math.max(minY, viewport.y));
}

function resetCanvasView() {
  state.canvas.viewport = { x: 0, y: 0, scale: 1 };
  renderCanvasViewport();
  renderCanvasConnections();
}

function removeCanvasNode(nodeId) {
  const node = getCanvasNode(nodeId);
  if (node?.urls) revokeUrls(node.urls);
  state.canvas.nodes = state.canvas.nodes.filter(item => item.id !== nodeId);
  state.canvas.edges = state.canvas.edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId);
  if (state.canvas.selectedNodeId === nodeId) state.canvas.selectedNodeId = null;
  if (state.canvas.selectedEdgeKey && !state.canvas.edges.some(edge => canvasEdgeKey(edge) === state.canvas.selectedEdgeKey)) {
    state.canvas.selectedEdgeKey = null;
  }
  if (state.canvas.activeImage?.nodeId === nodeId) state.canvas.activeImage = null;
  renderCanvas();
}

function handleCanvasImageSelection() {
  const files = Array.from(canvasImageInput.files || []).filter(file => file.type.startsWith('image/'));
  if (!files.length) return;
  addSessionUploads(files);
  const node = getCanvasNode(state.canvas.pendingImageNodeId) || addCanvasNode('image');
  setCanvasNodeImages(node, files);
  state.canvas.pendingImageNodeId = null;
  canvasImageInput.value = '';
}

function handleCanvasFolderSelection() {
  const files = Array.from(canvasFolderInput.files || []).filter(file => file.type.startsWith('image/'));
  canvasFolderInput.value = '';
  if (!files.length) return;
  addSessionUploads(files);
  const point = getCanvasAgentSpawnPoint();
  const node = addCanvasNode('image', {
    x: point.x,
    y: point.y,
    title: '文件夹参考图',
  });
  setCanvasNodeImages(node, files);
  state.canvas.selectedNodeId = node.id;
  pushCanvasAgentMessage('success', `已从文件夹加入 ${files.length} 张参考图。`);
}

function handleCanvasDrop(e) {
  const toolType = e.dataTransfer?.getData('application/x-canvas-node') || state.canvas.dragToolType;
  if (toolType) {
    e.preventDefault();
    const point = screenToCanvasPoint(e.clientX, e.clientY);
    addCanvasNode(toolType, {
      x: Math.max(12, point.x - 130),
      y: Math.max(12, point.y - 32),
    });
    state.canvas.dragToolType = null;
    return;
  }

  const files = Array.from(e.dataTransfer?.files || []).filter(file => file.type.startsWith('image/'));
  e.preventDefault();
  if (!files.length) {
    openCanvasNodeMenu(e.clientX, e.clientY);
    return;
  }
  const point = screenToCanvasPoint(e.clientX, e.clientY);
  const node = addCanvasNode('image', {
    x: Math.max(12, point.x - 130),
    y: Math.max(12, point.y - 60),
  });
  setCanvasNodeImages(node, files);
}

function setCanvasNodeImages(node, files) {
  if (node.urls) revokeUrls(node.urls);
  node.files = files;
  node.urls = files.map(file => {
    const url = URL.createObjectURL(file);
    state.canvas.objectUrls.push(url);
    return url;
  });
  renderCanvas();
}

function selectCanvasResultImage(nodeId, fileIndex = 0) {
  state.canvas.selectedNodeId = nodeId;
  state.canvas.activeImage = { nodeId, fileIndex: Number(fileIndex) || 0 };
  if (!state.canvas.quickEditPrompt) state.canvas.quickEditPrompt = '';
  renderCanvas();
}

async function createReferenceNodeFromResult(nodeId, fileIndex = 0) {
  const resultNode = getCanvasNode(nodeId);
  const fileMeta = resultNode?.files?.[Number(fileIndex) || 0];
  if (!resultNode || !fileMeta?.url) return null;
  try {
    updateCanvasNodeStatus(resultNode, '正在转成参考图节点...', 'success');
    const imageFile = await fetchCanvasResultAsFile(fileMeta);
    const imageNode = addCanvasNode('image', {
      x: resultNode.x,
      y: resultNode.y + 360,
      title: '结果参考图',
    });
    setCanvasNodeImages(imageNode, [imageFile]);
    connectCanvasNodes(resultNode.id, imageNode.id);
    state.canvas.selectedNodeId = imageNode.id;
    return imageNode;
  } catch (error) {
    updateCanvasNodeStatus(resultNode, `转参考图失败：${error.message}`, 'error');
    return null;
  }
}

async function importCanvasAssetsToCanvas(options = {}) {
  return importCanvasAssetsToCanvasInternal({
    includeUploads: options.includeUploads !== false,
    includeOutputs: options.includeOutputs !== false,
  });
}

async function importCanvasAssetsToCanvasInternal(options = {}) {
  const importedNodes = [];
  const includeUploads = options.includeUploads !== false;
  const includeOutputs = options.includeOutputs !== false;
  try {
    setCanvasAssetImporting(true);
    const point = getCanvasAgentSpawnPoint();
    let offset = 0;

    if (includeUploads && state.sessionUploads.length) {
      const imageNode = addCanvasNode('image', {
        x: point.x,
        y: point.y,
        title: '会话上传图',
      });
      setCanvasNodeImages(imageNode, state.sessionUploads.slice());
      state.canvas.selectedNodeId = imageNode.id;
      importedNodes.push(imageNode);
      offset += 1;
    }

    if (includeOutputs) {
      const assets = await fetchProjectAssets();
      const files = assets.generated.filter(file => file?.url).slice(0, 12);
      if (files.length) {
        const resultNode = addCanvasNode('result', {
          x: point.x + offset * 40,
          y: point.y + offset * 40,
          title: '项目素材',
          files,
          status: `已加入 ${files.length} 张项目图片`,
        });
        selectCanvasResultImage(resultNode.id, 0);
        importedNodes.push(resultNode);
      }
    }

    if (!importedNodes.length) {
      addCanvasNode('result', {
        x: point.x,
        y: point.y,
        title: '导入',
        status: '还没有可导入的历史生成图或会话上传图',
      });
    }
    return importedNodes;
  } catch (error) {
    addCanvasNode('result', {
      x: 180,
      y: 120,
      status: `导入读取失败：${error.message}`,
      statusKind: 'error',
    });
    return [];
  } finally {
    setCanvasAssetImporting(false);
  }
}

async function fetchProjectAssets({ force = false } = {}) {
  if (state.projectAssets.loaded && !force) return state.projectAssets;
  const res = await fetch(apiUrl('/api/outputs'));
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.detail || data.error || '读取输出失败');
  const generated = (data.files || [])
    .filter(file => file.kind === 'image' || /\.(png|jpe?g|webp|gif)$/i.test(file.name || ''))
    .map((file, index) => normalizeProjectAsset(file, 'generated', index));
  state.projectAssets = {
    outputsDir: data.outputsDir || '',
    generated,
    loaded: true,
  };
  return state.projectAssets;
}

function invalidateProjectAssets() {
  state.projectAssets.loaded = false;
  if (state.appMode === 'project') loadProjectAssets({ force: true });
}

async function loadProjectAssets({ force = false } = {}) {
  projectGeneratedGrid.innerHTML = '<div class="project-empty">正在读取项目素材...</div>';
  projectUploadsGrid.innerHTML = '';
  try {
    const assets = await fetchProjectAssets({ force });
    renderProjectAssets(assets);
  } catch (error) {
    projectGeneratedGrid.innerHTML = `<div class="project-empty error">读取项目失败：${escapeHtml(error.message)}</div>`;
  }
}

async function openProjectPicker(target = state.appMode === 'canvas' ? 'canvas' : 'chat') {
  if (!projectPickerBackdrop || !projectPickerBody) return;
  state.projectPickerTarget = target === 'canvas' ? 'canvas' : 'chat';
  state.projectPickerSelectedIds.clear();
  updateProjectPickerFooter();
  projectPickerBackdrop.hidden = false;
  projectPickerBody.innerHTML = '<div class="project-picker-empty">正在读取项目素材...</div>';
  try {
    const assets = await fetchProjectAssets({ force: true });
    renderProjectPicker(assets);
  } catch (error) {
    projectPickerBody.innerHTML = `<div class="project-picker-empty">读取项目失败：${escapeHtml(error.message)}</div>`;
  }
}

function closeProjectPicker() {
  if (!projectPickerBackdrop) return;
  projectPickerBackdrop.hidden = true;
  if (projectPickerBody) projectPickerBody.innerHTML = '';
  revokeUrls(state.projectPickerThumbUrls);
  state.projectPickerAssets = [];
  state.projectPickerSelectedIds.clear();
  updateProjectPickerFooter();
}

function getProjectPickerUploads() {
  revokeUrls(state.projectPickerThumbUrls);
  return state.sessionUploads.map((file, index) => normalizeProjectAsset({
    name: file.name || `上传图片 ${index + 1}`,
    url: (() => {
      const url = URL.createObjectURL(file);
      state.projectPickerThumbUrls.push(url);
      return url;
    })(),
    localFileIndex: index,
    size: file.size,
    updatedAt: file.lastModified ? new Date(file.lastModified).toISOString() : '',
  }, 'upload', index));
}

function renderProjectPicker(assets = state.projectAssets) {
  const uploads = getProjectPickerUploads();
  const generated = (assets.generated || []).filter(file => file?.url).slice(0, 24);
  state.projectPickerAssets = [...generated, ...uploads];
  projectPickerBody.innerHTML = `
    ${renderProjectPickerSection('最近生成', generated)}
    ${renderProjectPickerSection('会话上传', uploads)}
  `;
  projectPickerBody.querySelectorAll('[data-project-picker-asset]').forEach(btn => {
    btn.addEventListener('click', () => selectProjectPickerAsset(btn.dataset.projectPickerAsset));
  });
  updateProjectPickerFooter();
}

function renderProjectPickerSection(title, files = []) {
  const count = files.length;
  return `<section class="project-picker-section">
    <div class="project-picker-section-head">
      <h4>${escapeHtml(title)}</h4>
      <span>${count}</span>
    </div>
    ${count ? `<div class="project-picker-grid">${files.map(file => renderProjectPickerItem(file)).join('')}</div>` : '<div class="project-picker-empty">暂无素材。</div>'}
  </section>`;
}

function renderProjectPickerItem(file) {
  const id = projectAssetDomId(file.source, file);
  const title = projectAssetTitle(file);
  const selected = state.projectPickerSelectedIds.has(id);
  return `<button type="button" class="project-picker-item${selected ? ' selected' : ''}" data-project-picker-asset="${escapeAttr(id)}" aria-pressed="${selected ? 'true' : 'false'}">
    <img src="${escapeAttr(toAppUrl(file.url || ''))}" alt="${escapeAttr(title)}" />
    <span class="project-picker-check">✓</span>
    <strong>${escapeHtml(title)}</strong>
  </button>`;
}

function selectProjectPickerAsset(assetId) {
  const asset = state.projectPickerAssets.find(file => projectAssetDomId(file.source, file) === assetId) || findProjectAssetById(assetId);
  if (!asset?.url) {
    showToast('没有找到这张项目图片。', 'error');
    return;
  }
  if (state.projectPickerSelectedIds.has(assetId)) {
    state.projectPickerSelectedIds.delete(assetId);
  } else {
    state.projectPickerSelectedIds.add(assetId);
  }
  syncProjectPickerSelectionUi();
  updateProjectPickerFooter();
}

function syncProjectPickerSelectionUi() {
  projectPickerBody?.querySelectorAll('[data-project-picker-asset]').forEach(btn => {
    const selected = state.projectPickerSelectedIds.has(btn.dataset.projectPickerAsset);
    btn.classList.toggle('selected', selected);
    btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
}

function updateProjectPickerFooter() {
  const count = state.projectPickerSelectedIds?.size || 0;
  const targetText = state.projectPickerTarget === 'canvas' ? '加入画布' : '加入参考图';
  if (projectPickerSelectedCount) {
    projectPickerSelectedCount.textContent = count ? `已选择 ${count} 张图片` : '可多选图片';
  }
  if (projectPickerConfirmBtn) {
    projectPickerConfirmBtn.textContent = targetText;
    projectPickerConfirmBtn.disabled = count === 0;
  }
}

async function confirmProjectPickerSelection() {
  const selectedIds = Array.from(state.projectPickerSelectedIds);
  if (!selectedIds.length) return;
  const selectedAssets = selectedIds
    .map(assetId => state.projectPickerAssets.find(file => projectAssetDomId(file.source, file) === assetId) || findProjectAssetById(assetId))
    .filter(asset => asset?.url);

  if (!selectedAssets.length) {
    showToast('没有找到可导入的项目图片。', 'error');
    return;
  }

  projectPickerConfirmBtn.disabled = true;
  try {
    const files = await Promise.all(selectedAssets.map(asset => projectAssetToFile(asset)));
    if (state.projectPickerTarget === 'canvas') {
      addProjectPickerAssetsToCanvas(files, selectedAssets);
    } else {
      addProjectPickerAssetsToComposer(files);
    }
    closeProjectPicker();
  } catch (error) {
    showToast(`选择失败：${error.message}`, 'error');
    updateProjectPickerFooter();
  }
}

async function projectAssetToFile(asset) {
  if (asset.source === 'upload') {
    const file = state.sessionUploads[Number(asset.localFileIndex)];
    if (!file) throw new Error('会话上传图片已不可用');
    return file;
  }
  return fetchCanvasResultAsFile(asset);
}

function addProjectPickerAssetsToComposer(files) {
  appendImagesToComposer(files);
  showToast(`已加入 ${files.length} 张参考图。`, 'success');
}

function addProjectPickerAssetsToCanvas(files, assets = []) {
  addSessionUploads(files);
  const point = getCanvasAgentSpawnPoint();
  const node = addCanvasNode('image', {
    x: point.x,
    y: point.y,
    title: files.length > 1 ? `项目参考图 · ${files.length} 张` : assets[0]?.title || projectAssetTitle(assets[0]) || '项目参考图',
  });
  setCanvasNodeImages(node, files);
  state.canvas.selectedNodeId = node.id;
  pushCanvasAgentMessage('success', `已从项目加入 ${files.length} 张参考图。`);
}

function renderProjectAssets(assets = state.projectAssets) {
  revokeUrls(state.sessionUploadThumbUrls);
  const uploads = state.sessionUploads.map((file, index) => {
    const url = URL.createObjectURL(file);
    state.sessionUploadThumbUrls.push(url);
    return normalizeProjectAsset({
      name: file.name || `上传图片 ${index + 1}`,
      url,
      localFileIndex: index,
      size: file.size,
      updatedAt: file.lastModified ? new Date(file.lastModified).toISOString() : '',
    }, 'upload', index);
  });
  projectGeneratedCount.textContent = String(assets.generated.length);
  projectUploadsCount.textContent = String(uploads.length);
  applyProjectViewClasses();
  projectGeneratedGrid.innerHTML = assets.generated.length
    ? assets.generated.slice(0, 48).map(file => renderProjectImageCard(file, 'generated')).join('')
    : '<div class="project-empty">还没有生成图片。</div>';
  projectUploadsGrid.innerHTML = uploads.length
    ? uploads.map(file => renderProjectImageCard(file, 'upload')).join('')
    : '<div class="project-empty">本次会话还没有上传参考图。</div>';
  bindProjectAssetActions();
  scheduleProjectMasonryLayout();
}

function renderProjectImageCard(file, source) {
  const title = projectAssetTitle(file);
  const prompt = projectAssetPrompt(file);
  const meta = projectAssetMeta(file);
  const cardId = projectAssetDomId(source, file);
  return `<article class="project-card" data-project-card="${escapeAttr(cardId)}">
    <button type="button" class="project-card-preview" data-project-preview="${escapeAttr(cardId)}" title="预览图片">
      ${file.url ? `<img src="${escapeAttr(toAppUrl(file.url))}" alt="${escapeAttr(title)}" />` : '<div class="project-card-placeholder">图片</div>'}
    </button>
    <div class="project-card-meta">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(meta)}</span>
      ${prompt ? `<p>${escapeHtml(prompt)}</p>` : ''}
    </div>
    <button type="button" data-project-import="${escapeAttr(source)}" data-project-url="${escapeAttr(toAppUrl(file.url || ''))}" data-project-name="${escapeAttr(file.name || '')}" data-upload-index="${file.localFileIndex ?? ''}" data-project-title="${escapeAttr(title)}">加入画布</button>
  </article>`;
}

function setProjectView(view) {
  const allowed = ['grid', 'masonry', 'spotlight', 'list'];
  state.projectView = allowed.includes(view) ? view : 'grid';
  localStorage.setItem(PROJECT_VIEW_KEY, state.projectView);
  applyProjectViewClasses();
  scheduleProjectMasonryLayout();
}

function applyProjectViewClasses() {
  projectWorkspace?.setAttribute('data-project-view', state.projectView);
  document.querySelectorAll('.project-view-switch [data-project-view]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.projectView === state.projectView);
  });
}

function scheduleProjectMasonryLayout() {
  window.clearTimeout(state.projectMasonryTimer);
  state.projectMasonryTimer = window.setTimeout(layoutProjectMasonry, 60);
}

function layoutProjectMasonry() {
  const grids = [projectGeneratedGrid, projectUploadsGrid].filter(Boolean);
  grids.forEach(grid => {
    const cards = Array.from(grid.querySelectorAll('.project-card'));
    cards.forEach(card => card.style.gridRowEnd = '');
  });
  if (state.projectView !== 'masonry') return;
  grids.forEach(grid => {
    const style = window.getComputedStyle(grid);
    const rowHeight = parseFloat(style.gridAutoRows) || 8;
    const rowGap = parseFloat(style.rowGap) || 0;
    grid.querySelectorAll('.project-card').forEach(card => {
      const height = card.getBoundingClientRect().height;
      const span = Math.max(1, Math.ceil((height + rowGap) / (rowHeight + rowGap)));
      card.style.gridRowEnd = `span ${span}`;
    });
  });
}

function normalizeProjectAsset(file, source, index = 0) {
  const normalized = {
    ...file,
    source,
    assetId: `${source}-${index}-${String(file?.name || 'asset').replace(/[^a-zA-Z0-9_-]/g, '-')}`,
  };
  normalized.title = projectAssetTitle(normalized);
  return normalized;
}

function projectAssetDomId(source, file) {
  return file.assetId || `${source}-${String(file?.name || file?.url || 'asset').replace(/[^a-zA-Z0-9_-]/g, '-')}`;
}

function findProjectAssetById(assetId) {
  const uploads = state.sessionUploads.map((file, index) => normalizeProjectAsset({
    name: file.name || `上传图片 ${index + 1}`,
    url: state.sessionUploadThumbUrls[index] || '',
    localFileIndex: index,
    size: file.size,
    updatedAt: file.lastModified ? new Date(file.lastModified).toISOString() : '',
  }, 'upload', index));
  return [...state.projectAssets.generated, ...uploads].find(file => projectAssetDomId(file.source, file) === assetId);
}

function projectAssetTitle(file) {
  const prompt = projectAssetPrompt(file);
  if (prompt) return summarizeText(prompt, 28);
  return buildFriendlyAssetName(file?.name || '项目图片');
}

function projectAssetPrompt(file) {
  return String(file?.prompt || file?.metadata?.prompt || file?.metadata?.revisedPrompt || '').trim();
}

function projectAssetMeta(file) {
  const request = file?.request || file?.metadata?.request || {};
  const bits = [
    sourceLabel(file?.source),
    request.size,
    request.model,
    formatFileSize(file?.size || 0),
    formatProjectAssetDate(file?.updatedAt || file?.createdAt || file?.mtimeMs),
  ].filter(Boolean);
  return bits.join(' · ');
}

function sourceLabel(source) {
  if (source === 'upload') return '会话上传';
  if (source === 'generated') return '最近生成';
  return '项目素材';
}

function summarizeText(text, maxLength = 32) {
  const clean = String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/^(请|生成|创建|设计|帮我|make|create|generate)\s*/i, '')
    .trim();
  return clean.length > maxLength ? `${clean.slice(0, maxLength)}...` : clean || '未命名图片';
}

function buildFriendlyAssetName(name) {
  const clean = String(name || '项目图片')
    .replace(/\.[^.]+$/, '')
    .replace(/^(webui|edited|iopaint)-?/i, '')
    .replace(/^\d{10,}[-_]?/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return summarizeText(clean || '项目图片', 28);
}

function formatProjectAssetDate(value) {
  if (!value) return '';
  const date = typeof value === 'number' ? new Date(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function openProjectPreview(assetId) {
  const file = findProjectAssetById(assetId);
  if (!file?.url || !projectPreviewBackdrop) return;
  const title = projectAssetTitle(file);
  const prompt = projectAssetPrompt(file);
  const previewKey = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  state.projectPreview = { ...file, title };
  projectPreviewMedia.dataset.previewKey = previewKey;
  projectPreviewMedia.classList.remove('failed');
  projectPreviewMedia.classList.add('loading');
  projectPreviewMedia.innerHTML = `
    <div class="project-preview-loading">图片加载中...</div>
    <img src="${escapeAttr(toAppUrl(file.url))}" alt="${escapeAttr(title)}" decoding="async" />
  `;
  const previewImg = projectPreviewMedia.querySelector('img');
  const isCurrentPreview = () => projectPreviewMedia.dataset.previewKey === previewKey;
  const finishLoading = () => {
    if (!isCurrentPreview()) return;
    projectPreviewMedia.classList.remove('loading', 'failed');
    projectPreviewMedia.querySelector('.project-preview-loading')?.remove();
  };
  const showLoadError = () => {
    if (!isCurrentPreview()) return;
    projectPreviewMedia.classList.remove('loading');
    projectPreviewMedia.classList.add('failed');
    projectPreviewMedia.innerHTML = `
      <div class="project-preview-fallback">
        <strong>图片预览加载失败</strong>
        <span>可能是本地文件被移动、浏览器缓存失效，或图片地址暂时不可访问。</span>
        <a href="${escapeAttr(toAppUrl(file.url))}" target="_blank" rel="noreferrer">在新窗口打开</a>
      </div>
    `;
  };
  previewImg?.addEventListener('load', finishLoading, { once: true });
  previewImg?.addEventListener('error', showLoadError, { once: true });
  if (previewImg?.complete) {
    if (previewImg.naturalWidth > 0) finishLoading();
    else showLoadError();
  }
  projectPreviewSource.textContent = sourceLabel(file.source);
  projectPreviewTitle.textContent = title;
  projectPreviewPrompt.textContent = prompt || '暂无生成描述。';
  projectPreviewMeta.textContent = projectAssetMeta(file);
  projectPreviewCopyPromptBtn.disabled = !prompt;
  projectPreviewDownloadLink.href = toAppUrl(file.url);
  projectPreviewDownloadLink.download = file.name || title;
  projectPreviewBackdrop.hidden = false;
  document.body.classList.add('project-preview-open');
}

function closeProjectPreview() {
  if (!projectPreviewBackdrop) return;
  state.projectPreview = null;
  projectPreviewBackdrop.hidden = true;
  projectPreviewMedia.innerHTML = '';
  delete projectPreviewMedia.dataset.previewKey;
  projectPreviewMedia.classList.remove('loading', 'failed');
  document.body.classList.remove('project-preview-open');
}

async function copyProjectPreviewPrompt() {
  const prompt = String(projectPreviewPrompt?.textContent || '').trim();
  if (!prompt || prompt === '暂无生成描述。') {
    showToast('这张图片没有可复制的 Prompt。');
    return;
  }
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(prompt);
    } else {
      const buffer = document.createElement('textarea');
      buffer.value = prompt;
      buffer.setAttribute('readonly', '');
      buffer.style.position = 'fixed';
      buffer.style.inset = 'auto auto 0 0';
      buffer.style.opacity = '0';
      document.body.appendChild(buffer);
      buffer.select();
      document.execCommand('copy');
      buffer.remove();
    }
    showToast('Prompt 已复制。', 'success');
  } catch (_error) {
    showToast('浏览器不允许复制，请在详情里手动选择 Prompt。', 'error');
  }
}

async function importProjectPreviewToCanvas(asReference = false) {
  const file = state.projectPreview;
  if (!file) return;
  if (asReference && file.source !== 'upload') {
    setAppMode('canvas');
    try {
      const point = getCanvasAgentSpawnPoint();
      const imageFile = await fetchCanvasResultAsFile(file);
      const node = addCanvasNode('image', { x: point.x, y: point.y, title: file.title || projectAssetTitle(file) });
      setCanvasNodeImages(node, [imageFile]);
      state.canvas.selectedNodeId = node.id;
      closeProjectPreview();
    } catch (error) {
      showToast(`加入参考图失败：${error.message}`, 'error');
    }
    return;
  }
  await importProjectAssetPayload({
    source: asReference ? 'upload' : file.source,
    url: file.url,
    name: file.name,
    title: file.title || projectAssetTitle(file),
    uploadIndex: file.localFileIndex,
  });
}

function formatFileSize(size) {
  const bytes = Number(size) || 0;
  if (!bytes) return '0 KB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

function bindProjectAssetActions() {
  document.querySelectorAll('[data-project-import]').forEach(btn => {
    btn.addEventListener('click', () => importProjectAssetToCanvas(btn));
  });
  document.querySelectorAll('[data-project-preview]').forEach(btn => {
    btn.addEventListener('click', () => openProjectPreview(btn.dataset.projectPreview));
  });
  document.querySelectorAll('.project-card-preview img').forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', scheduleProjectMasonryLayout, { once: true });
    img.addEventListener('error', scheduleProjectMasonryLayout, { once: true });
  });
}

async function importProjectAssetToCanvas(btn) {
  await importProjectAssetPayload({
    source: btn.dataset.projectImport,
    url: btn.dataset.projectUrl,
    name: btn.dataset.projectName,
    title: btn.dataset.projectTitle,
    uploadIndex: btn.dataset.uploadIndex,
  });
}

async function importProjectAssetPayload(payload = {}) {
  setAppMode('canvas');
  const source = payload.source;
  const point = getCanvasAgentSpawnPoint();
  if (source === 'upload') {
    const file = state.sessionUploads[Number(payload.uploadIndex)];
    if (!file) return;
    const node = addCanvasNode('image', { x: point.x, y: point.y, title: payload.title || '项目上传图' });
    setCanvasNodeImages(node, [file]);
    state.canvas.selectedNodeId = node.id;
    closeProjectPreview();
    return;
  }
  const file = {
    name: payload.name || payload.title || '项目图片',
    url: payload.url,
  };
  const node = addCanvasNode('result', {
    x: point.x,
    y: point.y,
    title: payload.title || '项目素材',
    files: [file],
    status: '来自项目页',
  });
  selectCanvasResultImage(node.id, 0);
  closeProjectPreview();
}

function setCanvasAssetImporting(importing) {
  canvasImportOutputBtn.disabled = importing;
  canvasImportOutputBtn.textContent = importing ? '读取中' : '导入';
  canvasAgentAddBtn.disabled = importing || state.isGenerating;
  if (importing) closeCanvasAgentAddMenu();
}

async function runCanvasImageEdit(nodeId) {
  if (state.isGenerating) return;
  const resultNode = getCanvasNode(nodeId);
  const active = state.canvas.activeImage;
  const fileMeta = active?.nodeId === nodeId ? resultNode?.files?.[Number(active.fileIndex) || 0] : resultNode?.files?.[0];
  if (!resultNode || !fileMeta?.url) return;

  const paramsNode = state.canvas.nodes.find(node => node.type === 'params');
  const params = normalizeCanvasParams(paramsNode);
  const userPrompt = String(state.canvas.quickEditPrompt || '').trim();
  const editor = getCanvasImageEditor(resultNode, Number(active?.fileIndex) || 0);
  const editorInstruction = buildCanvasEditorInstruction(editor);
  const prompt = buildCanvasEditPrompt(
    state.canvas.quickEditTool || 'quick',
    [userPrompt, editorInstruction].filter(Boolean).join('\n\n'),
    params.size,
  );

  const formData = new FormData();
  formData.append('mode', 'edit');
  formData.append('prompt', withSizeLayoutInstruction(prompt, params.size));
  const provider = state.providers.find(item => item.id === params.provider) || getSelectedProvider();
  formData.append('provider', provider?.id || params.provider || providerSelect.value);
  if (provider?.custom) {
    formData.append('providerConfig', JSON.stringify({
      id: provider.id,
      name: provider.name,
      baseUrl: provider.baseUrl,
      fallbackBaseUrl: provider.fallbackBaseUrl,
      apiKey: provider.apiKey,
      model: provider.model,
    }));
  }
  formData.append('model', params.model);
  formData.append('size', params.size);
  formData.append('quality', params.quality);
  formData.append('background', params.background);
  formData.append('n', params.n);
  formData.append('timeout', params.timeout);

  setGenerating(true);
  updateCanvasNodeStatus(resultNode, '正在按参考图生成编辑版本...', 'success');
  try {
    const imageFile = await fetchCanvasResultAsFile(fileMeta);
    formData.append('images', imageFile);
    const response = await fetch(apiUrl('/api/generate'), { method: 'POST', body: formData });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(formatGenerateError(data));
    const editedNode = addCanvasNode('result', {
      x: resultNode.x + 360,
      y: resultNode.y,
      title: '编辑结果',
      files: data.outputFiles || [],
      status: `${data.outputFiles?.length || 0} 张编辑结果 · ${params.model} · ${params.size}`,
    });
    connectCanvasNodes(resultNode.id, editedNode.id);
    state.canvas.activeImage = { nodeId: editedNode.id, fileIndex: 0 };
    updateCanvasNodeStatus(resultNode, '编辑版本已生成', 'success');
    invalidateProjectAssets();
  } catch (error) {
    updateCanvasNodeStatus(resultNode, error.message, 'error');
  }
  setGenerating(false);
  renderCanvas();
}

function buildCanvasEditPrompt(tool, userPrompt, size) {
  const base = userPrompt || '基于参考图进行自然编辑，保持主体身份、画面质感和构图一致。';
  const presets = {
    quick: '对参考图进行快捷编辑，保留原图主体和整体风格。',
    background: '移除或替换背景，主体边缘自然干净，保留主体细节。',
    erase: '根据用户要求擦除或局部重绘指定区域，保持光影、纹理和透视一致。',
    elements: '把画面中的主要人物、文字或物体当作可编辑元素处理，按要求调整元素内容、位置或状态，并保持整体真实自然。',
    text: '重点修正或替换画面中的文字，确保文字清晰、准确、排版自然。',
    angles: '基于参考图生成同一主体的多角度视图，保持服装、身份、比例和风格一致。',
  };
  const layout = getSizeLayoutInstruction(size);
  return [presets[tool] || presets.quick, base, layout].filter(Boolean).join('\n');
}

function buildCanvasEditorInstruction(editor) {
  if (!editor) return '';
  const lines = [];
  const elements = (editor.layers || []).filter(layer => layer.type === 'elements');
  const texts = (editor.layers || []).filter(layer => layer.type === 'text');
  if (editor.selection) {
    lines.push(`当前选区：${describeUnitRect(editor.selection)}。局部编辑时只处理这个区域，尽量不要改动选区外内容。`);
  }
  if (elements.length) {
    lines.push(`元素图层：${elements.map(layer => `${layer.name || '元素'} 位于 ${describeUnitRect(layer)}`).join('；')}。把这些图层当作可编辑主体，按当前位置/用户要求调整，背景需要自然补全。`);
  }
  if (texts.length) {
    lines.push(`文字图层：${texts.map(layer => `文字“${layer.text || ''}”位于 ${describeUnitRect(layer)}`).join('；')}。请直接在图片中按这些位置和内容编辑文字，保持字体、透视、排版和背景纹理自然。`);
  }
  return lines.join('\n');
}

function describeUnitRect(rect) {
  const x = Math.round(rect.x * 100);
  const y = Math.round(rect.y * 100);
  const width = Math.round(rect.width * 100);
  const height = Math.round(rect.height * 100);
  return `左 ${x}%，上 ${y}%，宽 ${width}%，高 ${height}%`;
}

async function fetchCanvasResultAsFile(fileMeta) {
  const response = await fetch(fileMeta.url);
  if (!response.ok) throw new Error('无法读取结果图片');
  const blob = await response.blob();
  const extension = blob.type?.split('/')[1] || 'png';
  const name = fileMeta.name || `canvas-reference.${extension}`;
  return new File([blob], name, { type: blob.type || 'image/png' });
}

async function runCanvasGenerate(generateNodeId) {
  if (state.isGenerating) return { ok: false, error: '已有生成任务进行中' };
  const generateNode = getCanvasNode(generateNodeId);
  if (!generateNode) return { ok: false, error: '找不到生成节点' };
  const graphData = collectCanvasGraphData(generateNodeId);
  const paramsNode = graphData.paramsNode || state.canvas.nodes.find(node => node.type === 'params');
  const prompt = graphData.prompts.join('\n\n');
  const images = graphData.images;
  const params = normalizeCanvasParams(paramsNode);

  if (!prompt) {
    updateCanvasGenerateStatus(generateNode, '请先连接并填写文本、模板或 Prompt 优化节点', 'error');
    return { ok: false, error: '请先连接并填写文本、模板或 Prompt 优化节点' };
  }

  const formData = new FormData();
  formData.append('prompt', withSizeLayoutInstruction(prompt, params.size));
  formData.append('mode', images.length ? 'edit' : 'generate');
  const provider = state.providers.find(item => item.id === params.provider) || getSelectedProvider();
  formData.append('provider', provider?.id || params.provider || providerSelect.value);
  if (provider?.custom) {
    formData.append('providerConfig', JSON.stringify({
      id: provider.id,
      name: provider.name,
      baseUrl: provider.baseUrl,
      fallbackBaseUrl: provider.fallbackBaseUrl,
      apiKey: provider.apiKey,
      model: provider.model,
    }));
  }
  formData.append('model', params.model);
  formData.append('size', params.size);
  formData.append('quality', params.quality);
  formData.append('background', params.background);
  formData.append('n', params.n);
  formData.append('timeout', params.timeout);
  images.forEach(file => formData.append('images', file));

  setGenerating(true);
  updateCanvasGenerateStatus(generateNode, '生成中...', '');
  try {
    const response = await fetch(apiUrl('/api/generate'), { method: 'POST', body: formData });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(formatGenerateError(data));
    }
    const resultNode = addCanvasNode('result', {
      x: generateNode.x + 360,
      y: generateNode.y,
      files: data.outputFiles || [],
      status: `${data.outputFiles?.length || 0} 张结果 · ${params.model} · ${params.size}`,
    });
    connectCanvasNodes(generateNode.id, resultNode.id);
    selectCanvasResultImage(resultNode.id, 0);
    updateCanvasGenerateStatus(generateNode, '生成完成', 'success');
    invalidateProjectAssets();
    setGenerating(false);
    renderCanvas();
    return { ok: true, node: resultNode, files: data.outputFiles || [], data };
  } catch (error) {
    updateCanvasGenerateStatus(generateNode, error.message, 'error');
    setGenerating(false);
    renderCanvas();
    return { ok: false, error: error.message };
  }
}

async function runCanvasPromptOptimize(nodeId) {
  const node = getCanvasNode(nodeId);
  if (!node || node.statusKind === 'loading') return;
  const graphData = collectCanvasGraphData(nodeId, { excludeNodeIds: new Set([nodeId]) });
  const originalPrompt = graphData.prompts.join('\n\n').trim() || String(node.output || '').trim();
  if (!originalPrompt) {
    updateCanvasNodeStatus(node, '请先连接文本或模板节点', 'error');
    return;
  }

  updateCanvasNodeStatus(node, '优化中...', 'loading');
  try {
    const res = await fetch(apiUrl('/api/prompt-assist'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'improve',
        originalPrompt,
        category: '',
        subject: '',
        targetUse: '',
        style: node.style || '',
        constraints: node.constraints || '',
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.detail || data.error || '优化失败');
    node.output = data.prompt || '';
    updateCanvasNodeStatus(node, `已优化 · ${data.model || 'prompt assistant'}`, 'success');
  } catch (error) {
    updateCanvasNodeStatus(node, error.message, 'error');
  }
}

function collectCanvasGraphData(targetNodeId, options = {}) {
  const excludeNodeIds = options.excludeNodeIds || new Set();
  const visited = new Set();
  const prompts = [];
  const images = [];
  let paramsNode = null;

  function visit(nodeId) {
    if (!nodeId || visited.has(nodeId)) return;
    visited.add(nodeId);
    const incomingIds = state.canvas.edges
      .filter(edge => edge.to === nodeId)
      .map(edge => edge.from);
    incomingIds.forEach(visit);
    if (excludeNodeIds.has(nodeId)) return;

    const node = getCanvasNode(nodeId);
    if (!node) return;
    if (node.type === 'text') {
      pushPrompt(node.text || node.prompt);
    } else if (node.type === 'template') {
      pushPrompt(node.prompt || selectedCanvasTemplatePrompt(node.templateIndex));
    } else if (node.type === 'optimize') {
      pushPrompt(node.output);
    } else if (node.type === 'image') {
      images.push(...(node.files || []));
    } else if (node.type === 'params') {
      paramsNode = node;
    }
  }

  function pushPrompt(value) {
    const text = String(value || '').trim();
    if (text) prompts.push(text);
  }

  visit(targetNodeId);
  return { prompts, images, paramsNode };
}

function normalizeCanvasParams(node) {
  return {
    provider: node?.provider || providerSelect.value || 'figure',
    model: String(node?.model || modelSelect.value || 'gpt-image-2').trim() || 'gpt-image-2',
    size: resolveCanvasNodeSize(node),
    quality: ['high', 'medium', 'low'].includes(node?.quality) ? node.quality : qualitySelect.value,
    background: ['opaque', 'transparent'].includes(node?.background) ? node.background : backgroundSelect.value,
    n: String(clampInputValue(node?.n, 1, 4, 1)),
    timeout: String(clampInputValue(node?.timeout, 30, 900, 600)),
  };
}

function updateCanvasGenerateStatus(node, status, kind) {
  node.status = status;
  node.statusKind = kind;
  renderCanvas();
}

function updateCanvasNodeStatus(node, status, kind) {
  node.status = status;
  node.statusKind = kind;
  renderCanvas();
}

function getCanvasNode(nodeId) {
  return state.canvas.nodes.find(node => node.id === nodeId);
}

// Upload handling
pickImagesBtn.addEventListener('click', () => imagesInput.click());
pickMaskBtn.addEventListener('click', () => maskInput.click());
imagesInput.addEventListener('change', () => {
  replaceComposerImages(Array.from(imagesInput.files || []));
});
maskInput.addEventListener('change', () => {
  state.uploadedMask = maskInput.files?.[0] || null;
  renderMaskThumbs();
});

setupDropZone(imagesDropZone, imagesDropSurface, true, (files) => {
  replaceComposerImages(files);
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

  await enterCanvasFromChat(prompt, { generate: true });
}

async function enterCanvasFromChat(prompt, options = {}) {
  if (!prompt) {
    promptInput.focus();
    return null;
  }
  const uploadedImages = state.uploadedImages.slice();
  const hasImages = uploadedImages.length > 0;
  let imageNode = null;

  canvasAgentInput.value = prompt;
  canvasAgentInput.dispatchEvent(new Event('input'));
  promptInput.value = '';
  resizePromptInput();
  closeDrawer();
  setAppMode('canvas');

  if (hasImages) {
    addSessionUploads(uploadedImages);
    const point = getCanvasAgentSpawnPoint();
    imageNode = addCanvasNode('image', {
      x: point.x,
      y: point.y + 220,
      title: '聊天参考图',
    });
    setCanvasNodeImages(imageNode, uploadedImages);
    state.canvas.selectedNodeId = imageNode.id;
    clearAttachments();
  }

  canvasAgentInput.focus();
  if (options.plan) {
    await planCanvasAgentPrompt({ imageNodeId: imageNode?.id, skipImplicitImage: true });
  }
  if (options.generate) {
    await runCanvasAgentGenerate({ imageNodeId: imageNode?.id, skipImplicitImage: true, forcePlan: true });
  }
  showToast(hasImages ? '已进入画布，参考图已放入生成工作流。' : '已进入画布，正在生成工作流。', 'success');
  return true;
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

function formatGenerateError(data = {}) {
  const failure = data.failure || {};
  const title = failure.title || data.error || '生成失败';
  const detail = failure.message || data.detail || data.error || '生成失败';
  const requestId = data.requestId ? `\n请求 ID：${data.requestId}` : '';
  return `${title}：${detail}${requestId}`;
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
  ).join('')}</div><div class="result-card-meta"><div class="result-card-info"><span class="result-card-name">${escapeHtml(files[0].name)}${files.length > 1 ? ` 等 ${files.length} 张` : ''}</span><span class="result-card-sub">${escapeHtml(modelSelect.value)} · ${escapeHtml(getSelectedSize())}</span></div><div class="result-card-actions">${files.map(f =>
    `<a href="${escapeAttr(f.url)}" target="_blank" rel="noreferrer">查看</a><button type="button" data-chat-canvas-edit="${escapeAttr(f.url)}">到画布编辑</button>`
  ).join('')}</div></div></div></div>
  </div>`;
  resultsThread.appendChild(el);
  el.querySelectorAll('[data-chat-canvas-edit]').forEach((btn, index) => {
    btn.addEventListener('click', () => sendChatResultToCanvas(files[index]));
  });
}

function sendChatResultToCanvas(file) {
  setAppMode('canvas');
  const resultNode = addCanvasNode('result', {
    x: 160,
    y: 120,
    files: [file],
    status: '来自聊天模式的结果',
  });
  selectCanvasResultImage(resultNode.id, 0);
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

function setupComposerDropTarget() {
  if (!composer) return;

  ['dragenter', 'dragover'].forEach(type => {
    composer.addEventListener(type, (e) => {
      if (!hasDraggedImages(e)) return;
      e.preventDefault();
      e.stopPropagation();
      composer.classList.add('dragover');
      e.dataTransfer.dropEffect = 'copy';
    });
  });

  ['dragleave', 'dragend'].forEach(type => {
    composer.addEventListener(type, (e) => {
      if (type === 'dragleave' && composer.contains(e.relatedTarget)) return;
      composer.classList.remove('dragover');
    });
  });

  composer.addEventListener('drop', (e) => {
    if (!hasDraggedImages(e)) return;
    e.preventDefault();
    e.stopPropagation();
    composer.classList.remove('dragover');
    const files = getImageFilesFromDataTransfer(e.dataTransfer);
    if (!files.length) return;
    appendImagesToComposer(files);
    showToast(`已加入 ${files.length} 张参考图。`, 'success');
  });
}

function resizePromptInput() {
  if (!promptInput) return;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 720;
  const maxHeight = Math.max(132, Math.min(360, Math.floor(viewportHeight * 0.34)));
  promptInput.style.height = 'auto';
  const nextHeight = Math.min(promptInput.scrollHeight, maxHeight);
  promptInput.style.height = `${nextHeight}px`;
  promptInput.style.overflowY = promptInput.scrollHeight > maxHeight ? 'auto' : 'hidden';
}

function hasDraggedImages(e) {
  const types = Array.from(e.dataTransfer?.types || []);
  if (types.includes('Files')) return true;
  const items = Array.from(e.dataTransfer?.items || []);
  if (items.some(item => item.kind === 'file' && item.type.startsWith('image/'))) return true;
  return Array.from(e.dataTransfer?.files || []).some(file => file.type.startsWith('image/'));
}

function getImageFilesFromDataTransfer(dataTransfer) {
  return Array.from(dataTransfer?.files || []).filter(file => file.type.startsWith('image/'));
}

function appendImagesToComposer(files) {
  const imageFiles = Array.from(files || []).filter(file => file?.type?.startsWith('image/'));
  if (!imageFiles.length) return;
  state.uploadedImages = [...state.uploadedImages, ...imageFiles];
  addSessionUploads(imageFiles);
  syncImagesInputFiles();
  renderUploadState();
}

function replaceComposerImages(files) {
  state.uploadedImages = Array.from(files || []).filter(file => file?.type?.startsWith('image/'));
  addSessionUploads(state.uploadedImages);
  syncImagesInputFiles();
  renderUploadState();
}

function syncImagesInputFiles() {
  try {
    const dt = new DataTransfer();
    state.uploadedImages.forEach(file => dt.items.add(file));
    imagesInput.files = dt.files;
  } catch (error) {
    // Some WebKit contexts block programmatic FileList creation; app state still owns uploads.
  }
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
  composerAttachments.classList.toggle('has-multiple', state.uploadedImages.length > 1);
  composerAttachments.dataset.count = state.uploadedImages.length > 1 ? `×${state.uploadedImages.length}` : '';
  state.uploadedImages.forEach((file, i) => {
    const url = state.imageThumbUrls[i] || URL.createObjectURL(file);
    const thumb = document.createElement('div');
    thumb.className = 'attachment-thumb';
    thumb.style.setProperty('--stack-index', String(Math.min(i, 3)));
    thumb.innerHTML = `<img src="${escapeAttr(url)}" alt="${escapeAttr(file.name)}" /><button class="remove-btn" data-index="${i}" title="移除参考图">&times;</button>`;
    thumb.querySelector('.remove-btn').addEventListener('click', () => {
      state.uploadedImages.splice(i, 1);
      syncImagesInputFiles();
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
  composerAttachments.classList.remove('has-multiple');
  composerAttachments.dataset.count = '';
  imagesThumbGrid.innerHTML = '';
  maskThumbWrap.innerHTML = '';
}

function revokeUrls(urls) {
  while (urls.length) URL.revokeObjectURL(urls.pop());
}

// --- Templates ---

async function loadProviders() {
  try {
    const res = await fetch(apiUrl('/api/providers'));
    const data = await res.json();
    if (!data.ok) throw new Error('加载失败');

    state.builtInProviders = (data.providers || []).map(provider => ({
      ...provider,
      builtIn: true,
      custom: false,
    }));
  } catch (_error) {
    state.builtInProviders = [
      { id: 'figure', name: 'Figure (默认)', baseUrl: '', model: 'gpt-image-2', configured: false, builtIn: true, custom: false },
      { id: 'youmisub-image-2', name: 'youmisub-image-2', baseUrl: 'https://youmisub.cloud', model: 'gpt-image-2', configured: true, builtIn: true, custom: false },
    ];
  }
  state.customProviders = loadCustomProviders();
  renderProviderSelect();
}

providerSelect.addEventListener('change', () => {
  localStorage.setItem('imageProvider', providerSelect.value);
  applyProviderDefaults();
  renderProviderForm();
  renderProviderSummary();
  saveGenerationSettings();
});

saveProviderBtn.addEventListener('click', saveCustomProviderFromForm);
deleteProviderBtn.addEventListener('click', deleteSelectedCustomProvider);
resetProviderFormBtn.addEventListener('click', () => {
  clearProviderForm();
  customProviderName.focus();
});

[modelSelect, sizeSelect, customSizeInput, qualitySelect, backgroundSelect, nInput, timeoutInput].forEach(input => {
  input.addEventListener('change', saveGenerationSettings);
});
modelSelect.addEventListener('input', saveGenerationSettings);
customSizeInput.addEventListener('input', saveGenerationSettings);
sizeSelect.addEventListener('change', () => {
  updateCustomSizeVisibility();
  saveGenerationSettings();
});

function renderProviderSelect() {
  state.providers = [
    ...state.builtInProviders,
    ...state.customProviders.map(provider => ({ ...provider, builtIn: false, custom: true, configured: Boolean(provider.apiKey) })),
  ];

  const savedSettings = readGenerationSettings();
  const currentValue = savedSettings.provider || localStorage.getItem('imageProvider') || providerSelect.value || 'figure';
  const builtInOptions = state.builtInProviders.map(provider => providerOptionHtml(provider, currentValue)).join('');
  const customOptions = state.customProviders.map(provider => providerOptionHtml(provider, currentValue)).join('');

  providerSelect.innerHTML = [
    builtInOptions ? `<optgroup label="内置服务商">${builtInOptions}</optgroup>` : '',
    customOptions ? `<optgroup label="自定义服务商">${customOptions}</optgroup>` : '',
  ].join('');

  if (!state.providers.some(provider => provider.id === currentValue) && providerSelect.options.length) {
    providerSelect.selectedIndex = 0;
  }

  localStorage.setItem('imageProvider', providerSelect.value);
  renderProviderForm();
  renderProviderSummary();
  renderCanvas();
}

function providerOptionHtml(provider, selectedValue) {
  const selected = provider.id === selectedValue ? ' selected' : '';
  const status = provider.configured === false ? ' · 未配置 Key' : '';
  return `<option value="${escapeAttr(provider.id)}"${selected}>${escapeHtml(provider.name || provider.id)}${status}</option>`;
}

function loadCustomProviders() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_PROVIDERS_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeLocalProvider)
      .filter(provider => provider.name && provider.baseUrl && provider.apiKey);
  } catch (_error) {
    return [];
  }
}

function saveCustomProviders() {
  localStorage.setItem(CUSTOM_PROVIDERS_KEY, JSON.stringify(state.customProviders));
}

function normalizeLocalProvider(provider) {
  const name = String(provider?.name || '').trim();
  return {
    id: sanitizeLocalProviderId(provider?.id || name),
    name,
    baseUrl: normalizeLocalBaseUrl(provider?.baseUrl || provider?.apiUrl || ''),
    fallbackBaseUrl: normalizeLocalBaseUrl(provider?.fallbackBaseUrl || ''),
    apiKey: String(provider?.apiKey || '').trim(),
    model: String(provider?.model || 'gpt-image-2').trim() || 'gpt-image-2',
  };
}

function sanitizeLocalProviderId(value) {
  const id = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 52);
  return id.startsWith('custom-') ? id : `custom-${id || Date.now()}`;
}

function normalizeLocalBaseUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '').replace(/\/v1$/, '');
}

function getSelectedProvider() {
  return state.providers.find(provider => provider.id === providerSelect.value) || state.providers[0] || null;
}

function applyProviderDefaults() {
  const provider = getSelectedProvider();
  if (provider?.model) {
    modelSelect.value = provider.model;
  }
}

function renderProviderSummary() {
  const provider = getSelectedProvider();
  if (!provider) {
    providerSummary.textContent = '暂无可用服务商';
    providerSummary.classList.add('warning');
    return;
  }

  const source = provider.custom ? '自定义' : '内置';
  const configured = provider.configured === false ? '未配置 Key' : '已配置';
  providerSummary.textContent = `${source} · ${configured} · ${provider.baseUrl || '未填写 URL'} · ${provider.model || 'gpt-image-2'}`;
  providerSummary.classList.toggle('warning', provider.configured === false);
}

function renderProviderForm() {
  const provider = getSelectedProvider();
  const editable = Boolean(provider?.custom);
  const source = editable ? provider : null;
  state.editingProviderId = source?.id || null;

  customProviderName.value = source?.name || '';
  customProviderModel.value = source?.model || 'gpt-image-2';
  customProviderBaseUrl.value = source?.baseUrl || '';
  customProviderApiKey.value = source?.apiKey || '';
  customProviderFallbackUrl.value = source?.fallbackBaseUrl || '';
  deleteProviderBtn.disabled = !editable;
}

function clearProviderForm() {
  state.editingProviderId = null;
  customProviderName.value = '';
  customProviderModel.value = 'gpt-image-2';
  customProviderBaseUrl.value = '';
  customProviderApiKey.value = '';
  customProviderFallbackUrl.value = '';
  deleteProviderBtn.disabled = true;
}

function saveCustomProviderFromForm() {
  const provider = normalizeLocalProvider({
    id: state.editingProviderId || customProviderName.value,
    name: customProviderName.value,
    model: customProviderModel.value,
    baseUrl: customProviderBaseUrl.value,
    fallbackBaseUrl: customProviderFallbackUrl.value,
    apiKey: customProviderApiKey.value,
  });

  if (!provider.name) {
    providerSummary.textContent = '请填写服务商名称';
    providerSummary.classList.add('warning');
    return;
  }
  if (!/^https?:\/\//i.test(provider.baseUrl)) {
    providerSummary.textContent = 'API URL 需要以 http:// 或 https:// 开头';
    providerSummary.classList.add('warning');
    return;
  }
  if (!provider.apiKey) {
    providerSummary.textContent = '请填写 API Key';
    providerSummary.classList.add('warning');
    return;
  }

  const existingIndex = state.customProviders.findIndex(item => item.id === provider.id);
  if (existingIndex >= 0) state.customProviders[existingIndex] = provider;
  else state.customProviders.push(provider);

  saveCustomProviders();
  state.customProviders = loadCustomProviders();
  renderProviderSelect();
  providerSelect.value = provider.id;
  state.editingProviderId = provider.id;
  localStorage.setItem('imageProvider', provider.id);
  applyProviderDefaults();
  renderProviderForm();
  renderProviderSummary();
  saveGenerationSettings();
}

function deleteSelectedCustomProvider() {
  const provider = getSelectedProvider();
  if (!provider?.custom) return;
  state.customProviders = state.customProviders.filter(item => item.id !== provider.id);
  saveCustomProviders();
  renderProviderSelect();
  clearProviderForm();
  renderProviderSummary();
  saveGenerationSettings();
}

function getSelectedSize() {
  const size = sizeSelect.value === 'custom' ? customSizeInput.value.trim() : sizeSelect.value;
  return /^\d{2,5}x\d{2,5}$/i.test(size) ? size.toLowerCase() : '1536x1024';
}

function withSizeLayoutInstruction(prompt, size) {
  const instruction = getSizeLayoutInstruction(size);
  return instruction ? `${prompt.trim()}\n\n${instruction}` : prompt;
}

function getSizeLayoutInstruction(size) {
  const match = String(size || '').toLowerCase().match(/^(\d{2,5})x(\d{2,5})$/);
  if (!match) return '';

  const width = Number.parseInt(match[1], 10);
  const height = Number.parseInt(match[2], 10);
  if (!width || !height) return '';

  const ratio = `${width}:${height}`;
  const base = `系统尺寸约束：最终输出必须严格匹配 ${width}x${height} 像素，按 ${ratio} 画布构图。`;
  if (width > height) {
    return `${base} 这是横向画布，请使用横版构图，主体、标题、背景和留白都按横向画面排布；不要竖版海报，不要把竖版画面嵌在横向画布中，不要左右大面积空白。`;
  }
  if (height > width) {
    return `${base} 这是竖向画布，请使用竖版构图，主体、标题、背景和留白都按竖向画面排布；不要横版宽幅构图，不要把横向画面嵌在竖向画布中，不要上下大面积空白。`;
  }
  return `${base} 这是正方形画布，请使用正方形构图，主体和背景围绕 1:1 画面均衡排布；不要输出横版或竖版海报式画面。`;
}

function updateCustomSizeVisibility() {
  customSizeWrap.classList.toggle('hidden-field', sizeSelect.value !== 'custom');
}

function readGenerationSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') || {};
  } catch (_error) {
    return {};
  }
}

function loadGenerationSettings() {
  const settings = readGenerationSettings();
  if (settings.provider) {
    localStorage.setItem('imageProvider', settings.provider);
  }
  if (settings.model) modelSelect.value = settings.model;
  if (settings.size) {
    const hasOption = Array.from(sizeSelect.options).some(option => option.value === settings.size);
    if (hasOption) {
      sizeSelect.value = settings.size;
    } else {
      sizeSelect.value = 'custom';
      customSizeInput.value = settings.size;
    }
  }
  if (settings.quality) qualitySelect.value = settings.quality;
  if (settings.background) backgroundSelect.value = settings.background;
  if (settings.n) nInput.value = settings.n;
  if (settings.timeout) timeoutInput.value = String(settings.timeout) === '180' ? '600' : settings.timeout;
  updateCustomSizeVisibility();
}

function saveGenerationSettings() {
  const settings = {
    provider: providerSelect.value,
    model: modelSelect.value.trim() || 'gpt-image-2',
    size: getSelectedSize(),
    quality: qualitySelect.value,
    background: backgroundSelect.value,
    n: clampInputValue(nInput.value, 1, 4, 1),
    timeout: clampInputValue(timeoutInput.value, 30, 900, 600),
  };
  nInput.value = settings.n;
  timeoutInput.value = settings.timeout;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  localStorage.setItem('imageProvider', settings.provider);
  syncCanvasAgentControls();
}

function clampInputValue(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function loadPresets() {
  try {
    const res = await fetch(apiUrl('/api/presets'));
    const data = await res.json();
    if (!data.ok) throw new Error('加载失败');
    renderPresets(data.categories || []);
  } catch (e) {
    templatesBody.innerHTML = `<div class="muted">模板加载失败</div>`;
  }
}

function renderPresets(categories) {
  let html = '';

  categories.forEach(group => {
    const cat = group.category || '未分类';
    const items = group.items || [];
    html += `<div class="gallery-section"><div class="gallery-section-title">${escapeHtml(cat)} (${items.length})</div><div class="gallery-templates">${items.map(t => `
      <div class="gallery-template-card" data-prompt="${escapeAttr(t.prompt || '')}">
        <img src="${t.image || ''}" alt="${escapeHtml(t.title || '')}" loading="lazy" />
        <div class="card-info">
          <div class="card-title">${escapeHtml(t.title || '')}</div>
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
    const res = await fetch(apiUrl('/api/prompt-assist'), {
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
    const res = await fetch(apiUrl('/api/prompt-assist'), {
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
  if (!statusDot) return;
  try {
    const res = await fetch(apiUrl('/api/health'));
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
    const res = await fetch(apiUrl('/api/logs'));
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

function isEditableTarget(target) {
  return Boolean(target?.closest?.('input, textarea, select, [contenteditable="true"]'));
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
loadThemePreference();
checkHealth();
loadAccountState();
loadGenerationSettings();
loadProviders();
loadPresets();
renderCanvasAgentControls();
setAppMode(state.appMode);
resizePromptInput();
