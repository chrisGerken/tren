# Debian/Ubuntu Build and Distribution

This folder contains resources for building and distributing Tren on Debian-based Linux distributions.

## Building the Debian Package

### Prerequisites

1. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install Rust**:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source $HOME/.cargo/env
   ```

3. **Install Tauri system dependencies**:
   ```bash
   sudo apt update
   sudo apt install -y libwebkit2gtk-4.0-dev \
       build-essential \
       curl \
       wget \
       file \
       libssl-dev \
       libgtk-3-dev \
       libayatana-appindicator3-dev \
       librsvg2-dev
   ```

4. **Install project dependencies**:
   ```bash
   cd /path/to/tren
   npm install
   ```

### Building

Build the Debian package:

```bash
npm run tauri build
```

This creates the following outputs in `src-tauri/target/release/bundle/`:
- `deb/tren_0.1.0_amd64.deb` - Debian package for x86_64
- `appimage/tren_0.1.0_amd64.AppImage` - Universal Linux package

## Installing the .deb Package

### From Local File

```bash
sudo dpkg -i tren_0.1.0_amd64.deb

# If there are missing dependencies:
sudo apt-get install -f
```

### Uninstalling

```bash
sudo apt remove tren
```

## Distribution via APT Repository

To host your own APT repository:

1. **Set up a server** or use GitHub Pages with a custom domain

2. **Create repository structure**:
   ```bash
   mkdir -p repo/pool/main
   mkdir -p repo/dists/stable/main/binary-amd64

   # Copy .deb file
   cp tren_0.1.0_amd64.deb repo/pool/main/

   # Generate Packages file
   cd repo
   dpkg-scanpackages pool/main /dev/null > dists/stable/main/binary-amd64/Packages
   gzip -k dists/stable/main/binary-amd64/Packages
   ```

3. **Create Release file** (`repo/dists/stable/Release`):
   ```
   Origin: Tren Repository
   Label: Tren
   Suite: stable
   Codename: stable
   Architectures: amd64
   Components: main
   Description: Tren Train Simulator Repository
   ```

4. **Users add repository**:
   ```bash
   echo "deb [trusted=yes] https://YOUR_DOMAIN/repo stable main" | sudo tee /etc/apt/sources.list.d/tren.list
   sudo apt update
   sudo apt install tren
   ```

## AppImage Distribution

The AppImage is a portable format that doesn't require installation:

1. Download the AppImage
2. Make it executable: `chmod +x Tren_0.1.0_amd64.AppImage`
3. Run it: `./Tren_0.1.0_amd64.AppImage`

No root privileges required!

## System Requirements

- **OS**: Debian 11+, Ubuntu 20.04+, or compatible
- **Architecture**: x86_64 (amd64)
- **Dependencies**: GTK3, WebKitGTK (automatically installed via .deb)
