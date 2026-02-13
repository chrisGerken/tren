/**
 * Tren Train Simulator - Main Entry Point
 */

import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile, writeBinaryFile } from '@tauri-apps/api/fs';

// Import bundled layouts dynamically using Vite's import.meta.glob
const layoutModules = import.meta.glob('./layouts/*.txt', { eager: true, query: '?raw', import: 'default' });

// Map of layout filenames to their imported content
const bundledLayouts: Record<string, string> = {};
for (const [path, content] of Object.entries(layoutModules)) {
  const filename = path.split('/').pop()!;
  bundledLayouts[filename] = content as string;
}
import { TrackScene } from './renderer/scene';
import { renderLayout, setSelectedRouteByKey, getSelectedRoutes, updateConnectionPointColors, updateSemaphoreColor, updateDecouplerColor } from './renderer/track-renderer';
import { renderTrains } from './renderer/train-renderer';
import { buildLayout } from './parser/builder';
import { Simulation } from './core/simulation';
import { Layout } from './core/types';
import { setLogLevel, LogLevel, logger } from './core/logger';
import { InspectorManager } from './inspector/inspector-manager';
import { TrainInspectorWidget } from './inspector/train-inspector';
import { GeneratorInspectorWidget } from './inspector/generator-inspector';
import './style.css';

// Initialize scene
const container = document.getElementById('canvas-container');
if (!container) {
  throw new Error('Canvas container not found');
}

const scene = new TrackScene(container);
const inspectorManager = new InspectorManager();
const statusEl = document.getElementById('status');

// Track current layout for re-rendering after switch clicks
let currentLayout: Layout | null = null;

// Track simulation
let simulation: Simulation | null = null;

// Set up switch click callback
scene.setSwitchClickCallback((routeKey, connectionIndex) => {
  logger.debug(`Switch click callback: ${routeKey} -> ${connectionIndex}`);

  // Check if the junction is locked by a train
  if (simulation?.isJunctionLocked(routeKey)) {
    setStatus('Switch locked - train in junction');
    return;
  }

  setSelectedRouteByKey(routeKey, connectionIndex);
  if (currentLayout) {
    logger.debug(`Calling renderLayout with ${currentLayout.pieces.length} pieces`);
    renderLayout(scene, currentLayout, true);
    setStatus(`Switch toggled: ${routeKey} → route ${connectionIndex + 1}`);
  } else {
    logger.debug('currentLayout is null!');
  }
});

// Set up semaphore click callback
scene.setSemaphoreClickCallback((pieceId) => {
  logger.debug(`Semaphore click callback: ${pieceId}`);

  if (!currentLayout) return;

  // Find the semaphore piece
  const piece = currentLayout.pieces.find(p => p.id === pieceId);
  if (!piece || !piece.semaphoreConfig) {
    logger.debug(`Semaphore piece ${pieceId} not found or has no config`);
    return;
  }

  // Toggle the locked state
  piece.semaphoreConfig.locked = !piece.semaphoreConfig.locked;

  // Update the visual
  updateSemaphoreColor(pieceId, piece.semaphoreConfig.locked);

  const state = piece.semaphoreConfig.locked ? 'LOCKED (red)' : 'UNLOCKED (green)';
  setStatus(`Semaphore ${pieceId}: ${state}`);

  scene.render();
});

// Set up decoupler click callback
scene.setDecouplerClickCallback((pieceId) => {
  logger.debug(`Decoupler click callback: ${pieceId}`);

  if (!currentLayout || !simulation) return;

  // Find the decoupler piece
  const piece = currentLayout.pieces.find(p => p.id === pieceId);
  if (!piece || !piece.decouplerConfig) {
    logger.debug(`Decoupler piece ${pieceId} not found or has no config`);
    return;
  }

  // Activate the decoupler
  const newTrainId = simulation.activateDecoupler(pieceId);

  if (newTrainId) {
    // Flash the decoupler red for 1 second
    piece.decouplerConfig.activated = true;
    updateDecouplerColor(pieceId, true);
    setStatus(`Decoupler ${pieceId}: ACTIVATED - train split`);

    setTimeout(() => {
      piece.decouplerConfig!.activated = false;
      updateDecouplerColor(pieceId, false);
      scene.render();
    }, 1000);
  } else {
    setStatus(`Decoupler ${pieceId}: no train to split`);
  }

  scene.render();
});

// Set up train double-click callback for inspector
scene.setTrainDblClickCallback((trainId) => {
  if (!simulation) return;
  if (inspectorManager.hasWidgetForTarget(trainId)) return;

  const widget = new TrainInspectorWidget(trainId, simulation);
  widget.onSwitchRouteChanged = (routeKey, connectionIndex) => {
    setSelectedRouteByKey(routeKey, connectionIndex);
    if (currentLayout) {
      renderLayout(scene, currentLayout, true);
    }
  };
  inspectorManager.addWidget(widget);
});

// Set up generator double-click callback for inspector
scene.setGeneratorDblClickCallback((pieceId) => {
  if (!currentLayout || !simulation) return;
  if (inspectorManager.hasWidgetForTarget(pieceId)) return;
  const piece = currentLayout.pieces.find(p => p.id === pieceId);
  if (!piece?.genConfig) return;
  const widget = new GeneratorInspectorWidget(piece, simulation);
  inspectorManager.addWidget(widget);
});

function setStatus(message: string): void {
  if (statusEl) {
    statusEl.textContent = message;
  }
}

/**
 * Apply the log level from a layout (or default to WARNING)
 */
function applyLogLevel(layout: Layout): void {
  const levelMap: Record<string, LogLevel> = {
    'debug': LogLevel.DEBUG,
    'info': LogLevel.INFO,
    'warn': LogLevel.WARNING,
    'error': LogLevel.ERROR,
  };
  setLogLevel(layout.logLevel ? levelMap[layout.logLevel] : LogLevel.WARNING);
}

/**
 * Start the simulation for a layout
 */
function startSimulation(layout: Layout): void {
  // Stop any existing simulation
  if (simulation) {
    simulation.stop();
  }

  // Clear inspector widgets from previous layout
  inspectorManager.clear();

  // Create new simulation
  simulation = new Simulation(layout, getSelectedRoutes(), () => {
    // Update callback - render trains and update connection point colors
    if (simulation) {
      const trainGroup = renderTrains(simulation.getTrains());
      scene.updateTrains(trainGroup);
      // Update connection point colors based on lock state (only visible when Labels are on)
      updateConnectionPointColors(simulation.getLockedPoints(), scene.getLabelsVisible());
      // Update inspector widgets with live values
      inspectorManager.update();
      scene.render();
    }
  });

  // Start the simulation
  simulation.start();

  logger.debug('Simulation started');
}

/**
 * Import a layout file using Tauri's file dialog
 */
async function importLayout(): Promise<void> {
  try {
    setStatus('Opening file dialog...');

    const selected = await open({
      filters: [{
        name: 'Layout Files',
        extensions: ['layout', 'txt'],
      }],
      multiple: false,
    });

    if (!selected || typeof selected !== 'string') {
      setStatus('Import cancelled');
      return;
    }

    setStatus(`Loading: ${selected}`);

    const content = await readTextFile(selected);

    setStatus('Parsing layout...');
    const layout = buildLayout(content);
    currentLayout = layout;
    applyLogLevel(layout);

    // Update random button to reflect layout's setting
    updateRandomButtonState();

    setStatus(`Rendering ${layout.pieces.length} pieces...`);
    renderLayout(scene, layout);

    // Start simulation
    startSimulation(layout);

    logger.info(`Layout loaded: ${layout.pieces.length} pieces`);
    setStatus(`Layout loaded: ${layout.pieces.length} pieces - simulation running`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Error: ${message}`);
    logger.error('Import error:', error);
  }
}

// Set up import button
const importBtn = document.getElementById('import-btn');
if (importBtn) {
  importBtn.addEventListener('click', () => {
    importLayout();
  });
}

// Set up random toggle button
const randomBtn = document.getElementById('random-btn');

/**
 * Update the Random button's visual state based on the current layout
 */
function updateRandomButtonState(): void {
  if (randomBtn) {
    const isRandom = currentLayout?.randomSwitches ?? false;
    if (isRandom) {
      randomBtn.classList.add('active');
      randomBtn.textContent = 'Random';
    } else {
      randomBtn.classList.remove('active');
      randomBtn.textContent = 'Manual';
    }
  }
}

/**
 * Toggle the random switches setting
 */
function toggleRandom(): void {
  if (!currentLayout) {
    setStatus('No layout loaded');
    return;
  }

  currentLayout.randomSwitches = !currentLayout.randomSwitches;
  updateRandomButtonState();

  // Re-render track only (preserve scenery)
  renderLayout(scene, currentLayout, true);

  const state = currentLayout.randomSwitches ? 'ON' : 'OFF';
  setStatus(`Random switches: ${state}`);
}

if (randomBtn) {
  randomBtn.addEventListener('click', toggleRandom);
}

// Set up labels toggle button
const labelsBtn = document.getElementById('labels-btn');

/**
 * Update the Labels button's visual state
 */
function updateLabelsButtonState(): void {
  if (labelsBtn) {
    const isVisible = scene.getLabelsVisible();
    if (isVisible) {
      labelsBtn.classList.add('active');
      labelsBtn.textContent = 'Design';
    } else {
      labelsBtn.classList.remove('active');
      labelsBtn.textContent = 'Clean';
    }
  }
}

/**
 * Toggle the labels visibility
 */
function toggleLabels(): void {
  const currentState = scene.getLabelsVisible();
  scene.setLabelsVisible(!currentState);
  updateLabelsButtonState();
  scene.render();

  const state = scene.getLabelsVisible() ? 'ON' : 'OFF';
  setStatus(`Labels: ${state}`);
}

if (labelsBtn) {
  labelsBtn.addEventListener('click', toggleLabels);
  // Labels are hidden by default
}

// Set up capture screenshot button
const captureBtn = document.getElementById('capture-btn');
if (captureBtn) {
  captureBtn.addEventListener('click', async () => {
    try {
      // Render current frame to ensure canvas has content
      scene.renderer.render(scene.scene, scene.camera);

      // Get canvas data as PNG
      const dataUrl = scene.renderer.domElement.toDataURL('image/png');
      const base64 = dataUrl.split(',')[1];
      const binaryStr = atob(base64);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      // Open save dialog
      const savePath = await save({
        filters: [{ name: 'PNG Image', extensions: ['png'] }],
        defaultPath: 'tren-capture.png',
      });

      if (!savePath) {
        setStatus('Capture cancelled');
        return;
      }

      // Write the file
      await writeBinaryFile(savePath, bytes);
      setStatus(`Screenshot saved: ${savePath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Capture error: ${message}`);
    }
  });
}

// Initial render
scene.render();
setStatus('Ready - click "Import Layout" to load a layout file');

// For development: also support drag-and-drop or paste
document.addEventListener('paste', async (e) => {
  const text = e.clipboardData?.getData('text');
  if (text && text.trim()) {
    try {
      setStatus('Parsing pasted layout...');
      const layout = buildLayout(text);
      currentLayout = layout;
      applyLogLevel(layout);

      // Update random button to reflect layout's setting
      updateRandomButtonState();

      renderLayout(scene, layout);

      // Start simulation
      startSimulation(layout);

      logger.info(`Layout loaded from clipboard: ${layout.pieces.length} pieces`);
      setStatus(`Layout loaded from clipboard: ${layout.pieces.length} pieces - simulation running`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Parse error: ${message}`);
    }
  }
});

// ============================================
// Layouts Dialog
// ============================================

interface LayoutManifestEntry {
  file: string;
  title: string;
  description: string;
}

interface LayoutManifest {
  layouts: LayoutManifestEntry[];
}

// Dialog elements
const layoutsBtn = document.getElementById('layouts-btn');
const layoutsDialog = document.getElementById('layouts-dialog');
const layoutsList = document.getElementById('layouts-list');
const dialogRunBtn = document.getElementById('dialog-run-btn') as HTMLButtonElement;
const dialogSaveBtn = document.getElementById('dialog-save-btn') as HTMLButtonElement;
const dialogCancelBtn = document.getElementById('dialog-cancel-btn');

// Currently selected layout in dialog
let selectedLayoutFile: string | null = null;
let loadedManifest: LayoutManifest | null = null;

/**
 * Extract title and description from raw layout DSL text without invoking the full parser.
 */
function extractLayoutMetadata(content: string, filename: string): { title: string; description: string } {
  let title = 'No Title';
  let description = filename;

  for (const rawLine of content.split('\n')) {
    // Strip comments
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) continue;

    const lower = line.toLowerCase();
    if (lower.startsWith('title ')) {
      title = line.substring(6).trim();
    } else if (lower.startsWith('description ')) {
      description = line.substring(12).trim();
    }
  }

  return { title, description };
}

/**
 * Build the layouts manifest dynamically from bundled layout files.
 */
function getLayoutsManifest(): LayoutManifest {
  const entries: LayoutManifestEntry[] = [];

  for (const [filename, content] of Object.entries(bundledLayouts)) {
    const meta = extractLayoutMetadata(content, filename);
    entries.push({
      file: filename,
      title: meta.title,
      description: meta.description,
    });
  }

  // Sort alphabetically by title for consistent ordering
  entries.sort((a, b) => a.title.localeCompare(b.title));

  return { layouts: entries };
}

/**
 * Get a layout file content (bundled at build time)
 */
function getLayoutContent(filename: string): string {
  const content = bundledLayouts[filename];
  if (!content) {
    throw new Error(`Layout not found: ${filename}`);
  }
  return content;
}

/**
 * Render the layouts list in the dialog
 */
function renderLayoutsList(manifest: LayoutManifest): void {
  if (!layoutsList) return;

  layoutsList.innerHTML = '';
  selectedLayoutFile = null;
  updateDialogButtons();

  for (const entry of manifest.layouts) {
    const item = document.createElement('div');
    item.className = 'layout-item';
    item.dataset.file = entry.file;

    const title = document.createElement('div');
    title.className = 'layout-item-title';
    title.textContent = entry.title;

    const description = document.createElement('div');
    description.className = 'layout-item-description';
    description.textContent = entry.description;

    item.appendChild(title);
    item.appendChild(description);

    item.addEventListener('click', () => {
      // Deselect all
      layoutsList.querySelectorAll('.layout-item').forEach(el => el.classList.remove('selected'));
      // Select this one
      item.classList.add('selected');
      selectedLayoutFile = entry.file;
      updateDialogButtons();
    });

    layoutsList.appendChild(item);
  }
}

/**
 * Update dialog button states
 */
function updateDialogButtons(): void {
  const hasSelection = selectedLayoutFile !== null;
  if (dialogRunBtn) dialogRunBtn.disabled = !hasSelection;
  if (dialogSaveBtn) dialogSaveBtn.disabled = !hasSelection;
}

/**
 * Open the layouts dialog
 */
function openLayoutsDialog(): void {
  if (!layoutsDialog) return;

  try {
    loadedManifest = getLayoutsManifest();
    renderLayoutsList(loadedManifest);
    layoutsDialog.style.display = 'flex';
    setStatus('');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Error: ${message}`);
  }
}

/**
 * Close the layouts dialog
 */
function closeLayoutsDialog(): void {
  if (layoutsDialog) {
    layoutsDialog.style.display = 'none';
  }
  selectedLayoutFile = null;
}

/**
 * Run the selected layout
 */
function runSelectedLayout(): void {
  if (!selectedLayoutFile) return;

  // Save the filename before closing dialog (which clears selectedLayoutFile)
  const filename = selectedLayoutFile;

  try {
    setStatus(`Loading ${filename}...`);
    closeLayoutsDialog();

    const content = getLayoutContent(filename);

    setStatus('Parsing layout...');
    const layout = buildLayout(content);
    currentLayout = layout;
    applyLogLevel(layout);

    updateRandomButtonState();

    setStatus(`Rendering ${layout.pieces.length} pieces...`);
    renderLayout(scene, layout);

    startSimulation(layout);

    logger.info(`Layout loaded: ${layout.pieces.length} pieces`);
    setStatus(`Layout loaded: ${layout.pieces.length} pieces - simulation running`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Error: ${message}`);
    logger.error('Run layout error:', error);
  }
}

/**
 * Save the selected layout to a user-chosen location
 */
async function saveSelectedLayout(): Promise<void> {
  if (!selectedLayoutFile) return;

  try {
    // Get the content first
    const content = getLayoutContent(selectedLayoutFile);

    // Open save dialog
    const savePath = await save({
      filters: [{
        name: 'Layout Files',
        extensions: ['txt', 'layout'],
      }],
      defaultPath: selectedLayoutFile,
    });

    if (!savePath) {
      setStatus('Save cancelled');
      return;
    }

    // Write the file
    await writeTextFile(savePath, content);

    closeLayoutsDialog();
    setStatus(`Layout saved to: ${savePath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Error: ${message}`);
    logger.error('Save layout error:', error);
  }
}

// Wire up dialog buttons
if (layoutsBtn) {
  layoutsBtn.addEventListener('click', openLayoutsDialog);
}

if (dialogRunBtn) {
  dialogRunBtn.addEventListener('click', runSelectedLayout);
}

if (dialogSaveBtn) {
  dialogSaveBtn.addEventListener('click', saveSelectedLayout);
}

if (dialogCancelBtn) {
  dialogCancelBtn.addEventListener('click', closeLayoutsDialog);
}

// Close dialog when clicking overlay background
if (layoutsDialog) {
  layoutsDialog.addEventListener('click', (e) => {
    if (e.target === layoutsDialog) {
      closeLayoutsDialog();
    }
  });
}

// Close dialog with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && layoutsDialog?.style.display === 'flex') {
    closeLayoutsDialog();
  }
});
