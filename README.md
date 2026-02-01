# Train Simulator

A 2D top-down train simulator built with Three.js and Tauri for cross-platform desktop deployment.

## Project Status

**Phase**: MVP implementation complete

Train simulation with collision prevention is functional. Generators spawn trains that follow tracks, respect virtual switches, and automatically adjust speed to avoid collisions.

## Overview

This simulator allows users to:
- Build track layouts from predefined track piece archetypes using a text-based DSL
- Configure train generators with customizable car counts, speeds, and spawn frequencies
- Watch trains move around the layout with automatic collision prevention
- Control virtual switches to route trains through the layout
- Interact via mouse clicks or layout definition files

## Documentation

- [Architecture](docs/architecture.md) - System architecture and data model hierarchy
- [Track System](docs/track-system.md) - Track archetypes, types, sections, and splines
- [Track Dimensions](docs/track-dimensions.md) - Spline points and dimensions for all archetypes
- [Connection Points](docs/connection-points.md) - Connection point naming conventions and definitions
- [Layout DSL](docs/layout-dsl.md) - Text-based language for defining track layouts
- [Train System](docs/trains.md) - Train cars, movement, and collision detection
- [Technical Decisions](docs/technical-decisions.md) - Technology choices and rationale

## Technology Stack

- **Rendering**: Three.js (2D top-down orthographic view)
- **Desktop Packaging**: Tauri (cross-platform: Windows, Mac, Linux)
- **Language**: TypeScript/JavaScript

## Future Considerations

- User scenarios (to be documented)
- 3D rendering with elevation and banking
- Visual differentiation of car types
- Expanded track archetype library
