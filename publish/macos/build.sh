#!/bin/bash
# Build script for MacOS
# Run from the project root: ./publish/macos/build.sh

set -e

echo "=== Tren MacOS Build Script ==="
echo ""

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "Error: Node.js is not installed. Please run: brew install node"; exit 1; }
command -v cargo >/dev/null 2>&1 || { echo "Error: Rust is not installed. Please run: brew install rust"; exit 1; }
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
echo "  App bundle: src-tauri/target/release/bundle/macos/Tren.app"
echo "  DMG:        src-tauri/target/release/bundle/dmg/"
echo ""
echo "To install, open the DMG and drag Tren.app to Applications."
echo ""
echo "To calculate SHA256 for Homebrew formula:"
echo "  shasum -a 256 src-tauri/target/release/bundle/dmg/Tren_*.dmg"
echo ""
