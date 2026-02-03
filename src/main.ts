/**
 * Tren Train Simulator - Main Entry Point
 */

import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import { TrackScene } from './renderer/scene';
import { renderLayout, setSelectedRouteByKey, getSelectedRoutes, updateConnectionPointColors } from './renderer/track-renderer';
import { renderTrains } from './renderer/train-renderer';
import { buildLayout } from './parser/builder';
import { Simulation } from './core/simulation';
import { Layout } from './core/types';
import './style.css';

// Set to true to enable console logging for debugging
const DEBUG_LOGGING = false;

// Initialize scene
const container = document.getElementById('canvas-container');
if (!container) {
  throw new Error('Canvas container not found');
}

const scene = new TrackScene(container);
const statusEl = document.getElementById('status');

// Track current layout for re-rendering after switch clicks
let currentLayout: Layout | null = null;

// Track simulation
let simulation: Simulation | null = null;

// Set up switch click callback
scene.setSwitchClickCallback((routeKey, connectionIndex) => {
  if (DEBUG_LOGGING) console.log(`Switch click callback: ${routeKey} -> ${connectionIndex}`);

  // Check if the junction is locked by a train
  if (simulation?.isJunctionLocked(routeKey)) {
    setStatus('Switch locked - train in junction');
    return;
  }

  setSelectedRouteByKey(routeKey, connectionIndex);
  if (currentLayout) {
    if (DEBUG_LOGGING) console.log(`Calling renderLayout with ${currentLayout.pieces.length} pieces`);
    renderLayout(scene, currentLayout);
    setStatus(`Switch toggled: ${routeKey} → route ${connectionIndex + 1}`);
  } else {
    if (DEBUG_LOGGING) console.log('currentLayout is null!');
  }
});

function setStatus(message: string): void {
  if (statusEl) {
    statusEl.textContent = message;
  }
}

/**
 * Start the simulation for a layout
 */
function startSimulation(layout: Layout): void {
  // Stop any existing simulation
  if (simulation) {
    simulation.stop();
  }

  // Create new simulation
  simulation = new Simulation(layout, getSelectedRoutes(), () => {
    // Update callback - render trains and update connection point colors
    if (simulation) {
      const trainGroup = renderTrains(simulation.getTrains());
      scene.updateTrains(trainGroup);
      // Update connection point colors based on lock state (only visible when Labels are on)
      updateConnectionPointColors(simulation.getLockedPoints(), scene.getLabelsVisible());
      scene.render();
    }
  });

  // Start the simulation
  simulation.start();

  if (DEBUG_LOGGING) console.log('Simulation started');
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

    // Update random button to reflect layout's setting
    updateRandomButtonState();

    setStatus(`Rendering ${layout.pieces.length} pieces...`);
    renderLayout(scene, layout);

    // Start simulation
    startSimulation(layout);

    setStatus(`Layout loaded: ${layout.pieces.length} pieces - simulation running`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Error: ${message}`);
    console.error('Import error:', error);
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
    } else {
      randomBtn.classList.remove('active');
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

  // Re-render the layout to show/hide switch indicators
  renderLayout(scene, currentLayout);

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
    } else {
      labelsBtn.classList.remove('active');
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

      // Update random button to reflect layout's setting
      updateRandomButtonState();

      renderLayout(scene, layout);

      // Start simulation
      startSimulation(layout);

      setStatus(`Layout loaded from clipboard: ${layout.pieces.length} pieces - simulation running`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Parse error: ${message}`);
    }
  }
});
