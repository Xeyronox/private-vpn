# 🛡️ SecureVault VPN - Universal Privacy Solution

**Developer:** Xeyronox (Red/Blackhat Hacker)  
**License:** Open Source MIT  
**Platforms:** Mobile (iOS/Android), Desktop (Linux/macOS/Windows), Terminal (Termux/WSL/Native)

[![Security Scan](https://github.com/user/repo/actions/workflows/codeql.yml/badge.svg)](https://github.com/user/repo/actions/workflows/codeql.yml)
[![Cross Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Linux%20%7C%20macOS%20%7C%20Windows%20%7C%20Termux-blue)](#platforms)

---

## 🌟 Features

### 🔒 Security & Privacy
- **Military-Grade Encryption:** AES-256-GCM with ChaCha20-Poly1305
- **Quantum-Resistant Protocols:** Post-quantum cryptography ready
- **Auto Server Rotation:** Dynamic IP switching (5-30 min intervals)
- **Zero-Log Policy:** No connection, traffic, or DNS logs
- **DNS Leak Protection:** Secure DNS with DoH/DoT support
- **Kill Switch:** Automatic internet blocking on VPN failure
- **Perfect Forward Secrecy:** New keys for each session

### 🌐 Multi-Platform Support
- **Mobile:** Native iOS/Android apps with system VPN integration
- **Desktop:** Linux, macOS, Windows with system tray
- **Terminal:** Headless operation for servers and embedded systems
- **Termux:** Full Android terminal support
- **WSL:** Windows Subsystem for Linux compatibility

### ⚡ Advanced Features
- **Real-time Security Analysis:** Live threat monitoring
- **Tor Integration:** Optional Tor bridge for enhanced anonymity
- **Multi-hop Routing:** Traffic through multiple servers
- **Biometric Authentication:** Fingerprint/FaceID on mobile
- **Background Operation:** Persistent connections on all platforms

---

## 🚀 Quick Start

### 🌐 Web Development
```bash
git clone https://github.com/xeyronox/private-vpn.git
cd private-vpn
npm install
npm run dev
```

### 📱 Mobile App (iOS/Android)

#### Prerequisites
- Node.js 18+ and npm
- **iOS:** macOS with Xcode 14+
- **Android:** Android Studio with SDK 33+

#### Setup Steps
```bash
# 1. Clone and install
git clone https://github.com/xeyronox/private-vpn.git
cd private-vpn
npm install

# 2. Add platforms
npx cap add android    # For Android
npx cap add ios        # For iOS (macOS only)

# 3. Build and sync
npm run build
npx cap sync

# 4. Run on device/emulator
npx cap run android    # Android
npx cap run ios        # iOS (requires Xcode)
```

---

## 🖥️ Desktop Installation

### 🐧 Linux (Universal)
Works on Ubuntu, Debian, Arch, Fedora, Kali, Parrot, BlackArch, Guardian, etc.

```bash
# Auto-detection script
curl -fsSL https://raw.githubusercontent.com/xeyronox/private-vpn/main/scripts/install.sh | bash

# Manual installation
git clone https://github.com/Xeyronox/private-vpn.git
cd private-vpn
npm install
npm run build

# Run as service (systemd)
sudo ./scripts/deploy.sh

# Or run directly
npm run preview
```

#### Distribution-Specific Commands
```bash
# Ubuntu/Debian/Kali/Parrot
sudo apt update && sudo apt install nodejs npm

# Arch/BlackArch
sudo pacman -S nodejs npm

# Fedora
sudo dnf install nodejs npm

# OpenSUSE
sudo zypper install nodejs npm
```

### 🍎 macOS
```bash
# Install via Homebrew
brew install node
git clone https://github.com/Xeyronox/private-vpn.git
cd private-vpn
npm install && npm run build
npm run preview

# Or use the deploy script
./scripts/deploy.sh
```

### 🪟 Windows
```powershell
# PowerShell (as Administrator)
choco install nodejs    # Using Chocolatey
# OR
winget install OpenJS.NodeJS

# Setup
git clone https://github.com/xeyronox/private-vpn.git
cd private-vpn
npm install
npm run build
npm run preview
```

#### WSL (Windows Subsystem for Linux)
```bash
# Install WSL if not present
wsl --install

# Inside WSL, follow Linux instructions
curl -fsSL https://raw.githubusercontent.com/xeyronox/private-vpn/main/scripts/install.sh | bash
```

---

## 📱 Termux (Android Terminal)

### Full Installation
```bash
# Update Termux packages
pkg update && pkg upgrade -y

# Install dependencies
pkg install nodejs git python build-essential

# Clone and setup
git clone https://github.com/xeyronox/private-vpn.git
cd private-vpn
npm install
npm run build

# Run terminal VPN interface
node scripts/terminal-vpn.js
```

### Termux-Specific Features
```bash
# Auto-start on Termux launch
echo "cd ~/private-vpn && node scripts/terminal-vpn.js" >> ~/.bashrc

# Background service (using termux-services)
pkg install termux-services
cp scripts/termux-securevault.service ~/.config/systemd/user/
systemctl --user enable termux-securevault
systemctl --user start termux-securevault
```

---

## 🖧 Server/Headless Deployment

### Production Server Setup
```bash
# Quick deploy (auto-detects OS)
curl -fsSL https://raw.githubusercontent.com/xeyronox/private-vpn/main/scripts/deploy.sh | sudo bash

# Manual setup
git clone https://github.com/xeyronox/private-vpn.git
cd private-vpn
npm install
npm run build

# Create system service
sudo cp scripts/securevault-vpn.service /etc/systemd/system/
sudo systemctl enable securevault-vpn
sudo systemctl start securevault-vpn
```

### Docker Deployment
```bash
# Using Docker
docker build -t securevault-vpn .
docker run -d --name vpn-server -p 3000:3000 securevault-vpn

# Using Docker Compose
docker-compose up -d
```

---

## ⚙️ Configuration

### Environment Variables
Create `.env` file:
```env
# API Configuration
VITE_VPN_API_KEY=your_api_key_here
VITE_ENCRYPTION_LEVEL=military
VITE_AUTO_ROTATE=true
VITE_ROTATION_INTERVAL=300000

# Security Features
VITE_TOR_INTEGRATION=true
VITE_DNS_LEAK_PROTECTION=true
VITE_KILL_SWITCH=true

# Platform Specific
VITE_TERMUX_MODE=auto
VITE_BACKGROUND_SERVICE=true
```

### Custom Servers
Edit `src/config/servers.json`:
```json
{
  "servers": [
    {
      "id": "custom-1",
      "name": "Custom Server",
      "country": "Your Country",
      "address": "your-server.com",
      "protocols": ["WireGuard", "OpenVPN", "IKEv2"],
      "features": ["tor", "multihop"]
    }
  ]
}
```

---

## 📟 Terminal Interface Commands

```bash
# Basic Commands
status          # Show connection status
servers         # List available servers
connect <n>     # Connect to server number n
disconnect      # Disconnect from VPN
rotate          # Toggle auto-rotation

# Advanced Commands
security        # Security analysis report
logs            # View connection logs
config          # Show/edit configuration
export <file>   # Export connection data
import <file>   # Import server configs

# Platform Specific
termux-setup    # Termux-specific optimizations
background      # Run in background mode
```

---

## 🏗️ Development

### Project Structure
```
private-vpn/
├── src/
│   ├── components/         # React UI components
│   ├── hooks/             # VPN logic hooks
│   ├── pages/             # Application pages
│   ├── lib/               # Utilities and helpers
│   └── config/            # Configuration files
├── scripts/               # Deployment & utility scripts
├── android/               # Android Capacitor files
├── ios/                   # iOS Capacitor files
├── docs/                  # Documentation
└── tests/                 # Test suites
```

### Available Scripts
```bash
npm run dev             # Development server
npm run build           # Production build
npm run preview         # Preview production build
npm run lint            # Code linting
npm run test            # Run test suite
npm run test:e2e        # End-to-end tests
npm run security        # Security analysis
```

### Platform Testing
```bash
# Test on all platforms
npm run test:platforms

# Platform-specific testing
npm run test:mobile     # Mobile apps
npm run test:desktop    # Desktop apps
npm run test:terminal   # Terminal interface
npm run test:termux     # Termux environment
```

---

## 🔒 Security & Privacy

### Encryption Details
- **Primary:** AES-256-GCM with ECDH key exchange
- **Secondary:** ChaCha20-Poly1305 for mobile devices
- **Future-proof:** Post-quantum key exchange ready
- **Perfect Forward Secrecy:** New keys every session

### Privacy Guarantees
- **Zero Logs:** No connection, traffic, or DNS logs
- **RAM-only Operations:** No persistent storage of sensitive data
- **Anonymous Payments:** Cryptocurrency support
- **Open Source:** Full code transparency and audits

### Security Features
- **Kill Switch:** Blocks all traffic if VPN fails
- **DNS Leak Protection:** Secure DNS with DoH/DoT
- **IPv6 Leak Protection:** Proper IPv6 handling
- **WebRTC Leak Protection:** Browser fingerprint protection
- **Tor Integration:** Optional Tor bridge support

---

## 🌍 Platform Matrix

| Platform | Support | Features | Performance |
|----------|---------|----------|-------------|
| **iOS** | ✅ Native | Full VPN, Biometric, Background | Excellent |
| **Android** | ✅ Native | Full VPN, Biometric, Background | Excellent |
| **Linux** | ✅ Native | All distributions, systemd | Excellent |
| **macOS** | ✅ Native | System tray, LaunchAgent | Excellent |
| **Windows** | ✅ Native | System tray, Service | Good |
| **Termux** | ✅ Full | Terminal UI, Background service | Good |
| **WSL** | ✅ Full | Linux compatibility layer | Good |
| **Docker** | ✅ Container | Headless server mode | Excellent |

---

## 📋 Requirements

### Minimum System Requirements
| Platform | RAM | Storage | OS Version |
|----------|-----|---------|------------|
| **Mobile** | 2GB | 100MB | iOS 12+ / Android 7+ |
| **Desktop** | 2GB | 100MB | macOS 10.15+ / Windows 10+ |
| **Linux** | 512MB | 50MB | Any modern distro |
| **Termux** | 1GB | 100MB | Android 7+ |

### Recommended Requirements
| Platform | RAM | Storage | Network |
|----------|-----|---------|---------|
| **All** | 4GB+ | 1GB+ | 10+ Mbps |

---

## 🔧 Troubleshooting

### Common Issues

#### Mobile App
```bash
# Permission issues
npx cap sync
npx cap run [platform] --verbose

# Build failures
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Termux
```bash
# Package conflicts
pkg autoclean
pkg update
pkg install nodejs git

# Permission issues
termux-setup-storage
```

#### Linux
```bash
# Service issues
sudo systemctl status securevault-vpn
sudo journalctl -u securevault-vpn -f

# Network issues
sudo netstat -tlnp | grep :3000
```

### Debug Mode
```bash
# Enable debug logging
export DEBUG=securevault:*
node scripts/terminal-vpn.js

# Verbose mode
npm run dev -- --verbose
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Setup
```bash
git clone https://github.com/your-username/private-vpn.git
cd private-vpn
npm install
npm run dev
```

### Testing
```bash
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:security     # Security tests
npm run test:platforms    # Cross-platform tests
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Disclaimer

This software is for educational and legitimate privacy purposes only. Users are responsible for complying with local laws and regulations. The developer assumes no liability for misuse.

## 📞 Support

- **🐛 Bug Reports:** [GitHub Issues](https://github.com/xeyronox/private-vpn/issues)
- **📧 Security:** xeyronox@outlook.com

---

**🔐 Developed with ❤️ by Xeyronox**  
*"Privacy is not about hiding something. It's about protecting everything."*

---

### Recent Updates

- ✅ Added Termux full support with native service integration
- ✅ Enhanced cross-platform deployment automation
- ✅ Implemented real-time security monitoring
- ✅ Added CodeQL security analysis workflow
- ✅ Enhanced error boundary and global error handling
- ✅ Improved native VPN connection interface
- ✅ Added support for all major Linux distributions