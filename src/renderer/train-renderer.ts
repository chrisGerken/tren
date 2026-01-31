/**
 * Train Renderer - creates Three.js geometry for trains
 */

import * as THREE from 'three';
import { Train, Car } from '../core/types';
import { CAB_LENGTH, CAR_LENGTH } from '../core/train-movement';

// Car dimensions in inches
const CAR_WIDTH = 2;
const CAR_HEIGHT = 1.5;

// Colors
const CAB_COLOR = 0xd8a60b;   // Yellow for cabs (engines)
const CAR_COLOR = 0x800020;   // Dark maroon for rolling stock

/**
 * Render all trains as a Three.js group
 */
export function renderTrains(trains: Train[]): THREE.Group {
  const group = new THREE.Group();

  for (const train of trains) {
    const trainGroup = renderTrain(train);
    group.add(trainGroup);
  }

  return group;
}

/**
 * Render a single train
 */
function renderTrain(train: Train): THREE.Group {
  const group = new THREE.Group();
  group.name = train.id;

  for (const car of train.cars) {
    const carMesh = renderCar(car);
    group.add(carMesh);
  }

  return group;
}

/**
 * Render a single car as a box
 */
function renderCar(car: Car): THREE.Mesh {
  const length = car.type === 'cab' ? CAB_LENGTH : CAR_LENGTH;
  const color = car.type === 'cab' ? CAB_COLOR : CAR_COLOR;

  const geometry = new THREE.BoxGeometry(length, CAR_HEIGHT, CAR_WIDTH);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.7,
    metalness: 0.3,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = car.id;

  // Position and rotate
  mesh.position.set(car.worldPosition.x, CAR_HEIGHT / 2, car.worldPosition.z);
  mesh.rotation.y = -car.rotation; // Negate for Three.js convention

  // Set visibility
  mesh.visible = car.visible;

  return mesh;
}

/**
 * Update existing train meshes with new positions
 * More efficient than recreating all geometry each frame
 */
export function updateTrainMeshes(group: THREE.Group, trains: Train[]): void {
  // Build a map of car meshes by ID
  const meshMap = new Map<string, THREE.Mesh>();
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.name) {
      meshMap.set(obj.name, obj);
    }
  });

  // Update each car's mesh
  for (const train of trains) {
    for (const car of train.cars) {
      const mesh = meshMap.get(car.id);
      if (mesh) {
        mesh.position.set(car.worldPosition.x, CAR_HEIGHT / 2, car.worldPosition.z);
        mesh.rotation.y = -car.rotation;
        mesh.visible = car.visible;
      }
    }
  }
}
