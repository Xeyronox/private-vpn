
#!/bin/bash

# SecureVault VPN Deployment Script
# Developed by Xeyronox

set -e

echo "🛡️  SecureVault VPN - Universal Deployment"
echo "Developer: Xeyronox (Red/Blackhat Hacker)"
echo "=========================================="

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="windows"
else
    OS="unknown"
fi

echo "🔍 Detected OS: $OS"

# Check for required dependencies
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed"
        return 1
    else
        echo "✅ $1 found"
        return 0
    fi
}

echo "📋 Checking dependencies..."
check_dependency "node" || exit 1
check_dependency "npm" || exit 1

# Install project dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Platform-specific deployment
case $OS in
    "linux")
        echo "🐧 Setting up Linux deployment..."
        
        # Create service user
        if ! id "vpn" &>/dev/null; then
            sudo useradd -r -s /bin/false -d /opt/securevault-vpn vpn
        fi
        
        # Copy files to system location
        sudo mkdir -p /opt/securevault-vpn
        sudo cp -r . /opt/securevault-vpn/
        sudo chown -R vpn:vpn /opt/securevault-vpn
        
        # Install systemd service
        sudo cp scripts/securevault-vpn.service /etc/systemd/system/
        sudo systemctl daemon-reload
        sudo systemctl enable securevault-vpn
        
        echo "🎉 Linux deployment complete!"
        echo "📝 Use: sudo systemctl start securevault-vpn"
        ;;
        
    "macos")
        echo "🍎 Setting up macOS deployment..."
        
        # Create launch daemon
        cat > ~/Library/LaunchAgents/com.securevault.vpn.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.securevault.vpn</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>$(pwd)/scripts/terminal-vpn.js</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
EOF
        
        echo "🎉 macOS deployment complete!"
        echo "📝 Use: launchctl load ~/Library/LaunchAgents/com.securevault.vpn.plist"
        ;;
        
    "windows")
        echo "🪟 Setting up Windows deployment..."
        echo "📝 Run with: node scripts/terminal-vpn.js"
        ;;
        
    *)
        echo "❓ Unknown OS, manual setup required"
        ;;
esac

echo ""
echo "🚀 Deployment Options:"
echo "📱 Mobile: npx cap add [ios|android] && npx cap sync && npx cap run [ios|android]"
echo "🖥️  Desktop: npm run preview"
echo "📟 Terminal: node scripts/terminal-vpn.js"
echo ""
echo "🔧 Configuration: Edit .env file for custom settings"
echo "📖 Documentation: See README.md for detailed instructions"
