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

## Dynamic Layout Manifest (Manifest Elimination)

The bundled layout list was originally maintained in a `src/layouts/manifest.json` file that duplicated title, description, and filename information already present in the layout files themselves. This was error-prone (entries could fall out of sync with actual file contents) and required manual updates when adding new layouts.

**Solution:** Eliminate `manifest.json` entirely. The layout list is now derived dynamically at runtime:

1. **File discovery**: Vite's `import.meta.glob('./layouts/*.txt', ...)` already discovers all `.txt` files at build time and populates the `bundledLayouts` map — no separate file list needed.

2. **Metadata extraction**: An `extractLayoutMetadata(content, filename)` function scans raw layout text line-by-line, matching `title` and `description` DSL statements (case-insensitive, comment-aware). This is a lightweight scanner, not the full parser — it doesn't need to understand track pieces or connections.

3. **Defaults**: If no `title` statement is found, the default is `"No Title"`. If no `description` statement is found, the default is the layout filename (e.g., `"layout03.txt"`).

4. **Sorting**: The manifest entries are sorted alphabetically by title for consistent display order in the dialog.

**Design decisions:**
- The `LayoutManifest` and `LayoutManifestEntry` interfaces remain unchanged — downstream consumers (dialog rendering, Run/Save buttons) required no changes
- The metadata scanner is intentionally separate from the full parser to avoid circular dependencies and to keep dialog loading fast
- New layout files added to `src/layouts/` are automatically discovered without any configuration changes

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
- Title defaults to "No Title" if not specified; description defaults to the layout filename
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
- Key format: `junction.${canonicalJunctionId}.${direction}`, value: selected connection index
- Canonical junction ID: lexicographically first `pieceId.pointName` among all connections at the junction, ensuring all inbound tracks share the same switch state
- Direction: `fwd` for 'out' points, `bwd` for 'in' points — determines which route key trains use based on exit point

**Click interaction:**
- Click any switch indicator (red or green) to select that route
- `TrackScene` uses raycasting to detect clicks on indicator meshes
- Each indicator mesh stores `userData` with `routeKey` and `connectionIndex`
- Click callback updates `selectedRoutes` and triggers re-render
- Status bar shows which switch was toggled

## Centralized Logger

All console output is routed through a centralized logger utility (`src/core/logger.ts`).

**Design:** Module-level singleton with a `LogLevel` enum (DEBUG=0, INFO=1, WARNING=2, ERROR=3). The `logger` object exposes `debug()`, `info()`, `warn()`, and `error()` methods that check the current level before calling the corresponding `console.*` function. Messages are prefixed with `[DEBUG]`, `[INFO]`, `[WARN]`, or `[ERROR]`.

**DSL Integration:** The `log` DSL statement (e.g., `log debug`) sets the log level. The level is applied immediately during layout building (so debug output from the parser/builder is also controlled) and reapplied at runtime from `layout.logLevel`. Default level is WARNING, matching the previous behavior where per-file `DEBUG_LOGGING` constants were set to `false`.

**Severity assignments:**
- **DEBUG**: Geometry calculations, lock acquisition/release details, piece placement coordinates, spline math, connection point details, switch indicator positioning
- **INFO**: Train spawned, train removed/binned, layout loaded, generator toggled, simulation start/stop
- **WARNING**: No intersection for cross connect, no flex solution, no track at splice
- **ERROR**: NaN in rendering, file I/O errors

**Previous approach (replaced):** Per-file `DEBUG_LOGGING` boolean constants that guarded `console.log` calls. This was fragile — one file (`lock-manager.ts`) had `DEBUG_LOGGING = true` accidentally left on, causing console spam in production.

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
- Colors: randomly selected from color palette based on generator's `colorMode` setting
- Previous car's color has 2× probability of being selected again
- Creates subtle color groupings within trains

**Car color modes:**
- `gray` (default): Shades of gray (0x303030 to 0xb0b0b0) for realistic industrial appearance
- `colorful`: Vibrant colors (red, blue, green, purple, yellow) for playful appearance
- `black`: All rolling stock is solid black (0x000000) for a uniform dark appearance
- Color is assigned once at car creation, stored in `car.color` property
- Cabs (engines) are always yellow regardless of color mode

**DSL syntax for color modes:**
```
gen gray                      # Gray cars (default)
gen colorful                  # Colorful cars
gen black                     # All-black cars (cabs remain yellow)
gen cabs 2 cars 5 colorful    # Combined with other parameters
```

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
- Creates one curve and one straight piece, two curves (S-curve), or just one piece for edge cases
- Uses geometric solver to find optimal combination
- Auto-generates labels: `{label1}_{label2}_str` and `{label1}_{label2}_crv` (or `_crv1`/`_crv2` for S-curves)
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
4. For parallel tracks with lateral offset (D1 ≈ D2 but not collinear), use S-curve solver (curve+curve)
5. Select solution with largest radius (smoothest curve)
6. Reject solutions with arc angle > 270° or radius < 5 inches

**Double-curve (S-curve) solver:**
- Triggers when D1 ≈ D2 (parallel tracks) with a lateral offset — exactly the case where straight+curve and curve+straight fail because perpRight(D1) ≈ perpRight(D2) makes the determinant near zero
- Creates two symmetric curves of equal radius forming an S-curve crossover
- Geometry: project delta onto D1 (forward distance `f`) and perpRight(D1) (lateral distance `h`):
  - Arc angle: `θ = 2 * atan(|h| / f)`
  - Radius: `R = f / (2 * sin(θ))`
- First curve goes toward the other track (right if h > 0, left if h < 0)
- Second curve goes opposite direction to re-align with original heading
- Labels: `{label1}_{label2}_crv1` and `{label1}_{label2}_crv2`
- Typical use case: crossovers between parallel tracks (passing sidings, double-track mainlines)

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

**Z-flip rotation correction:**
- Bracket rotation must account for the Z-flip used in screen coordinates
- The piece rotation is effectively negated when applied to bracket rotation
- `bracket1.rotation.z = Math.PI + piece.rotation` (opens toward track 'in' side)
- `bracket2.rotation.z = piece.rotation` (opens toward track 'out' side)
- Without this correction, tunnels appear mirrored relative to track direction on curves

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

## Cross Connect (Track Intersections)

The `cross connect` statement creates a shared lockable point where two track pieces physically cross, ensuring only one train can occupy the intersection at a time.

**DSL syntax:**
```
cross connect $label1 $label2
```

**Design decisions:**
- Original track pieces remain unchanged (no splitting, no new pieces created)
- A shared "intersection lock" is added as metadata to both pieces
- The lock ID is shared between both pieces: `cross_{piece1.id}_{piece2.id}`
- Each piece stores the t parameter (0-1) indicating where on the spline the intersection occurs
- Trains must acquire the intersection lock to pass through; if another train holds it, the train stops

**Implementation:**

1. **Types (`src/core/types.ts`):**
   - `IntersectionLock` interface: `{ lockId: string; t: number; worldPosition: Vec3 }`
   - `TrackPiece.intersectionLocks?: IntersectionLock[]` array

2. **Builder (`src/parser/builder.ts`):**
   - `performCrossConnect()`: Finds intersection, adds lock metadata to both pieces
   - `findSplineIntersection()`: Transforms splines to world coordinates, tests all segment pairs
   - `lineSegmentIntersection()`: Line segment intersection using Cramer's rule

3. **Lock Manager (`src/core/lock-manager.ts`):**
   - `tryAcquireIntersectionLock()`: Acquire lock using shared lock ID
   - `isIntersectionLockedByOther()`: Check if another train holds the lock
   - `releaseIntersectionLock()`: Release the lock

4. **Simulation (`src/core/simulation.ts`):**
   - `checkIntersectionLocks()`: Before moving, check if any car is near an intersection and acquire lock
   - `releaseIntersectionLocks()`: After moving, release locks for cars that have passed through
   - Intersection margin: CAR_LENGTH + 1 inch on each side of intersection point

**Intersection detection algorithm:**
1. Transform both pieces' spline points to world coordinates
2. For each segment pair (one from each piece), test for line segment intersection
3. Return intersection point and t parameters for both splines
4. Accept intersections within full segment range (t in [0, 1])

**Why not create crossing pieces:**
- User requirement: keep original track topology unchanged
- Simpler implementation: no track splitting, no runtime archetypes needed
- Lock-based approach handles collision prevention without modifying track graph

**Difference from x90/x45 crossings:**
- Built-in crossings (x90, x45) are single pieces with two sections and four connection points
- Cross connect works on any two existing pieces at arbitrary angles
- Cross connect uses intersection locking; built-in crossings allow simultaneous passage on different tracks

**Edge cases handled:**

1. **Curve pieces**: Curves have multiple spline segments (7 points). The intersection algorithm tests all segment pairs, correctly finding intersections on curved tracks.

2. **Zero-length pieces** (semaphore, placeholder): Zero-length pieces have no spline (`sections: []`). The algorithm handles these as points:
   - If one piece is zero-length: Check if its position lies on the other piece's spline (within 0.5" tolerance)
   - If both are zero-length: Check if they're at the same position (within 0.5" tolerance)
   - The internal connection point gets `t: 0.5` and `distance: 0`
   - Trains lock the shared point BEFORE entering, so instant transitions through zero-length pieces work correctly

3. **T-shape intersections**: When one track ends at another track's middle (perpendicular T-junction), the line segment intersection algorithm finds the intersection at t=1.0 for the ending track. The full range [0, 1] is used for both segment parameters.

4. **Tunnels**: Tunnel pieces (`tun`) should NOT be used in cross connects because they're visibility markers, not physical track. The implementation will find no intersection since tunnels have empty sections.

**Why zero-length handling matters:**
- Semaphores at crossings can control traffic flow at intersections
- Placeholders can mark junction points where tracks cross
- The shared lock prevents simultaneous passage regardless of piece type

## Semaphore (Manual Signal)

The semaphore is a zero-length track piece that provides manual lock control, allowing users to stop and start train traffic by clicking.

**DSL syntax:**
```
signal: sem              # Labeled semaphore
semaphore                # Unlabeled (using alias)
```

**Design decisions:**
- Zero-length piece like tunnel and placeholder (no visible track, just a control point)
- Starts in unlocked (green) state - trains pass through freely
- Click to toggle: green → red (locked, trains stop), red → green (unlocked)
- Integrates with existing connection point locking system
- Visual: colored dot inside an unfilled circle (same size as gen/bin indicators)

**Why zero-length:**
- Semaphore is a control point, not a track section
- Trains don't "travel through" the semaphore - they either pass or stop
- Zero-length simplifies placement: insert anywhere in track sequence
- Consistent with other control pieces (tunnel, placeholder)

**Implementation:**

1. **Types (`src/core/types.ts`):**
   - `SemaphoreConfig` interface: `{ locked: boolean }`
   - `TrackPiece.semaphoreConfig?: SemaphoreConfig`

2. **Archetype (`src/core/archetypes.ts`):**
   - Code: `sem`, alias: `semaphore`
   - Zero-length sections array
   - Two connection points: `in` and `out` at position (0,0)

3. **Builder (`src/parser/builder.ts`):**
   - Initializes `semaphoreConfig: { locked: false }` for `sem` pieces
   - No special parsing needed - uses standard archetype code handling

4. **Rendering (`src/renderer/track-renderer.ts`):**
   - `renderSemaphoreWorld()`: Creates dot (sphere) inside ring (torus)
   - Ring: radius 1.5" (same as gen/bin), dark gray color
   - Dot: radius 0.6", green (unlocked) or red (locked)
   - Meshes cached in `semaphoreMeshes` Map for color updates
   - `updateSemaphoreColor()`: Updates dot color on state change

5. **Click handling (`src/renderer/scene.ts`, `src/main.ts`):**
   - Dot mesh has `userData: { isSemaphore: true, pieceId }`
   - `setSemaphoreClickCallback()` registers handler
   - Click toggles `semaphoreConfig.locked` and updates visual

6. **Lock integration (`src/core/lock-manager.ts`, `src/core/simulation.ts`):**
   - `isBlockedBySemaphore()`: Checks if connection point belongs to locked semaphore
   - `tryAcquireLocks()`: Fails if any point is semaphore-blocked
   - `getLockedPoints()`: Includes semaphore-blocked points in locked set

**Train behavior at semaphore:**
- Train approaches, lock manager tries to acquire semaphore's connection points
- If semaphore is locked (red): `isBlockedBySemaphore()` returns true, train stops
- Train waits until user clicks to unlock
- When unlocked (green): locks can be acquired, train proceeds

**Visual indicators:**
- Green dot: Unlocked - trains can pass
- Red dot: Locked - trains stop and wait
- Ring: Always dark gray, provides visual boundary

**Difference from switches:**
- Switches choose between routes; semaphores block/allow a single route
- Switches are automatic (train picks route); semaphores require manual control
- Switch indicators are along the track; semaphore indicator is at the piece location

## Custom Track Pieces (Define Statement)

The `define` (or `def`) statement allows users to create custom curve and straight track pieces for use throughout a layout.

**DSL syntax:**
```
define <name> <direction> radius <r> arc <a>    # Curve
define <name> straight length <l>                # Straight
def <name> left radius 18 arc 45                 # Short form
```

**Design decisions:**
- Custom pieces are registered as runtime archetypes (same system as splice/flex)
- The name must be unique and cannot be an existing keyword
- Direction determines the archetype type: `left` → `crvl`, `right` → `crvr`, `straight` → `str`
- Curves require `radius` and `arc`; straights require `length`
- Validation rejects invalid parameter combinations (e.g., `length` on a curve)

**Implementation:**

1. **Lexer (`src/parser/lexer.ts`):**
   - New token types: `DEFINE`, `LEFT`, `RIGHT`, `STRAIGHT`, `RADIUS`, `ARC`, `LENGTH`
   - Keywords recognized: `define`/`def`, `left`/`l`, `right`/`r`, `straight`/`s`, `radius`, `arc`, `length`

2. **Parser (`src/parser/parser.ts`):**
   - `DefineDirection` type: `'left' | 'right' | 'straight'`
   - `DefineStatement` interface with: `name`, `direction`, `radius?`, `arc?`, `length?`
   - `parseDefineStatement()` validates parameter requirements

3. **Builder (`src/parser/builder.ts`):**
   - `processDefine()` creates runtime archetypes
   - For straights: two-point spline from (0,0) to (length, 0)
   - For curves: generates spline points using trigonometric calculations
   - Uses existing `registerRuntimeArchetype()` function

**Curve spline generation:**
- Converts arc angle from degrees to radians
- Generates 7 points along the arc (or more for larger arcs)
- For left curves: center at (0, radius), points curve left (+Z)
- For right curves: center at (0, -radius), points curve right (-Z)
- Connection point directions calculated from tangent at endpoints

**Why runtime archetypes:**
- Reuses existing infrastructure from splice and flex connect
- No need for a separate custom piece registry
- Custom pieces work seamlessly with all DSL features (repetition, labels, etc.)

## Case-Insensitive DSL Parsing

All DSL keywords, archetype names, connection point names, and custom archetype names (from `def`/`define`) are case-insensitive. `GEN`, `Gen`, `gen`, and `gEn` are all treated as the generator archetype.

**Design decisions:**
- Case insensitivity improves usability — users don't need to worry about casing conventions
- Labels remain case-sensitive since they are user-defined identifiers that may use casing for readability (e.g., `myLoop`, `leftBranch`)
- Implementation normalizes to lowercase at parse time (lexer for keywords, parser for archetype codes and connection point names)

**Implementation:**
1. **Lexer (`src/parser/lexer.ts`):** All keyword comparisons use `lowerValue = value.toLowerCase()` while preserving original casing in the token value for labels and identifiers
2. **Parser (`src/parser/parser.ts`):** Archetype codes and connection point names are lowercased when extracted from tokens
3. **Archetypes (`src/core/archetypes.ts`):** `getArchetype()`, `registerRuntimeArchetype()`, and `isValidArchetype()` normalize input keys to lowercase

## Deceleration to Stop

When a train's `desiredSpeed` is lowered (or set to 0), it decelerates smoothly at 12 inches/sec² (normal braking) rather than using emergency braking.

**Design decisions:**
- Three-tier speed adjustment in `updateTrains()`:
  1. Lock failure → emergency braking (24 in/s²) — unchanged
  2. `currentSpeed > desiredSpeed` → normal braking (12 in/s²) — **new**
  3. `currentSpeed < desiredSpeed` → acceleration (6 in/s²) — unchanged
- Normal braking rate (12) is between acceleration (6) and emergency braking (24)
- Trains decelerate smoothly using `Math.max(desiredSpeed, currentSpeed - NORMAL_BRAKING * dt)`

## Flexible Train Composition

Trains support any combination of cabs and cars in any order, with direction-aware lead/tail car access.

**Design decisions:**
- `Train.travelDirection: 'forward' | 'backward'` determines which end is the lead
- `Car.facingForward: boolean` records original orientation (for future rendering)
- Helper functions in `src/core/train-helpers.ts` abstract direction-aware access:
  - `getLeadCar(train)` / `getTailCar(train)` — return car references
  - `getLeadCarIndex(train)` / `getTailCarIndex(train)` — return indices
- `lock-manager.ts` uses `getLeadCar(train)` instead of `train.cars[0]`
- `simulation.ts` uses `getTailCarIndex(train)` for route memory clearing

**Why helper functions instead of methods:**
- Train is a plain interface, not a class
- Functions are easily testable and importable
- Consistent with the existing functional style of `train-movement.ts`

## Reverse Movement

Trains can reverse direction when stopped, enabling back-and-forth operations.

**Design decisions:**
- Reversal only allowed at `currentSpeed === 0` (safety constraint)
- `reverseTrain(trainId)` flips `travelDirection`, releases all locks, re-acquires for new direction
- Movement distance is signed: `distance = travelDirection === 'forward' ? raw : -raw`
- Negative distance triggers underflow handling in `moveCar()`, which already handles backward section transitions
- Lock manager uses `train.travelDirection` instead of inferring from `leadCar.entryPoint`

**Why not negative speed:**
- Speed is always non-negative (magnitude)
- Direction is a separate property on the train
- Cleaner separation of concerns; `currentSpeed` always means "how fast" not "which way"

## Coupling

Trains can merge with stopped trains to form longer consists.

**Design decisions:**
- Coupling mode is a boolean flag on the train, not a separate state machine
- `couplingSpeed` is configurable per train (default 3 in/s)
- In coupling mode, trains ignore lock failures but still acquire/release locks normally
- Contact detection checks if lead car is on same piece as any car of a stopped train, within `CAR_GAP` tolerance
- Car arrays are merged: prepend or append depending on travel direction and contact point
- Combined train stops immediately and exits coupling mode
- Locks are released from the absorbed train and re-acquired for the combined train

**Why ignore lock failures during coupling:**
- The whole point of coupling is to approach another train, which will have locks on the track ahead
- Without ignoring locks, the coupling train would stop short of the target
- Lock acquisition still happens for connection points the coupling train passes over

**Stop cancels coupling mode:**
- Pressing Stop in the inspector while a train is coupling sets `coupling = false` and `currentSpeed = 0`
- This is necessary because coupling mode bypasses normal speed control (ignores `desiredSpeed`, uses `couplingSpeed` directly)
- Simply setting `desiredSpeed = 0` would not stop a coupling train

**Merged car movement fix:**
- After merging, all cars in the combined train must have `previousPieceId` cleared to `undefined`
- The `getNextSection()` function uses `previousPieceId` to filter out the piece a car just left (preventing backward routing)
- Without clearing, absorbed cars retain stale `previousPieceId` values from their original forward travel direction
- When the merged train moves (especially backward), the stale filter blocks correct section transitions, causing cars to appear stuck or move erratically
- `routesTaken` is also cleared since the absorbed train's route memory is irrelevant to the combined train
- This follows the same pattern used in `reverseTrain()`, which also clears `previousPieceId` and `routesTaken`

## Decoupler Archetype

A zero-length track piece that splits stopped trains, following the same pattern as semaphore.

**Design decisions:**
- Zero-length piece like `sem`, `ph`, `tun` — consistent archetype design
- Two triangle indicators (one per side) for easy click target
- Orange = inactive, red = activated (brief 1-second flash)
- Activation finds a stopped train whose coupler gap is within 2" of the decoupler's world position
- Split creates two stopped trains: front portion keeps original train ID, rear becomes new train
- Both trains get `desiredSpeed: 0` after split
- Locks are released and re-acquired for both trains independently

**Why world-position distance check instead of piece-based:**
- Decoupler is zero-length, so the coupler may be on an adjacent piece
- World position comparison is more robust for zero-length pieces
- 2" tolerance accounts for car gaps and position rounding

**Rendering:**
- Uses `THREE.ShapeGeometry` for triangles (flat, laid on ground plane)
- Each triangle stores `userData: { isDecoupler: true, pieceId }` for click detection
- `decouplerMeshes` map enables dynamic color updates
- `updateDecouplerColor()` exported for activation flash

## Inspector Widget System

An HTML/CSS overlay system at the bottom of the simulation window for inspecting and controlling simulation objects. Double-clicking an object opens a one-line-tall widget with live-updating properties.

**Architecture: HTML/CSS Overlay (not Three.js)**
- Widgets need native form controls (sliders, buttons, toggles) that are impractical in Three.js
- Inspector container is `position: fixed` at bottom, z-index 50 (below toolbar at 100, below dialogs at 200)
- Container uses `pointer-events: none` so empty areas pass clicks to the canvas
- Individual widgets use `pointer-events: auto` to capture interaction

**Widget stacking rules:**
1. Double-click object → new unlocked widget appears at bottom
2. Double-click another object with unlocked widget → unlocked widget replaced
3. Lock a widget → persists; next double-click adds new widget above it
4. Multiple locked widgets can coexist (stack upward)
5. X button removes any widget (locked or unlocked)

**Implementation:**

1. **Abstract base (`src/inspector/inspector-widget.ts`):**
   - `InspectorWidget` abstract class with `element`, `locked`, `contentEl`
   - Lock button toggles padlock icon, close button (red X) removes widget
   - `onRemove` callback for notifying the manager
   - Abstract methods: `targetId`, `typeLabel`, `buildContent()`, `update()`, `dispose()`

2. **Train inspector (`src/inspector/train-inspector.ts`):**
   - `TrainInspectorWidget extends InspectorWidget`
   - Fields: train ID, cab/car counts, current speed, desired speed slider (0-48), direction toggle, stop/resume
   - Slider `input` event sets `train.desiredSpeed` directly
   - Direction toggle calls `simulation.reverseTrain()` (only when stopped)
   - Stop saves `desiredSpeed`, sets to 0; Resume restores saved speed
   - `update()` refreshes all values each frame; skips slider while user is dragging
   - Auto-removes when train no longer exists (entered bin)

3. **Manager (`src/inspector/inspector-manager.ts`):**
   - Holds `#inspector-container` DOM element and `widgets` array
   - `addWidget()` removes all unlocked widgets, then appends new widget
   - `update()` calls `widget.update()` on snapshot (safe for auto-removal during iteration)
   - `clear()` removes all widgets (called on layout change)
   - `hasWidgetForTarget()` prevents duplicate widgets for same object

4. **Scene integration (`src/renderer/scene.ts`):**
   - `TrainDblClickCallback` type and `setTrainDblClickCallback()` setter
   - `onDblClick()` raycasts against `trainGroup.children` (recursive)
   - Walks up object hierarchy to find Group with name starting `train_`

5. **Main wiring (`src/main.ts`):**
   - `InspectorManager` created after scene
   - Train double-click callback creates `TrainInspectorWidget` and adds to manager
   - `inspectorManager.update()` called in simulation update callback
   - `inspectorManager.clear()` called at top of `startSimulation()`

**Design decisions:**
- HTML overlay chosen over Three.js geometry for native form control support
- Slider range 0-48 covers practical speed range (default 12, max reasonable ~48 in/s)
- Auto-removal on train destruction prevents stale widgets
- Slider drag detection uses `mousedown`/`mouseup` events to avoid fighting with live updates
- Widget height fixed at 36px for consistent single-line appearance
- Widgets default to locked state (padlock icon shows locked on creation)

**DOM mutation and click event suppression:**
- The `update()` method runs every animation frame (~60fps) to refresh live values
- Setting `element.textContent` every frame replaces the DOM text node, even if the value is unchanged
- When textContent replacement occurs between `mousedown` and `mouseup`, the browser suppresses the `click` event because the original text node (the mousedown target) no longer exists
- **Fix:** Only mutate `textContent` and `disabled` properties when the value has actually changed:
  ```typescript
  const newText = train.coupling ? 'Coupling...' : 'Couple';
  if (this.coupleBtn.textContent !== newText) {
    this.coupleBtn.textContent = newText;
  }
  ```
- This pattern must be applied to ALL button properties updated in `update()` that the user might click
- The slider already avoided this issue because it skips updates during active drag (via `sliderActive` flag)

**Change Direction preserving stop/resume state:**
- Clicking Change Direction does NOT reset the stop/resume state
- If the train was stopped (Resume button showing), it stays stopped after direction change
- The saved speed is preserved so Resume restores the correct speed
- Previously, Change Direction unconditionally reset `isStopped`, `savedSpeed`, and the stop button label, which caused the Resume button to incorrectly revert to "Stop"

**Next Switch Selector (in train inspector):**
- Shows the next virtual switch the train will encounter as a radio-button-like group
- Buttons are labeled spatially: Left/Right for 2-way, Left/Center/Right for 3-way
- Spatial ordering uses 2D cross product of forward direction vs entry direction at the switch
- Clicking a button pre-sets the route in `train.routesTaken` via `setTrainSwitchOverride()`
- Since `getNextSection()` checks `routesTaken` first, the override is automatically used when the lead car reaches the switch; all subsequent cars follow the same route
- Clicking the already-selected button clears the override, restoring normal switch logic (random or selectedRoutes)
- The tail car naturally clears the entry from `routesTaken` after passing, so the override is consumed once
- Walk-ahead algorithm mirrors `acquireLeadingLocks()`: starts from lead car, follows track graph, handles crossings (x90/x45) by staying on same track number, limited to 50 pieces
- DOM is only rebuilt when the switch changes (different routeKey), not every frame, to avoid the textContent click-suppression issue
- When a route button is selected (not deselected), an `onSwitchRouteChanged` callback notifies main.ts to update the 3D switch indicators via `setSelectedRouteByKey()` + `renderLayout()`, syncing the green/red dots with the inspector's selection. Deselect does not fire the callback since it only clears the train's override without changing the global switch position.

**Extensibility:**
- New inspector types (switch, generator, etc.) extend `InspectorWidget`
- Manager is type-agnostic — works with any widget subclass
- `targetId` property enables duplicate prevention across widget types

### Generator Inspector Widget

Double-clicking a generator piece opens a `GeneratorInspectorWidget` at the bottom of the window, providing real-time control over generator parameters. Changes affect future train spawns immediately.

**Detection:** Generator meshes in `track-renderer.ts` carry `userData = { isGenerator: true, pieceId }`. The `onDblClick` handler in `scene.ts` raycasts against the trackGroup after checking trains (trains take priority), looking for `userData.isGenerator`.

**Layout (left to right):**
1. Type label: "Generator" (green)
2. Coordinates: `(x, z)` from the piece's world position
3. Enable/Disable button: green "Enabled" / red "Disabled" toggle — writes `genConfig.enabled`
4. Color button: cycles gray → colorful → black — writes `genConfig.colorMode`
5. Cabs slider: 1–10 with +/- buttons — writes `genConfig.cabCount`
6. Cars slider: 0–20 with +/- buttons — writes `genConfig.carCount`
7. Speed slider: 1–48 with +/- buttons — writes `genConfig.speed`
8. Every slider: 1–300 with +/- buttons — writes `genConfig.frequency`

**Frequency cache invalidation:** The simulation caches resolved frequencies for range support. When `config.frequency` is a plain number (as set by the inspector), `checkSpawning()` reads it directly each tick, bypassing the cache entirely. This ensures slider changes take effect immediately.

**Spawn-while-blocked:** `spawnTrain()` no longer aborts when lock acquisition fails. Trains are spawned inside the generator section and wait at speed 0 until the exit clears. A generator-occupied check prevents overlapping spawns: if any car from any train is still on the generator's piece, the spawn is deferred until the generator section is clear.

**Design decisions:**
- Widget holds a direct reference to the `TrackPiece` object (shared with the simulation), so mutations are immediately visible
- Widget also holds a `Simulation` reference for `clearResolvedFrequency()` (kept for RangeValue cache clearing)
- `update()` only syncs the enable button state (in case config is changed externally); no per-frame data like trains
- `baseValue()` helper extracts the midpoint from a `RangeValue` for initial slider positioning
- Follows the same constructor workaround as `TrainInspectorWidget`: `super()` calls `buildContent()` before fields are set, so a guard returns early and `buildContent()` is called again after field initialization

## Same-Polarity Junction Handling

When two track pieces connect with the same polarity (out↔out or in↔in), such as via `> $label.out` loop close, trains need to traverse the connected piece in reverse spline direction while maintaining their physical heading.

**Problem:**
- Auto-connect requires opposite directions, so same-polarity connections only arise from explicit loop close (`>`) statements
- When a train exits piece A via `out` and the connection leads to piece B's `out`, the train enters B at the spline endpoint
- Without correction, the car would either visually flip direction or fail to traverse the piece

**Solution — `sectionDirection` field on Car:**
- Each car has a `sectionDirection` field: `1` (normal, in→out) or `-1` (reversed, out→in)
- In `moveCar()`, distance is multiplied by `sectionDirection`: `distanceAlongSection += distance * sectionDirection`
- When `sectionDirection = -1`, positive velocity causes distance to decrease (traverse out→in)
- The visual rotation adds π when reversed, so the car faces its actual travel direction

**Polarity detection:**
- `isSamePolarity(pointA, pointB)` checks if both points are 'out' type or both 'in' type
- At each piece transition, if the exit point and entry point have the same polarity, `sectionDirection` is toggled (multiplied by -1)
- Two consecutive same-polarity junctions cancel out, restoring normal direction

**Switch route key alignment:**
- The `travelDirection` parameter for switch selection is always based on the exit point ('out' = 'forward', 'in' = 'backward'), NOT on the train's physical direction or `sectionDirection`
- This ensures the switch route key matches the renderer's indicator labels, which are also based on the connection point type
- Without this alignment, reversed trains would look up a different route key than the one set by the UI, causing them to ignore switch settings

**Design alternatives considered:**
- **Pass-through approach**: Skip the same-polarity piece entirely via recursive `getNextSection()`. Rejected because it teleports the car past physical track, causing visual jumps.
- **Zero-length reverser piece**: Insert a virtual direction-reversing piece at same-polarity junctions. Rejected as over-engineered; `sectionDirection` on Car is simpler.
- **Entry point flipping**: Return `getOppositePoint()` as the entry when same polarity detected. Rejected because it places the car at the wrong spatial position.

**Depth limit:**
- No recursion needed; the `sectionDirection` toggle is applied at each transition naturally

## Virtual Switch Connection Grouping Fix

Previously, connections at a switch point were split into forward (entering via 'in') and backward (entering via 'out') groups. Each group was treated as a separate switch. This caused a bug where a junction with 1 forward + 1 backward connection (e.g., offramp.in with one main track and one sidetrack) detected no switch in either group.

**Fix:** All valid connections at a point are treated as a single switch group regardless of entry point direction. The direction (fwd/bwd) only affects the route key, not the connection filtering. This correctly detects virtual switches at junction points where connections have mixed polarities.

## Generator Spawn Timer Fix

Previously, the generator's `lastSpawnTime` was always reset when the spawn interval elapsed, even if the spawn failed (due to `max trains` limit). This caused synchronized generators to starve — the first generator always won the race, and later generators never spawned.

**Fix:** Only reset `lastSpawnTime` when `spawnTrain()` returns `true` (successful spawn). Failed spawns keep trying on subsequent frames until they succeed.

## Screenshot Capture

The toolbar includes a "Capture" button that saves the current viewport as a PNG image.

**Implementation:**
1. Click handler calls `renderer.render(scene, camera)` to ensure current frame is on the canvas
2. `renderer.domElement.toDataURL('image/png')` extracts the canvas as a data URL
3. Data URL is decoded to a `Uint8Array` via `atob()` and byte conversion
4. Tauri's `save()` dialog lets the user choose the save location (`.png` filter)
5. Tauri's `writeBinaryFile()` writes the binary PNG data to disk

**Design decisions:**
- `preserveDrawingBuffer: true` is set on the WebGL renderer to ensure `toDataURL()` always returns the rendered image, not a blank canvas. Without this, Three.js clears the drawing buffer after presenting, so `toDataURL()` may return an empty image depending on timing.
- The explicit `renderer.render()` call before capture is a belt-and-suspenders approach — combined with `preserveDrawingBuffer`, the capture is reliable regardless of when the last animation frame rendered.
- The capture only includes the WebGL canvas (track and trains), not HTML overlays (toolbar, inspector widgets, CSS2D labels). This is a limitation of `canvas.toDataURL()`.

**Tauri allowlist:** The `fs.writeFile` permission in `tauri.conf.json` covers `writeBinaryFile()`. The `dialog.save` permission enables the save dialog. File scope covers `$HOME/**`, `$DOCUMENT/**`, `$DESKTOP/**`.

## Inspector Widget UI Refinements

Several usability improvements to the train inspector widget:

**Removed "ID:" label prefix:**
- The train ID field previously showed "ID: #3" — the "ID:" prefix was redundant since the train number is self-explanatory
- Changed to empty-string label so only "#3" appears

**Direction button icon:**
- Replaced text "Change Direction" with Unicode ⇄ (`\u21C4`) character
- Added `title="Change Direction"` attribute for tooltip on hover
- Increased `.inspector-dir-btn` font-size from 12px to 16px for icon readability

**Speed slider +/- buttons:**
- Added `−` (Unicode minus `\u2212`) and `+` buttons flanking the slider
- Each click adjusts `train.desiredSpeed` by 1, clamped to the 0–48 range
- Reuses the same update pattern as the slider `input` event (updates train, slider, and displayed value)
- Exits stop state if speed is increased above 0 (same behavior as dragging the slider)
- Styled with `.inspector-speed-adj-btn` class: compact padding, 18px min-width

**Decoupler click area enlargement:**
- Triangle size increased from 0.8 to 1.13 (factor of √2), doubling the clickable area
- The triangle mesh IS the raycasting click target, so enlarging the geometry directly improves click usability
- No change to the offset distance or visual style beyond the size increase

## Array Statement

The `array` statement automates creation of multiple evenly-spaced starting points for parallel tracks (passing sidings, yards, double-track mainlines).

**DSL syntax:**
```
array count 3 angle 90 distance 12 prefix siding_
```

**Design decisions:**
- Places N labeled placeholders (`ph`) at regular intervals along a line
- The first placeholder connects to the current track chain (via `placePiece`)
- Additional placeholders are positioned geometrically but not connected to the chain
- All placeholders share the same rotation as the first, so tracks built from them run in the same direction
- The array line direction is `currentRotation + angle` (in degrees), allowing perpendicular or angled arrays
- Builder state continues from the first placeholder, preserving normal chaining behavior
- Users reference `$prefix_2.out`, `$prefix_3.out`, etc. to start tracks from additional placeholders
- All four parameters (count, angle, distance, prefix) are required to avoid ambiguity

**Implementation:**
1. **Lexer:** Three new token types: `ARRAY`, `ANGLE`, `PREFIX` (reuses existing `COUNT` and `DISTANCE`)
2. **Parser:** `ArrayStatement` interface with count, angle, distance, prefix fields. `parseArrayStatement()` consumes parameters in any order and validates all are present.
3. **Builder:** `processArray()` places first placeholder via `placePiece()` (for chain integration), then creates additional `TrackPiece` objects at calculated positions. Each is labeled `{prefix}{N}` and registered in `labeledPieces`.

**Why placeholders (not arbitrary pieces):**
- Placeholders are zero-length junction points — they don't add physical track
- Users build from each placeholder independently, choosing piece types and directions
- This matches the existing virtual switch pattern where `ph` serves as a pure junction point

## Prefab and Use (Reusable Templates)

The `prefab` and `use` statements provide a text-level macro system for reusable layout fragments.

**DSL syntax:**
```
prefab siding {
  $[label]: ph
  str x 3
  bump
}

use siding label "junction1"
# Expands to: $junction1: ph ; str x 3 ; bump
```

**Design decisions:**
- **Text-level macro expansion** (not token-level or AST-level): Simpler, more flexible. `[key]` placeholders can appear anywhere — in label names (`$[label]`), piece codes, or parameter values. The body is stored as raw text until expansion time.
- **`{` required on same line**: The opening brace must appear on the same line as the `prefab` keyword. This simplifies parsing — the lexer can detect prefab blocks during line processing and collect the body before normal tokenization. The closing `}` can be on any subsequent line.
- **Comment-aware `}` matching**: When scanning for the closing brace, comments are stripped first (using the same `#` comment rule). A `}` inside a comment is ignored. The first `}` in non-comment text closes the block.
- **No nesting**: PREFAB bodies cannot contain other PREFAB definitions. However, USE inside a PREFAB body is fine — it expands at USE time when the body is parsed.
- **Duplicate name rejection**: Defining a prefab with a name that already exists throws an error at build time. This prevents silent overwriting.
- **Expansion via `parse()`**: The USE handler performs string substitution (`[key]` → value using `String.split().join()`), then calls the existing `parse()` function to tokenize and parse the expanded text. The resulting statements are processed inline via `processStatement()`, reusing all existing builder logic.

**Implementation:**

1. **Lexer (`src/parser/lexer.ts`):**
   - New token types: `PREFAB`, `USE`
   - `tokenize()` detects `prefab`/`prefabrication` lines before normal processing
   - Extracts name (IDENTIFIER) and body (STRING) across multiple lines
   - Quoted string handling (`"..."` and `'...'`) added to `tokenizeStatement()` for USE parameter values
   - `use` keyword recognized in `tokenizeStatement()`

2. **Parser (`src/parser/parser.ts`):**
   - `PrefabStatement` interface: `{ type: 'prefab', name, body, line }`
   - `UseStatement` interface: `{ type: 'use', name, params: Record<string, string>, line }`
   - `parsePrefabStatement()`: Consumes PREFAB, IDENTIFIER, STRING tokens
   - `parseUseStatement()`: Consumes USE, IDENTIFIER, then key-value pairs (IDENTIFIER/STRING for keys, IDENTIFIER/NUMBER/STRING for values)

3. **Builder (`src/parser/builder.ts`):**
   - `BuilderState.prefabs`: `Map<string, string>` storing name → raw body text
   - `processPrefab()`: Validates uniqueness, stores body text
   - `processUse()`: Looks up body, substitutes `[key]` → value, calls `parse()`, processes resulting statements inline

**Why text-level substitution:**
- Token-level substitution would require the body to be valid tokens, preventing flexible placeholder usage like `$[label]`
- AST-level substitution would require new AST node types for parameterized fragments
- Text substitution is the simplest approach and naturally supports any placement of `[key]` within DSL syntax

## Scenery: Grid-Based Tree Placement

Trees add visual interest to layouts by filling open areas away from tracks with dark green canopy clusters.

**DSL syntax:**
```
trees                            # Enable with defaults
trees none                       # Disable
trees clearance N density M      # Custom parameters (any order)
```

**Design decisions:**
- Opt-in via `trees` DSL statement (no trees by default)
- Grid-based distance scoring: divide layout area into ~4-inch cells, BFS flood-fill from track cells to assign distance scores
- Trees placed where `score >= clearance`, count per cell = `min(density, score - clearance + 1)` — gradual ramp from sparse fringe to full density
- Defaults: clearance=2, density=3
- Camera fits to tracks only (scenery group excluded from `fitToLayout()` bounding box)
- Scenery is static geometry, rendered once at layout load

**Performance optimization — InstancedMesh:**
- Initial implementation created individual `THREE.Mesh` per tree circle (3-5 circles per tree cluster), causing thousands of draw calls and noticeable frame rate drops during train animation
- Replaced with `THREE.InstancedMesh`: one instance per material color (3 colors = 3 draw calls total)
- Each circle's position, rotation (flat on ground), and scale (radius 1-3") are encoded in a per-instance transform matrix
- Tree data is collected in a first pass, bucketed by material, then built into InstancedMesh objects
- Result: constant GPU cost regardless of tree count

**Tree visuals:**
- Each tree = cluster of 3-5 overlapping `CircleGeometry` discs
- Three dark green color variants (0x2d5a1e, 0x336622, 0x3a6b2a) for natural variation
- Positioned at y=0.005 (above ground plane at -0.01, below track at 0+)
- Deterministic pseudo-random placement (seeded PRNG) for consistent appearance across reloads

**Grid algorithm:**
1. Compute bounding box from all track piece connection points and spline points (in screen coordinates with Z negated)
2. Expand bounds by 30% on each side
3. Create grid sized to cover expanded area at CELL_SIZE (4") resolution
4. For each track piece: transform spline points to world/screen coords, create CatmullRomCurve3, sample at ~1" intervals, mark containing grid cells as score 0
5. BFS flood-fill from all score-0 cells using 4-directional adjacency

**Architecture:**
- `src/renderer/scenery-renderer.ts` — New file containing grid computation and tree rendering
- `TrackScene.sceneryGroup` — Separate THREE.Group for scenery (not included in track bounding box)
- `TrackScene.clearScenery()` / `addSceneryGroup()` — Lifecycle methods
- `clearLayout()` calls `clearScenery()` automatically
- `renderScenery()` called from `track-renderer.ts` after track rendering, before `fitToLayout()`

**Why grid-based scoring (not analytical distance):**
- Computing exact distance from each point to the nearest track spline is expensive (requires sampling all splines)
- Grid discretization makes BFS trivial and fast — O(cells) time, single pass
- Grid resolution (4" cells) is fine enough that individual trees (radius 1-3") look naturally placed
- Infrastructure is reusable for future scenery types (ponds, buildings, vegetation patches) by scoring cells differently

## Open Questions

These will be addressed in user scenario discussions:
- Save/load format for simulation state (running trains, switch positions)
- Head-on and intersection collision detection (currently only rear-end is prevented)
- Runtime commands for controlling trains and switches during simulation
