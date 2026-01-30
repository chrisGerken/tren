# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tren is a 2D top-down train simulator for building track layouts and operating trains. Currently in design/planning phase with no code implementation yet.

**Planned Tech Stack:**
- Three.js for rendering (orthographic 2D view, spline mathematics via `CatmullRomCurve3`)
- Tauri for cross-platform desktop packaging (Windows, Mac, Linux)
- TypeScript with Vite bundler

## Architecture

Five-level data hierarchy:
```
Layout → Layout Section → Track Piece → Track Section → Spline Points
```

**Dual Graph System:**
- **Track Piece Graph**: Layout editing, route planning, serialization. Nodes are track pieces, edges are connections between pieces. Supports multi-connections (multiple pieces connecting to one point).
- **Track Section Graph**: Train movement, collision detection. Nodes are sections, edges are endpoint connections.

## Track System

Track pieces are instances of archetypes (templates). Archetypes define:
- Spline paths in local coordinates
- Connection points with name, position, direction, and section references
- Collision points where sections share physical space (crossings)

**Coordinate System:** X = primary direction (positive = forward), Z = lateral (positive = left), Y = vertical (0 for 2D). Units are inches.

**Key archetype codes:** `str` (straight), `crv`/`crvl`/`crvr` (curves), `x90`/`x45` (crossings), `bump` (buffer), `gen` (generator - train source, click to toggle), `bin` (train sink), `flex`, `ph` (placeholder - zero-length junction point).

**Connection point naming:** `in`/`out` for default input/output, `in1`/`out1`/`in2`/`out2` for crossings.

## Virtual Switches

Instead of physical switch track pieces, branching is achieved by connecting multiple track pieces to a single connection point. This creates "virtual switches" without dedicated switch archetypes.

Example virtual left turnout using placeholder:
```
junction: ph
str x 3       # Main route
bump

$junction.out
crvl x 3      # Diverging route
bump
```

The placeholder provides a pure junction point. Use `out.piece` syntax to build backwards: `$junction.in ; out.str x 3 ; bump`.

**Visual indicators:** Blue circle = explicit connection; Yellow circle = auto-connected (toggle to show all blue); Green dot = selected route; Red dot = unselected routes. Click red dot to switch routes.

## Train Movement

Trains are ordered car lists (consists). The primary cab (first cab in train) controls speed and direction. Each car maintains its own position along the track section, querying the spline for position and tangent each frame. Cars transition between sections independently when crossing boundaries.

**Collision types:** rear-end, head-on (same track), intersection (at defined collision points like diamond crossings).

## Layout DSL

Layouts are defined in text files. Statements can be one per line or multiple per line separated by semicolons:
- `new` or `new DEGREES` — start new unconnected segment at given rotation (default 0°; implicit at start). When later connected explicitly, the segment is repositioned/rotated to align.
- `piece` — place a track piece, attaching `piece.in` to previous, continue from `piece.out`
- `out.piece` — place piece attaching `piece.out` to previous, continue from `piece.in` (build backwards)
- `piece x N` or `piece * N` — place N consecutive pieces
- `label: piece` — place and label a piece for later reference
- `$label.point` — reference a labeled piece's connection point (creates branch)
- `> point.$label` — close loop: connect current output to labeled piece's input

**Auto-connect:** After layout parsing, all connection points are scanned. Any two connection points at approximately the same position with approximately opposite directions are automatically connected (configurable tolerances). This automatically creates virtual switches where tracks meet—e.g., `gen ; str ; crvl x 16 ; str ; bin` creates a circle with generator and bin sidetracks. Auto-connected points are marked with a small yellow circle when displayed.

Example (passing siding with virtual switch):
```
start: str x 3
junction: ph
str x 3
bump

$junction.out           # Branch from junction
crvl
str x 3
bump
```

Example (closed loop via auto-connect):
```
crvl x 16               # Full circle, auto-connects
```

Example (semicolon-separated statements):
```
gen ; str ; crvl x 16 ; str ; bin   # Circle with generator and bin sidetracks
```

## Documentation

Detailed specifications in `docs/`:
- `architecture.md` - Data model and graph structures
- `track-system.md` - Archetypes, sections, spline implementation, virtual switches
- `track-dimensions.md` - Spline points and dimensions for all archetypes
- `connection-points.md` - Connection point naming and definitions
- `layout-dsl.md` - Text-based language for defining layouts
- `trains.md` - Car types, movement, collision detection
- `technical-decisions.md` - Technology choices

**Archived:** `ARCHIVED_SWITCHES.md` contains historical documentation for physical switch archetypes that were replaced by the virtual switch approach.
