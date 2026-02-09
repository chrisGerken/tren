/**
 * Inspector Widget - Abstract base class for object inspector widgets
 *
 * Each widget is a one-line-tall HTML row at the bottom of the window.
 * Widgets can be locked (persist across double-clicks) or unlocked (replaced).
 */

export abstract class InspectorWidget {
  readonly element: HTMLDivElement;
  locked: boolean = true;
  protected contentEl: HTMLDivElement;
  private lockBtn: HTMLButtonElement;
  onRemove?: () => void;

  constructor() {
    // Create widget row
    this.element = document.createElement('div');
    this.element.className = 'inspector-widget';

    // Scrollable content area (left side)
    this.contentEl = document.createElement('div');
    this.contentEl.className = 'inspector-content';
    this.element.appendChild(this.contentEl);

    // Button area (right side)
    const buttonsEl = document.createElement('div');
    buttonsEl.className = 'inspector-buttons';
    this.element.appendChild(buttonsEl);

    // Lock button
    this.lockBtn = document.createElement('button');
    this.lockBtn.className = 'inspector-btn inspector-lock-btn';
    this.lockBtn.textContent = '\u{1F512}'; // locked padlock
    this.lockBtn.title = 'Unlock widget';
    this.lockBtn.addEventListener('click', () => this.toggleLock());
    buttonsEl.appendChild(this.lockBtn);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'inspector-btn inspector-close-btn';
    closeBtn.textContent = '\u2715'; // X mark
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => this.remove());
    buttonsEl.appendChild(closeBtn);

    // Build subclass content
    this.buildContent();
  }

  private toggleLock(): void {
    this.locked = !this.locked;
    this.lockBtn.textContent = this.locked ? '\u{1F512}' : '\u{1F513}';
    this.lockBtn.title = this.locked ? 'Unlock widget' : 'Lock widget';
  }

  remove(): void {
    this.dispose();
    this.element.remove();
    if (this.onRemove) {
      this.onRemove();
    }
  }

  /** Unique ID for the inspected object (e.g., train ID) */
  abstract get targetId(): string;

  /** Short type label (e.g., "Train") */
  abstract get typeLabel(): string;

  /** Build the widget's content elements inside this.contentEl */
  abstract buildContent(): void;

  /** Update live values (called each frame) */
  abstract update(): void;

  /** Clean up resources */
  abstract dispose(): void;
}
