
import { useState, useEffect, useCallback } from 'react';
import { useNativeVPN } from './useNativeVPN';

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'rotating';
export type EncryptionLevel = 'standard' | 'military' | 'quantum';

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
  premium?: boolean;
}

export const useVPNManager = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [selectedServer, setSelectedServer] = useState<Server>({
    id: 'us-ny-1',
    name: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    ping: 45,
    load: 23
  });
  
  const [currentIP, setCurrentIP] = useState('192.168.1.100');
  const [protectedIP, setProtectedIP] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState({ up: 0, down: 0 });
  const [connectionTime, setConnectionTime] = useState(0);
  const [encryptionLevel, setEncryptionLevel] = useState<EncryptionLevel>('military');
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotationInterval, setRotationInterval] = useState(300000); // 5 minutes

  const { isNative, createVPNProfile, connectToVPN, disconnectVPN } = useNativeVPN();

  // Server rotation logic
  const rotateServer = useCallback(async () => {
    if (connectionState !== 'connected') return;

    const availableServers = [
      { id: 'us-ny-1', name: 'New York', country: 'United States', flag: '🇺🇸', ping: 45, load: 23 },
      { id: 'us-ca-1', name: 'Los Angeles', country: 'United States', flag: '🇺🇸', ping: 52, load: 31 },
      { id: 'uk-lon-1', name: 'London', country: 'United Kingdom', flag: '🇬🇧', ping: 78, load: 19 },
      { id: 'de-ber-1', name: 'Berlin', country: 'Germany', flag: '🇩🇪', ping: 65, load: 28 },
      { id: 'jp-tok-1', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', ping: 120, load: 15 }
    ];

    const currentIndex = availableServers.findIndex(s => s.id === selectedServer.id);
    const nextServer = availableServers[(currentIndex + 1) % availableServers.length];

    setConnectionState('rotating');
    
    // Simulate server rotation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSelectedServer(nextServer);
    setProtectedIP(generateProtectedIP(nextServer.id));
    setConnectionState('connected');

    console.log(`Rotated to server: ${nextServer.name}`);
  }, [selectedServer, connectionState]);

  // Auto-rotation effect
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    
    if (autoRotate && connectionState === 'connected') {
      rotationTimer = setInterval(rotateServer, rotationInterval);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate, connectionState, rotationInterval, rotateServer]);

  const generateProtectedIP = (serverId: string): string => {
    const serverIPs: { [key: string]: string } = {
      'us-ny-1': '74.125.224.72',
      'us-ca-1': '104.16.123.45',
      'uk-lon-1': '51.158.99.12',
      'de-ber-1': '85.159.233.44',
      'jp-tok-1': '103.4.96.167',
      'sg-sin-1': '139.180.132.101',
      'au-syd-1': '103.252.114.66'
    };
    return serverIPs[serverId] || '85.159.233.44';
  };

  const handleConnect = async () => {
    if (connectionState === 'disconnected') {
      setConnectionState('connecting');
      setBytesTransferred({ up: 0, down: 0 });

      try {
        if (isNative) {
          // Create and connect to VPN profile for native platforms
          const profile = await createVPNProfile(selectedServer);
          const success = await connectToVPN(profile);

          if (success) {
            setConnectionState('connected');
            setProtectedIP(generateProtectedIP(selectedServer.id));
            setConnectionTime(Date.now());
          } else {
            setConnectionState('disconnected');
            throw new Error('Failed to establish native VPN connection');
          }
        } else {
          // Simulate connection for web platforms
          await new Promise(resolve => setTimeout(resolve, 2000));
          setConnectionState('connected');
          setProtectedIP(generateProtectedIP(selectedServer.id));
          setConnectionTime(Date.now());
        }
      } catch (error) {
        console.error('Connection failed:', error);
        setConnectionState('disconnected');
        // Reset UI state on error
        setProtectedIP('');
        setConnectionTime(0);
        setBytesTransferred({ up: 0, down: 0 });
      }
    } else if (connectionState === 'connected' || connectionState === 'rotating') {
      try {
        if (isNative) {
          const success = await disconnectVPN();
          if (!success) {
            throw new Error('Failed to disconnect from VPN');
          }
        }
        
        setConnectionState('disconnected');
        setProtectedIP('');
        setConnectionTime(0);
        setBytesTransferred({ up: 0, down: 0 });
      } catch (error) {
        console.error('Disconnection failed:', error);
        // Force disconnect UI state even if native disconnect fails
        setConnectionState('disconnected');
        setProtectedIP('');
        setConnectionTime(0);
        setBytesTransferred({ up: 0, down: 0 });
      }
    }
  };

  // Data transfer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (connectionState === 'connected' && connectionTime > 0) {
      interval = setInterval(() => {
        setBytesTransferred(prev => ({
          up: prev.up + Math.random() * 1000 + 500,
          down: prev.down + Math.random() * 5000 + 1000
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [connectionState, connectionTime]);

  return {
    connectionState,
    setConnectionState,
    selectedServer,
    setSelectedServer,
    currentIP,
    protectedIP,
    bytesTransferred,
    connectionTime,
    encryptionLevel,
    setEncryptionLevel,
    autoRotate,
    setAutoRotate,
    rotationInterval,
    setRotationInterval,
    handleConnect,
    rotateServer,
    isNative
  };
};
