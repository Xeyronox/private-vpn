
import { Shield, Globe, Lock } from "lucide-react";
import { ConnectionState } from "@/hooks/useVPNManager";

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
}

interface ConnectionStatusProps {
  connectionState: ConnectionState;
  onConnect: () => void;
  currentIP: string;
  protectedIP: string;
  selectedServer: Server;
}

const ConnectionStatus = ({ 
  connectionState, 
  onConnect, 
  currentIP, 
  protectedIP, 
  selectedServer 
}: ConnectionStatusProps) => {
  const getConnectionText = () => {
    switch (connectionState) {
      case 'connected': return 'Disconnect';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Connect';
    }
  };

  const getStatusMessage = () => {
    switch (connectionState) {
      case 'connected': return 'Your connection is secure and encrypted';
      case 'connecting': return 'Establishing secure connection...';
      case 'disconnected': return 'Click to connect and secure your internet';
    }
  };

  return (
    <div className="vpn-status-card text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Connection Status</h2>
        <p className="text-muted-foreground">{getStatusMessage()}</p>
      </div>

      {/* Main Connect Button */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={onConnect}
          className={`vpn-connect-button ${connectionState}`}
          disabled={connectionState === 'connecting'}
        >
          <Shield className="w-8 h-8" />
        </button>
      </div>

      <div className="text-lg font-medium mb-6">
        {getConnectionText()}
      </div>

      {/* Connection Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-vpn-dark-surface rounded-lg">
          <Globe className="w-6 h-6 text-vpn-cyber-blue mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Current IP</div>
          <div className="font-mono text-sm">
            {connectionState === 'connected' ? protectedIP : currentIP}
          </div>
        </div>

        <div className="text-center p-4 bg-vpn-dark-surface rounded-lg">
          <Lock className="w-6 h-6 text-vpn-secure mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Encryption</div>
          <div className="text-sm font-medium">AES-256</div>
        </div>

        <div className="text-center p-4 bg-vpn-dark-surface rounded-lg">
          <div className="text-2xl mb-1">{selectedServer.flag}</div>
          <div className="text-sm text-muted-foreground">Server</div>
          <div className="text-sm font-medium">{selectedServer.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
