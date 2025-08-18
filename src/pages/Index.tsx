
import { useState, useEffect } from "react";
import VPNHeader from "@/components/VPNHeader";
import ConnectionStatus from "@/components/ConnectionStatus";
import ServerSelector from "@/components/ServerSelector";
import ConnectionStats from "@/components/ConnectionStats";
import VPNSettings from "@/components/VPNSettings";
import { Button } from "@/components/ui/button";
import { Shield, Settings, Activity } from "lucide-react";

export type ConnectionState = 'disconnected' | 'connecting' | 'connected';

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
  premium?: boolean;
}

const Index = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [selectedServer, setSelectedServer] = useState<Server>({
    id: 'us-ny-1',
    name: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    ping: 45,
    load: 23
  });
  const [showSettings, setShowSettings] = useState(false);
  const [currentIP, setCurrentIP] = useState('192.168.1.100');
  const [protectedIP, setProtectedIP] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState({ up: 0, down: 0 });
  const [connectionTime, setConnectionTime] = useState(0);

  const handleConnect = () => {
    if (connectionState === 'disconnected') {
      setConnectionState('connecting');
      
      // Simulate connection process
      setTimeout(() => {
        setConnectionState('connected');
        setProtectedIP('85.159.233.44');
        setConnectionTime(Date.now());
      }, 2000);
    } else if (connectionState === 'connected') {
      setConnectionState('disconnected');
      setProtectedIP('');
      setConnectionTime(0);
    }
  };

  // Update connection timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (connectionState === 'connected' && connectionTime > 0) {
      interval = setInterval(() => {
        setBytesTransferred(prev => ({
          up: prev.up + Math.random() * 1000,
          down: prev.down + Math.random() * 5000
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [connectionState, connectionTime]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <VPNHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main Connection Panel */}
          <div className="lg:col-span-2 space-y-6">
            <ConnectionStatus 
              connectionState={connectionState}
              onConnect={handleConnect}
              currentIP={currentIP}
              protectedIP={protectedIP}
              selectedServer={selectedServer}
            />
            
            <ConnectionStats 
              connectionState={connectionState}
              bytesTransferred={bytesTransferred}
              connectionTime={connectionTime}
            />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <ServerSelector 
              selectedServer={selectedServer}
              onServerSelect={setSelectedServer}
            />
            
            <div className="vpn-status-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Speed Test
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start tor-indicator"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Tor Network
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {showSettings && (
          <div className="mt-8">
            <VPNSettings />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
