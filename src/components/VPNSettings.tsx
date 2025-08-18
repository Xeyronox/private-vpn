import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Shield, Zap, Power, Globe, RotateCcw, Lock } from "lucide-react";
import { EncryptionLevel } from "@/hooks/useVPNManager";

interface VPNSettingsProps {
  autoRotate: boolean;
  setAutoRotate: (value: boolean) => void;
  rotationInterval: number;
  setRotationInterval: (value: number) => void;
  encryptionLevel: EncryptionLevel;
  setEncryptionLevel: (value: EncryptionLevel) => void;
}

const VPNSettings = ({
  autoRotate,
  setAutoRotate,
  rotationInterval,
  setRotationInterval,
  encryptionLevel,
  setEncryptionLevel
}: VPNSettingsProps) => {
  const handleRotationIntervalChange = (value: number[]) => {
    setRotationInterval(value[0] * 60000); // Convert minutes to milliseconds
  };

  return (
    <div className="vpn-status-card">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-vpn-secure" />
        <h3 className="text-xl font-semibold">Advanced VPN Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Connection Settings */}
        <div>
          <h4 className="text-lg font-medium mb-4 flex items-center space-x-2">
            <Power className="w-5 h-5 text-vpn-cyber-blue" />
            <span>Connection & Security</span>
          </h4>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-rotate" className="text-base">Auto Server Rotation</Label>
                <p className="text-sm text-muted-foreground">Automatically switch servers for enhanced security</p>
              </div>
              <Switch
                id="auto-rotate"
                checked={autoRotate}
                onCheckedChange={setAutoRotate}
              />
            </div>

            {autoRotate && (
              <div>
                <Label className="text-base mb-2 block">Rotation Interval</Label>
                <div className="px-3 py-2 bg-vpn-dark-surface rounded-lg">
                  <Slider
                    value={[rotationInterval / 60000]}
                    onValueChange={handleRotationIntervalChange}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 min</span>
                    <span>{Math.round(rotationInterval / 60000)} minutes</span>
                    <span>30 min</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label className="text-base mb-2 block">Encryption Level</Label>
              <Select value={encryptionLevel} onValueChange={(value: EncryptionLevel) => setEncryptionLevel(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Standard AES-256</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="military">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Military Grade (Recommended)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="quantum">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Quantum Resistant</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Advanced Security */}
        <div>
          <h4 className="text-lg font-medium mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-vpn-secure" />
            <span>Hardware Integration</span>
          </h4>
          
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-vpn-secure/10 to-vpn-cyber-blue/10 border border-vpn-secure/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-vpn-secure mt-0.5" />
                <div>
                  <h5 className="font-medium text-vpn-secure">Hardware Security Module</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Keys stored in device secure enclave with hardware-backed encryption
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-vpn-cyber-blue/10 border border-vpn-cyber-blue/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <RotateCcw className="w-5 h-5 text-vpn-cyber-blue mt-0.5" />
                <div>
                  <h5 className="font-medium text-vpn-cyber-blue">Dynamic Key Rotation</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Encryption keys automatically rotated every 60 seconds
                  </p>
                </div>
              </div>
            </div>

            {encryptionLevel === 'quantum' && (
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-vpn-cyber-blue/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-purple-400">Quantum Resistant Encryption</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Post-quantum cryptography algorithms protect against future quantum computers
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
