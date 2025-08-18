
import { Shield, Wifi } from "lucide-react";

const VPNHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Shield className="security-shield w-8 h-8" />
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
          <div className="w-2 h-2 rounded-full bg-vpn-secure connection-pulse"></div>
          <span className="text-vpn-secure font-medium">Protected</span>
        </div>
      </div>
    </div>
  );
};

export default VPNHeader;
