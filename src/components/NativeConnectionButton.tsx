import { useState } from 'react';
import { Shield, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNativeVPN } from '@/hooks/useNativeVPN';
import { useVPNManager } from '@/hooks/useVPNManager';
import { toast } from 'sonner';

interface NativeConnectionButtonProps {
  selectedServer: string;
}

const NativeConnectionButton = ({ selectedServer }: NativeConnectionButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { 
    permissions, 
    isNative, 
    platform,
    requestPermissions,
    createVPNProfile,
    connectToVPN,
    disconnectVPN,
    getNetworkStatus
  } = useNativeVPN();
  
  const { connectionState, handleConnect } = useVPNManager();

  const handleNativeConnect = async () => {
    if (!isNative) {
      toast.info("Native VPN features require the mobile app");
      return;
    }

    if (!permissions.vpnAccess) {
      toast.error("VPN permissions required. Please grant permissions first.");
      return;
    }

    setIsConnecting(true);
    
    try {
      await handleConnect();
      
      if (connectionState === 'connected') {
        toast.success(`Connected to ${selectedServer}`);
      } else {
        toast.success(`Disconnected from VPN`);
      }
    } catch (error) {
      console.error('Native VPN operation failed:', error);
      toast.error(`Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const getConnectionIcon = () => {
    if (isConnecting || connectionState === 'connecting') {
      return <Loader2 className="h-5 w-5 animate-spin" />;
    }
    
    if (connectionState === 'connected') {
      return <Shield className="h-5 w-5 text-vpn-secure" />;
    }
    
    return <WifiOff className="h-5 w-5 text-muted-foreground" />;
  };

  const getButtonText = () => {
    if (isConnecting || connectionState === 'connecting') {
      return 'Connecting...';
    }
    
    if (connectionState === 'connected') {
      return 'Disconnect VPN';
    }
    
    return 'Connect to VPN';
  };

  const getButtonVariant = () => {
    if (connectionState === 'connected') {
      return 'destructive';
    }
    return 'default';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Native VPN Connection</CardTitle>
            <CardDescription>
              {isNative 
                ? `Hardware-accelerated encryption on ${platform}` 
                : 'Available in mobile app only'
              }
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {isNative && (
              <Badge variant={permissions.vpnAccess ? 'default' : 'destructive'}>
                {permissions.vpnAccess ? 'Authorized' : 'Unauthorized'}
              </Badge>
            )}
            <Badge variant="outline">{connectionState}</Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Wifi className="h-4 w-4 text-vpn-cyber-blue" />
            <span className="text-sm font-medium">Server: {selectedServer}</span>
          </div>
          {getConnectionIcon()}
        </div>
        
        <Button
          onClick={handleNativeConnect}
          disabled={isConnecting || connectionState === 'connecting' || (!isNative)}
          variant={getButtonVariant()}
          size="lg"
          className="w-full vpn-button"
        >
          {getButtonText()}
        </Button>
        
        {!isNative && (
          <p className="text-xs text-muted-foreground text-center">
            Install the mobile app for native VPN capabilities including 
            hardware encryption and background operation.
          </p>
        )}
        
        {isNative && !permissions.vpnAccess && (
          <p className="text-xs text-destructive text-center">
            VPN permissions are required. Use the permissions section above to grant access.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default NativeConnectionButton;