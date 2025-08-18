
import { useState } from "react";
import VPNHeader from "@/components/VPNHeader";
import MobileConnectionStatus from "@/components/MobileConnectionStatus";
import ServerSelector from "@/components/ServerSelector";
import ConnectionStats from "@/components/ConnectionStats";
import VPNSettings from "@/components/VPNSettings";
import { Button } from "@/components/ui/button";
import { Shield, Settings, Activity, RotateCcw } from "lucide-react";
import { useVPNManager } from "@/hooks/useVPNManager";

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    connectionState,
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
  } = useVPNManager();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <VPNHeader connectionState={connectionState} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Main Connection Panel */}
          <div className="lg:col-span-2 space-y-4">
            <MobileConnectionStatus 
              connectionState={connectionState}
              onConnect={handleConnect}
              currentIP={currentIP}
              protectedIP={protectedIP}
              selectedServer={selectedServer}
              encryptionLevel={encryptionLevel}
              isNative={isNative}
            />
            
            <ConnectionStats 
              connectionState={connectionState}
              bytesTransferred={bytesTransferred}
              connectionTime={connectionTime}
            />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
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
                  className="w-full justify-start"
                  onClick={rotateServer}
                  disabled={connectionState !== 'connected'}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Rotate Server
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start tor-indicator"
                  disabled={connectionState !== 'connected'}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Tor Network {connectionState === 'connected' ? '(Active)' : '(Inactive)'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {showSettings && (
          <div className="mt-6">
            <VPNSettings 
              autoRotate={autoRotate}
              setAutoRotate={setAutoRotate}
              rotationInterval={rotationInterval}
              setRotationInterval={setRotationInterval}
              encryptionLevel={encryptionLevel}
              setEncryptionLevel={setEncryptionLevel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
