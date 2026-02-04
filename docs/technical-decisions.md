# Technical Decisions

## Rendering: Three.js

Three.js provides the 3D rendering and spline mathematics for the simulator.

### Why Three.js

- Mature, well-documented WebGL library
- Built-in spline support (`CatmullRomCurve3`) for track paths
- Handles 2D and 3D rendering with the same codebase
- Large ecosystem and community

### Spline Usage

- Track sections are defined using `CatmullRomCurve3`
- Provides `getPointAt(t)` for position and `getTangentAt(t)` for direction
- Arc-length parameterization ensures consistent speed along curves

### 2D Mode

For the initial version:
- Orthographic camera looking straight down (or fixed perspective from above)
- Spline control points constrained to Y = 0
- Rotation only around Y axis (heading)
- Simple rectangle meshes for train cars

### Future 3D Expansion

The architecture supports later addition of:
- Elevation (vary Y in spline control points)
- Banking/cant on curves
- 3D terrain and scenery
- More detailed car and track models

## Desktop Packaging: Tauri

Tauri packages the web application as a standalone desktop executable.

### Why Tauri

- **Lightweight**: Uses system webview instead of bundling Chromium
- **Small executables**: A few MB compared to Electron's 150MB+
- **Cross-platform**: Builds for Windows, Mac, and Linux
- **No server required**: Application runs entirely locally
- **Modern**: Rust-based backend, active development

### Deployment

Users receive a platform-specific package:
- **Windows**: `.exe` or `.msi` installer
- **Mac**: `.app` bundle or `.dmg`
- **Linux**: `.AppImage`, `.deb`, or `.rpm`

No browser to open, no server to start, no runtime dependencies to install. Users download, install (or just run for AppImage), and the application runs standalone.

### Trade-offs

- System webview varies slightly across platforms (WebView2 on Windows, WebKit on Mac/Linux)
- For Three.js and standard web APIs, cross-platform differences are minimal
- More predictable than Electron if consistent behavior is critical, but Tauri is sufficient for this use case

## Layout File Handling

The application manages two categories of layout files: bundled examples and user-provided layouts.

### Bundled Layouts

Example layout files are included as static assets at build time:

- Stored in the Tauri project's assets directory (e.g., `src-tauri/assets/layouts/`)
- Packaged into the executable during the build process
- Read-only at runtime—users cannot modify or delete bundled examples
- Accessed via Tauri's asset resolution or `include_str!()` macro

### User-Provided Layouts

Users can import their own layout files:

1. **Import**: User selects a `.layout` file via the system file picker dialog
2. **Copy**: The file is copied to the app's persistent data directory
3. **Persist**: The layout remains available across application restarts

### Storage Location

Tauri provides access to OS-standard application data directories:

| Platform | Path |
|----------|------|
| Windows | `%APPDATA%\com.tren.app\layouts\` |
| macOS | `~/Library/Application Support/com.tren.app/layouts/` |
| Linux | `~/.local/share/com.tren.app/layouts/` |

The exact app identifier (`com.tren.app`) will be configured in `tauri.conf.json`.

### Tauri APIs

| Purpose | API |
|---------|-----|
| Get app data directory | `tauri::api::path::app_data_dir()` |
| File picker dialog | `tauri::api::dialog::open()` |
| Read/write files | Standard Rust `std::fs` |
| Bundle static assets | Tauri asset configuration or `include_str!()` |

### Layout Selection Flow

```
┌─────────────────────┐     ┌─────────────────────┐
│  Bundled Layouts    │     │   User Layouts      │
│  (read-only)        │     │   (app data dir)    │
└─────────┬───────────┘     └─────────┬───────────┘
          │                           │
          └───────────┬───────────────┘
                      │
              ┌───────▼───────┐
              │ Layout Picker │
              │      UI       │
              └───────┬───────┘
                      │
              ┌───────▼───────┐
              │   Simulate    │
              └───────────────┘
```

The UI presents both bundled and user layouts in a unified list, possibly with visual distinction (e.g., "Examples" vs "My Layouts" sections).

### File Format

Layout files use the [Layout DSL](layout-dsl.md) text format with a `.layout` extension. The parser validates the file on import, rejecting malformed layouts with an error message.

## User Interaction

### Input Methods

- **Mouse clicks**: Direct manipulation of track, switches, trains
- **Layout DSL**: Text-based layout definition files

### Layout Definition Language

Track layouts are defined using a domain-specific language (DSL) in text files. See [Layout DSL](layout-dsl.md) for complete documentation.

Key features:
- Place track pieces with archetype codes (`str`, `tol`, `crvl`, etc.)
- Connect pieces using default or explicit connection points
- Label pieces for later reference and branching
- Repeat patterns with `piece x N` or `piece * N` syntax
- Close loops with `> point.$label` syntax

Example:
```
start: str x 4
switch: tol
crvl x 8
str x 4
crvl x 8
> in.$start             # Close the loop

$switch.left
str x 3
bump
```

## Development Setup (Planned)

### Recommended Stack

- **Bundler**: Vite (fast dev server, simple builds, good Three.js support)
- **Language**: TypeScript
- **Tauri**: For desktop packaging

### Build Output

A folder of static web files that Tauri packages into the executable.

## DSL Enhancements

### Layout Metadata (Title and Description)

Layouts can include metadata for UI display:

```
title My Railroad
description A simple oval with passing siding.
```

**Design decisions:**
- Title defaults to "Simulador de Tren" if not specified
- Only one title statement allowed per layout (error if duplicate)
- Multiple description statements are concatenated with spaces
- Metadata is stored in the `Layout` interface and available for UI display

**Implementation:**
- Lexer captures everything after `title` or `description` keyword as a single STRING token
- Parser creates `TitleStatement` and `DescriptionStatement` AST nodes
- Builder collects and validates metadata, returns in final `Layout` object

### Enhanced `new` Statement

The `new` statement supports flexible modifiers in any order:

```
new degrees 45 offset 10 base $junction.out
```

**Design decisions:**
- Modifiers (`degrees`, `offset`, `base`) can appear in any order
- All modifiers are optional with sensible defaults (0, 0, origin)
- Legacy syntax (`new 45`, `new from $label`) remains supported for backward compatibility
- `offset` is measured along the resulting direction (base direction + degrees rotation)

**Implementation:**
- Parser uses a loop to consume modifiers in any order
- Each modifier keyword is a distinct token type
- `parseConnectionPointRef()` helper handles `$label.point` and `point.$label` syntax

### Splice Statement

The `splice` statement enables creating passing sidings without precise length calculations:

```
crvl ; str x 4 ; crvr ; crvl ; splice
```

**Design decisions:**
- Splice finds where a connection point falls on an existing track piece
- The target track piece is split into two pieces at the intersection point
- Auto-connect then joins the splice point to the new connection point
- If no label is provided, uses the current piece's current connection point
- Non-fatal on failure: logs warning, labels piece "can't splice", continues rendering

**Tolerances:**
- **Position tolerance**: 2.0 inches (distance from splice point to track spline)
- **Angle tolerance**: None for splice (auto-connect handles direction matching later)

**Implementation:**
- Splices are collected during parsing but executed after all pieces are placed
- Processing order: Parse → Build pieces → Process splices → Auto-connect
- Uses linear interpolation to find closest point on track splines
- Creates dynamic "runtime archetypes" for the split pieces
- Dynamic archetypes are registered in a separate runtime registry

### Runtime Archetypes

When a track piece is split by splice, two new archetypes are created dynamically:

```
splice_N_a  (from original 'in' to split point)
splice_N_b  (from split point to original 'out')
```

**Design decisions:**
- Runtime archetypes are stored separately from static archetypes
- `getArchetype()` checks runtime registry first, then static registry
- Spline points are interpolated from the original piece's spline
- Connection points are computed at the split location with proper tangent direction

**Implementation:**
- `registerRuntimeArchetype()` adds to runtime Map
- `clearRuntimeArchetypes()` clears for tests or layout reload
- Split pieces maintain the same world position/rotation as original

## Switch Indicators

Virtual switches (connection points with multiple connections) are visually indicated with colored dots positioned along the outgoing tracks.

**Design decisions:**
- All indicators at a switch are placed at the same distance from the connection point
- The distance is the minimum where all indicators are at least 4.0 inches apart
- Search starts at 0.25 inches and increments by 0.25 inches up to 30 inches max
- First connection (index 0) is selected by default
- Green dot indicates selected route, red dots indicate unselected routes
- Position is calculated by walking along each track's spline from the connection point
- For 'in' connections, position is measured from start of spline; for 'out', from end

**Implementation:**
- `renderSwitchIndicators()` renders indicators for virtual switches
- `buildCurveInfo()` builds spline curve data for each connected track
- `findOptimalIndicatorDistance()` searches for minimum distance with adequate separation
- `allPairsSeparated()` checks if all indicator pairs meet separation threshold
- `getPositionAtDistance()` computes world position along track spline
- `selectedRoutes` Map tracks which route is selected at each switch point
- Key format: `${pieceId}.${pointName}`, value: selected connection index

**Click interaction:**
- Click any switch indicator (red or green) to select that route
- `TrackScene` uses raycasting to detect clicks on indicator meshes
- Each indicator mesh stores `userData` with `pieceId`, `pointName`, `connectionIndex`
- Click callback updates `selectedRoutes` and triggers re-render
- Status bar shows which switch was toggled

**Future work:**
- Integration with train routing logic

## Debug Logging

Configurable debug logging is available for troubleshooting:

- `DEBUG_LOGGING` constant in `src/renderer/track-renderer.ts` - logs switch route selection
- `DEBUG_LOGGING` constant in `src/main.ts` - logs switch click callbacks and re-renders
- `DEBUG_MODE` constant in `src/renderer/track-renderer.ts` - shows simplified debug view with connection points

Set any of these to `true` to enable the respective logging.

## Rendering Details

### Traditional Track Appearance

Track is rendered with realistic components visible from the top-down view:

**Four-layer rendering (bottom to top):**
1. **Roadbed** - Brown dirt raised surface (2.4" wide, 0.1" high)
2. **Ballast** - Gray gravel bed on top of roadbed (2.0" wide, 0.08" high)
3. **Ties** - Wooden cross-ties perpendicular to track (1.4" × 0.25" × 0.15", spaced 1.0" apart)
4. **Rails** - Two parallel steel rails (0.7" gauge, 0.04" radius tubes)

**Design decisions:**
- Uses extruded path geometry for roadbed and ballast (flat rectangular cross-section following spline)
- Ties are individual BoxGeometry meshes positioned along the spline at regular intervals
- Rails are TubeGeometry following offset curves on either side of the center spline
- Perpendicular direction computed from spline tangent for proper tie and rail orientation on curves

**Materials:**
- Rails: Steel gray (0x4a4a4a), metallic (0.8), low roughness (0.3)
- Ties: Dark wood brown (0x5c4033), non-metallic, high roughness (0.9)
- Ballast: Grayish gravel (0x8b8b7a), non-metallic, maximum roughness (1.0)
- Roadbed: Brown dirt (0x6b5b4f), non-metallic, high roughness (0.9)

**Implementation:**
- `renderTrackSectionWorld()` returns a `THREE.Group` containing all track components
- `createExtrudedPathGeometry()` generates custom BufferGeometry for roadbed/ballast
- Rail offset curves are computed by sampling center spline and offsetting perpendicular to tangent

**Bumper rotation:**
- Bumper bar must be perpendicular to track direction at the endpoint
- Rotation is calculated from the tangent of the last two spline points
- The angle is negated when applied to `mesh.rotation.y` because Three.js Y rotation convention (clockwise from above) is opposite to our coordinate system (counter-clockwise)

**Generator/Bin/Tunnel visuals:**
- Generator: green circle, radius 1.5 inches
- Bin: red circle, radius 1.5 inches
- Tunnel: Two dark gray bracket shapes ([ ]) facing opposite directions, 3" wide × 0.8" deep × 1.5" tall. Each bracket opens toward the visible track (outside the tunnel). Uses ExtrudeGeometry with a custom Shape.

**Generator internal track:**
- Generator has a 50" internal track section (invisible, like a tunnel)
- Cars spawn inside the generator and move forward to exit via 'out'
- This simplifies movement logic - no special negative-distance handling needed
- The internal section is not rendered (skipped in track renderer)

**Zero-length pieces:**
- Bin, tunnel, and placeholder have zero-length sections
- The movement system handles these specially - cars immediately transition through them
- This prevents cars from getting "stuck" on zero-length pieces

## Train Simulation

Trains are implemented with a simulation engine that runs via `requestAnimationFrame`.

**DSL syntax:**
```
gen                           # One train: 1 cab, 5 cars, 12"/sec
gen cabs 2                    # One train: 2 cabs, 5 cars
gen cars 3                    # One train: 1 cab, 3 cars
gen speed 24                  # One train at 24 inches/second
gen cabs 2 cars 3 every 10    # New train every 10 seconds
gen cabs 1-2 cars 3-8 speed 6-24 every 15-30  # Randomized values
```

**Range syntax:**
- Any parameter can use `LOW-HIGH` syntax for randomization
- `cabs`, `cars`, `every` get random integers (inclusive)
- `speed` gets a random real number (continuous)
- Each spawned train gets its own random values

**Architecture:**
- `Simulation` class manages animation loop, spawning, movement, and removal
- `train-movement.ts` handles spline traversal and section transitions
- `train-renderer.ts` creates Three.js geometry for trains
- Trains follow `selectedRoutes` map at virtual switches

**Car types:**
- Cabs (engines): yellow, 4" long, distinctive shape with tapered front
- Cars (rolling stock): randomly colored, 3" long, rounded rectangle
- Gap between cars: 0.5"

**Cab rendering:**
- Uses `THREE.ExtrudeGeometry` with custom `THREE.Shape`
- Shape: rounded rear corners, tapered sides, truncated triangle front
- Front narrows to ~35% of body width for locomotive-like silhouette
- Geometry cached and reused for all cabs

**Car rendering:**
- Uses `THREE.ExtrudeGeometry` with rounded rectangle shape
- Colors: randomly selected from dark red, blue, green, purple, orange
- Previous car's color has 2× probability of being selected again
- Creates subtle color groupings within trains

**Movement:**
- Default speed: 12 inches/second
- Cars move along track splines using `CatmullRomCurve3`
- Section transitions use `piece.connections` map
- Virtual switches use `selectedRoutes` to determine path

**Route memory at switches:**
- Each train maintains a `routesTaken` map recording which route was taken at each switch
- When the first car crosses a switch, the current route setting is recorded
- All subsequent cars in the train use the recorded route, not the current switch setting
- This ensures the entire train follows the same path even if the switch is changed mid-crossing

**Generator behavior:**
- One-shot (no `every`): spawns one train, then disables
- Repeating (`every N`): spawns train every N seconds
- Cars start invisible and become visible as they leave generator

**Bin behavior:**
- Cars become invisible when entering bin
- Train removed when all cars are in bin

## Collision Prevention: Connection Point Locking

Trains use **connection point locking** instead of distance-based speed regulation. This approach is cleaner and more efficient.

**Design decisions:**
- Trains lock connection points ahead of the leading car
- Trains hold locks on all connection points they straddle
- Trailing car releases locks when it clears points
- Switches cannot change while their junction point is locked
- Ordered acquisition (nearest to farthest) prevents deadlocks

**Implementation: LockManager class (`src/core/lock-manager.ts`):**
- `locks`: Map of connectionPointId → lock info (trainId, acquiredAt)
- `trainStates`: Map of trainId → set of held locks
- `tryAcquireLocks()`: Acquire locks in order, stop if blocked
- `releaseLock()`: Release a specific lock
- `releaseAllLocks()`: Release all locks for a train (on removal)
- `acquireLeadingLocks()`: Scan ahead and acquire locks, returns both `acquired` (newly locked) and `requested` (all look-ahead points)
- `releaseTrailingLocks()`: Release locks only when the LAST car clears the piece (keeps locks on all connection points of pieces occupied by any car)
- `isJunctionLocked()`: Check if a switch can be changed

**Configuration (via `lockahead` DSL statement):**
- `minLockDistance`: Minimum look-ahead distance (default: 10 inches)
- `minLockCount`: Minimum connection points to lock (default: 2)

Example: `lockahead distance 15 count 3`

**Other constants:**
- `ACCELERATION`: 6 inches/sec² (speed-up when locks acquired)
- `EMERGENCY_BRAKING`: 24 inches/sec² (deceleration when blocked)

**Lock acquisition algorithm:**
1. Start from leading car's current piece
2. Add exit point of current piece to lock list
3. Get next piece via `getNextSection()` (respects switch selection)
4. Add entry point of next piece
5. Accumulate distance (zero-length pieces contribute 0)
6. Repeat until distance ≥ minLockDistance AND points ≥ minLockCount
7. Try to acquire all points in order; if any blocked, stop and wait

**Spawn blocking:**
- Before spawning, simulation tries to acquire initial locks
- If blocked, spawn is deferred (generator tries again later)

**Train removal:**
- When all cars enter bin, `releaseAllLocks()` is called
- This unblocks any waiting trains

**Switch protection:**
- `isJunctionLocked()` checks if junction's connection point is locked
- Switch click handler refuses to change locked switches
- Status bar shows "Switch locked - train in junction"

**Zero-length pieces:**
- `gen`, `bin`, `ph` (placeholder), `tun` (tunnel) have length 0
- Their connection points still need locks
- They contribute 0 to distance calculation
- Result: more points locked when traversing zero-length sequences

**Crossings (x90, x45):**
- Only lock connection points on the route being used
- `in1`/`out1` for one track, `in2`/`out2` for other
- Trains on different routes can cross simultaneously

**Lock release timing:**
- Locks are kept on ALL connection points of pieces that have ANY car on them
- This ensures the cab passing a connection point doesn't release it prematurely
- Only when the LAST car of the train clears a piece are its connection points released
- Look-ahead locks are also retained (using `requested` list from `acquireLeadingLocks`)

**LockAcquisitionResult structure:**
- `success`: Whether all requested locks were acquired
- `acquired`: Points that were newly locked (not already held)
- `requested`: ALL points in the look-ahead scan (used by `releaseTrailingLocks` to know what to keep)
- `blocked`: The point where acquisition failed (if any)
- `blockingTrainId`: Which train holds the blocking lock

## Random Switch Mode

The `random` DSL statement enables random route selection at all switches.

**Design decisions:**
- When a train's first car reaches a switch, a route is randomly selected
- All subsequent cars in the same train follow that route (via `trainRoutes` map)
- Switch indicators remain visible but their settings are ignored
- Selection is uniformly random among available routes

**Implementation:**
- `Layout.randomSwitches` boolean flag set by parser
- `getNextSection()` in train-movement.ts checks `layout.randomSwitches`
- If true, uses `Math.random()` instead of `selectedRoutes` for first car
- Route is stored in `trainRoutes` so all cars take the same path

**Use cases:**
- Computer art / demonstrations
- Stress testing layouts
- Passive observation without user interaction

## Coordinate System and Z-Flip Rendering

The simulation uses a coordinate system where +Z is "left" (per the codebase convention), but Three.js's default camera orientation shows +Z as "down" on screen. To make left curves visually curve upward (which looks correct), the rendering negates all Z coordinates.

**Coordinate convention:**
- Simulation: X = forward (primary direction), Z = lateral (positive = left)
- Three.js camera: Looking down from +Y, default shows +Z as down on screen

**Z-flip implementation:**
- All `toWorld()` transforms in track-renderer.ts negate the Z component
- Train positions: `posZ = -car.worldPosition.z`
- Train rotations: `rotation.y = car.rotation` (not negated, because Z-flip changes the rotation sign)

**Files affected:**
- `src/renderer/track-renderer.ts`: Multiple `toWorld()` functions
- `src/renderer/train-renderer.ts`: Position and rotation in `renderCar()` and `updateTrainMeshes()`

**Why this approach:**
- Cleaner than modifying the camera orientation (which would flip the X axis)
- Cleaner than changing archetype definitions
- Maintains internal coordinate convention (+Z = left) while showing correct visuals

## Train Rendering Performance

Train geometry, edges, and materials are cached to prevent memory exhaustion with many trains over extended periods.

**Problem:**
- Original code created new materials and EdgesGeometry every frame for every car
- At 60fps with many trains, this created thousands of objects per second
- Led to memory exhaustion and application freeze after several minutes

**Solution - Cached resources:**
```typescript
// Geometry cached (was already done)
let cabGeometry: THREE.ExtrudeGeometry | null = null;
let carGeometry: THREE.ExtrudeGeometry | null = null;

// NEW: Edges cached (expensive to compute)
let cabEdges: THREE.EdgesGeometry | null = null;
let carEdges: THREE.EdgesGeometry | null = null;

// NEW: Materials cached by color
const materialCache = new Map<number, THREE.MeshStandardMaterial>();
let outlineMaterial: THREE.LineBasicMaterial | null = null;
```

**Getter functions:**
- `getCabGeometry()`, `getCarGeometry()`: Return cached geometry
- `getCabEdges()`, `getCarEdges()`: Return cached edge geometry
- `getMaterial(color)`: Return cached material for given color
- `getOutlineMaterial()`: Return cached black outline material

**Scene update optimization:**
- `updateTrains()` no longer disposes geometry/materials (they're shared)
- Only removes Object3D references from scene graph
- Transfers children from input group instead of cloning

## Flex Connect

The `flex connect` statement creates custom track pieces to bridge gaps between two labeled connection points.

**Design decisions:**
- Creates one curve and one straight piece (or just one for edge cases)
- Uses geometric solver to find optimal curve+straight or straight+curve combination
- Auto-generates labels: `{label1}_{label2}_str` and `{label1}_{label2}_crv`
- Processed after all regular pieces are placed, before auto-connect

**Geometric solver algorithm:**
1. Calculate world positions (P1, P2) and directions (D1, D2) of both endpoints
2. Check for edge cases:
   - **Straight-only**: If directions are aligned (dot ≈ 1) and path is collinear (cross/length < 0.02)
   - **Curve-only**: If calculated straight length < 0.5 inches
   - **No solution**: If distance ≈ 0 (points already at same position)
3. For normal cases, solve linear system using Cramer's rule:
   - Straight+Curve: `L * D1 + R * (perp1 - perp2) = delta`
   - Curve+Straight: `L * D2 + R * (perp1 - perp2) = delta`
4. Select solution with largest radius (smoothest curve)
5. Reject solutions with arc angle > 270° or radius < 5 inches

**Arc angle calculation fix:**
- Original bug: When solver chose "right" curve but geometric angle was positive, arc was forced to go 360° - θ instead of θ
- Fix: Normalize arc to [-π, π] first, then only go "long way" if arc > 90° and direction disagrees
- This ensures small angles (like 22.5°) don't become near-full circles (337.5°)

**Collinearity detection:**
- Cross product of delta and D1 gives `|delta| * sin(angle)`
- Normalize by delta length to get sin(angle) independent of distance
- Also check that delta points same direction as D1 (dot > 0.98)
- Tolerance: sin(angle) < 0.02 ≈ 1.1° deviation

**Runtime archetypes:**
- Flex pieces use dynamically created archetypes registered at runtime
- Straight: Simple two-point spline with calculated length
- Curve: Multi-point spline generated from radius and arc angle
- Connection points have proper positions and directions for seamless joining

## Auto-Connect

After all pieces and flex connects are processed, auto-connect scans for connection points that should be joined.

**Algorithm:**
1. Collect all connection points with world positions and directions
2. Group points by position (within 0.5 inch tolerance)
3. Within each group, connect pairs with opposite directions (dot < -0.9)
4. Mark auto-connections with `isAutoConnect: true` flag

**Design decisions:**
- Auto-connect runs AFTER flex connect, so flex endpoints get auto-connected to adjacent pieces
- Does not skip points with explicit connections (removed restriction that broke adjacent piece connections)
- Only skips if two points are already connected to each other (prevents duplicates)
- Creates virtual switches where multiple tracks meet at one point

**Interaction with flex connect:**
- Flex connect creates explicit connections between its pieces and the endpoints
- Auto-connect then adds connections between adjacent pieces (like s2→f2) even if one endpoint is also a flex endpoint
- This creates proper virtual switches where trains can arrive from multiple paths

## UI: Labels Toggle

The Labels button toggles visibility of track piece labels and connection point indicators in the viewport.

**Implementation:**
- Labels use CSS2DRenderer (DOM elements positioned in 3D space)
- CSS2D elements don't respect Three.js group visibility
- Fix: Toggle `labelRenderer.domElement.style.display` directly
- Button shows "active" state when labels are visible
- Labels are hidden by default

**Label rendering:**
- Labels are positioned offset from piece center, perpendicular to track direction
- Offset distance: 2 inches
- Style: white background, monospace font, 11px, 1px border

**Connection point visibility:**
- Connection points are small spheres at track piece endpoints
- Visibility is tied to the Labels toggle (hidden by default)
- When visible: white = unlocked, red = locked by a train
- Connection points for gen/bin pieces are NOT rendered (their internal track is invisible)
- This prevents the viewport from scaling to include off-screen generator connection points

**updateConnectionPointColors(lockedPoints, visible):**
- Called every frame during simulation
- Sets mesh visibility based on Labels toggle state
- When visible, updates color based on lock state

## Pan/Zoom Controls

The viewport supports pan and zoom for navigating large layouts using Three.js MapControls.

**Implementation (`src/renderer/scene.ts`):**
- Uses `MapControls` from `three/examples/jsm/controls/MapControls.js`
- Designed for 2D top-down navigation (map-like interface)

**Configuration:**
```typescript
this.controls = new MapControls(this.camera, this.renderer.domElement);
this.controls.enableRotate = false;      // Lock to top-down view
this.controls.enableDamping = true;      // Smooth movement
this.controls.dampingFactor = 0.1;
this.controls.screenSpacePanning = true; // Pan in screen space
this.controls.minZoom = 0.1;             // Max zoom out (10%)
this.controls.maxZoom = 10;              // Max zoom in (10x)
```

**User controls:**
| Action | Input |
|--------|-------|
| Pan | Left-click drag OR right-click drag |
| Zoom | Mouse wheel scroll |
| Touch pan | Two-finger drag |
| Touch zoom | Pinch gesture |

**Design decisions:**
- MapControls chosen over OrbitControls because it's designed for 2D map navigation
- Rotation disabled to maintain top-down view
- Damping enabled for smooth, inertial movement
- `fitToLayout()` still auto-fits camera on layout load; user can then pan/zoom from there
- Controls update called in render loop for damping animation

## Tunnel Rendering and Visibility

Tunnels hide track and trains that pass through them, with bracket-shaped portals marking the entrances.

**Visual appearance:**
- Two dark gray bracket shapes ([ ]) at tunnel position
- Brackets face opposite directions (one for each portal)
- Dimensions: 4.2" wide × 0.8" deep × 1.5" tall
- Brackets are perpendicular to track direction
- Color: 0x4a4a4a (dark gray)

**Implementation (`src/renderer/track-renderer.ts`):**
```typescript
function renderTunnelWorld(piece: TrackPiece): THREE.Group {
  // Create bracket shape using THREE.Shape
  // Extrude to create 3D geometry
  // Position and rotate two brackets facing opposite directions
}
```

**Tunnel section marking (`src/parser/builder.ts`):**
- `markTunnelSections()` identifies pieces between tunnel pairs
- Algorithm: From each tunnel's 'out', traverse connections
- Mark pieces as `inTunnel: true` until reaching another tunnel
- Uses recursive `findTunnelPath()` with backtracking

**Visibility control:**
- Track pieces with `piece.inTunnel === true` are not rendered
- Cars/cabs on `inTunnel` pieces have `visible: false`
- Simulation still runs; trains just become invisible while in tunnel
- Only track between two tunnels is hidden; isolated tunnels don't hide anything

**DSL usage:**
```
str x 3
tun          # First portal
str x 5      # Hidden track
tun          # Second portal
str x 3
```

## Loop Close Syntax

The `>` operator supports two equivalent syntaxes for closing loops:

**Supported formats:**
```
> point.$label          # e.g., > in.$start
> $label.point          # e.g., > $start.in
```

**Implementation (`src/parser/parser.ts`):**
```typescript
private parseLoopClose(): LoopCloseStatement {
  // Check first token to determine format
  if (this.check(TokenType.IDENTIFIER)) {
    // Format 1: > point.$label
  } else if (this.check(TokenType.LABEL_REF)) {
    // Format 2: > $label.point
  }
}
```

**Design decisions:**
- Both formats produce identical `LoopCloseStatement` AST nodes
- Parser detects format by checking if first token is IDENTIFIER or LABEL_REF
- Maintains backward compatibility with existing layouts
- Consistent with `$label.point` syntax used elsewhere in DSL

## Open Questions

These will be addressed in user scenario discussions:
- Save/load format for simulation state (running trains, switch positions)
- Head-on and intersection collision detection (currently only rear-end is prevented)
- Runtime commands for controlling trains and switches during simulation
