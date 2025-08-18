
import { Shield, Globe, Lock, RotateCcw } from "lucide-react";
import { ConnectionState } from "@/hooks/useVPNManager";

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
}

interface MobileConnectionStatusProps {
  connectionState: ConnectionState;
  onConnect: () => void;
  currentIP: string;
  protectedIP: string;
  selectedServer: Server;
  encryptionLevel: string;
  isNative: boolean;
}

const MobileConnectionStatus = ({ 
  connectionState, 
  onConnect, 
  currentIP, 
  protectedIP, 
  selectedServer,
  encryptionLevel,
  isNative
}: MobileConnectionStatusProps) => {
  const getConnectionText = () => {
    switch (connectionState) {
      case 'connected': return 'Disconnect';
      case 'connecting': return 'Connecting...';
      case 'rotating': return 'Rotating...';
      case 'disconnected': return 'Connect';
    }
  };

  const getStatusMessage = () => {
    switch (connectionState) {
      case 'connected': return isNative ? 'System VPN Active - Protected' : 'Secure connection established';
      case 'connecting': return 'Establishing secure tunnel...';
      case 'rotating': return 'Switching to new server...';
      case 'disconnected': return 'Tap to activate protection';
    }
  };

  const getStatusColor = () => {
    switch (connectionState) {
      case 'connected': return 'text-vpn-secure';
      case 'connecting': return 'text-vpn-connecting';
      case 'rotating': return 'text-vpn-cyber-blue';
      case 'disconnected': return 'text-vpn-disconnected';
    }
  };

  return (
    <div className="vpn-status-card">
      {/* Status Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {isNative && (
            <div className="px-2 py-1 bg-vpn-secure/20 rounded-full">
              <span className="text-xs font-medium text-vpn-secure">NATIVE</span>
            </div>
          )}
          {connectionState === 'rotating' && (
            <div className="px-2 py-1 bg-vpn-cyber-blue/20 rounded-full flex items-center space-x-1">
              <RotateCcw className="w-3 h-3 animate-spin" />
              <span className="text-xs font-medium text-vpn-cyber-blue">ROTATING</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold mb-1">Connection Status</h2>
        <p className={`text-sm ${getStatusColor()}`}>{getStatusMessage()}</p>
      </div>

      {/* Main Connect Button */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={onConnect}
          className={`vpn-connect-button ${connectionState} ${connectionState === 'rotating' ? 'rotating' : ''}`}
          disabled={connectionState === 'connecting' || connectionState === 'rotating'}
        >
          {connectionState === 'rotating' ? (
            <RotateCcw className="w-8 h-8 animate-spin" />
          ) : (
            <Shield className="w-8 h-8" />
          )}
        </button>
      </div>

      <div className="text-center text-lg font-medium mb-6">
        {getConnectionText()}
      </div>

      {/* Connection Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="text-center p-3 bg-vpn-dark-surface rounded-lg">
          <Globe className="w-5 h-5 text-vpn-cyber-blue mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Your IP</div>
          <div className="font-mono text-xs font-medium">
            {connectionState === 'connected' ? protectedIP : currentIP}
          </div>
        </div>

        <div className="text-center p-3 bg-vpn-dark-surface rounded-lg">
          <div className="text-lg mb-1">{selectedServer.flag}</div>
          <div className="text-xs text-muted-foreground">Server</div>
          <div className="text-xs font-medium truncate">{selectedServer.name}</div>
        </div>

        <div className="text-center p-3 bg-vpn-dark-surface rounded-lg">
          <Lock className="w-5 h-5 text-vpn-secure mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Encryption</div>
          <div className="text-xs font-medium">
            {encryptionLevel === 'quantum' ? 'Quantum' : 'AES-256'}
          </div>
        </div>

        <div className="text-center p-3 bg-vpn-dark-surface rounded-lg">
          <div className="w-5 h-5 mx-auto mb-1 flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full ${
              connectionState === 'connected' ? 'bg-vpn-secure connection-pulse' : 
              connectionState === 'connecting' ? 'bg-vpn-connecting' :
              connectionState === 'rotating' ? 'bg-vpn-cyber-blue' :
              'bg-vpn-disconnected'
            }`}></div>
          </div>
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="text-xs font-medium">
            {connectionState === 'connected' ? 'Active' : 
             connectionState === 'connecting' ? 'Connecting' :
             connectionState === 'rotating' ? 'Rotating' : 'Inactive'}
          </div>
        </div>
      </div>

      {/* Hardware Encryption Notice */}
      {connectionState === 'connected' && (
        <div className="p-3 bg-gradient-to-r from-vpn-secure/10 to-vpn-cyber-blue/10 border border-vpn-secure/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Shield className="w-4 h-4 text-vpn-secure" />
            <span className="text-sm font-medium text-vpn-secure">Hardware Encryption Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            End-to-end encryption with hardware-accelerated security protocols
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileConnectionStatus;
