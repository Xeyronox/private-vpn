import { useState } from 'react';
import { Power, Smartphone, Wifi, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNativeVPN } from '@/hooks/useNativeVPN';
import { useVPNManager } from '@/hooks/useVPNManager';
import { toast } from 'sonner';

interface NativeConnectionButtonProps {
  selectedServer: string;
}

const NativeConnectionButton = ({ selectedServer }: NativeConnectionButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { isNative, permissions, createVPNProfile, connectToVPN, disconnectVPN } = useNativeVPN();
  const { connectionState, setConnectionState } = useVPNManager();

  const handleNativeConnection = async () => {
    if (!permissions.vpnAccess) {
      toast.error('VPN permissions not granted. Please enable permissions first.');
      return;
    }

    setIsConnecting(true);
    
    try {
      if (connectionState === 'connected') {
        // Disconnect
        setConnectionState('connecting');
        const success = await disconnectVPN();
        
        if (success) {
          setConnectionState('disconnected');
          toast.success('Disconnected from VPN');
        } else {
          setConnectionState('connected');
          toast.error('Failed to disconnect from VPN');
        }
      } else {
        // Connect
        setConnectionState('connecting');
        const profile = await createVPNProfile({ name: selectedServer });
        const success = await connectToVPN(profile);
        
        if (success) {
          setConnectionState('connected');
          toast.success(`Connected to ${selectedServer}`);
        } else {
          setConnectionState('disconnected');
          toast.error('Failed to connect to VPN');
        }
      }
    } catch (error) {
      console.error('Native VPN operation failed:', error);
      setConnectionState('disconnected');
      toast.error('VPN operation failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const getButtonText = () => {
    if (isConnecting) return 'Processing...';
    if (connectionState === 'connected') return 'Disconnect VPN';
    if (connectionState === 'connecting') return 'Connecting...';
    return 'Connect VPN';
  };

  const getButtonIcon = () => {
    if (isConnecting || connectionState === 'connecting') {
      return <Loader2 className="w-5 h-5 animate-spin" />;
    }
    if (isNative) {
      return <Smartphone className="w-5 h-5" />;
    }
    return <Wifi className="w-5 h-5" />;
  };

  const getButtonVariant = () => {
    if (connectionState === 'connected') return 'destructive';
    return 'default';
  };

  const isDisabled = () => {
    return (
      isConnecting || 
      connectionState === 'connecting' || 
      (isNative && !permissions.vpnAccess) ||
      !selectedServer
    );
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleNativeConnection}
        disabled={isDisabled()}
        variant={getButtonVariant()}
        size="lg"
        className="w-full h-14 text-lg font-semibold"
      >
        {getButtonIcon()}
        {getButtonText()}
      </Button>
      
      {isNative && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Smartphone className="w-4 h-4" />
          <span>Native Mobile VPN</span>
        </div>
      )}
      
      {!selectedServer && (
        <p className="text-sm text-muted-foreground text-center">
          Please select a server first
        </p>
      )}
    </div>
  );
};

export default NativeConnectionButton;