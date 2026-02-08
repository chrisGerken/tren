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

## Installation

### MacOS

#### Prerequisites

Install Homebrew if you don't have it:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Option 1: Install via Homebrew (Recommended)

Once a Homebrew tap is set up:
```bash
brew tap YOUR_USERNAME/tren
brew install --cask tren
```

#### Option 2: Manual Installation

1. Download the latest `.dmg` file from the [Releases](https://github.com/YOUR_USERNAME/tren/releases) page
2. Open the DMG file
3. Drag `Tren.app` to your Applications folder
4. On first launch, right-click the app and select "Open" to bypass Gatekeeper

#### Building from Source (MacOS)

```bash
# Install build dependencies
brew install node rust

# Clone and build
git clone https://github.com/YOUR_USERNAME/tren.git
cd tren
npm install
npm run tauri build
```

The built application will be in `src-tauri/target/release/bundle/macos/Tren.app`.

See [publish/macos/README.md](publish/macos/README.md) for detailed build and distribution instructions.

---

### Debian/Ubuntu Linux

#### Option 1: Install from .deb Package (Recommended)

1. Download the latest `.deb` file from the [Releases](https://github.com/YOUR_USERNAME/tren/releases) page
2. Install:
   ```bash
   sudo apt install ./tren_*.deb
   ```

That's it! The package declares its dependencies (GTK3, WebKitGTK, etc.) and apt installs them automatically.

#### Option 2: Run AppImage (No Installation Required)

1. Download the `.AppImage` file from Releases
2. Make executable and run:
   ```bash
   chmod +x Tren_*.AppImage
   ./Tren_*.AppImage
   ```

#### Building from Source (Linux)

Building from source requires Node.js, Rust, and development libraries:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install build dependencies
sudo apt update
sudo apt install -y libwebkit2gtk-4.0-dev build-essential curl wget file \
    libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev

# Clone and build
git clone https://github.com/YOUR_USERNAME/tren.git
cd tren
npm install
npm run tauri build
```

The built packages will be in:
- `src-tauri/target/release/bundle/deb/` - Debian package
- `src-tauri/target/release/bundle/appimage/` - AppImage

See [publish/debian/README.md](publish/debian/README.md) for detailed build and distribution instructions.

---

### Uninstalling

**MacOS**:
```bash
# If installed via Homebrew
brew uninstall --cask tren

# Manual: drag Tren.app from Applications to Trash
```

**Debian/Ubuntu**:
```bash
sudo apt remove tren
```

## Development

After cloning and running `npm install`, there are two ways to run the app in development mode:

```bash
# Opens a Tauri desktop window with the app
npm run tauri dev

# Starts only the Vite dev server (no desktop window)
npm run dev
```

Use `npm run dev` when you want to access the app from a browser — for example, on another machine on the same network. The dev server listens on port 5173 and is configured to accept connections from any host, so you can navigate to `http://<your-ip>:5173` from another device.

## Future Considerations

- User scenarios (to be documented)
- 3D rendering with elevation and banking
- Visual differentiation of car types
- Expanded track archetype library
