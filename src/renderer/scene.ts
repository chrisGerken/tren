/**
 * Three.js Scene Setup
 */

import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

// Callback type for switch indicator clicks
// routeKey format: "pieceId.pointName.direction" (e.g., "piece_5.out.fwd")
export type SwitchClickCallback = (routeKey: string, connectionIndex: number) => void;

// Callback type for semaphore clicks
export type SemaphoreClickCallback = (pieceId: string) => void;

export class TrackScene {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  labelRenderer: CSS2DRenderer;
  controls: MapControls;
  private container: HTMLElement;
  private trackGroup: THREE.Group;
  private trainGroup: THREE.Group;
  private labelGroup: THREE.Group;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private onSwitchClick?: SwitchClickCallback;
  private onSemaphoreClick?: SemaphoreClickCallback;

  constructor(container: HTMLElement) {
    this.container = container;

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);

    // Create orthographic camera (top-down view)
    const aspect = container.clientWidth / container.clientHeight;
    const viewSize = 100; // 100 inches visible vertically
    this.camera = new THREE.OrthographicCamera(
      -viewSize * aspect / 2,
      viewSize * aspect / 2,
      viewSize / 2,
      -viewSize / 2,
      0.1,
      1000
    );
    this.camera.position.set(0, 100, 0);
    this.camera.lookAt(0, 0, 0);

    // Create WebGL renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Create CSS2D renderer for labels (hidden by default)
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(container.clientWidth, container.clientHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    this.labelRenderer.domElement.style.display = 'none';
    container.appendChild(this.labelRenderer.domElement);

    // Add lighting (brighter for better color visibility)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(50, 100, 50);
    this.scene.add(directionalLight);

    // Create group for track pieces
    this.trackGroup = new THREE.Group();
    this.scene.add(this.trackGroup);

    // Create group for trains
    this.trainGroup = new THREE.Group();
    this.scene.add(this.trainGroup);

    // Create group for labels (hidden by default)
    this.labelGroup = new THREE.Group();
    this.labelGroup.visible = false;
    this.scene.add(this.labelGroup);

    // Add grass ground plane
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a7c39,  // Grass green (R:74, G:124, B:57)
      roughness: 0.9,
      metalness: 0.0,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;  // Lay flat
    ground.position.y = -0.01;  // Slightly below track
    this.scene.add(ground);

    // Initialize raycaster for click detection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Initialize MapControls for pan/zoom
    this.controls = new MapControls(this.camera, this.renderer.domElement);
    this.controls.enableRotate = false;      // Lock to top-down view
    this.controls.enableDamping = true;      // Smooth movement
    this.controls.dampingFactor = 0.1;
    this.controls.screenSpacePanning = true; // Pan in screen space
    this.controls.minZoom = 0.1;             // Max zoom out (see more)
    this.controls.maxZoom = 10;              // Max zoom in (see less)

    // Handle click events for switch indicators
    this.renderer.domElement.addEventListener('click', (event) => this.onClick(event));

    // Handle window resize
    window.addEventListener('resize', () => this.onResize());
  }

  /**
   * Set callback for switch indicator clicks
   */
  setSwitchClickCallback(callback: SwitchClickCallback): void {
    this.onSwitchClick = callback;
  }

  /**
   * Set callback for semaphore clicks
   */
  setSemaphoreClickCallback(callback: SemaphoreClickCallback): void {
    this.onSemaphoreClick = callback;
  }

  /**
   * Handle click events
   */
  private onClick(event: MouseEvent): void {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Find intersections with track group
    const intersects = this.raycaster.intersectObjects(this.trackGroup.children, true);

    // Check if we clicked a switch indicator or semaphore
    for (const intersect of intersects) {
      const userData = intersect.object.userData;
      if (userData && userData.isSwitchIndicator) {
        if (this.onSwitchClick) {
          this.onSwitchClick(userData.routeKey, userData.connectionIndex);
        }
        break;
      }
      if (userData && userData.isSemaphore) {
        if (this.onSemaphoreClick) {
          this.onSemaphoreClick(userData.pieceId);
        }
        break;
      }
    }
  }

  private onResize(): void {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    const viewSize = 100;

    this.camera.left = -viewSize * aspect / 2;
    this.camera.right = viewSize * aspect / 2;
    this.camera.top = viewSize / 2;
    this.camera.bottom = -viewSize / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.render();
  }

  render(): void {
    this.controls.update();  // Update controls for damping
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  clearLayout(): void {
    // Recursively dispose all meshes in a group
    const disposeObject = (obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose();
        } else if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        }
      }
      // Recurse into children
      for (const child of obj.children) {
        disposeObject(child);
      }
    };

    // Remove all track pieces with proper disposal
    while (this.trackGroup.children.length > 0) {
      const child = this.trackGroup.children[0];
      this.trackGroup.remove(child);
      disposeObject(child);
    }

    // Remove all labels
    while (this.labelGroup.children.length > 0) {
      this.labelGroup.remove(this.labelGroup.children[0]);
    }
  }

  addTrackGroup(group: THREE.Group): void {
    this.trackGroup.add(group);
  }

  /**
   * Update train visuals - replaces all train meshes
   * Note: Train geometry and materials are cached in train-renderer.ts,
   * so we only remove objects from the scene without disposing shared resources.
   */
  updateTrains(trainGroup: THREE.Group): void {
    // Clear existing trains - just remove from scene, don't dispose shared geometry/materials
    while (this.trainGroup.children.length > 0) {
      this.trainGroup.remove(this.trainGroup.children[0]);
    }

    // Transfer children from input group (don't clone to avoid memory waste)
    // We need to copy the array since we're modifying it during iteration
    const children = [...trainGroup.children];
    for (const child of children) {
      trainGroup.remove(child);
      this.trainGroup.add(child);
    }
  }

  /**
   * Add a text label at the specified world position
   */
  addLabel(text: string, x: number, z: number): void {
    const div = document.createElement('div');
    div.className = 'track-label';
    div.textContent = text;
    div.style.cssText = `
      background: rgba(255, 255, 255, 0.85);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 11px;
      color: #333;
      border: 1px solid #999;
      white-space: nowrap;
    `;

    const label = new CSS2DObject(div);
    label.position.set(x, 1, z);  // Slightly above ground
    this.labelGroup.add(label);
  }

  /**
   * Toggle label visibility
   */
  setLabelsVisible(visible: boolean): void {
    this.labelGroup.visible = visible;
    // Also toggle the CSS2D renderer's DOM element visibility
    // since CSS2D objects are DOM elements that may not respect Three.js visibility
    this.labelRenderer.domElement.style.display = visible ? 'block' : 'none';
  }

  /**
   * Get current label visibility state
   */
  getLabelsVisible(): boolean {
    return this.labelGroup.visible;
  }

  /**
   * Fit camera to show all track pieces at 90% of window area
   */
  fitToLayout(): void {
    if (this.trackGroup.children.length === 0) return;

    const box = new THREE.Box3().setFromObject(this.trackGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const aspect = this.container.clientWidth / this.container.clientHeight;
    const layoutAspect = size.x / size.z;

    // Scale to fit 90% of window, accounting for aspect ratios
    let viewWidth: number;
    let viewHeight: number;

    if (layoutAspect > aspect) {
      // Layout is wider than window - fit to width
      viewWidth = size.x / 0.9;
      viewHeight = viewWidth / aspect;
    } else {
      // Layout is taller than window - fit to height
      viewHeight = size.z / 0.9;
      viewWidth = viewHeight * aspect;
    }

    this.camera.left = -viewWidth / 2;
    this.camera.right = viewWidth / 2;
    this.camera.top = viewHeight / 2;
    this.camera.bottom = -viewHeight / 2;
    this.camera.zoom = 1;  // Reset zoom when fitting to layout

    this.camera.position.set(center.x, 100, center.z);
    this.camera.lookAt(center.x, 0, center.z);
    this.camera.updateProjectionMatrix();

    // Update controls target to center of layout
    this.controls.target.set(center.x, 0, center.z);
    this.controls.update();
  }
}
