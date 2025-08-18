
#!/usr/bin/env node

/**
 * SecureVault VPN - Terminal Interface
 * Developed by Xeyronox
 * Headless VPN management for terminal environments
 */

const readline = require('readline');
const { spawn } = require('child_process');
const fs = require('fs');

class TerminalVPN {
  constructor() {
    this.isConnected = false;
    this.currentServer = null;
    this.connectionTime = null;
    this.bytesTransferred = { up: 0, down: 0 };
    this.autoRotate = false;
    this.rotationInterval = null;
    
    this.servers = [
      { id: 'us-ny-1', name: 'New York', country: 'US', address: 'ny1.securevault.vpn' },
      { id: 'uk-lon-1', name: 'London', country: 'UK', address: 'lon1.securevault.vpn' },
      { id: 'de-ber-1', name: 'Berlin', country: 'DE', address: 'ber1.securevault.vpn' },
      { id: 'jp-tok-1', name: 'Tokyo', country: 'JP', address: 'tok1.securevault.vpn' }
    ];

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  displayBanner() {
    console.log('\n🛡️  SecureVault VPN - Terminal Interface');
    console.log('Developer: Xeyronox (Red/Blackhat Hacker)');
    console.log('Military-grade encryption & privacy protection\n');
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
    console.log('\n📖 Commands:');
    console.log('status     - Show connection status');
    console.log('servers    - List available servers');
    console.log('connect <n> - Connect to server number n');
    console.log('disconnect - Disconnect from VPN');
    console.log('rotate     - Toggle auto-rotation');
    console.log('help       - Show this help');
    console.log('exit       - Quit application');
    console.log('');
  }

  async start() {
    this.displayBanner();
    this.displayStatus();
    this.showHelp();

    const askCommand = () => {
      this.rl.question('securevault> ', async (input) => {
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

        askCommand();
      });
    };

    askCommand();
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
