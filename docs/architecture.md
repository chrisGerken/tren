# System Architecture

## Data Model Hierarchy

The system is organized in a five-level hierarchy:

```
Layout
  └── Layout Section(s)
        └── Track Piece(s)
              └── Track Section(s)
                    └── Spline Points
```

### Layout

The root container for the entire simulation.

**Properties**:
- `title`: Display name for the layout (default: "No Title")
- `description`: Optional longer description of the layout
- `minGap`: Minimum following distance between trains in inches (default: 1 inch)
- `treesEnabled`: Whether tree scenery is enabled (default: false)
- `treesClearance`: Min grid distance from track for tree placement (default: 2)
- `treesDensity`: Max trees per grid cell (default: 3)
- `pondEnabled`: Whether pond scenery is enabled (default: false)
- `pondSize`: Number of grid cells for the pond (default: 20)
- `pondClearance`: Min grid distance from track for pond placement (default: 3)
- `pondScore`: Score assigned to pond cells for tree buffer calculation (default: min original score − 1)
- `gridSize`: Grid cell size in inches for scenery scoring (default: 8)
- `pieces`: Array of all track pieces in the layout

**Responsibilities**:
- Owns all layout sections
- Global coordinate system
- Serialization/save/load of the entire world
- Top-level queries ("find all trains," "find track at position")

Layouts can be defined using the [Layout DSL](layout-dsl.md), a text-based language for specifying track configurations.

### Layout Section

A logical grouping of track pieces representing a functional area.

**Examples**:
- A classification yard
- A station complex
- A junction area
- A mainline segment between locations

**Benefits**:
- **Organization**: Users can name, show/hide, lock sections
- **Reusability**: Save a section design as a template, reuse elsewhere
- **Editing scope**: Select an entire section as a unit to move or rotate
- **Operational grouping**: Assign control panels or dispatchers to sections

### Track Piece

An instantiated piece of track placed in the layout.

**Properties**:
- Reference to its archetype (template)
- World position and rotation
- Connections to other track pieces

### Track Section

A single traversable path within a track piece. This is the atomic unit for train movement.

**Properties**:
- Spline defining the path (in local coordinates)
- Endpoints that can connect to other sections
- Parent track piece reference

**Notes**:
- Most pieces (straight, curve, bumper) have one section
- Crossings have two independent sections (one per track)

### Spline Points

Control points defining a smooth curve through 3D space (using only X/Z for the 2D version).

Three.js `CatmullRomCurve3` interpolates smoothly between these points, providing:
- Position at any point along the curve
- Tangent (direction) at any point
- Arc-length parameterization for consistent speed

## Dual Graph Structure

Two interrelated graphs serve different purposes:

### Track Piece Graph (Layout Level)

- **Nodes**: Track pieces
- **Edges**: Connections between pieces (which exit connects to which entry)
- **Multi-connections**: A single connection point can have multiple pieces connected to it (virtual switches)
- **Purpose**: Layout editing, route planning, user commands, serialization

This is the abstraction users interact with.

### Track Section Graph (Movement Level)

- **Nodes**: Track sections
- **Edges**: Which section endpoints connect to which other section endpoints
- **Multi-edges**: When multiple pieces connect to one point, multiple edges exist from that point
- **Traversal**: Bidirectional—a train tracks its current section, position, and direction
- **Purpose**: Continuous train positioning, collision detection

When a train reaches the end of a section, it queries this graph to find connected section(s). If multiple connections exist (a virtual switch), the system determines which branch is active.

### Cross-References

- Each track piece owns its track section(s)
- Each track section knows its parent track piece
- Connection points track all pieces connected to them

## Virtual Switches

Instead of dedicated switch archetypes, branching is achieved by connecting multiple track pieces to a single connection point.

### Example

```
base: str
str x 3       # Main route
bump

$base.out     # Return to base's output
crvl x 3      # Diverging route
bump
```

This creates a virtual left turnout at `base.out` where two routes diverge.

### Benefits

- Simpler archetype set (no switch pieces to manage)
- Flexible branching (any number of routes from any point)
- No switch state to track (route selection is separate from track topology)

### Route Selection

When a train approaches a branch point, the system must determine which route to take. This is handled separately from the track topology, allowing for:
- Manual route selection by the user
- Automatic routing based on destination
- Signal-based routing

All connections at a switch point are treated as a single group regardless of their entry point direction (in/out). The route key includes a direction component (`fwd` for 'out' exits, `bwd` for 'in' exits) using a canonical junction ID shared by all inbound tracks at the junction.

### Same-Polarity Junctions

Connections with the same polarity (out↔out or in↔in) arise from explicit loop close (`>`) syntax. Each car maintains a `sectionDirection` field (`1` or `-1`) that toggles when crossing these junctions. This reverses the spline traversal direction while preserving the car's physical heading (rotation is flipped by π when `sectionDirection = -1`).

## Auto-Connect

After a layout is fully specified, auto-connect scans all connection points on all track pieces and automatically joins any two that meet the connection criteria.

### Connection Criteria

For any two connection points to auto-connect:
1. **Approximately same position**: Within a configurable distance tolerance
2. **Approximately opposite directions**: Direction vectors point toward each other (within ~180° ± angle tolerance)

This applies to all connection points, not just open endpoints. When connection points from different pieces meet the criteria, they are joined—automatically creating virtual switches where multiple tracks converge.

### Graph Updates

When auto-connect joins connection points:
- The Track Piece Graph gains edges between the pieces
- The Track Section Graph gains corresponding section-level edges
- A single connection point may end up with multiple connections (virtual switch)

The tolerances accommodate accumulated geometric errors from sequences of curves and straights. Specific tolerance values are configurable and not yet determined.

Connection points at approximately the same position but with parallel directions (not facing each other) remain unconnected.

See [Layout DSL](layout-dsl.md) for examples and usage details.

## Collision Prevention: Lock Manager

The `LockManager` class (`src/core/lock-manager.ts`) handles connection point locking to prevent train collisions.

### Connection Point Identifiers

Connection points are identified by string IDs in the format `${pieceId}.${pointName}`, e.g., `piece_5.out`.

```typescript
type ConnectionPointId = string;  // "pieceId.pointName"

interface ConnectionPointLock {
  trainId: string;
  acquiredAt: number;  // simulation time
}

interface TrainLockState {
  heldLocks: Set<ConnectionPointId>;
}
```

### LockManager Class

```typescript
class LockManager {
  // Main lock registry
  private locks: Map<ConnectionPointId, ConnectionPointLock>;

  // Per-train lock tracking
  private trainStates: Map<string, TrainLockState>;

  // Configuration
  readonly minLockDistance = 10;  // inches
  readonly minLockCount = 2;      // connection points

  // Core operations
  tryAcquireLocks(trainId, points[], simulationTime): LockAcquisitionResult;
  releaseLock(trainId, point): boolean;
  releaseAllLocks(trainId): void;

  // High-level operations
  acquireLeadingLocks(train, layout, selectedRoutes, simulationTime): LockAcquisitionResult;
  releaseTrailingLocks(train, layout, selectedRoutes, simulationTime): void;
  calculateStraddledPoints(train, layout): ConnectionPointId[];

  // Junction protection
  isJunctionLocked(routeKey): boolean;
}
```

### Integration with Simulation

The `Simulation` class (`src/core/simulation.ts`) uses the LockManager:

1. **Each frame in `updateTrains()`:**
   - Call `acquireLeadingLocks()` for each train
   - Adjust speed based on lock acquisition success
   - Move cars
   - Call `releaseTrailingLocks()` for each train

2. **On train spawn:**
   - Try `acquireLeadingLocks()` before adding train
   - If blocked, don't spawn (try again next interval)

3. **On train removal:**
   - Call `releaseAllLocks()` when all cars enter bin

4. **On switch click:**
   - Check `isJunctionLocked()` before allowing change
   - Reject with status message if locked

5. **Next switch detection (`findNextSwitch()`):**
   - Walks ahead from a train's lead car through the track piece graph
   - Returns info about the first virtual switch encountered (route key, spatially-labeled options, current override)
   - Used by the train inspector widget to show a switch selector UI
   - `setTrainSwitchOverride()` / `clearTrainSwitchOverride()` pre-set routes in `train.routesTaken`
   - Inspector fires `onSwitchRouteChanged` callback on select to sync 3D switch indicator colors

6. **Generator inspector (`GeneratorInspectorWidget`):**
   - Double-click a generator mesh to open a widget controlling spawn parameters
   - Sliders for cabs, cars, speed, frequency; buttons for color mode and enable/disable
   - Writes directly to the `TrackPiece.genConfig` object (shared reference with the simulation)
   - Frequency changes take effect immediately: `checkSpawning()` reads plain number values directly each tick
   - `clearResolvedFrequency()` invalidates cached values for RangeValue frequency support
