const imageEl = document.getElementById('editableImage');
const imageFrame = document.getElementById('imageFrame');
const canvasStage = document.getElementById('canvasStage');
const imageTitle = document.getElementById('imageTitle');
const imageSize = document.getElementById('imageSize');
const layerOverlayRoot = document.getElementById('layerOverlayRoot');
const selectionBox = document.getElementById('selectionBox');
const busyOverlay = document.getElementById('busyOverlay');
const busyText = document.getElementById('busyText');
const taskPanel = document.getElementById('taskPanel');
const panelTitle = document.getElementById('panelTitle');
const panelBody = document.getElementById('panelBody');
const panelCloseBtn = document.getElementById('panelCloseBtn');
const saveStatus = document.getElementById('saveStatus');
const saveImageBtn = document.getElementById('saveImageBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomResetBtn = document.getElementById('zoomResetBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomLabel = document.getElementById('zoomLabel');
const toolButtons = Array.from(document.querySelectorAll('.tool-button[data-tool]'));

const params = new URLSearchParams(window.location.search);
const imageUrl = params.get('image') || '';
const imageName = params.get('name') || imageUrl.split('/').pop() || 'Image';
const CUSTOM_PROVIDERS_KEY = 'imageProviders';
const SETTINGS_KEY = 'imageGenerationSettings';

const state = {
  tool: 'elements',
  scale: 1,
  fitScale: 1,
  zoom: 1,
  naturalWidth: 0,
  naturalHeight: 0,
  selection: null,
  layers: [
    { id: 'image', name: '整张图片', type: 'image', bounds: null, visible: true },
  ],
  selectedLayerId: 'image',
  draggingLayer: null,
};

const PANEL_HELP = {
  noSelection: '<div class="quick-hint">先在图片上拖拽框选一个主体、文字或局部区域，再执行这个操作。</div>',
  selection: () => `<span class="selection-chip">当前选区 ${state.selection.width} × ${state.selection.height}</span>`,
};

const panels = {
  upscale: {
    title: '放大',
    body: () => `
      <div class="quick-card">
        <p>用当前服务商生成高清修复版本。它会尽量保持内容一致，只做清晰度和细节增强。</p>
        <div class="quick-grid">
          <button class="quick-option active" data-scale="2">2x</button>
          <button class="quick-option" data-scale="4">4x</button>
        </div>
        <button class="quick-action primary" data-action="upscale">开始放大</button>
      </div>
    `,
  },
  'remove-bg': {
    title: '去背景',
    body: () => `
      <div class="quick-card">
        <p>保留主体和边缘细节，输出透明背景 PNG。会使用当前服务商发起一次改图请求。</p>
        <button class="quick-action primary" data-action="remove-bg">去除背景</button>
      </div>
    `,
  },
  eraser: {
    title: '橡皮工具',
    body: () => `
      <div class="quick-card">
        <p>在图片上拖拽框选要擦除的区域，然后使用 AI 补全背景。当前会基于选区生成 mask。</p>
        ${state.selection ? PANEL_HELP.selection() : PANEL_HELP.noSelection}
        <textarea class="quick-textarea" id="erasePrompt" placeholder="例如：擦除这段文字，自然补全背景"></textarea>
        <button class="quick-action primary" data-action="erase" ${state.selection ? '' : 'disabled'}>擦除选区</button>
        <button class="quick-action ghost" data-action="clear-selection" ${state.selection ? '' : 'disabled'}>清除选区</button>
      </div>
    `,
  },
  elements: {
    title: '编辑元素',
    body: () => `
      <div class="quick-card">
        <p>编辑元素就是分层。先框选主体或物体，添加为选区元素；之后可以基于这个元素做局部重绘。</p>
        ${state.selection ? PANEL_HELP.selection() : PANEL_HELP.noSelection}
        <button class="quick-action primary" data-action="add-layer" ${state.selection ? '' : 'disabled'}>将选区添加为元素</button>
        <button class="quick-action ghost" data-action="redraw-layer" ${getSelectedLayer()?.bounds ? '' : 'disabled'}>重绘当前元素</button>
        <button class="quick-action ghost" data-action="toggle-layer" ${state.selectedLayerId !== 'image' ? '' : 'disabled'}>${getSelectedLayer()?.visible === false ? '显示当前元素' : '隐藏当前元素'}</button>
        <button class="quick-action ghost" data-action="delete-layer" ${state.selectedLayerId !== 'image' ? '' : 'disabled'}>删除当前元素</button>
        <div class="layer-list">
          ${state.layers.map(layer => `
            <button class="layer-item${layer.id === state.selectedLayerId ? ' active' : ''}" data-layer-id="${escapeAttr(layer.id)}">
              <span class="layer-main">
                ${layer.preview ? `<img class="layer-thumb" src="${escapeAttr(layer.preview)}" alt="" />` : '<span class="layer-thumb placeholder"></span>'}
                <span>${escapeHtml(layer.name)}</span>
              </span>
              <span class="layer-meta">${layer.visible === false ? '隐藏' : escapeHtml(layer.type)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `,
  },
  text: {
    title: '编辑文字',
    body: () => `
      <div class="quick-card">
        <p>输入希望替换成的文字。框选文字区域后会更稳；不框选时会让模型自行定位图片文字。</p>
        ${state.selection ? PANEL_HELP.selection() : '<div class="quick-hint">建议先框选文字区域，能减少模型误改主体和背景。</div>'}
        <input class="quick-input" id="textLine1" value="小黄 | 28岁 | 坚毅·正义·牺牲" />
        <input class="quick-input" id="textLine2" value="FRONT" />
        <input class="quick-input" id="textLine3" value="SIDE" />
        <input class="quick-input" id="textLine4" value="BACK" />
        <button class="quick-action primary" data-action="apply-text">立即使用</button>
      </div>
    `,
  },
  angles: {
    title: '多角度',
    body: () => `
      <div class="quick-card">
        <p>基于当前人物或物体生成多角度视图。适合角色三视图、产品多视角和姿态变化。</p>
        <div class="quick-grid">
          <button class="quick-option active" data-angle="front-side-back">正侧背</button>
          <button class="quick-option" data-angle="turnaround">环绕视图</button>
        </div>
        <button class="quick-action primary" data-action="angles">生成多角度</button>
      </div>
    `,
  },
  move: {
    title: '移动对象',
    body: () => `
      <div class="quick-card">
        <p>选择元素后可以直接在画布上拖动；保存会合成当前位置。需要补全原背景时，再使用 AI 移动。</p>
        ${getSelectedLayer()?.bounds ? PANEL_HELP.selection() : '<div class="quick-hint">先到“编辑元素”里框选并添加一个元素。</div>'}
        <button class="quick-action primary" data-action="move-selected" ${getSelectedLayer()?.bounds ? '' : 'disabled'}>AI 移动并补背景</button>
      </div>
    `,
  },
  more: {
    title: '更多',
    body: () => `
      <div class="quick-card">
        <p>当前主线是中文快捷 AI 编辑。高级实验编辑器保留给少数需要手工像素编辑的场景。</p>
        <a class="quick-action ghost" href="${escapeAttr(getAdvancedEditorUrl())}" target="_blank" rel="noreferrer">打开高级实验编辑器</a>
      </div>
    `,
  },
};

init();

function init() {
  saveImageBtn.disabled = true;
  imageTitle.textContent = imageName.replace(/\.[a-z0-9]+$/i, '') || 'Image';
  bindEvents();
  renderPanel('elements');

  if (!imageUrl) {
    setStatus('没有传入图片 URL', 'error');
    return;
  }

  loadImage(imageUrl)
    .then(() => {
      saveImageBtn.disabled = false;
      setStatus('已进入快捷编辑模式。拖拽图片区域可以框选对象或文字。');
    })
    .catch(() => setStatus('图片加载失败', 'error'));
}

function bindEvents() {
  for (const button of toolButtons) {
    button.addEventListener('click', () => renderPanel(button.dataset.tool));
  }

  panelCloseBtn.addEventListener('click', () => {
    taskPanel.classList.add('hidden');
  });

  panelBody.addEventListener('click', handlePanelClick);
  saveImageBtn.addEventListener('click', saveCurrentImage);
  zoomOutBtn.addEventListener('click', () => zoomImageBy(0.85));
  zoomResetBtn.addEventListener('click', resetImageZoom);
  zoomInBtn.addEventListener('click', () => zoomImageBy(1.15));
  imageFrame.addEventListener('pointerdown', startSelection);
  layerOverlayRoot.addEventListener('pointerdown', startLayerDrag);
  window.addEventListener('resize', fitImageToStage);
}

function fitImageToStage() {
  if (!state.naturalWidth || !state.naturalHeight) return;
  const panelSpace = taskPanel.classList.contains('hidden') ? 128 : 560;
  const availableWidth = Math.max(320, canvasStage.clientWidth - panelSpace);
  const availableHeight = Math.max(220, canvasStage.clientHeight - 220);
  state.fitScale = Math.min(1, availableWidth / state.naturalWidth, availableHeight / state.naturalHeight);
  state.scale = clamp(state.fitScale * state.zoom, 0.08, 4);
  imageEl.style.width = `${Math.round(state.naturalWidth * state.scale)}px`;
  imageEl.style.height = `${Math.round(state.naturalHeight * state.scale)}px`;
  zoomLabel.textContent = `${Math.round(state.scale * 100)}%`;
  updateSelectionBox();
  renderLayerOverlays();
}

function zoomImageBy(factor) {
  if (!state.naturalWidth) return;
  state.zoom = clamp(state.zoom * factor, 0.2, 6);
  fitImageToStage();
}

function resetImageZoom() {
  state.zoom = 1;
  fitImageToStage();
}

function renderPanel(tool) {
  state.tool = tool;
  taskPanel.classList.remove('hidden');
  for (const button of toolButtons) {
    button.classList.toggle('active', button.dataset.tool === tool);
  }
  const panel = panels[tool] || panels.elements;
  panelTitle.textContent = panel.title;
  panelBody.innerHTML = panel.body();
  fitImageToStage();
}

function startSelection(event) {
  if (!state.naturalWidth || event.target.closest('.selection-box')) return;
  const rect = imageEl.getBoundingClientRect();
  const startX = clamp(event.clientX - rect.left, 0, rect.width);
  const startY = clamp(event.clientY - rect.top, 0, rect.height);

  imageFrame.setPointerCapture(event.pointerId);
  selectionBox.classList.remove('hidden');

  const move = (moveEvent) => {
    const currentX = clamp(moveEvent.clientX - rect.left, 0, rect.width);
    const currentY = clamp(moveEvent.clientY - rect.top, 0, rect.height);
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    state.selection = toNaturalSelection({ left, top, width, height });
    updateSelectionBox();
  };

  const up = (upEvent) => {
    imageFrame.releasePointerCapture(upEvent.pointerId);
    imageFrame.removeEventListener('pointermove', move);
    imageFrame.removeEventListener('pointerup', up);
    imageFrame.removeEventListener('pointercancel', up);
    if (!state.selection || state.selection.width < 8 || state.selection.height < 8) {
      state.selection = null;
      updateSelectionBox();
      refreshCurrentPanel();
      setStatus('拖拽范围太小，请重新框选。', 'error');
      return;
    }
    refreshCurrentPanel();
    setStatus(`已框选 ${state.selection.width} × ${state.selection.height} 区域。`);
  };

  imageFrame.addEventListener('pointermove', move);
  imageFrame.addEventListener('pointerup', up);
  imageFrame.addEventListener('pointercancel', up);
}

function toNaturalSelection(displaySelection) {
  return {
    x: Math.round(displaySelection.left / state.scale),
    y: Math.round(displaySelection.top / state.scale),
    width: Math.round(displaySelection.width / state.scale),
    height: Math.round(displaySelection.height / state.scale),
  };
}

function updateSelectionBox() {
  if (!state.selection) {
    selectionBox.classList.add('hidden');
    return;
  }
  selectionBox.classList.remove('hidden');
  selectionBox.style.left = `${state.selection.x * state.scale}px`;
  selectionBox.style.top = `${state.selection.y * state.scale}px`;
  selectionBox.style.width = `${state.selection.width * state.scale}px`;
  selectionBox.style.height = `${state.selection.height * state.scale}px`;
}

function renderLayerOverlays() {
  if (!layerOverlayRoot) return;
  const overlays = state.layers
    .filter(layer => layer.id !== 'image' && layer.bounds && layer.visible !== false)
    .map(layer => {
      const selected = layer.id === state.selectedLayerId ? ' selected' : '';
      const bounds = layer.bounds;
      return `
        <button class="layer-overlay${selected}" data-overlay-layer-id="${escapeAttr(layer.id)}"
          style="left:${bounds.x * state.scale}px; top:${bounds.y * state.scale}px; width:${bounds.width * state.scale}px; height:${bounds.height * state.scale}px"
          title="${escapeAttr(layer.name)}">
          ${layer.preview ? `<img src="${escapeAttr(layer.preview)}" alt="" />` : ''}
          <span>${escapeHtml(layer.name)}</span>
        </button>
      `;
    })
    .join('');
  layerOverlayRoot.innerHTML = overlays;
}

async function handlePanelClick(event) {
  const optionButton = event.target.closest('.quick-option');
  if (optionButton) {
    const group = optionButton.parentElement;
    group?.querySelectorAll('.quick-option').forEach(item => item.classList.toggle('active', item === optionButton));
    return;
  }

  const layerButton = event.target.closest('[data-layer-id]');
  if (layerButton) {
    state.selectedLayerId = layerButton.dataset.layerId;
    const layer = getSelectedLayer();
    if (layer?.bounds) {
      state.selection = { ...layer.bounds };
      updateSelectionBox();
    } else {
      state.selection = null;
      updateSelectionBox();
    }
    renderPanel('elements');
    setStatus(`已选择图层：${layerButton.textContent.trim()}`);
    return;
  }

  const button = event.target.closest('[data-action]');
  if (!button) return;

  const action = button.dataset.action;
  if (action === 'clear-selection') {
    state.selection = null;
    updateSelectionBox();
    refreshCurrentPanel();
    setStatus('已清除选区');
    return;
  }
  if (action === 'add-layer') return addSelectionLayer();
  if (action === 'toggle-layer') return toggleSelectedLayer();
  if (action === 'delete-layer') return deleteSelectedLayer();
  if (action === 'redraw-layer') return runRedrawSelectedLayer();
  if (action === 'erase') return runErase();
  if (action === 'apply-text') return runTextEdit();
  if (action === 'upscale') return runUpscale();
  if (action === 'remove-bg') return runRemoveBackground();
  if (action === 'angles') return runAngles();
  if (action === 'move-selected') return runMoveSelected();
}

function addSelectionLayer() {
  if (!state.selection) {
    setStatus('请先在图片上框选一个元素。', 'error');
    return;
  }
  const index = state.layers.length;
  const bounds = { ...state.selection };
  const previewCanvas = createSelectionCanvas(bounds);
  const layer = {
    id: `layer-${Date.now()}`,
    name: `元素 ${index}`,
    type: '选区图层',
    bounds,
    visible: true,
    previewCanvas,
    preview: previewCanvas.toDataURL('image/png'),
  };
  state.layers.push(layer);
  state.selectedLayerId = layer.id;
  renderPanel('elements');
  renderLayerOverlays();
  setStatus(`已添加 ${layer.name}。这是分层编辑的基础交互。`, 'ok');
}

function toggleSelectedLayer() {
  const layer = getSelectedLayer();
  if (!layer?.bounds) {
    setStatus('请选择一个元素图层。', 'error');
    return;
  }
  layer.visible = layer.visible === false;
  renderPanel('elements');
  renderLayerOverlays();
  setStatus(`${layer.name} 已${layer.visible === false ? '隐藏' : '显示'}。`, 'ok');
}

function deleteSelectedLayer() {
  if (state.selectedLayerId === 'image') {
    setStatus('整张图片不能删除。', 'error');
    return;
  }
  const layer = getSelectedLayer();
  state.layers = state.layers.filter(item => item.id !== state.selectedLayerId);
  state.selectedLayerId = 'image';
  state.selection = null;
  updateSelectionBox();
  renderPanel('elements');
  renderLayerOverlays();
  setStatus(`已删除 ${layer?.name || '元素'}。`, 'ok');
}

async function runRedrawSelectedLayer() {
  const layer = getSelectedLayer();
  if (!layer?.bounds) {
    setStatus('请先框选并添加一个元素。', 'error');
    return;
  }
  state.selection = { ...layer.bounds };
  updateSelectionBox();
  return runImageEditTask({
    busyText: '正在重绘元素',
    prompt: `只重绘选区内的元素，让它更干净、更完整，保持原图整体风格、构图和背景不变。不要改动选区外的内容。`,
    maskDataUrl: createMaskDataUrl(),
    successPrefix: `${layer.name} 已重绘`,
  });
}

async function runErase() {
  if (!state.selection) {
    setStatus('请先框选要擦除的区域。', 'error');
    return;
  }

  setBusy(true, '生成蒙版中');
  try {
    const status = await fetch(apiUrl('/api/iopaint/status')).then(res => res.json());
    const prompt = document.getElementById('erasePrompt')?.value.trim()
      || '擦除选区内容并自然补全背景，保持原图风格、透视、光照和构图，不改变选区外的任何内容。';

    const image = imageToDataUrl();
    const mask = createMaskDataUrl();
    if (!status.available) {
      setBusy(false);
      await runImageEditTask({
        busyText: 'AI 擦除中',
        prompt,
        maskDataUrl: mask,
        successPrefix: '擦除完成',
      });
      return;
    }

    setBusy(true, '本地擦除中');
    const res = await fetch(apiUrl('/api/iopaint/inpaint'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, mask, prompt, timeout: 600 }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.detail || data.error || '擦除失败');

    imageEl.src = data.image;
    state.selection = null;
    refreshCurrentPanel();
    setStatus(`擦除完成，已保存到 Image Studio：${data.outputFile?.name || ''}`, 'ok');
  } catch (error) {
    setStatus(`擦除失败：${error.message}`, 'error');
  } finally {
    setBusy(false);
  }
}

async function runRemoveBackground() {
  return runImageEditTask({
    busyText: '正在去背景',
    prompt: `去除背景，保留主体完整边缘、发丝/轮廓和原始比例，输出透明背景 PNG。不要改变主体外观，不要新增背景。`,
    background: 'transparent',
    successPrefix: '去背景完成',
  });
}

async function runTextEdit() {
  const lines = ['textLine1', 'textLine2', 'textLine3', 'textLine4']
    .map(id => document.getElementById(id)?.value.trim())
    .filter(Boolean);
  if (!lines.length) {
    setStatus('请先输入要替换的文字。', 'error');
    return;
  }
  const maskDataUrl = state.selection ? createMaskDataUrl() : null;
  return runImageEditTask({
    busyText: '正在编辑文字',
    prompt: `仅替换图片中的文字为以下内容，保持原来的字体风格、位置、字号、排版、透视和背景纹理不变。不要改动人物、主体和其他非文字内容。\n\n新文字：\n${lines.join('\n')}`,
    maskDataUrl,
    successPrefix: '文字编辑完成',
  });
}

async function runAngles() {
  const active = panelBody.querySelector('.quick-option.active');
  const mode = active?.dataset.angle || 'front-side-back';
  const prompt = mode === 'turnaround'
    ? '基于当前图片中的主体，生成一致角色/产品的环绕多角度视图，保持身份、服装、材质、比例和风格一致，画面清晰排列。'
    : '基于当前图片中的主体，生成正面、侧面、背面三视图，保持同一个角色/产品的身份、服装、材质、比例和风格一致，横向排列，不要竖版海报。';
  return runImageEditTask({
    busyText: '正在生成多角度',
    prompt,
    successPrefix: '多角度生成完成',
  });
}

async function runUpscale() {
  const active = panelBody.querySelector('.quick-option.active');
  const factor = active?.dataset.scale || '2';
  return runImageEditTask({
    busyText: '正在高清修复',
    prompt: `将当前图片做 ${factor}x 高清修复和细节增强，保持画面内容、主体身份、构图、文字位置和风格完全一致。不要重新设计画面，不要改变横竖构图。`,
    size: currentImageSize(),
    successPrefix: `${factor}x 放大完成`,
  });
}

async function runMoveSelected() {
  const layer = getSelectedLayer();
  if (!layer?.bounds) {
    setStatus('请先在“编辑元素”里框选并添加一个元素。', 'error');
    return;
  }
  state.selection = { ...layer.bounds };
  updateSelectionBox();
  return runImageEditTask({
    busyText: '正在调整元素',
    prompt: `只处理选区内的元素：轻微调整它的位置和姿态，让构图更自然，并自动补全原位置背景。保持选区外内容不变。`,
    maskDataUrl: createMaskDataUrl(),
    successPrefix: '元素调整完成',
  });
}

async function runImageEditTask({ prompt, maskDataUrl = null, background = 'opaque', size = currentImageSize(), busyText = 'AI 编辑中', successPrefix = '编辑完成' }) {
  setBusy(true, busyText);
  try {
    const formData = new FormData();
    const imageFile = await dataUrlToFile(imageToDataUrl(), 'source.png');
    formData.append('prompt', withSizeLayoutInstruction(prompt, size));
    formData.append('mode', 'edit');
    formData.append('images', imageFile, 'source.png');
    if (maskDataUrl) {
      const maskFile = await dataUrlToFile(maskDataUrl, 'mask.png');
      formData.append('mask', maskFile, 'mask.png');
    }

    appendGenerationSettings(formData, { size, background });
    const res = await fetch(apiUrl('/api/generate'), { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(formatGenerateError(data));

    await applyGeneratedResult(data);
    const file = data.outputFiles?.[0];
    setStatus(`${successPrefix}，已保存到 Image Studio：${file?.name || ''}`, 'ok');
  } catch (error) {
    setStatus(`${successPrefix.replace(/完成$/, '') || '编辑'}失败：${error.message}`, 'error');
  } finally {
    setBusy(false);
  }
}

async function applyGeneratedResult(data) {
  const file = data.outputFiles?.[0];
  if (!file?.url) throw new Error('接口成功但没有返回图片文件。');
  await loadImage(toAppUrl(file.url));
  state.selection = null;
  state.layers = [{ id: 'image', name: '整张图片', type: 'image', bounds: null, visible: true }];
  state.selectedLayerId = 'image';
  updateSelectionBox();
  renderLayerOverlays();
  if (state.tool === 'elements') renderPanel('elements');
}

async function saveCurrentImage() {
  setBusy(true, '保存中');
  saveImageBtn.disabled = true;
  try {
    const blob = await dataUrlToBlob(imageToDataUrl());
    const formData = new FormData();
    formData.append('sourceName', imageName);
    formData.append('image', blob, 'edited.png');

    const res = await fetch(apiUrl('/api/editor/save'), { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.detail || data.error || '保存失败');
    setStatus(`已保存到 Image Studio：${data.outputFile.name}`, 'ok');
  } catch (error) {
    setStatus(`保存失败：${error.message}`, 'error');
  } finally {
    setBusy(false);
    saveImageBtn.disabled = false;
  }
}

function imageToDataUrl() {
  const canvas = document.createElement('canvas');
  canvas.width = state.naturalWidth;
  canvas.height = state.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageEl, 0, 0, state.naturalWidth, state.naturalHeight);
  for (const layer of state.layers) {
    if (layer.id === 'image' || layer.visible === false || !layer.preview || !layer.bounds) continue;
    const preview = layer.previewCanvas || getLayerPreviewImage(layer);
    if (preview) {
      ctx.drawImage(preview, layer.bounds.x, layer.bounds.y, layer.bounds.width, layer.bounds.height);
    }
  }
  return canvas.toDataURL('image/png');
}

function createMaskDataUrl() {
  const canvas = document.createElement('canvas');
  canvas.width = state.naturalWidth;
  canvas.height = state.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(state.selection.x, state.selection.y, state.selection.width, state.selection.height);
  return canvas.toDataURL('image/png');
}

function createSelectionPreview(bounds) {
  return createSelectionCanvas(bounds).toDataURL('image/png');
}

function createSelectionCanvas(bounds) {
  const canvas = document.createElement('canvas');
  canvas.width = bounds.width;
  canvas.height = bounds.height;
  canvas.getContext('2d').drawImage(
    imageEl,
    bounds.x,
    bounds.y,
    bounds.width,
    bounds.height,
    0,
    0,
    bounds.width,
    bounds.height,
  );
  return canvas;
}

function getLayerPreviewImage(layer) {
  if (!layer.previewImage || layer.previewImage.src !== layer.preview) {
    const img = new Image();
    img.src = layer.preview;
    layer.previewImage = img;
  }
  return layer.previewImage.complete ? layer.previewImage : null;
}

function startLayerDrag(event) {
  const overlay = event.target.closest('[data-overlay-layer-id]');
  if (!overlay) return;
  event.preventDefault();
  event.stopPropagation();
  const layer = state.layers.find(item => item.id === overlay.dataset.overlayLayerId);
  if (!layer?.bounds) return;

  state.selectedLayerId = layer.id;
  state.selection = { ...layer.bounds };
  updateSelectionBox();
  renderPanel('elements');

  const startX = event.clientX;
  const startY = event.clientY;
  const original = { ...layer.bounds };
  state.draggingLayer = layer.id;
  overlay.setPointerCapture(event.pointerId);

  const move = (moveEvent) => {
    const dx = Math.round((moveEvent.clientX - startX) / state.scale);
    const dy = Math.round((moveEvent.clientY - startY) / state.scale);
    layer.bounds.x = clamp(original.x + dx, 0, state.naturalWidth - layer.bounds.width);
    layer.bounds.y = clamp(original.y + dy, 0, state.naturalHeight - layer.bounds.height);
    state.selection = { ...layer.bounds };
    overlay.style.left = `${layer.bounds.x * state.scale}px`;
    overlay.style.top = `${layer.bounds.y * state.scale}px`;
    updateSelectionBox();
  };

    const up = (upEvent) => {
    if (overlay.hasPointerCapture(upEvent.pointerId)) overlay.releasePointerCapture(upEvent.pointerId);
    overlay.removeEventListener('pointermove', move);
    overlay.removeEventListener('pointerup', up);
    overlay.removeEventListener('pointercancel', up);
    state.draggingLayer = null;
    renderLayerOverlays();
    renderPanel('elements');
    setStatus(`${layer.name} 已移动到 ${layer.bounds.x}, ${layer.bounds.y}。保存时会合成当前可见元素。`, 'ok');
  };

  overlay.addEventListener('pointermove', move);
  overlay.addEventListener('pointerup', up);
  overlay.addEventListener('pointercancel', up);
}

async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl);
  return res.blob();
}

async function dataUrlToFile(dataUrl, fileName) {
  const blob = await dataUrlToBlob(dataUrl);
  return new File([blob], fileName, { type: blob.type || 'image/png' });
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    imageEl.onload = () => {
      state.naturalWidth = imageEl.naturalWidth;
      state.naturalHeight = imageEl.naturalHeight;
      fitImageToStage();
      imageSize.textContent = `${state.naturalWidth} × ${state.naturalHeight}`;
      resolve();
    };
    imageEl.onerror = reject;
    imageEl.src = cacheBustLocalUrl(url);
  });
}

function cacheBustLocalUrl(url) {
  if (!url || url.startsWith('data:') || /^https?:\/\//i.test(url)) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${Date.now()}`;
}

function appendGenerationSettings(formData, overrides = {}) {
  const settings = readGenerationSettings();
  const size = overrides.size || settings.size || currentImageSize();
  const background = overrides.background || settings.background || 'opaque';
  const provider = settings.provider || localStorage.getItem('imageProvider') || 'figure';
  const customProvider = loadCustomProviders().find(item => item.id === provider);

  formData.append('provider', provider);
  if (customProvider) {
    formData.append('providerConfig', JSON.stringify({
      id: customProvider.id,
      name: customProvider.name,
      baseUrl: customProvider.baseUrl,
      fallbackBaseUrl: customProvider.fallbackBaseUrl,
      apiKey: customProvider.apiKey,
      model: customProvider.model,
    }));
  }
  formData.append('model', settings.model || customProvider?.model || 'gpt-image-2');
  formData.append('size', size);
  formData.append('quality', settings.quality || 'high');
  formData.append('background', background);
  formData.append('n', '1');
  formData.append('timeout', String(clampInteger(settings.timeout, 30, 900, 600)));
}

function readGenerationSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') || {};
  } catch (_error) {
    return {};
  }
}

function loadCustomProviders() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_PROVIDERS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function currentImageSize() {
  return `${state.naturalWidth || 1536}x${state.naturalHeight || 1024}`;
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

  const base = `系统尺寸约束：最终输出必须严格匹配 ${width}x${height} 像素，按 ${width}:${height} 画布构图。`;
  if (width > height) {
    return `${base} 这是横向画布，请使用横版构图；不要竖版海报，不要把竖版画面嵌在横向画布中。`;
  }
  if (height > width) {
    return `${base} 这是竖向画布，请使用竖版构图；不要横版宽幅构图，不要把横向画面嵌在竖向画布中。`;
  }
  return `${base} 这是正方形画布，请使用 1:1 构图；不要输出横版或竖版海报式画面。`;
}

function formatGenerateError(data) {
  if (!data) return '请求失败，接口没有返回错误详情。';
  const parts = [data.error, data.detail].filter(Boolean);
  if (data.requestId) parts.push(`请求 ID：${data.requestId}`);
  if (data.failure?.message) parts.push(data.failure.message);
  return parts.join('；') || '生成失败';
}

function getSelectedLayer() {
  return state.layers.find(layer => layer.id === state.selectedLayerId) || state.layers[0];
}

function getAdvancedEditorUrl() {
  const next = new URLSearchParams();
  if (imageUrl) next.set('image', imageUrl);
  if (imageName) next.set('name', imageName);
  return toAppUrl(`/vendor/minipaint/index.html?${next.toString()}`);
}

function setBusy(isBusy, text = '处理中') {
  busyOverlay.classList.toggle('hidden', !isBusy);
  busyText.textContent = text;
}

function setStatus(text, kind = '') {
  saveStatus.textContent = text;
  saveStatus.className = `panel-status${kind ? ` ${kind}` : ''}`;
}

function refreshCurrentPanel() {
  renderPanel(state.tool);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampInteger(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(text) {
  return escapeHtml(text);
}
