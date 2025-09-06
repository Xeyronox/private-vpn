
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VPNHeader from "@/components/VPNHeader";
import ConnectionStatus from "@/components/ConnectionStatus";
import ServerSelector from "@/components/ServerSelector";
import ConnectionStats from "@/components/ConnectionStats";
import VPNSettings from "@/components/VPNSettings";
import VPNPermissions from "@/components/VPNPermissions";
import NativeConnectionButton from "@/components/NativeConnectionButton";
import MobileConnectionStatus from "@/components/MobileConnectionStatus";
import SecurityMonitor from "@/components/SecurityMonitor";
import { useVPNManager } from "@/hooks/useVPNManager";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const {
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
  } = useVPNManager();

  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("connect");
  const { toast } = useToast();

  // Enhanced app initialization with security checks
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Platform detection and configuration
        if (isNative) {
          console.log("🔒 Native VPN app initialized");
          toast({
            title: "VPN Ready",
            description: "Native VPN capabilities detected",
          });
        } else {
          console.log("🌐 Web VPN interface loaded");
        }
        
        // Security analysis on app start
        const securityCheck = {
          platform: isNative ? "native" : "web",
          timestamp: new Date().toISOString(),
          connectionState: connectionState,
        };
        console.log("🛡️ Security Analysis:", securityCheck);
        
      } catch (error) {
        console.error("❌ App initialization error:", error);
        toast({
          title: "Initialization Warning",
          description: "Some features may be limited",
          variant: "destructive",
        });
      }
    };

    initializeApp();
  }, [isNative, connectionState, toast]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <VPNHeader connectionState={connectionState} />
        
        {isMobile ? (
          <div className="mt-6 space-y-6">
            <MobileConnectionStatus
              connectionState={connectionState}
              onConnect={handleConnect}
              selectedServer={selectedServer}
              currentIP={currentIP}
              protectedIP={protectedIP}
              encryptionLevel={encryptionLevel}
              isNative={isNative}
            />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="connect">Connect</TabsTrigger>
                <TabsTrigger value="servers">Servers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="connect" className="space-y-4">
                {isNative && <VPNPermissions />}
                <NativeConnectionButton selectedServer={selectedServer.name} />
              </TabsContent>
              
              <TabsContent value="servers" className="space-y-4">
                <ServerSelector
                  selectedServer={selectedServer}
                  onServerSelect={setSelectedServer}
                />
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <VPNSettings
                  encryptionLevel={encryptionLevel}
                  setEncryptionLevel={setEncryptionLevel}
                  autoRotate={autoRotate}
                  setAutoRotate={setAutoRotate}
                  rotationInterval={rotationInterval}
                  setRotationInterval={setRotationInterval}
                />
                <SecurityMonitor 
                  connectionState={connectionState} 
                  isNative={isNative} 
                />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ConnectionStatus
                connectionState={connectionState}
                selectedServer={selectedServer}
                currentIP={currentIP}
                protectedIP={protectedIP}
                onConnect={handleConnect}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServerSelector
                  selectedServer={selectedServer}
                  onServerSelect={setSelectedServer}
                />
                <ConnectionStats
                  connectionState={connectionState}
                  bytesTransferred={bytesTransferred}
                  connectionTime={connectionTime}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {isNative && <VPNPermissions />}
              <VPNSettings
                encryptionLevel={encryptionLevel}
                setEncryptionLevel={setEncryptionLevel}
                autoRotate={autoRotate}
                setAutoRotate={setAutoRotate}
                rotationInterval={rotationInterval}
                setRotationInterval={setRotationInterval}
              />
              <SecurityMonitor 
                connectionState={connectionState} 
                isNative={isNative} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
