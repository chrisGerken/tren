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
const CAB_COLOR = 0xffff00;   // Yellow for cabs (engines)

// Car colors - pastel variants for rolling stock
const CAR_COLORS = [
  0xf1948a,   // Pastel red
  0x85c1e9,   // Pastel blue
  0x82e0aa,   // Pastel green
  0xc39bd3,   // Pastel purple
  0xf8c471,   // Pastel orange
];

// Track the last car color index for weighted random selection during spawning
let lastCarColorIndex: number | null = null;

/**
 * Get a random car color with weighted probability
 * Previous color has 2x probability of being chosen
 * Called once when a car is created, not every frame
 */
export function getRandomCarColor(): number {
  const weights: number[] = CAR_COLORS.map((_, index) => {
    // Previous color gets weight 2, others get weight 1
    return (lastCarColorIndex !== null && index === lastCarColorIndex) ? 2 : 1;
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      lastCarColorIndex = i;
      return CAR_COLORS[i];
    }
  }

  // Fallback (shouldn't happen)
  lastCarColorIndex = 0;
  return CAR_COLORS[0];
}

/**
 * Reset color tracking (call when starting a new train)
 */
export function resetCarColorTracking(): void {
  lastCarColorIndex = null;
}

/**
 * Create a cab shape with truncated rounded triangle front and rounded rear
 * Shape is drawn in XY plane (X = length/forward, Y = width/lateral)
 */
function createCabShape(): THREE.Shape {
  const halfLength = CAB_LENGTH / 2;  // 2
  const halfWidth = CAR_WIDTH / 2;    // 1

  // Rounding parameters
  const rearCornerRadius = 0.25;
  const frontCornerRadius = 0.15;

  // Taper parameters - front narrows to truncated triangle
  const taperStartX = halfLength * 0.35;  // Where narrowing begins
  const frontTipHalfWidth = halfWidth * 0.35;  // Width at truncated front
  const truncationDepth = 0.15;  // How far back the truncation cuts

  const shape = new THREE.Shape();

  // Draw counter-clockwise starting from rear-right
  // Rear-right corner (start after the arc)
  shape.moveTo(-halfLength + rearCornerRadius, -halfWidth);

  // Rear-right rounded corner
  shape.quadraticCurveTo(
    -halfLength, -halfWidth,
    -halfLength, -halfWidth + rearCornerRadius
  );

  // Left side of rear (going up toward rear-left corner)
  shape.lineTo(-halfLength, halfWidth - rearCornerRadius);

  // Rear-left rounded corner
  shape.quadraticCurveTo(
    -halfLength, halfWidth,
    -halfLength + rearCornerRadius, halfWidth
  );

  // Top edge (left side) - straight to taper start
  shape.lineTo(taperStartX, halfWidth);

  // Taper to front-left corner
  shape.lineTo(halfLength - truncationDepth, frontTipHalfWidth + frontCornerRadius);

  // Front-left rounded corner (transition to truncated front)
  shape.quadraticCurveTo(
    halfLength - truncationDepth + frontCornerRadius * 0.5, frontTipHalfWidth,
    halfLength, frontTipHalfWidth
  );

  // Truncated front edge
  shape.lineTo(halfLength, -frontTipHalfWidth);

  // Front-right rounded corner
  shape.quadraticCurveTo(
    halfLength - truncationDepth + frontCornerRadius * 0.5, -frontTipHalfWidth,
    halfLength - truncationDepth, -frontTipHalfWidth - frontCornerRadius
  );

  // Taper from front-right to main body
  shape.lineTo(taperStartX, -halfWidth);

  // Bottom edge (right side) - back to start
  shape.lineTo(-halfLength + rearCornerRadius, -halfWidth);

  return shape;
}

/**
 * Create a car shape with rounded corners (simple rounded rectangle)
 */
function createCarShape(): THREE.Shape {
  const halfLength = CAR_LENGTH / 2;  // 1.5
  const halfWidth = CAR_WIDTH / 2;    // 1
  const cornerRadius = 0.2;

  const shape = new THREE.Shape();

  // Draw counter-clockwise starting from rear-right
  shape.moveTo(-halfLength + cornerRadius, -halfWidth);

  // Rear-right rounded corner
  shape.quadraticCurveTo(-halfLength, -halfWidth, -halfLength, -halfWidth + cornerRadius);

  // Left side
  shape.lineTo(-halfLength, halfWidth - cornerRadius);

  // Rear-left rounded corner
  shape.quadraticCurveTo(-halfLength, halfWidth, -halfLength + cornerRadius, halfWidth);

  // Top edge
  shape.lineTo(halfLength - cornerRadius, halfWidth);

  // Front-left rounded corner
  shape.quadraticCurveTo(halfLength, halfWidth, halfLength, halfWidth - cornerRadius);

  // Right side
  shape.lineTo(halfLength, -halfWidth + cornerRadius);

  // Front-right rounded corner
  shape.quadraticCurveTo(halfLength, -halfWidth, halfLength - cornerRadius, -halfWidth);

  // Bottom edge back to start
  shape.lineTo(-halfLength + cornerRadius, -halfWidth);

  return shape;
}

// Cache geometries and edges since they're reused
let cabGeometry: THREE.ExtrudeGeometry | null = null;
let carGeometry: THREE.ExtrudeGeometry | null = null;
let cabEdges: THREE.EdgesGeometry | null = null;
let carEdges: THREE.EdgesGeometry | null = null;

// Cache materials by color to avoid recreating them
const materialCache = new Map<number, THREE.MeshStandardMaterial>();
let outlineMaterial: THREE.LineBasicMaterial | null = null;

function getCabGeometry(): THREE.ExtrudeGeometry {
  if (!cabGeometry) {
    const shape = createCabShape();
    cabGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: CAR_HEIGHT,
      bevelEnabled: false,
    });
    // Rotate so extrusion is along Y (up) instead of Z
    cabGeometry.rotateX(-Math.PI / 2);
    // Shift so bottom is at Y=0
    cabGeometry.translate(0, CAR_HEIGHT / 2, 0);
  }
  return cabGeometry;
}

function getCarGeometry(): THREE.ExtrudeGeometry {
  if (!carGeometry) {
    const shape = createCarShape();
    carGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: CAR_HEIGHT,
      bevelEnabled: false,
    });
    // Rotate so extrusion is along Y (up) instead of Z
    carGeometry.rotateX(-Math.PI / 2);
    // Shift so bottom is at Y=0
    carGeometry.translate(0, CAR_HEIGHT / 2, 0);
  }
  return carGeometry;
}

function getCabEdges(): THREE.EdgesGeometry {
  if (!cabEdges) {
    cabEdges = new THREE.EdgesGeometry(getCabGeometry(), 15);
  }
  return cabEdges;
}

function getCarEdges(): THREE.EdgesGeometry {
  if (!carEdges) {
    carEdges = new THREE.EdgesGeometry(getCarGeometry(), 15);
  }
  return carEdges;
}

function getMaterial(color: number): THREE.MeshStandardMaterial {
  let material = materialCache.get(color);
  if (!material) {
    material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.7,
      metalness: 0.3,
    });
    materialCache.set(color, material);
  }
  return material;
}

function getOutlineMaterial(): THREE.LineBasicMaterial {
  if (!outlineMaterial) {
    outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
  }
  return outlineMaterial;
}

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
 * Render a single car with custom shape and black border
 * Cabs have truncated rounded triangle front, cars have rounded rectangle
 */
function renderCar(car: Car): THREE.Group {
  const isCab = car.type === 'cab';
  const geometry = isCab ? getCabGeometry() : getCarGeometry();
  const edges = isCab ? getCabEdges() : getCarEdges();
  // Cabs are always yellow; cars use their stored color (assigned at spawn time)
  const color = isCab ? CAB_COLOR : (car.color ?? CAR_COLORS[0]);

  // Use cached materials
  const material = getMaterial(color);
  const mesh = new THREE.Mesh(geometry, material);

  // Use cached outline material and edges
  const outline = new THREE.LineSegments(edges, getOutlineMaterial());

  // Create group to hold both mesh and outline
  const group = new THREE.Group();
  group.name = car.id;
  group.add(mesh);
  group.add(outline);

  // Position at world coordinates (geometry is already centered with bottom at Y=0)
  // Note: Z is negated to match the track rendering's Z-flip for screen orientation
  // With Z-flip, the rotation sign also flips, so we use car.rotation directly (not negated)
  const posX = car.worldPosition.x;
  const posZ = -car.worldPosition.z;
  const rot = car.rotation;

  // Guard against NaN values which can cause rendering issues
  if (Number.isNaN(posX) || Number.isNaN(posZ) || Number.isNaN(rot)) {
    console.error(`NaN detected in car ${car.id}: pos=(${posX}, ${posZ}), rot=${rot}`);
    group.visible = false;
  } else {
    group.position.set(posX, 0, posZ);
    group.rotation.y = rot;
  }

  // Set visibility
  group.visible = car.visible;

  return group;
}

/**
 * Update existing train meshes with new positions
 * More efficient than recreating all geometry each frame
 */
export function updateTrainMeshes(group: THREE.Group, trains: Train[]): void {
  // Build a map of car groups by ID
  const groupMap = new Map<string, THREE.Group>();
  group.traverse((obj) => {
    if (obj instanceof THREE.Group && obj.name) {
      groupMap.set(obj.name, obj);
    }
  });

  // Update each car's group
  for (const train of trains) {
    for (const car of train.cars) {
      const carGroup = groupMap.get(car.id);
      if (carGroup) {
        const posX = car.worldPosition.x;
        const posZ = -car.worldPosition.z;
        const rot = car.rotation;  // No negation with Z-flip

        // Guard against NaN values
        if (Number.isNaN(posX) || Number.isNaN(posZ) || Number.isNaN(rot)) {
          console.error(`NaN detected in car ${car.id}: pos=(${posX}, ${posZ}), rot=${rot}`);
          carGroup.visible = false;
        } else {
          carGroup.position.set(posX, 0, posZ);
          carGroup.rotation.y = rot;
          carGroup.visible = car.visible;
        }
      }
    }
  }
}

/**
 * Clear cached geometries (useful for hot reload or testing)
 */
export function clearGeometryCache(): void {
  if (cabGeometry) {
    cabGeometry.dispose();
    cabGeometry = null;
  }
  if (carGeometry) {
    carGeometry.dispose();
    carGeometry = null;
  }
}
