/**
 * Inspector Manager - Manages the inspector widget container
 *
 * Handles adding/removing widgets, enforcing stacking rules:
 * - Double-click adds new unlocked widget, removing any existing unlocked widgets
 * - Locked widgets persist across double-clicks
 * - Multiple locked widgets can coexist (stack upward)
 * - X button removes any widget
 */

import { InspectorWidget } from './inspector-widget';

export class InspectorManager {
  private container: HTMLElement;
  private widgets: InspectorWidget[] = [];

  constructor() {
    const el = document.getElementById('inspector-container');
    if (!el) {
      throw new Error('Inspector container not found');
    }
    this.container = el;
  }

  /**
   * Add a new widget, removing all unlocked widgets first.
   * The new widget is prepended so it appears at the bottom (newest first).
   */
  addWidget(widget: InspectorWidget): void {
    // Don't add duplicate for same target
    if (this.hasWidgetForTarget(widget.targetId)) return;

    // Remove all unlocked widgets
    const toRemove = this.widgets.filter(w => !w.locked);
    for (const w of toRemove) {
      this.removeWidget(w);
    }

    // Set up removal callback
    widget.onRemove = () => this.handleWidgetRemove(widget);

    // Add to array and DOM (prepend so new widget is at bottom visually)
    this.widgets.push(widget);
    this.container.appendChild(widget.element);
  }

  /**
   * Handle a widget removing itself (via X button or auto-remove)
   */
  private handleWidgetRemove = (widget: InspectorWidget): void => {
    const idx = this.widgets.indexOf(widget);
    if (idx !== -1) {
      this.widgets.splice(idx, 1);
    }
  };

  /**
   * Check if a widget already exists for the given target
   */
  hasWidgetForTarget(targetId: string): boolean {
    return this.widgets.some(w => w.targetId === targetId);
  }

  /**
   * Update all widgets (called each frame)
   */
  update(): void {
    // Iterate over a snapshot since update() can trigger auto-removal
    const snapshot = [...this.widgets];
    for (const widget of snapshot) {
      widget.update();
    }
  }

  /**
   * Remove all widgets (called on layout change)
   */
  clear(): void {
    const snapshot = [...this.widgets];
    for (const widget of snapshot) {
      widget.remove();
    }
    this.widgets = [];
  }

  /**
   * Remove a specific widget (internal helper)
   */
  private removeWidget(widget: InspectorWidget): void {
    widget.remove();
  }
}
