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

## Open Questions

These will be addressed in user scenario discussions:
- Save/load file format for layouts and simulation state
- Collision response behavior (stop simulation, automatic braking, or damage modeling)
- Train speed control (discrete levels vs. continuous)
- Runtime commands for controlling trains and switches during simulation
