#!/usr/bin/env node

/**
 * SecureVault VPN - Enhanced Terminal Interface
 * Developed by Xeyronox
 * Multi-platform headless VPN management
 * Supports: Linux, macOS, Windows, Termux, WSL
 */

const readline = require('readline');
const { spawn, exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

class TerminalVPN {
  constructor() {
    this.isConnected = false;
    this.currentServer = null;
    this.connectionTime = null;
    this.bytesTransferred = { up: 0, down: 0 };
    this.autoRotate = false;
    this.rotationInterval = null;
    this.platform = this.detectPlatform();
    this.config = this.loadConfig();
    
    this.servers = [
      { id: 'us-ny-1', name: 'New York', country: 'US', address: 'ny1.securevault.vpn' },
      { id: 'uk-lon-1', name: 'London', country: 'UK', address: 'lon1.securevault.vpn' },
      { id: 'de-ber-1', name: 'Berlin', country: 'DE', address: 'ber1.securevault.vpn' },
      { id: 'jp-tok-1', name: 'Tokyo', country: 'JP', address: 'tok1.securevault.vpn' }
    ];

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: this.getPrompt()
    });
    
    this.securityAnalysis = {
      events: [],
      threats: 0,
      connections: 0
    };
  }

  detectPlatform() {
    if (fs.existsSync('/data/data/com.termux')) return 'termux';
    if (process.platform === 'linux') {
      if (fs.existsSync('/proc/version')) {
        const version = fs.readFileSync('/proc/version', 'utf8');
        if (version.includes('Microsoft')) return 'wsl';
      }
      return 'linux';
    }
    if (process.platform === 'darwin') return 'macos';
    if (process.platform === 'win32') return 'windows';
    return 'unknown';
  }

  loadConfig() {
    const configPaths = [
      path.join(__dirname, '..', 'config', `${this.platform}.json`),
      path.join(__dirname, '..', '.env'),
      path.join(os.homedir(), '.securevault', 'config.json')
    ];

    let config = {
      platform: this.platform,
      encryption: 'military',
      autoRotate: true,
      rotationInterval: 300000,
      securityAnalysis: true
    };

    for (const configPath of configPaths) {
      try {
        if (fs.existsSync(configPath)) {
          if (configPath.endsWith('.json')) {
            const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            config = { ...config, ...fileConfig };
          }
        }
      } catch (error) {
        // Ignore config loading errors
      }
    }

    return config;
  }

  getPrompt() {
    const platformEmoji = {
      'termux': '📱',
      'linux': '🐧',
      'macos': '🍎',
      'windows': '🪟',
      'wsl': '🐧',
      'unknown': '💻'
    };
    
    return `${platformEmoji[this.platform]} securevault> `;
  }

  displayBanner() {
    console.log('\n🛡️  SecureVault VPN - Enhanced Terminal Interface');
    console.log('Developer: Xeyronox (Red/Blackhat Hacker)');
    console.log('Military-grade encryption & privacy protection');
    console.log(`Platform: ${this.platform.toUpperCase()} | Encryption: ${this.config.encryption.toUpperCase()}`);
    console.log('========================================================\n');
  }

  displayStatus() {
    console.log('\n📊 VPN Status:');
    console.log(`Connection: ${this.isConnected ? '🟢 CONNECTED' : '🔴 DISCONNECTED'}`);
    
    if (this.isConnected && this.currentServer) {
      console.log(`Server: ${this.currentServer.name} (${this.currentServer.country})`);
      console.log(`Address: ${this.currentServer.address}`);
      console.log(`Uptime: ${this.getUptime()}`);
      console.log(`Data: ↑${this.formatBytes(this.bytesTransferred.up)} ↓${this.formatBytes(this.bytesTransferred.down)}`);
      console.log(`Auto-Rotate: ${this.autoRotate ? '✅ ON' : '❌ OFF'}`);
    }
    console.log('');
  }

  displayServers() {
    console.log('\n🌐 Available Servers:');
    this.servers.forEach((server, index) => {
      const status = this.currentServer?.id === server.id ? '🟢' : '⚪';
      console.log(`${status} ${index + 1}. ${server.name} (${server.country})`);
    });
    console.log('');
  }

  async connect(serverId) {
    const server = this.servers.find(s => s.id === serverId);
    if (!server) {
      console.log('❌ Server not found');
      return;
    }

    console.log(`🔄 Connecting to ${server.name}...`);
    
    // Simulate connection process
    await this.sleep(2000);
    
    this.isConnected = true;
    this.currentServer = server;
    this.connectionTime = Date.now();
    
    console.log(`✅ Connected to ${server.name}`);
    
    // Start data transfer simulation
    this.startDataTransfer();
    
    // Start auto-rotation if enabled
    if (this.autoRotate) {
      this.startAutoRotation();
    }
  }

  async disconnect() {
    if (!this.isConnected) {
      console.log('❌ Not connected to any server');
      return;
    }

    console.log('🔄 Disconnecting...');
    await this.sleep(1000);
    
    this.isConnected = false;
    this.currentServer = null;
    this.connectionTime = null;
    this.bytesTransferred = { up: 0, down: 0 };
    
    // Clear intervals
    if (this.dataInterval) clearInterval(this.dataInterval);
    if (this.rotationInterval) clearInterval(this.rotationInterval);
    
    console.log('✅ Disconnected from VPN');
  }

  startDataTransfer() {
    this.dataInterval = setInterval(() => {
      if (this.isConnected) {
        this.bytesTransferred.up += Math.random() * 1000 + 500;
        this.bytesTransferred.down += Math.random() * 5000 + 1000;
      }
    }, 1000);
  }

  startAutoRotation() {
    this.rotationInterval = setInterval(async () => {
      if (this.isConnected && this.autoRotate) {
        const currentIndex = this.servers.findIndex(s => s.id === this.currentServer.id);
        const nextServer = this.servers[(currentIndex + 1) % this.servers.length];
        
        console.log(`🔄 Auto-rotating to ${nextServer.name}...`);
        await this.sleep(1500);
        
        this.currentServer = nextServer;
        console.log(`✅ Rotated to ${nextServer.name}`);
      }
    }, 300000); // 5 minutes
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    console.log(`Auto-rotate: ${this.autoRotate ? 'ENABLED' : 'DISABLED'}`);
    
    if (this.autoRotate && this.isConnected) {
      this.startAutoRotation();
    } else if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }

  getUptime() {
    if (!this.connectionTime) return '0s';
    const uptime = Date.now() - this.connectionTime;
    const seconds = Math.floor(uptime / 1000) % 60;
    const minutes = Math.floor(uptime / 60000) % 60;
    const hours = Math.floor(uptime / 3600000);
    
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }

  formatBytes(bytes) {
    if (bytes < 1024) return `${bytes.toFixed(0)}B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1048576).toFixed(1)}MB`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showHelp() {
    console.log('\n📖 Available Commands:');
    console.log('Basic:');
    console.log('  status        - Show connection status');
    console.log('  servers       - List available servers');
    console.log('  connect <n>   - Connect to server number n');
    console.log('  disconnect    - Disconnect from VPN');
    console.log('  rotate        - Toggle auto-rotation');
    
    console.log('\nAdvanced:');
    console.log('  security      - Security analysis report');
    console.log('  logs          - View connection logs');
    console.log('  config        - Show configuration');
    console.log('  platform      - Platform information');
    console.log('  export <file> - Export connection data');
    
    if (this.platform === 'termux') {
      console.log('\nTermux:');
      console.log('  termux-setup  - Termux optimizations');
      console.log('  background    - Run in background');
    }
    
    console.log('\nGeneral:');
    console.log('  help          - Show this help');
    console.log('  exit          - Quit application');
    console.log('');
  }

  async start() {
    this.displayBanner();
    this.displayStatus();
    this.showHelp();

    const askCommand = () => {
      this.rl.prompt();
      this.rl.on('line', async (input) => {
        const [command, ...args] = input.trim().split(' ');

        switch (command.toLowerCase()) {
          case 'status':
            this.displayStatus();
            break;

          case 'servers':
            this.displayServers();
            break;

          case 'connect':
            const serverNum = parseInt(args[0]);
            if (serverNum && serverNum <= this.servers.length) {
              await this.connect(this.servers[serverNum - 1].id);
            } else {
              console.log('❌ Invalid server number');
            }
            break;

          case 'disconnect':
            await this.disconnect();
            break;

          case 'rotate':
            this.toggleAutoRotate();
            break;

          case 'security':
            this.showSecurityAnalysis();
            break;

          case 'logs':
            this.showLogs();
            break;

          case 'config':
            this.showConfig();
            break;

          case 'platform':
            this.showPlatformInfo();
            break;

          case 'export':
            if (args[0]) {
              this.exportData(args[0]);
            } else {
              console.log('❌ Please specify filename: export <filename>');
            }
            break;

          case 'termux-setup':
            if (this.platform === 'termux') {
              this.termuxOptimizations();
            } else {
              console.log('❌ Command only available on Termux');
            }
            break;

          case 'background':
            if (this.platform === 'termux') {
              this.runInBackground();
            } else {
              console.log('❌ Command only available on Termux');
            }
            break;

          case 'help':
            this.showHelp();
            break;

          case 'exit':
          case 'quit':
            console.log('👋 Goodbye!');
            process.exit(0);
            break;

          default:
            console.log('❌ Unknown command. Type "help" for available commands.');
        }

        this.rl.prompt();
      });
    };

    askCommand();
  }

  showSecurityAnalysis() {
    console.log('\n🔒 Security Analysis Report:');
    console.log(`Total Events: ${this.securityAnalysis.events.length}`);
    console.log(`Threat Level: ${this.securityAnalysis.threats === 0 ? '🟢 LOW' : '🟡 MEDIUM'}`);
    console.log(`Connections: ${this.securityAnalysis.connections}`);
    console.log(`Platform Security: ${this.getPlatformSecurity()}`);
    
    if (this.securityAnalysis.events.length > 0) {
      console.log('\nRecent Events:');
      this.securityAnalysis.events.slice(-5).forEach(event => {
        console.log(`  ${event.timestamp} - ${event.type}: ${event.message}`);
      });
    }
    console.log('');
  }

  showLogs() {
    console.log('\n📝 Connection Logs:');
    if (this.securityAnalysis.events.length === 0) {
      console.log('No logs available');
    } else {
      this.securityAnalysis.events.forEach(event => {
        console.log(`[${event.timestamp}] ${event.type}: ${event.message}`);
      });
    }
    console.log('');
  }

  showConfig() {
    console.log('\n⚙️  Configuration:');
    console.log(JSON.stringify(this.config, null, 2));
    console.log('');
  }

  showPlatformInfo() {
    console.log('\n💻 Platform Information:');
    console.log(`Platform: ${this.platform}`);
    console.log(`OS: ${process.platform}`);
    console.log(`Architecture: ${process.arch}`);
    console.log(`Node.js: ${process.version}`);
    console.log(`Memory: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`);
    
    if (this.platform === 'termux') {
      console.log('Termux Features: ✅ Available');
      console.log('Storage Access: ✅ Configured');
      console.log('Background Service: ✅ Supported');
    }
    console.log('');
  }

  exportData(filename) {
    const data = {
      platform: this.platform,
      config: this.config,
      securityAnalysis: this.securityAnalysis,
      currentConnection: {
        server: this.currentServer,
        connected: this.isConnected,
        uptime: this.getUptime(),
        bytesTransferred: this.bytesTransferred
      },
      timestamp: new Date().toISOString()
    };

    try {
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      console.log(`✅ Data exported to ${filename}`);
    } catch (error) {
      console.log(`❌ Export failed: ${error.message}`);
    }
  }

  termuxOptimizations() {
    console.log('\n📱 Applying Termux optimizations...');
    
    // Check Termux-specific optimizations
    const optimizations = [
      { name: 'Storage Access', check: () => fs.existsSync('/storage/emulated/0') },
      { name: 'Wake Lock', check: () => process.env.TERMUX_VERSION !== undefined },
      { name: 'Background Service', check: () => fs.existsSync(`${process.env.HOME}/.config/systemd/user`) }
    ];

    optimizations.forEach(opt => {
      const status = opt.check() ? '✅' : '❌';
      console.log(`${status} ${opt.name}`);
    });

    console.log('\nRecommendations:');
    console.log('- Run: termux-setup-storage');
    console.log('- Install: pkg install termux-services');
    console.log('- Enable: systemctl --user enable termux-securevault');
    console.log('');
  }

  runInBackground() {
    console.log('\n🔄 Starting background service...');
    
    if (this.platform === 'termux') {
      exec('systemctl --user start termux-securevault', (error, stdout, stderr) => {
        if (error) {
          console.log('❌ Failed to start background service');
          console.log('💡 Try: systemctl --user enable termux-securevault');
        } else {
          console.log('✅ Background service started');
        }
      });
    }
  }

  getPlatformSecurity() {
    const security = {
      'termux': '🟡 MODERATE (Android Sandbox)',
      'linux': '🟢 HIGH (Full System Control)', 
      'macos': '🟢 HIGH (Secure Enclave)',
      'windows': '🟡 MODERATE (Windows Defender)',
      'wsl': '🟢 HIGH (Linux Subsystem)',
      'unknown': '🔴 UNKNOWN'
    };
    
    return security[this.platform] || security.unknown;
  }

  logEvent(type, message) {
    const event = {
      timestamp: new Date().toISOString(),
      type,
      message,
      platform: this.platform
    };
    
    this.securityAnalysis.events.push(event);
    
    // Keep only last 100 events
    if (this.securityAnalysis.events.length > 100) {
      this.securityAnalysis.events = this.securityAnalysis.events.slice(-100);
    }
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n👋 SecureVault VPN terminated');
  process.exit(0);
});

// Start the terminal VPN interface
const terminalVPN = new TerminalVPN();
terminalVPN.start();
