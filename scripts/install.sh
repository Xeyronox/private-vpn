#!/bin/bash

# SecureVault VPN - Universal Installation Script
# Supports: Linux, macOS, Windows (WSL), Termux
# Developer: Xeyronox

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

echo -e "${BLUE}"
echo "🛡️  SecureVault VPN - Universal Installer"
echo "Developer: Xeyronox (Red/Blackhat Hacker)"
echo "=========================================="
echo -e "${NC}"

# Detect platform
detect_platform() {
    if [ -d "/data/data/com.termux" ]; then
        PLATFORM="termux"
        OS="android"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        PLATFORM="linux"
        OS="linux"
        
        # Detect Linux distribution
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            DISTRO=$ID
        else
            DISTRO="unknown"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        PLATFORM="macos"
        OS="macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || grep -q Microsoft /proc/version 2>/dev/null; then
        PLATFORM="windows"
        OS="windows"
        if grep -q Microsoft /proc/version 2>/dev/null; then
            PLATFORM="wsl"
        fi
    else
        PLATFORM="unknown"
        OS="unknown"
    fi
}

# Check dependencies
check_dependencies() {
    log_info "Checking system dependencies..."
    
    # Check for Node.js
    if ! command -v node &> /dev/null; then
        log_warning "Node.js not found. Installing..."
        install_nodejs
    else
        NODE_VERSION=$(node --version)
        log_success "Node.js $NODE_VERSION found"
    fi
    
    # Check for npm
    if ! command -v npm &> /dev/null; then
        log_error "npm not found. Please install Node.js with npm"
        exit 1
    fi
    
    # Check for git
    if ! command -v git &> /dev/null; then
        log_warning "Git not found. Installing..."
        install_git
    else
        log_success "Git found"
    fi
}

# Install Node.js based on platform
install_nodejs() {
    case $PLATFORM in
        "termux")
            pkg update && pkg install -y nodejs
            ;;
        "linux")
            case $DISTRO in
                "ubuntu"|"debian"|"kali"|"parrot")
                    sudo apt update && sudo apt install -y nodejs npm
                    ;;
                "arch"|"blackarch"|"manjaro")
                    sudo pacman -S --noconfirm nodejs npm
                    ;;
                "fedora"|"centos"|"rhel")
                    sudo dnf install -y nodejs npm
                    ;;
                "opensuse"|"suse")
                    sudo zypper install -y nodejs npm
                    ;;
                *)
                    log_error "Unsupported Linux distribution: $DISTRO"
                    log_info "Please install Node.js manually from https://nodejs.org"
                    exit 1
                    ;;
            esac
            ;;
        "macos")
            if command -v brew &> /dev/null; then
                brew install node
            else
                log_error "Homebrew not found. Please install from https://brew.sh"
                exit 1
            fi
            ;;
        "wsl"|"windows")
            log_error "Please install Node.js from https://nodejs.org or use package manager"
            exit 1
            ;;
        *)
            log_error "Unknown platform. Please install Node.js manually"
            exit 1
            ;;
    esac
}

# Install Git based on platform
install_git() {
    case $PLATFORM in
        "termux")
            pkg install -y git
            ;;
        "linux")
            case $DISTRO in
                "ubuntu"|"debian"|"kali"|"parrot")
                    sudo apt install -y git
                    ;;
                "arch"|"blackarch"|"manjaro")
                    sudo pacman -S --noconfirm git
                    ;;
                "fedora"|"centos"|"rhel")
                    sudo dnf install -y git
                    ;;
                "opensuse"|"suse")
                    sudo zypper install -y git
                    ;;
            esac
            ;;
        "macos")
            if command -v brew &> /dev/null; then
                brew install git
            else
                log_info "Git should be available via Xcode Command Line Tools"
                xcode-select --install
            fi
            ;;
    esac
}

# Platform-specific setup
setup_platform() {
    case $PLATFORM in
        "termux")
            log_info "Setting up Termux environment..."
            pkg install -y termux-services python build-essential
            termux-setup-storage
            ;;
        "linux")
            log_info "Setting up Linux environment..."
            setup_linux_service
            ;;
        "macos")
            log_info "Setting up macOS environment..."
            setup_macos_service
            ;;
        "wsl")
            log_info "Setting up WSL environment..."
            # WSL uses Linux-style services
            setup_linux_service
            ;;
    esac
}

# Setup Linux systemd service
setup_linux_service() {
    if command -v systemctl &> /dev/null; then
        log_info "Creating systemd service..."
        
        sudo tee /etc/systemd/system/securevault-vpn.service > /dev/null << EOF
[Unit]
Description=SecureVault VPN Service
After=network.target
Wants=network.target

[Service]
Type=simple
User=vpn
Group=vpn
WorkingDirectory=/opt/securevault-vpn
ExecStart=/usr/bin/node scripts/terminal-vpn.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

        # Create VPN user
        if ! id "vpn" &>/dev/null; then
            sudo useradd -r -s /bin/false -d /opt/securevault-vpn vpn
        fi
        
        sudo systemctl daemon-reload
        log_success "Systemd service created"
    fi
}

# Setup macOS LaunchAgent
setup_macos_service() {
    log_info "Creating macOS LaunchAgent..."
    
    mkdir -p ~/Library/LaunchAgents
    
    tee ~/Library/LaunchAgents/com.securevault.vpn.plist > /dev/null << EOF
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
    <false/>
    <key>KeepAlive</key>
    <false/>
    <key>WorkingDirectory</key>
    <string>$(pwd)</string>
</dict>
</plist>
EOF

    log_success "LaunchAgent created"
}

# Main installation function
install_securevault() {
    local install_dir
    
    case $PLATFORM in
        "termux")
            install_dir="$HOME/private-vpn"
            ;;
        "linux"|"wsl")
            if [ "$EUID" -eq 0 ]; then
                install_dir="/opt/securevault-vpn"
            else
                install_dir="$HOME/private-vpn"
            fi
            ;;
        "macos"|"windows")
            install_dir="$HOME/private-vpn"
            ;;
    esac
    
    log_info "Installing to: $install_dir"
    
    # Clone or update repository
    if [ -d "$install_dir" ]; then
        log_info "Updating existing installation..."
        cd "$install_dir"
        git pull
    else
        log_info "Cloning repository..."
        git clone https://github.com/your-username/private-vpn.git "$install_dir"
        cd "$install_dir"
    fi
    
    # Install dependencies
    log_info "Installing npm dependencies..."
    npm install
    
    # Build project
    log_info "Building project..."
    npm run build
    
    # Set permissions
    if [ "$PLATFORM" == "linux" ] && [ "$EUID" -eq 0 ]; then
        chown -R vpn:vpn "$install_dir"
    fi
    
    # Create symlink for global access
    if [ "$PLATFORM" != "termux" ]; then
        if [ -w "/usr/local/bin" ] || [ "$EUID" -eq 0 ]; then
            log_info "Creating global command..."
            sudo ln -sf "$install_dir/scripts/terminal-vpn.js" /usr/local/bin/securevault-vpn
            sudo chmod +x /usr/local/bin/securevault-vpn
        fi
    else
        # Termux-specific global command
        ln -sf "$install_dir/scripts/terminal-vpn.js" "$PREFIX/bin/vpn"
        chmod +x "$PREFIX/bin/vpn"
    fi
}

# Display installation summary
show_summary() {
    echo ""
    log_success "🎉 SecureVault VPN installation complete!"
    echo ""
    
    case $PLATFORM in
        "termux")
            echo "📱 Termux Commands:"
            echo "   vpn                     - Start VPN interface"
            echo "   systemctl --user enable termux-securevault - Enable auto-start"
            echo "   systemctl --user start termux-securevault  - Start service"
            ;;
        "linux"|"wsl")
            echo "🐧 Linux Commands:"
            echo "   securevault-vpn         - Start VPN interface"
            echo "   sudo systemctl enable securevault-vpn - Enable auto-start"
            echo "   sudo systemctl start securevault-vpn  - Start service"
            ;;
        "macos")
            echo "🍎 macOS Commands:"
            echo "   securevault-vpn         - Start VPN interface"
            echo "   launchctl load ~/Library/LaunchAgents/com.securevault.vpn.plist - Start service"
            ;;
    esac
    
    echo ""
    echo "🌐 Web Interface:"
    echo "   npm run dev             - Development server"
    echo "   npm run preview         - Production preview"
    echo ""
    echo "📱 Mobile Apps:"
    echo "   npx cap add [ios|android] - Add mobile platform"
    echo "   npx cap run [ios|android] - Run on device"
    echo ""
    echo "📖 Documentation: https://github.com/your-username/private-vpn/blob/main/README.md"
    echo ""
}

# Main execution
main() {
    detect_platform
    log_info "Detected platform: $PLATFORM ($OS)"
    
    if [ "$PLATFORM" == "unknown" ]; then
        log_error "Unsupported platform detected"
        exit 1
    fi
    
    check_dependencies
    install_securevault
    setup_platform
    show_summary
}

# Run main function
main "$@"