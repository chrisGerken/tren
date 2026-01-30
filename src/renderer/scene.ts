/**
 * Three.js Scene Setup
 */

import * as THREE from 'three';

export class TrackScene {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  private container: HTMLElement;
  private trackGroup: THREE.Group;

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

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    this.scene.add(directionalLight);

    // Create group for track pieces
    this.trackGroup = new THREE.Group();
    this.scene.add(this.trackGroup);

    // Add grid helper for reference
    const gridHelper = new THREE.GridHelper(200, 20, 0xcccccc, 0xe0e0e0);
    gridHelper.rotation.x = 0; // Already horizontal
    this.scene.add(gridHelper);

    // Handle window resize
    window.addEventListener('resize', () => this.onResize());
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
    this.render();
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
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
  }

  addTrackGroup(group: THREE.Group): void {
    this.trackGroup.add(group);
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
