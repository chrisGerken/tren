/**
 * Tren Train Simulator - Main Entry Point
 */

import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import { TrackScene } from './renderer/scene';
import { renderLayout, setSelectedRoute } from './renderer/track-renderer';
import { buildLayout } from './parser/builder';
import { Layout } from './core/types';
import './style.css';

// Initialize scene
const container = document.getElementById('canvas-container');
if (!container) {
  throw new Error('Canvas container not found');
}

const scene = new TrackScene(container);
const statusEl = document.getElementById('status');

// Track current layout for re-rendering after switch clicks
let currentLayout: Layout | null = null;

// Set up switch click callback
scene.setSwitchClickCallback((pieceId, pointName, connectionIndex) => {
  setSelectedRoute(pieceId, pointName, connectionIndex);
  if (currentLayout) {
    renderLayout(scene, currentLayout);
    setStatus(`Switch toggled: ${pieceId}.${pointName} → route ${connectionIndex + 1}`);
  }
});

function setStatus(message: string): void {
  if (statusEl) {
    statusEl.textContent = message;
  }
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

    setStatus(`Rendering ${layout.pieces.length} pieces...`);
    renderLayout(scene, layout);

    setStatus(`Layout loaded: ${layout.pieces.length} pieces`);
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
      renderLayout(scene, layout);
      setStatus(`Layout loaded from clipboard: ${layout.pieces.length} pieces`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Parse error: ${message}`);
    }
  }
});
