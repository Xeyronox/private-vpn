
import { Shield, Wifi } from "lucide-react";
import { ConnectionState } from "@/hooks/useVPNManager";

interface VPNHeaderProps {
  connectionState: ConnectionState;
}

const VPNHeader = ({ connectionState }: VPNHeaderProps) => {
  const getStatusInfo = () => {
    switch (connectionState) {
      case 'connected':
        return {
          text: 'Protected',
          color: 'text-vpn-secure',
          pulseColor: 'bg-vpn-secure'
        };
      case 'connecting':
        return {
          text: 'Connecting...',
          color: 'text-vpn-connecting',
          pulseColor: 'bg-vpn-connecting'
        };
      case 'disconnected':
        return {
          text: 'Unprotected',
          color: 'text-vpn-disconnected',
          pulseColor: 'bg-vpn-disconnected'
        };
    }
  };

  const status = getStatusInfo();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Shield className={`security-shield w-8 h-8 ${connectionState === 'connected' ? 'text-vpn-secure' : 'text-muted-foreground'}`} />
          <Wifi className="absolute -bottom-1 -right-1 w-4 h-4 text-vpn-cyber-blue" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-vpn-secure to-vpn-cyber-blue bg-clip-text text-transparent">
            SecureVault VPN
          </h1>
          <p className="text-muted-foreground">Military-grade encryption & privacy</p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-sm text-muted-foreground">Status</div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${status.pulseColor} ${connectionState === 'connected' ? 'connection-pulse' : ''}`}></div>
          <span className={`font-medium ${status.color}`}>{status.text}</span>
        </div>
      </div>
    </div>
  );
};

export default VPNHeader;
