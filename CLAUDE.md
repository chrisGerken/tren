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
- **Track Piece Graph**: Layout editing, route planning, serialization. Nodes are track pieces, edges are connections between pieces.
- **Track Section Graph**: Train movement, collision detection. Nodes are sections (a switch contributes multiple sections), edges are endpoint connections.

Switch state in the piece graph determines which section edge is active in the section graph.

## Track System

Track pieces are instances of archetypes (templates). Archetypes define:
- Spline paths in local coordinates
- Connection points with name, position, direction, and section references
- Collision points where sections share physical space
- Switch states and behavior

**Coordinate System:** X = primary direction (positive = forward), Z = lateral (positive = left), Y = vertical (0 for 2D). Units are inches.

**Key archetype codes:** `str` (straight), `crv`/`crvl`/`crvr` (curves), `tol`/`tor` (turnouts), `wye`, `t3w` (three-way), `x90`/`x45` (crossings), `dslip`/`sslip` (slips), `bump` (buffer), `flex`.

**Connection point naming:** `in`/`out` for default input/output, `left`/`right` for diverging exits, `inner`/`outer` for curved turnouts, `in1`/`out1`/`in2`/`out2` for crossings/slips. Shorthand: `str9 -> tol` expands to `str9.out -> tol.in`.

## Train Movement

Trains are ordered car lists (consists). The primary cab (first cab in train) controls speed and direction. Each car maintains its own position along the track section, querying the spline for position and tangent each frame. Cars transition between sections independently when crossing boundaries.

**Collision types:** rear-end, head-on (same track), intersection (at defined collision points like diamond crossings).

## Layout DSL

Layouts are defined in text files with one statement per line:
- `piece` — place a track piece, connecting to previous via defaults
- `piece x N` or `piece * N` — place N consecutive pieces
- `label: piece` — place and label a piece for later reference
- `$label.point` — reference a labeled piece's connection point
- `point.piece.point` — explicit connection: `previous_point.archetype.this_point`
- `> point.$label` — close loop: connect current output to labeled piece's input

Example (passing siding):
```
start: str
switch: tol
str x 3
bump

$switch.left
str x 3
bump
```

Example (closed loop with branch):
```
start: str x 4
switch: tol
crvl x 8
str x 4
crvl x 8
> in.$start             # Close main loop

$switch.left
str x 2
bump
```

## Documentation

Detailed specifications in `docs/`:
- `architecture.md` - Data model and graph structures
- `track-system.md` - Archetypes, sections, spline implementation
- `track-dimensions.md` - Spline points and dimensions for all archetypes
- `connection-points.md` - Connection point naming and definitions
- `layout-dsl.md` - Text-based language for defining layouts
- `trains.md` - Car types, movement, collision detection
- `technical-decisions.md` - Technology choices
