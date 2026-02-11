/**
 * Train Inspector Widget - Shows and controls train properties
 *
 * Displays: train ID, cabs, cars, current speed, desired speed slider,
 * direction toggle, stop/resume button.
 * Auto-removes when the train no longer exists (entered bin).
 */

import { InspectorWidget } from './inspector-widget';
import { Simulation } from '../core/simulation';
import { Train } from '../core/types';

export class TrainInspectorWidget extends InspectorWidget {
  private trainId: string;
  private simulation: Simulation;

  // Display elements
  private idLabel!: HTMLSpanElement;
  private cabsLabel!: HTMLSpanElement;
  private carsLabel!: HTMLSpanElement;
  private speedLabel!: HTMLSpanElement;
  private slider!: HTMLInputElement;
  private sliderValue!: HTMLSpanElement;
  private dirLabel!: HTMLSpanElement;
  private changeDirBtn!: HTMLButtonElement;
  private stopBtn!: HTMLButtonElement;
  private coupleBtn!: HTMLButtonElement;

  // State for stop/resume
  private savedSpeed: number = 0;
  private isStopped: boolean = false;

  // Track if user is dragging the slider
  private sliderActive: boolean = false;

  // Switch selector state
  private switchContainer!: HTMLSpanElement;
  private switchButtons: HTMLButtonElement[] = [];
  private currentSwitchRouteKey: string | null = null;
  private currentSwitchOptions: { index: number; label: string }[] = [];
  private selectedSwitchIndex: number | undefined = undefined;

  // Callback when a switch route is selected via the inspector
  onSwitchRouteChanged?: (routeKey: string, connectionIndex: number) => void;

  constructor(trainId: string, simulation: Simulation) {
    // Store before super() since buildContent needs them
    // But super() calls buildContent()... so we use a workaround
    // We set fields before calling super via property initialization
    // Actually, we need to assign before super calls buildContent.
    // TypeScript requires super() first. Use a flag pattern instead.
    super();
    this.trainId = trainId;
    this.simulation = simulation;
    // Re-build content now that fields are set
    this.contentEl.innerHTML = '';
    this.buildContent();
    // Initialize from current train state
    this.update();
  }

  get targetId(): string {
    return this.trainId;
  }

  get typeLabel(): string {
    return 'Train';
  }

  private getTrain(): Train | undefined {
    return this.simulation.getTrains().find(t => t.id === this.trainId);
  }

  buildContent(): void {
    // Guard: fields not yet set during super() constructor call
    if (!this.trainId) return;

    const train = this.getTrain();
    if (!train) return;

    // Helper to create a labeled field
    const addField = (label: string, valueEl: HTMLSpanElement) => {
      const container = document.createElement('span');
      container.className = 'inspector-field';

      const labelSpan = document.createElement('span');
      labelSpan.className = 'inspector-field-label';
      labelSpan.textContent = label;
      container.appendChild(labelSpan);

      container.appendChild(valueEl);
      this.contentEl.appendChild(container);
    };

    // Type label
    const typeSpan = document.createElement('span');
    typeSpan.className = 'inspector-type-label';
    typeSpan.textContent = 'Train';
    this.contentEl.appendChild(typeSpan);

    // Train ID
    this.idLabel = document.createElement('span');
    this.idLabel.className = 'inspector-field-value';
    addField('', this.idLabel);

    // Cabs count
    this.cabsLabel = document.createElement('span');
    this.cabsLabel.className = 'inspector-field-value';
    addField('Cabs:', this.cabsLabel);

    // Cars count
    this.carsLabel = document.createElement('span');
    this.carsLabel.className = 'inspector-field-value';
    addField('Cars:', this.carsLabel);

    // Current speed (read-only, fixed width to prevent layout jitter)
    this.speedLabel = document.createElement('span');
    this.speedLabel.className = 'inspector-field-value inspector-speed-value';
    addField('Current Speed:', this.speedLabel);

    // Desired speed slider
    const sliderContainer = document.createElement('span');
    sliderContainer.className = 'inspector-field';

    const sliderLabel = document.createElement('span');
    sliderLabel.className = 'inspector-field-label';
    sliderLabel.textContent = 'Target Speed:';
    sliderContainer.appendChild(sliderLabel);

    // Minus button
    const minusBtn = document.createElement('button');
    minusBtn.className = 'inspector-btn inspector-speed-adj-btn';
    minusBtn.textContent = '\u2212';
    minusBtn.title = 'Decrease speed';
    minusBtn.addEventListener('click', () => {
      const t = this.getTrain();
      if (t) {
        const val = Math.max(0, Math.round(t.desiredSpeed) - 1);
        t.desiredSpeed = val;
        this.slider.value = String(val);
        this.sliderValue.textContent = String(val);
        if (this.isStopped && val > 0) {
          this.isStopped = false;
          this.stopBtn.textContent = 'Stop';
          this.stopBtn.className = 'inspector-btn inspector-stop-btn';
        }
      }
    });
    sliderContainer.appendChild(minusBtn);

    this.slider = document.createElement('input');
    this.slider.type = 'range';
    this.slider.className = 'inspector-slider';
    this.slider.min = '0';
    this.slider.max = '48';
    this.slider.step = '1';
    this.slider.value = String(Math.round(train.desiredSpeed));
    sliderContainer.appendChild(this.slider);

    this.sliderValue = document.createElement('span');
    this.sliderValue.className = 'inspector-field-value inspector-slider-value';
    sliderContainer.appendChild(this.sliderValue);

    // Plus button
    const plusBtn = document.createElement('button');
    plusBtn.className = 'inspector-btn inspector-speed-adj-btn';
    plusBtn.textContent = '+';
    plusBtn.title = 'Increase speed';
    plusBtn.addEventListener('click', () => {
      const t = this.getTrain();
      if (t) {
        const val = Math.min(48, Math.round(t.desiredSpeed) + 1);
        t.desiredSpeed = val;
        this.slider.value = String(val);
        this.sliderValue.textContent = String(val);
        if (this.isStopped && val > 0) {
          this.isStopped = false;
          this.stopBtn.textContent = 'Stop';
          this.stopBtn.className = 'inspector-btn inspector-stop-btn';
        }
      }
    });
    sliderContainer.appendChild(plusBtn);

    this.contentEl.appendChild(sliderContainer);

    // Slider events
    this.slider.addEventListener('input', () => {
      const val = parseInt(this.slider.value, 10);
      const t = this.getTrain();
      if (t) {
        t.desiredSpeed = val;
        this.sliderValue.textContent = String(val);
        // If was stopped and user moves slider above 0, exit stopped state
        if (this.isStopped && val > 0) {
          this.isStopped = false;
          this.stopBtn.textContent = 'Stop';
          this.stopBtn.className = 'inspector-btn inspector-stop-btn';
        }
      }
    });
    this.slider.addEventListener('mousedown', () => { this.sliderActive = true; });
    this.slider.addEventListener('mouseup', () => { this.sliderActive = false; });
    this.slider.addEventListener('touchstart', () => { this.sliderActive = true; });
    this.slider.addEventListener('touchend', () => { this.sliderActive = false; });

    // Direction label (read-only display)
    this.dirLabel = document.createElement('span');
    this.dirLabel.className = 'inspector-field-value';
    addField('Direction:', this.dirLabel);

    // Change Direction button (only enabled when stopped)
    this.changeDirBtn = document.createElement('button');
    this.changeDirBtn.className = 'inspector-btn inspector-dir-btn';
    this.changeDirBtn.textContent = '\u21C4';
    this.changeDirBtn.title = 'Change Direction';
    this.changeDirBtn.addEventListener('click', () => {
      const t = this.getTrain();
      if (t && t.currentSpeed === 0) {
        this.simulation.reverseTrain(this.trainId);
        t.desiredSpeed = 0;
      }
    });
    this.contentEl.appendChild(this.changeDirBtn);

    // Stop/Resume button
    this.stopBtn = document.createElement('button');
    this.stopBtn.className = 'inspector-btn inspector-stop-btn';
    this.stopBtn.textContent = 'Stop';
    this.stopBtn.addEventListener('click', () => {
      const t = this.getTrain();
      if (!t) return;

      if (this.isStopped) {
        // Resume: restore saved speed
        t.desiredSpeed = this.savedSpeed;
        this.isStopped = false;
        this.stopBtn.textContent = 'Stop';
        this.stopBtn.className = 'inspector-btn inspector-stop-btn';
      } else {
        // Stop: save current desired speed, set to 0
        this.savedSpeed = t.desiredSpeed;
        t.desiredSpeed = 0;
        // Cancel coupling mode if active
        if (t.coupling) {
          t.coupling = false;
          t.currentSpeed = 0;
        }
        this.isStopped = true;
        this.stopBtn.textContent = 'Resume';
        this.stopBtn.className = 'inspector-btn inspector-resume-btn';
      }
    });
    this.contentEl.appendChild(this.stopBtn);

    // Couple button (only enabled when stopped and not already coupling)
    this.coupleBtn = document.createElement('button');
    this.coupleBtn.className = 'inspector-btn inspector-couple-btn';
    this.coupleBtn.textContent = 'Couple';
    this.coupleBtn.addEventListener('click', () => {
      const t = this.getTrain();
      if (t && t.currentSpeed === 0 && !t.coupling) {
        t.desiredSpeed = 2;
        t.couplingSpeed = 2;
        this.simulation.startCoupling(this.trainId);
        // Clear stopped state since train is about to move
        if (this.isStopped) {
          this.isStopped = false;
          this.stopBtn.textContent = 'Stop';
          this.stopBtn.className = 'inspector-btn inspector-stop-btn';
        }
      }
    });
    this.contentEl.appendChild(this.coupleBtn);

    // Next Switch selector container
    this.switchContainer = document.createElement('span');
    this.switchContainer.className = 'inspector-switch-group';
    this.contentEl.appendChild(this.switchContainer);
  }

  update(): void {
    const train = this.getTrain();
    if (!train) {
      // Train no longer exists — auto-remove
      this.remove();
      return;
    }

    const cabCount = train.cars.filter(c => c.type === 'cab').length;
    const carCount = train.cars.filter(c => c.type === 'car').length;

    this.idLabel.textContent = train.id.replace('train_', '#');
    this.cabsLabel.textContent = String(cabCount);
    this.carsLabel.textContent = String(carCount);
    this.speedLabel.textContent = train.currentSpeed.toFixed(1);

    // Update slider only if user is not actively dragging
    if (!this.sliderActive) {
      this.slider.value = String(Math.round(train.desiredSpeed));
      this.sliderValue.textContent = String(Math.round(train.desiredSpeed));
    }

    // Update direction label and button enabled state
    this.dirLabel.textContent = train.travelDirection === 'forward' ? 'Forward' : 'Backward';
    this.changeDirBtn.disabled = train.currentSpeed !== 0;

    // Update couple button state (only mutate DOM when values change
    // to avoid breaking click events — setting textContent every frame
    // replaces the text node, which suppresses click between mousedown/mouseup)
    const coupleText = train.coupling ? 'Coupling...' : 'Couple';
    const coupleDisabled = train.coupling || train.currentSpeed !== 0;
    if (this.coupleBtn.textContent !== coupleText) {
      this.coupleBtn.textContent = coupleText;
    }
    if (this.coupleBtn.disabled !== coupleDisabled) {
      this.coupleBtn.disabled = coupleDisabled;
    }

    // Update next switch selector
    this.updateSwitchSelector(train);
  }

  /**
   * Update the next switch selector buttons.
   * Only rebuilds DOM when the switch changes to avoid click-suppression.
   */
  private updateSwitchSelector(_train: Train): void {
    const switchInfo = this.simulation.findNextSwitch(this.trainId);

    if (!switchInfo) {
      // No switch ahead — show "No switch" if not already showing
      if (this.currentSwitchRouteKey !== '__none__') {
        this.currentSwitchRouteKey = '__none__';
        this.currentSwitchOptions = [];
        this.selectedSwitchIndex = undefined;
        this.switchButtons = [];
        this.switchContainer.innerHTML = '';
        const label = document.createElement('span');
        label.className = 'inspector-switch-label';
        label.textContent = 'Next Switch: None';
        this.switchContainer.appendChild(label);
      }
      return;
    }

    // Check if we need to rebuild the button group
    const optionsChanged = switchInfo.routeKey !== this.currentSwitchRouteKey ||
      switchInfo.options.length !== this.currentSwitchOptions.length;

    if (optionsChanged) {
      this.currentSwitchRouteKey = switchInfo.routeKey;
      this.currentSwitchOptions = switchInfo.options;
      this.switchButtons = [];
      this.switchContainer.innerHTML = '';

      // Label
      const label = document.createElement('span');
      label.className = 'inspector-switch-label';
      label.textContent = 'Next Switch:';
      this.switchContainer.appendChild(label);

      // Create buttons for each option
      for (const opt of switchInfo.options) {
        const btn = document.createElement('button');
        btn.className = 'inspector-switch-btn';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => {
          this.onSwitchButtonClick(opt.index);
        });
        this.switchContainer.appendChild(btn);
        this.switchButtons.push(btn);
      }
    }

    // Update selected state (only mutate on change)
    const newSelected = switchInfo.currentOverride;
    if (newSelected !== this.selectedSwitchIndex) {
      this.selectedSwitchIndex = newSelected;
      for (let i = 0; i < this.switchButtons.length; i++) {
        const optIndex = this.currentSwitchOptions[i]?.index;
        const isSelected = optIndex === newSelected;
        const cls = isSelected ? 'inspector-switch-btn selected' : 'inspector-switch-btn';
        if (this.switchButtons[i].className !== cls) {
          this.switchButtons[i].className = cls;
        }
      }
    }
  }

  /**
   * Handle switch button click — toggle override on/off
   */
  private onSwitchButtonClick(optionIndex: number): void {
    if (!this.currentSwitchRouteKey || this.currentSwitchRouteKey === '__none__') return;

    if (this.selectedSwitchIndex === optionIndex) {
      // Deselect — remove override
      this.simulation.clearTrainSwitchOverride(this.trainId, this.currentSwitchRouteKey);
      this.selectedSwitchIndex = undefined;
    } else {
      // Select — set override
      this.simulation.setTrainSwitchOverride(this.trainId, this.currentSwitchRouteKey, optionIndex);
      this.selectedSwitchIndex = optionIndex;
      // Sync 3D switch indicators to match
      this.onSwitchRouteChanged?.(this.currentSwitchRouteKey, optionIndex);
    }

    // Immediately update button styles
    for (let i = 0; i < this.switchButtons.length; i++) {
      const optIdx = this.currentSwitchOptions[i]?.index;
      const isSelected = optIdx === this.selectedSwitchIndex;
      this.switchButtons[i].className = isSelected
        ? 'inspector-switch-btn selected'
        : 'inspector-switch-btn';
    }
  }

  dispose(): void {
    // No external resources to clean up
  }
}
