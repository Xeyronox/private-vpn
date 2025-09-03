import { useState } from 'react';
import { Shield, Smartphone, Wifi, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNativeVPN } from '@/hooks/useNativeVPN';
import { toast } from 'sonner';

const VPNPermissions = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { isNative, permissions, requestPermissions } = useNativeVPN();

  const handleRequestPermissions = async () => {
    setIsRequesting(true);
    try {
      const granted = await requestPermissions();
      if (granted) {
        toast.success('VPN permissions granted successfully!');
      } else {
        toast.error('VPN permissions denied. Some features may not work.');
      }
    } catch (error) {
      console.error('Permission request error:', error);
      toast.error('Failed to request permissions. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const getPermissionIcon = (granted: boolean) => {
    return granted ? (
      <CheckCircle className="w-4 h-4 text-vpn-secure" />
    ) : (
      <AlertCircle className="w-4 h-4 text-vpn-disconnected" />
    );
  };

  const getPermissionBadge = (granted: boolean) => {
    return (
      <Badge variant={granted ? "default" : "destructive"}>
        {granted ? "Granted" : "Required"}
      </Badge>
    );
  };

  if (!isNative) {
    return (
      <Card className="border-vpn-cyber-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-vpn-cyber-blue" />
            Web Platform Detected
          </CardTitle>
          <CardDescription>
            Running in web mode. For full VPN functionality, use the mobile app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Web browsers have limited VPN capabilities. For the best experience:
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Install the mobile app on Android or iOS</li>
              <li>• Use the terminal version for Linux/Windows</li>
              <li>• Enable developer mode for advanced features</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-vpn-cyber-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-vpn-secure" />
          VPN Permissions
          <Badge variant="outline" className="ml-auto">
            MOBILE
          </Badge>
        </CardTitle>
        <CardDescription>
          Grant permissions for secure VPN functionality on your device
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex items-center gap-3">
              {getPermissionIcon(permissions.vpnAccess)}
              <div>
                <p className="font-medium">VPN Access</p>
                <p className="text-sm text-muted-foreground">
                  Required to establish secure VPN connections
                </p>
              </div>
            </div>
            {getPermissionBadge(permissions.vpnAccess)}
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex items-center gap-3">
              {getPermissionIcon(permissions.networkAccess)}
              <div>
                <p className="font-medium">Network Access</p>
                <p className="text-sm text-muted-foreground">
                  Monitor and manage network connections
                </p>
              </div>
            </div>
            {getPermissionBadge(permissions.networkAccess)}
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex items-center gap-3">
              {getPermissionIcon(permissions.backgroundExecution)}
              <div>
                <p className="font-medium">Background Execution</p>
                <p className="text-sm text-muted-foreground">
                  Keep VPN active when app is minimized
                </p>
              </div>
            </div>
            {getPermissionBadge(permissions.backgroundExecution)}
          </div>
        </div>

        {!permissions.vpnAccess && (
          <div className="pt-4 border-t">
            <Button 
              onClick={handleRequestPermissions}
              disabled={isRequesting}
              className="w-full"
              size="lg"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              {isRequesting ? 'Requesting Permissions...' : 'Grant VPN Permissions'}
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              You may see system prompts to authorize VPN access
            </p>
          </div>
        )}

        {permissions.vpnAccess && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-vpn-secure">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">All permissions granted</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your device is ready for secure VPN connections
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VPNPermissions;