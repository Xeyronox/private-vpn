
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Zap, Power, Globe } from "lucide-react";

const VPNSettings = () => {
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [torEnabled, setTorEnabled] = useState(false);
  const [protocol, setProtocol] = useState('wireguard');

  return (
    <div className="vpn-status-card">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-vpn-secure" />
        <h3 className="text-xl font-semibold">VPN Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Connection Settings */}
        <div>
          <h4 className="text-lg font-medium mb-4 flex items-center space-x-2">
            <Power className="w-5 h-5 text-vpn-cyber-blue" />
            <span>Connection</span>
          </h4>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-connect" className="text-base">Auto-connect on startup</Label>
                <p className="text-sm text-muted-foreground">Automatically connect when the app starts</p>
              </div>
              <Switch
                id="auto-connect"
                checked={autoConnect}
                onCheckedChange={setAutoConnect}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="kill-switch" className="text-base">Kill Switch</Label>
                <p className="text-sm text-muted-foreground">Block internet if VPN disconnects</p>
              </div>
              <Switch
                id="kill-switch"
                checked={killSwitch}
                onCheckedChange={setKillSwitch}
              />
            </div>

            <div>
              <Label className="text-base mb-2 block">VPN Protocol</Label>
              <Select value={protocol} onValueChange={setProtocol}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wireguard">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>WireGuard (Recommended)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="openvpn">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>OpenVPN</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ikev2">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>IKEv2</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h4 className="text-lg font-medium mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-vpn-secure" />
            <span>Privacy & Security</span>
          </h4>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="tor-network" className="text-base">Tor Network Integration</Label>
                <p className="text-sm text-muted-foreground">Route traffic through Tor for maximum anonymity</p>
              </div>
              <Switch
                id="tor-network"
                checked={torEnabled}
                onCheckedChange={setTorEnabled}
              />
            </div>

            <div className="p-4 bg-vpn-secure/10 border border-vpn-secure/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-vpn-secure mt-0.5" />
                <div>
                  <h5 className="font-medium text-vpn-secure">End-to-End Encryption Active</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    All traffic is encrypted with military-grade AES-256 encryption before leaving your device.
                  </p>
                </div>
              </div>
            </div>

            {torEnabled && (
              <div className="p-4 bg-vpn-cyber-blue/10 border border-vpn-cyber-blue/20 rounded-lg tor-indicator">
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-vpn-cyber-blue mt-0.5" />
                  <div>
                    <h5 className="font-medium text-vpn-cyber-blue">Tor Network Enabled</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Triple-layer encryption through Tor network provides maximum anonymity.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPNSettings;
