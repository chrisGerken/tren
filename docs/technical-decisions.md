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

## Open Questions

These will be addressed in user scenario discussions:
- Save/load format for simulation state (running trains, switch positions)
- Collision response behavior (stop simulation, automatic braking, or damage modeling)
- Train speed control (discrete levels vs. continuous)
- Runtime commands for controlling trains and switches during simulation
