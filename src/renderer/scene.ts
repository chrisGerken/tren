/**
 * Three.js Scene Setup
 */

import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Callback type for switch indicator clicks
export type SwitchClickCallback = (pieceId: string, pointName: string, connectionIndex: number) => void;

export class TrackScene {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  labelRenderer: CSS2DRenderer;
  private container: HTMLElement;
  private trackGroup: THREE.Group;
  private trainGroup: THREE.Group;
  private labelGroup: THREE.Group;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private onSwitchClick?: SwitchClickCallback;

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

    // Create CSS2D renderer for labels
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(container.clientWidth, container.clientHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(this.labelRenderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    this.scene.add(directionalLight);

    // Create group for track pieces
    this.trackGroup = new THREE.Group();
    this.scene.add(this.trackGroup);

    // Create group for trains
    this.trainGroup = new THREE.Group();
    this.scene.add(this.trainGroup);

    // Create group for labels
    this.labelGroup = new THREE.Group();
    this.scene.add(this.labelGroup);

    // Add grid helper for reference
    const gridHelper = new THREE.GridHelper(200, 20, 0xcccccc, 0xe0e0e0);
    gridHelper.rotation.x = 0; // Already horizontal
    this.scene.add(gridHelper);

    // Initialize raycaster for click detection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

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

    // Check if we clicked a switch indicator
    for (const intersect of intersects) {
      const userData = intersect.object.userData;
      if (userData && userData.isSwitchIndicator) {
        // Only respond to clicks on non-selected (red) indicators
        if (this.onSwitchClick) {
          this.onSwitchClick(userData.pieceId, userData.pointName, userData.connectionIndex);
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
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  clearLayout(): void {
    // Remove all track pieces
    while (this.trackGroup.children.length > 0) {
      const child = this.trackGroup.children[0];
      this.trackGroup.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
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
   */
  updateTrains(trainGroup: THREE.Group): void {
    // Clear existing trains
    while (this.trainGroup.children.length > 0) {
      const child = this.trainGroup.children[0];
      this.trainGroup.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    }

    // Add new train meshes
    for (const child of trainGroup.children) {
      this.trainGroup.add(child.clone());
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
   * Fit camera to show all track pieces
   */
  fitToLayout(): void {
    if (this.trackGroup.children.length === 0) return;

    const box = new THREE.Box3().setFromObject(this.trackGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Add padding
    const maxDim = Math.max(size.x, size.z) * 1.2;
    const aspect = this.container.clientWidth / this.container.clientHeight;

    this.camera.left = -maxDim * aspect / 2;
    this.camera.right = maxDim * aspect / 2;
    this.camera.top = maxDim / 2;
    this.camera.bottom = -maxDim / 2;

    this.camera.position.set(center.x, 100, center.z);
    this.camera.lookAt(center.x, 0, center.z);
    this.camera.updateProjectionMatrix();
  }
}
