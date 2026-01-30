/**
 * Layout Builder - transforms AST into placed track pieces
 */

import { parse, Statement, PieceStatement, NewStatement, ReferenceStatement, LoopCloseStatement } from './parser';
import { Layout, TrackPiece, Vec3, vec2, Connection, ConnectionPointDef } from '../core/types';
import { getArchetype, TrackArchetype } from '../core/archetypes';

interface Segment {
  pieces: TrackPiece[];
  startPosition: Vec3;
  startRotation: number;
}

interface BuilderState {
  pieces: TrackPiece[];
  labeledPieces: Map<string, TrackPiece>;
  segments: Segment[];
  currentSegment: Segment;
  currentPosition: Vec3;
  currentRotation: number;
  currentPiece: TrackPiece | null;
  currentPointName: string;
  nextPieceId: number;
}

/**
 * Build a layout from DSL text
 */
export function buildLayout(input: string): Layout {
  const statements = parse(input);
  const builder = new LayoutBuilder();
  return builder.build(statements);
}

class LayoutBuilder {
  private state: BuilderState;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): BuilderState {
    const initialSegment: Segment = {
      pieces: [],
      startPosition: vec2(0, 0),
      startRotation: 0,
    };

    return {
      pieces: [],
      labeledPieces: new Map(),
      segments: [],
      currentSegment: initialSegment,
      currentPosition: vec2(0, 0),
      currentRotation: 0,
      currentPiece: null,
      currentPointName: 'out',
      nextPieceId: 1,
    };
  }

  build(statements: Statement[]): Layout {
    for (const stmt of statements) {
      this.processStatement(stmt);
    }

    // Finalize current segment
    if (this.state.currentSegment.pieces.length > 0) {
      this.state.segments.push(this.state.currentSegment);
    }

    // Detect auto-connections
    this.detectAutoConnections();

    return { pieces: this.state.pieces };
  }

  private processStatement(stmt: Statement): void {
    switch (stmt.type) {
      case 'new':
        this.processNew(stmt);
        break;
      case 'piece':
        this.processPiece(stmt);
        break;
      case 'reference':
        this.processReference(stmt);
        break;
      case 'loopClose':
        this.processLoopClose(stmt);
        break;
    }
  }

  private processNew(stmt: NewStatement): void {
    // Save current segment if it has pieces
    if (this.state.currentSegment.pieces.length > 0) {
      this.state.segments.push(this.state.currentSegment);
    }

    // Start new segment
    const rotation = (stmt.degrees * Math.PI) / 180;

    // Check if starting from a labeled piece
    if (stmt.fromLabel) {
      const labeledPiece = this.state.labeledPieces.get(stmt.fromLabel);
      if (!labeledPiece) {
        throw new Error(`Unknown label '${stmt.fromLabel}' in 'new from' at line ${stmt.line}`);
      }

      const archetype = getArchetype(labeledPiece.archetypeCode);
      const pointName = stmt.fromPoint || 'out';
      const point = this.getConnectionPoint(archetype, pointName);

      if (!point) {
        throw new Error(`Connection point '${pointName}' not found on '${stmt.fromLabel}' at line ${stmt.line}`);
      }

      // Calculate world position of the connection point
      const rotatedPoint = this.rotatePoint(point.position, labeledPiece.rotation);
      const worldPos: Vec3 = {
        x: labeledPiece.position.x + rotatedPoint.x,
        y: 0,
        z: labeledPiece.position.z + rotatedPoint.z,
      };

      const rotatedDir = this.rotatePoint(point.direction, labeledPiece.rotation);
      const worldRotation = Math.atan2(rotatedDir.z, rotatedDir.x);

      this.state.currentSegment = {
        pieces: [],
        startPosition: worldPos,
        startRotation: worldRotation,
      };
      this.state.currentPosition = worldPos;
      this.state.currentRotation = worldRotation;
      this.state.currentPiece = labeledPiece;
      this.state.currentPointName = pointName;
    } else {
      // Start at origin with specified rotation
      this.state.currentSegment = {
        pieces: [],
        startPosition: vec2(0, 0),
        startRotation: rotation,
      };
      this.state.currentPosition = vec2(0, 0);
      this.state.currentRotation = rotation;
      this.state.currentPiece = null;
      this.state.currentPointName = 'out';
    }
  }

  private processPiece(stmt: PieceStatement): void {
    const archetype = getArchetype(stmt.archetypeCode);

    for (let i = 0; i < stmt.count; i++) {
      const piece = this.placePiece(archetype, stmt.attachPoint);

      // Apply label only to the first piece (or last? Let's use first)
      if (i === 0 && stmt.label) {
        piece.label = stmt.label;
        this.state.labeledPieces.set(stmt.label, piece);
      }

      this.state.pieces.push(piece);
      this.state.currentSegment.pieces.push(piece);
      this.state.currentPiece = piece;
    }
  }

  private placePiece(archetype: TrackArchetype, explicitAttachPoint?: string): TrackPiece {
    // Determine which connection point to attach
    // For first piece of segment or pieces with only one connection, be flexible
    let attachPointName = explicitAttachPoint || 'in';
    let attachPoint = this.getConnectionPoint(archetype, attachPointName);

    // If 'in' doesn't exist (e.g., generator only has 'out'), use first available point
    if (!attachPoint) {
      if (archetype.connectionPoints.length > 0) {
        attachPoint = archetype.connectionPoints[0];
        attachPointName = attachPoint.name;
      } else {
        throw new Error(`No connection points found on archetype '${archetype.code}'`);
      }
    }

    // Determine continue point (opposite of attach)
    const continuePointName = this.getOppositePoint(archetype, attachPointName);
    const continuePoint = continuePointName ? this.getConnectionPoint(archetype, continuePointName) : null;

    // Calculate rotation to align attach point with current direction
    // The attach point's direction should face opposite to our incoming direction
    const attachDir = attachPoint.direction;
    const attachAngle = Math.atan2(attachDir.z, attachDir.x);

    // Incoming direction at current position (opposite of current point's direction)
    const incomingAngle = this.state.currentRotation + Math.PI;

    // Piece rotation aligns attach point direction with incoming direction
    const pieceRotation = incomingAngle - attachAngle;

    // Calculate piece world position
    // The attach point in local coords, rotated and translated
    const rotatedAttach = this.rotatePoint(attachPoint.position, pieceRotation);
    const piecePosition: Vec3 = {
      x: this.state.currentPosition.x - rotatedAttach.x,
      y: 0,
      z: this.state.currentPosition.z - rotatedAttach.z,
    };

    // Create the piece
    const piece: TrackPiece = {
      id: `piece_${this.state.nextPieceId++}`,
      archetypeCode: archetype.code,
      position: piecePosition,
      rotation: pieceRotation,
      connections: new Map(),
    };

    // Update current position and rotation for next piece
    if (continuePoint) {
      const rotatedContinue = this.rotatePoint(continuePoint.position, pieceRotation);
      this.state.currentPosition = {
        x: piecePosition.x + rotatedContinue.x,
        y: 0,
        z: piecePosition.z + rotatedContinue.z,
      };

      const continueDir = this.rotatePoint(continuePoint.direction, pieceRotation);
      this.state.currentRotation = Math.atan2(continueDir.z, continueDir.x);
      this.state.currentPointName = continuePointName;
    }

    return piece;
  }

  private processReference(stmt: ReferenceStatement): void {
    const labeledPiece = this.state.labeledPieces.get(stmt.label);
    if (!labeledPiece) {
      throw new Error(`Unknown label reference: $${stmt.label} at line ${stmt.line}`);
    }

    const archetype = getArchetype(labeledPiece.archetypeCode);
    const pointName = stmt.point || 'out';
    const point = this.getConnectionPoint(archetype, pointName);

    if (!point) {
      throw new Error(`Connection point '${pointName}' not found on labeled piece '${stmt.label}' at line ${stmt.line}`);
    }

    // Calculate world position of the connection point
    const rotatedPoint = this.rotatePoint(point.position, labeledPiece.rotation);
    this.state.currentPosition = {
      x: labeledPiece.position.x + rotatedPoint.x,
      y: 0,
      z: labeledPiece.position.z + rotatedPoint.z,
    };

    const rotatedDir = this.rotatePoint(point.direction, labeledPiece.rotation);
    this.state.currentRotation = Math.atan2(rotatedDir.z, rotatedDir.x);
    this.state.currentPiece = labeledPiece;
    this.state.currentPointName = pointName;
  }

  private processLoopClose(stmt: LoopCloseStatement): void {
    // Connect current segment's output to the labeled piece's specified point
    // This repositions all pieces in the current segment to align the connection
    const labeledPiece = this.state.labeledPieces.get(stmt.label);
    if (!labeledPiece) {
      throw new Error(`Unknown label reference in loop close: $${stmt.label} at line ${stmt.line}`);
    }

    const targetArchetype = getArchetype(labeledPiece.archetypeCode);
    const targetPoint = this.getConnectionPoint(targetArchetype, stmt.point);
    if (!targetPoint) {
      throw new Error(`Connection point '${stmt.point}' not found on '${stmt.label}' at line ${stmt.line}`);
    }

    // Calculate target world position and direction
    const targetWorldPos = this.rotatePoint(targetPoint.position, labeledPiece.rotation);
    const targetPos: Vec3 = {
      x: labeledPiece.position.x + targetWorldPos.x,
      y: 0,
      z: labeledPiece.position.z + targetWorldPos.z,
    };
    const targetDir = this.rotatePoint(targetPoint.direction, labeledPiece.rotation);
    const targetAngle = Math.atan2(targetDir.z, targetDir.x);

    // Current segment's output position and direction
    const currentPos = this.state.currentPosition;
    const currentAngle = this.state.currentRotation;

    // Calculate the transform needed to align current output with target
    // The current output direction should be OPPOSITE to target direction (facing each other)
    const desiredAngle = targetAngle + Math.PI; // Opposite direction
    const rotationDelta = desiredAngle - currentAngle;

    // Rotate all pieces in current segment around the segment's start position
    const segmentStart = this.state.currentSegment.startPosition;

    for (const piece of this.state.currentSegment.pieces) {
      // Rotate piece position around segment start
      const relX = piece.position.x - segmentStart.x;
      const relZ = piece.position.z - segmentStart.z;
      const rotated = this.rotatePoint({ x: relX, y: 0, z: relZ }, rotationDelta);
      piece.position.x = segmentStart.x + rotated.x;
      piece.position.z = segmentStart.z + rotated.z;

      // Update piece rotation
      piece.rotation += rotationDelta;
    }

    // Recalculate current position after rotation
    const relCurrentX = currentPos.x - segmentStart.x;
    const relCurrentZ = currentPos.z - segmentStart.z;
    const rotatedCurrent = this.rotatePoint({ x: relCurrentX, y: 0, z: relCurrentZ }, rotationDelta);
    const rotatedCurrentPos: Vec3 = {
      x: segmentStart.x + rotatedCurrent.x,
      y: 0,
      z: segmentStart.z + rotatedCurrent.z,
    };

    // Now translate all pieces so rotated current position matches target position
    const translateX = targetPos.x - rotatedCurrentPos.x;
    const translateZ = targetPos.z - rotatedCurrentPos.z;

    for (const piece of this.state.currentSegment.pieces) {
      piece.position.x += translateX;
      piece.position.z += translateZ;
    }

    // Update segment start position
    this.state.currentSegment.startPosition.x += translateX;
    this.state.currentSegment.startPosition.z += translateZ;

    // Create connection records
    if (this.state.currentPiece) {
      const currentConnections = this.state.currentPiece.connections.get(this.state.currentPointName) || [];
      currentConnections.push({
        pieceId: labeledPiece.id,
        pointName: stmt.point,
      });
      this.state.currentPiece.connections.set(this.state.currentPointName, currentConnections);

      // Bidirectional connection
      const labeledConnections = labeledPiece.connections.get(stmt.point) || [];
      labeledConnections.push({
        pieceId: this.state.currentPiece.id,
        pointName: this.state.currentPointName,
      });
      labeledPiece.connections.set(stmt.point, labeledConnections);
    }
  }

  private getConnectionPoint(archetype: TrackArchetype, name: string): ConnectionPointDef | undefined {
    return archetype.connectionPoints.find(cp => cp.name === name);
  }

  private getOppositePoint(archetype: TrackArchetype, pointName: string): string | undefined {
    // For standard pieces: in <-> out
    if (pointName === 'in') return archetype.connectionPoints.find(cp => cp.name === 'out') ? 'out' : undefined;
    if (pointName === 'out') return archetype.connectionPoints.find(cp => cp.name === 'in') ? 'in' : undefined;

    // For crossings: in1 <-> out1, in2 <-> out2
    if (pointName === 'in1') return 'out1';
    if (pointName === 'out1') return 'in1';
    if (pointName === 'in2') return 'out2';
    if (pointName === 'out2') return 'in2';

    return undefined;
  }

  private rotatePoint(point: Vec3, angle: number): Vec3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: point.x * cos - point.z * sin,
      y: point.y,
      z: point.x * sin + point.z * cos,
    };
  }

  /**
   * Detect auto-connections between pieces.
   * Connection points at the same position with opposite directions are automatically connected.
   */
  private detectAutoConnections(): void {
    const POSITION_TOLERANCE = 0.5;  // inches
    const DIRECTION_TOLERANCE = 0.1; // dot product threshold (cos ~174°)

    // Collect all connection points with their world positions/directions
    interface WorldPoint {
      piece: TrackPiece;
      pointName: string;
      worldPos: Vec3;
      worldDir: Vec3;
    }

    const worldPoints: WorldPoint[] = [];

    for (const piece of this.state.pieces) {
      const archetype = getArchetype(piece.archetypeCode);
      for (const cp of archetype.connectionPoints) {
        const worldPos = this.rotatePoint(cp.position, piece.rotation);
        const worldDir = this.rotatePoint(cp.direction, piece.rotation);
        worldPoints.push({
          piece,
          pointName: cp.name,
          worldPos: {
            x: piece.position.x + worldPos.x,
            y: 0,
            z: piece.position.z + worldPos.z,
          },
          worldDir,
        });
      }
    }

    // Find pairs of points that are close together with opposite directions
    for (let i = 0; i < worldPoints.length; i++) {
      for (let j = i + 1; j < worldPoints.length; j++) {
        const a = worldPoints[i];
        const b = worldPoints[j];

        // Skip if same piece
        if (a.piece.id === b.piece.id) continue;

        // Skip if already connected
        const aConnections = a.piece.connections.get(a.pointName) || [];
        const alreadyConnected = aConnections.some(
          c => c.pieceId === b.piece.id && c.pointName === b.pointName
        );
        if (alreadyConnected) continue;

        // Check position distance
        const dx = a.worldPos.x - b.worldPos.x;
        const dz = a.worldPos.z - b.worldPos.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        if (distance > POSITION_TOLERANCE) continue;

        // Check directions are opposite (dot product close to -1)
        const dot = a.worldDir.x * b.worldDir.x + a.worldDir.z * b.worldDir.z;
        if (dot > -1 + DIRECTION_TOLERANCE) continue;

        // Auto-connect!
        const aConns = a.piece.connections.get(a.pointName) || [];
        aConns.push({ pieceId: b.piece.id, pointName: b.pointName, isAutoConnect: true });
        a.piece.connections.set(a.pointName, aConns);

        const bConns = b.piece.connections.get(b.pointName) || [];
        bConns.push({ pieceId: a.piece.id, pointName: a.pointName, isAutoConnect: true });
        b.piece.connections.set(b.pointName, bConns);
      }
    }
  }
}
