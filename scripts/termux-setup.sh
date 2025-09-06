#!/data/data/com.termux/files/usr/bin/bash

# SecureVault VPN - Termux Setup Script
# Optimized for Android Termux environment
# Developer: Xeyronox

set -e

echo "🛡️  SecureVault VPN - Termux Setup"
echo "Developer: Xeyronox (Red/Blackhat Hacker)"
echo "========================================"

# Check if we're running in Termux
if [ ! -d "/data/data/com.termux" ]; then
    echo "❌ This script is designed for Termux environment only"
    exit 1
fi

echo "📱 Termux environment detected"

# Update package lists
echo "📦 Updating Termux packages..."
pkg update -y
pkg upgrade -y

# Install required packages
echo "📦 Installing dependencies..."
pkg install -y nodejs git python build-essential termux-services

# Verify Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js installation failed"
    exit 1
fi

echo "✅ Node.js $(node --version) installed"

# Clone or update repository
if [ -d "$HOME/private-vpn" ]; then
    echo "📁 Updating existing repository..."
    cd "$HOME/private-vpn"
    git pull
else
    echo "📁 Cloning repository..."
    cd "$HOME"
    git clone https://github.com/your-username/private-vpn.git
    cd private-vpn
fi

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Create Termux service file
echo "🔧 Setting up Termux service..."
mkdir -p "$HOME/.config/systemd/user"

cat > "$HOME/.config/systemd/user/termux-securevault.service" << EOF
[Unit]
Description=SecureVault VPN Terminal Service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=$PREFIX/bin/node $HOME/private-vpn/scripts/terminal-vpn.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=TERMUX_MODE=1

[Install]
WantedBy=default.target
EOF

# Setup storage permissions
echo "📂 Setting up storage permissions..."
termux-setup-storage

# Create launcher script
echo "📱 Creating launcher script..."
cat > "$HOME/.shortcuts/SecureVault-VPN" << EOF
#!/data/data/com.termux/files/usr/bin/bash
cd $HOME/private-vpn
node scripts/terminal-vpn.js
EOF

chmod +x "$HOME/.shortcuts/SecureVault-VPN"

# Add to bash profile for auto-start (optional)
echo "🔧 Configuring auto-start..."
if ! grep -q "SecureVault VPN" "$HOME/.bashrc"; then
    cat >> "$HOME/.bashrc" << EOF

# SecureVault VPN - Auto-start option
# Uncomment the next line to auto-start VPN on terminal launch
# cd ~/private-vpn && node scripts/terminal-vpn.js
EOF
fi

# Create quick access commands
echo "🚀 Creating quick commands..."
cat > "$PREFIX/bin/vpn" << EOF
#!/data/data/com.termux/files/usr/bin/bash
cd $HOME/private-vpn
node scripts/terminal-vpn.js "\$@"
EOF

chmod +x "$PREFIX/bin/vpn"

# Optimize for Termux
echo "⚡ Applying Termux optimizations..."

# Disable unnecessary npm audit
echo "audit=false" >> "$HOME/.npmrc"

# Create Termux-specific config
mkdir -p "$HOME/private-vpn/config"
cat > "$HOME/private-vpn/config/termux.json" << EOF
{
  "platform": "termux",
  "optimizations": {
    "lowMemoryMode": true,
    "batteryOptimized": true,
    "backgroundService": true
  },
  "features": {
    "notifications": false,
    "autoRotation": true,
    "securityAnalysis": true
  }
}
EOF

echo ""
echo "🎉 Termux setup complete!"
echo ""
echo "📋 Quick Commands:"
echo "   vpn              - Start VPN interface"
echo "   vpn --help       - Show help"
echo "   vpn --status     - Quick status check"
echo ""
echo "🚀 Service Management:"
echo "   systemctl --user enable termux-securevault    # Enable auto-start"
echo "   systemctl --user start termux-securevault     # Start service"
echo "   systemctl --user stop termux-securevault      # Stop service"
echo ""
echo "📱 Widget:"
echo "   Add 'SecureVault-VPN' widget to home screen"
echo ""
echo "🔧 Configuration:"
echo "   Edit ~/private-vpn/.env for custom settings"
echo ""
echo "📖 Documentation:"
echo "   https://github.com/your-username/private-vpn/blob/main/README.md"
echo ""
echo "🛡️  Ready to secure your connection!"