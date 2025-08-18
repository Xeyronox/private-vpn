
# SecureVault VPN - Multi-Platform Privacy Solution

**Developer:** Xeyronox (Red/Blackhat Hacker)  
**License:** Open Source  
**Platforms:** Mobile (iOS/Android), Desktop (Linux/macOS/Windows), Terminal (Termux/WSL)

## 🛡️ Features

- **Military-Grade Encryption:** AES-256, Quantum-resistant protocols
- **Auto Server Rotation:** Dynamic IP switching every 5-30 minutes
- **Hardware Security Module:** End-to-end encryption with HSM integration
- **Multi-Platform Support:** Native mobile apps, desktop applications, and terminal deployment
- **Zero-Log Policy:** Complete privacy with no connection logs
- **Tor Integration:** Additional anonymity layer when connected

## 🚀 Quick Start

### Web Version (Development)
```bash
git clone <YOUR_GIT_URL>
cd private-vpn
npm install
npm run dev
```

## 📱 Mobile App Deployment

### Prerequisites
- Node.js & npm installed
- For iOS: macOS with Xcode
- For Android: Android Studio with SDK

### Steps
1. **Export and Clone:**
   ```bash
   git clone <YOUR_GITHUB_REPO>
   cd private-vpn
   npm install
   ```

2. **Add Mobile Platforms:**
   ```bash
   # For Android
   npx cap add android
   
   # For iOS (macOS only)
   npx cap add ios
   ```

3. **Build and Sync:**
   ```bash
   npm run build
   npx cap sync
   ```

4. **Run on Device/Emulator:**
   ```bash
   # Android
   npx cap run android
   
   # iOS (requires macOS + Xcode)
   npx cap run ios
   ```

## 🖥️ Desktop Deployment

### Linux (Ubuntu/Debian/Arch/Fedora)
```bash
# Install dependencies
sudo apt update && sudo apt install nodejs npm  # Ubuntu/Debian
# OR
sudo pacman -S nodejs npm                       # Arch
# OR  
sudo dnf install nodejs npm                     # Fedora

# Clone and setup
git clone <YOUR_GITHUB_REPO>
cd private-vpn
npm install
npm run build
npm run preview  # or setup as systemd service
```

### macOS
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Clone and setup
git clone <YOUR_GITHUB_REPO>
cd private-vpn
npm install
npm run build
npm run preview
```

### Windows (WSL/PowerShell)
```powershell
# Install Node.js from nodejs.org or via package manager
# Using Chocolatey:
choco install nodejs

# Or using WSL:
wsl --install  # if WSL not installed
# Then follow Linux instructions inside WSL

# Clone and setup
git clone <YOUR_GITHUB_REPO>
cd private-vpn
npm install
npm run build
npm run preview
```

## 📟 Terminal Deployment (Termux/Advanced)

### Termux (Android Terminal)
```bash
# Update packages
pkg update && pkg upgrade

# Install dependencies
pkg install nodejs git

# Clone and setup
git clone <YOUR_GITHUB_REPO>
cd private-vpn
npm install
npm run build

# Run headless VPN service
node scripts/terminal-vpn.js  # Custom terminal interface
```

### Linux Terminal (Headless Server)
```bash
# Setup as systemd service
sudo cp scripts/securevault-vpn.service /etc/systemd/system/
sudo systemctl enable securevault-vpn
sudo systemctl start securevault-vpn

# Check status
sudo systemctl status securevault-vpn
```

## 🔧 Configuration

### Environment Variables
Create `.env` file in project root:
```env
VITE_VPN_API_KEY=your_api_key_here
VITE_ENCRYPTION_LEVEL=military
VITE_AUTO_ROTATE=true
VITE_TOR_INTEGRATION=true
```

### Custom Server Configuration
Edit `src/config/servers.json` to add your own VPN servers:
```json
{
  "servers": [
    {
      "id": "custom-1",
      "name": "Custom Server",
      "country": "Your Country",
      "address": "your-server.com",
      "protocols": ["WireGuard", "OpenVPN"]
    }
  ]
}
```

## 🛠️ Development

### Project Structure
```
private-vpn/
├── src/
│   ├── components/         # React components
│   ├── hooks/             # Custom hooks for VPN logic
│   ├── pages/             # Application pages
│   └── config/            # Configuration files
├── capacitor.config.ts    # Mobile app configuration
├── scripts/               # Deployment scripts
└── docs/                  # Documentation
```

### Available Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Code linting
- `npm run test` - Run tests

## 🔒 Security Features

- **End-to-End Encryption:** All traffic encrypted with AES-256
- **DNS Leak Protection:** Prevents DNS queries from leaking
- **Kill Switch:** Automatically blocks internet if VPN disconnects
- **Perfect Forward Secrecy:** New encryption keys for each session
- **No-Log Policy:** Zero connection or activity logs stored

## 🌐 Platform-Specific Features

### Mobile (iOS/Android)
- Native system VPN integration
- Background connection maintenance
- Battery optimization
- Biometric authentication

### Desktop
- System tray integration
- Auto-start on boot
- Network interface monitoring
- Process isolation

### Terminal/Server
- Headless operation
- API control interface
- Logging to syslog
- Process management

## 📋 Requirements

### Minimum Requirements
- **Mobile:** iOS 12+ / Android 7+
- **Desktop:** 2GB RAM, 100MB storage
- **Terminal:** 512MB RAM, 50MB storage

### Recommended
- **Mobile:** iOS 15+ / Android 10+
- **Desktop:** 4GB RAM, 1GB storage
- **Network:** 10+ Mbps internet connection

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ⚖️ Legal Disclaimer

This software is for educational and legitimate privacy purposes only. Users are responsible for complying with local laws and regulations. The developer assumes no liability for misuse.

## 📞 Support

- **Issues:** Report bugs via GitHub Issues
- **Security:** Contact developer for security vulnerabilities
- **General:** Community support via discussions

---

**Developed with ❤️ by Xeyronox**  
*"Privacy is not about hiding something. It's about protecting everything."*
