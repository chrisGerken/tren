/**
 * Generator Inspector Widget - Shows and controls generator properties
 *
 * Displays: coordinates, cabs/cars/speed sliders, color mode button,
 * enable/disable toggle.
 * Changes update the generator's config in real-time for future spawns.
 */

import { InspectorWidget } from './inspector-widget';
import { Simulation } from '../core/simulation';
import { TrackPiece, RangeValue, ColorMode } from '../core/types';

/** Extract the base (midpoint) value from a number or RangeValue */
function baseValue(v: number | RangeValue): number {
  if (typeof v === 'number') return v;
  return Math.round((v.min + v.max) / 2);
}

const COLOR_MODES: ColorMode[] = ['gray', 'colorful', 'black'];

export class GeneratorInspectorWidget extends InspectorWidget {
  private piece: TrackPiece;
  private simulation: Simulation;

  // Base slider values
  private cabsBase: number;
  private carsBase: number;
  private speedBase: number;
  private everyBase: number;

  // Display elements
  private cabsValue!: HTMLSpanElement;
  private carsValue!: HTMLSpanElement;
  private speedValue!: HTMLSpanElement;
  private everyValue!: HTMLSpanElement;
  private colorBtn!: HTMLButtonElement;
  private enableBtn!: HTMLButtonElement;

  constructor(piece: TrackPiece, simulation: Simulation) {
    super();
    this.piece = piece;
    this.simulation = simulation;

    const config = piece.genConfig!;

    // Derive base values from current config
    this.cabsBase = baseValue(config.cabCount);
    this.carsBase = baseValue(config.carCount);
    this.speedBase = baseValue(config.speed ?? 12);
    this.everyBase = baseValue(config.frequency ?? 10);

    // Re-build content now that fields are set
    this.contentEl.innerHTML = '';
    this.buildContent();
  }

  get targetId(): string {
    return this.piece.id;
  }

  get typeLabel(): string {
    return 'Generator';
  }

  buildContent(): void {
    // Guard: fields not yet set during super() constructor call
    if (!this.piece) return;

    const config = this.piece.genConfig!;

    // Type label
    const typeSpan = document.createElement('span');
    typeSpan.className = 'inspector-type-label inspector-type-generator';
    typeSpan.textContent = 'Generator';
    this.contentEl.appendChild(typeSpan);

    // Coordinates
    const coordSpan = document.createElement('span');
    coordSpan.className = 'inspector-field-value';
    const x = this.piece.position.x.toFixed(1);
    const z = this.piece.position.z.toFixed(1);
    coordSpan.textContent = `(${x}, ${z})`;
    this.contentEl.appendChild(coordSpan);

    // Enable/disable button
    this.enableBtn = document.createElement('button');
    this.enableBtn.className = 'inspector-btn';
    this.updateEnableButton(config.enabled);
    this.enableBtn.addEventListener('click', () => {
      const cfg = this.piece.genConfig!;
      cfg.enabled = !cfg.enabled;
      this.updateEnableButton(cfg.enabled);
    });
    this.contentEl.appendChild(this.enableBtn);

    // Color mode button
    this.colorBtn = document.createElement('button');
    this.colorBtn.className = 'inspector-btn inspector-color-btn';
    this.updateColorButton(config.colorMode);
    this.colorBtn.addEventListener('click', () => {
      const cfg = this.piece.genConfig!;
      const currentIdx = COLOR_MODES.indexOf(cfg.colorMode);
      const nextMode = COLOR_MODES[(currentIdx + 1) % COLOR_MODES.length];
      cfg.colorMode = nextMode;
      this.updateColorButton(nextMode);
    });
    this.contentEl.appendChild(this.colorBtn);

    // Cabs slider
    this.cabsValue = document.createElement('span');
    this.cabsValue.className = 'inspector-field-value inspector-slider-value';
    this.buildSliderField('Cabs:', 1, 10, this.cabsBase, this.cabsValue, (val) => {
      this.cabsBase = val;
      this.applyConfig();
    });

    // Cars slider
    this.carsValue = document.createElement('span');
    this.carsValue.className = 'inspector-field-value inspector-slider-value';
    this.buildSliderField('Cars:', 0, 20, this.carsBase, this.carsValue, (val) => {
      this.carsBase = val;
      this.applyConfig();
    });

    // Speed slider
    this.speedValue = document.createElement('span');
    this.speedValue.className = 'inspector-field-value inspector-slider-value';
    this.buildSliderField('Speed:', 1, 48, this.speedBase, this.speedValue, (val) => {
      this.speedBase = val;
      this.applyConfig();
    });

    // Every (frequency) slider
    this.everyValue = document.createElement('span');
    this.everyValue.className = 'inspector-field-value inspector-slider-value';
    this.buildSliderField('Every:', 1, 300, this.everyBase, this.everyValue, (val) => {
      this.everyBase = val;
      this.applyConfig();
      this.simulation.clearResolvedFrequency(this.piece.id);
    });
  }

  /**
   * Build a slider field with label, minus/plus buttons, slider, and value display.
   */
  private buildSliderField(
    label: string,
    min: number,
    max: number,
    initial: number,
    valueEl: HTMLSpanElement,
    onChange: (val: number) => void
  ): void {
    const container = document.createElement('span');
    container.className = 'inspector-field';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'inspector-field-label';
    labelSpan.textContent = label;
    container.appendChild(labelSpan);

    // Minus button
    const minusBtn = document.createElement('button');
    minusBtn.className = 'inspector-btn inspector-speed-adj-btn';
    minusBtn.textContent = '\u2212';
    minusBtn.addEventListener('click', () => {
      const val = Math.max(min, parseInt(slider.value, 10) - 1);
      slider.value = String(val);
      valueEl.textContent = String(val);
      onChange(val);
    });
    container.appendChild(minusBtn);

    // Slider
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'inspector-slider';
    slider.min = String(min);
    slider.max = String(max);
    slider.step = '1';
    slider.value = String(initial);
    container.appendChild(slider);

    // Value display
    valueEl.textContent = String(initial);
    container.appendChild(valueEl);

    // Plus button
    const plusBtn = document.createElement('button');
    plusBtn.className = 'inspector-btn inspector-speed-adj-btn';
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', () => {
      const val = Math.min(max, parseInt(slider.value, 10) + 1);
      slider.value = String(val);
      valueEl.textContent = String(val);
      onChange(val);
    });
    container.appendChild(plusBtn);

    // Slider input event
    slider.addEventListener('input', () => {
      const val = parseInt(slider.value, 10);
      valueEl.textContent = String(val);
      onChange(val);
    });

    this.contentEl.appendChild(container);
  }

  /** Apply current slider values to the generator config */
  private applyConfig(): void {
    const config = this.piece.genConfig!;
    config.cabCount = this.cabsBase;
    config.carCount = this.carsBase;
    config.speed = this.speedBase;
    config.frequency = this.everyBase;
  }

  /** Update color button appearance */
  private updateColorButton(mode: ColorMode): void {
    this.colorBtn.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    this.colorBtn.className = 'inspector-btn inspector-color-btn inspector-color-' + mode;
  }

  /** Update enable/disable button appearance */
  private updateEnableButton(enabled: boolean): void {
    if (enabled) {
      this.enableBtn.textContent = 'Enabled';
      this.enableBtn.className = 'inspector-btn inspector-enable-btn';
    } else {
      this.enableBtn.textContent = 'Disabled';
      this.enableBtn.className = 'inspector-btn inspector-disable-btn';
    }
  }

  update(): void {
    // Check if piece still has genConfig (layout might have changed)
    if (!this.piece.genConfig) {
      this.remove();
      return;
    }

    // Sync enable button in case config was changed externally
    const enabled = this.piece.genConfig.enabled;
    const btnText = enabled ? 'Enabled' : 'Disabled';
    if (this.enableBtn.textContent !== btnText) {
      this.updateEnableButton(enabled);
    }
  }

  dispose(): void {
    // No external resources to clean up
  }
}
