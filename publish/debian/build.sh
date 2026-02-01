#!/bin/bash
# Build script for Debian/Ubuntu
# Run from the project root: ./publish/debian/build.sh

set -e

echo "=== Tren Debian Build Script ==="
echo ""

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "Error: Node.js is not installed. Please run: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs"; exit 1; }
command -v cargo >/dev/null 2>&1 || { echo "Error: Rust is not installed. Please run: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Error: npm is not installed."; exit 1; }

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Build the application
echo "Building Tauri application..."
npm run tauri build

echo ""
echo "=== Build Complete ==="
echo ""
echo "Output files:"
echo "  Debian package: src-tauri/target/release/bundle/deb/"
echo "  AppImage:       src-tauri/target/release/bundle/appimage/"
echo ""
echo "To install the .deb package:"
echo "  sudo dpkg -i src-tauri/target/release/bundle/deb/tren_*.deb"
echo ""
