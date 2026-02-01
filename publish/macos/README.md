# MacOS Build and Distribution

This folder contains resources for building and distributing Tren on MacOS.

## Building the MacOS App

### Prerequisites

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install build dependencies**:
   ```bash
   brew install node rust
   ```

3. **Install project dependencies**:
   ```bash
   cd /path/to/tren
   npm install
   ```

### Building

Build the MacOS application:

```bash
npm run tauri build
```

This creates the following outputs in `src-tauri/target/release/bundle/`:
- `macos/Tren.app` - MacOS application bundle
- `dmg/Tren_0.1.0_aarch64.dmg` - Disk image for distribution (on Apple Silicon)
- `dmg/Tren_0.1.0_x64.dmg` - Disk image for distribution (on Intel Macs)

## Distribution via Homebrew Cask

To distribute via Homebrew, you'll need to:

1. **Host the DMG file** on a publicly accessible URL (GitHub Releases recommended)

2. **Create a Homebrew tap** repository named `homebrew-tren`

3. **Create a cask formula** in that repository:

```ruby
# Casks/tren.rb
cask "tren" do
  version "0.1.0"

  on_arm do
    sha256 "REPLACE_WITH_ACTUAL_SHA256_FOR_ARM64"
    url "https://github.com/YOUR_USERNAME/tren/releases/download/v#{version}/Tren_#{version}_aarch64.dmg"
  end

  on_intel do
    sha256 "REPLACE_WITH_ACTUAL_SHA256_FOR_X64"
    url "https://github.com/YOUR_USERNAME/tren/releases/download/v#{version}/Tren_#{version}_x64.dmg"
  end

  name "Tren"
  desc "2D top-down train simulator"
  homepage "https://github.com/YOUR_USERNAME/tren"

  app "Tren.app"

  zap trash: [
    "~/Library/Application Support/com.tren.app",
    "~/Library/Preferences/com.tren.app.plist",
    "~/Library/Saved Application State/com.tren.app.savedState",
  ]
end
```

4. **Calculate SHA256** for the DMG:
   ```bash
   shasum -a 256 Tren_0.1.0_aarch64.dmg
   shasum -a 256 Tren_0.1.0_x64.dmg
   ```

## Manual Installation

Users can also install manually by:

1. Download the DMG file
2. Open the DMG
3. Drag `Tren.app` to the Applications folder
4. Right-click and select "Open" the first time (to bypass Gatekeeper)

## Code Signing (Optional)

For distribution outside the App Store, consider:

1. **Apple Developer Certificate** - Sign the app to avoid Gatekeeper warnings
2. **Notarization** - Submit to Apple for notarization

```bash
# Sign the app
codesign --deep --force --verify --verbose --sign "Developer ID Application: YOUR NAME" src-tauri/target/release/bundle/macos/Tren.app

# Notarize (requires Apple Developer account)
xcrun notarytool submit src-tauri/target/release/bundle/dmg/Tren_0.1.0_aarch64.dmg --apple-id YOUR_APPLE_ID --team-id YOUR_TEAM_ID --password YOUR_APP_PASSWORD
```
