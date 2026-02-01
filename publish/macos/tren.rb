# Homebrew Cask formula for Tren
#
# To use this formula:
# 1. Create a GitHub repository named "homebrew-tren"
# 2. Create a "Casks" directory in that repository
# 3. Copy this file to "Casks/tren.rb"
# 4. Update the URLs, SHA256 hashes, and homepage
# 5. Users can then install with: brew install YOUR_USERNAME/tren/tren
#
# To calculate SHA256: shasum -a 256 Tren_0.1.0_aarch64.dmg

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
  desc "2D top-down train simulator built with Three.js and Tauri"
  homepage "https://github.com/YOUR_USERNAME/tren"

  app "Tren.app"

  zap trash: [
    "~/Library/Application Support/com.tren.app",
    "~/Library/Preferences/com.tren.app.plist",
    "~/Library/Saved Application State/com.tren.app.savedState",
  ]
end
