
import { useState } from "react";
import { ChevronDown, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
  premium?: boolean;
}

interface ServerSelectorProps {
  selectedServer: Server;
  onServerSelect: (server: Server) => void;
}

const servers: Server[] = [
  { id: 'us-ny-1', name: 'New York', country: 'United States', flag: '🇺🇸', ping: 45, load: 23 },
  { id: 'us-ca-1', name: 'Los Angeles', country: 'United States', flag: '🇺🇸', ping: 38, load: 67 },
  { id: 'uk-lon-1', name: 'London', country: 'United Kingdom', flag: '🇬🇧', ping: 89, load: 45 },
  { id: 'de-ber-1', name: 'Berlin', country: 'Germany', flag: '🇩🇪', ping: 76, load: 32 },
  { id: 'jp-tok-1', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', ping: 145, load: 28, premium: true },
  { id: 'sg-sin-1', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', ping: 156, load: 55, premium: true },
  { id: 'au-syd-1', name: 'Sydney', country: 'Australia', flag: '🇦🇺', ping: 178, load: 41 },
];

const ServerSelector = ({ selectedServer, onServerSelect }: ServerSelectorProps) => {
  const [expanded, setExpanded] = useState(false);

  const getLoadColor = (load: number) => {
    if (load < 30) return 'text-vpn-connected';
    if (load < 70) return 'text-vpn-connecting';
    return 'text-vpn-disconnected';
  };

  const getPingColor = (ping: number) => {
    if (ping < 50) return 'text-vpn-connected';
    if (ping < 100) return 'text-vpn-connecting';
    return 'text-vpn-disconnected';
  };

  return (
    <div className="vpn-status-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Server Locations</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Selected Server */}
      <div className="vpn-server-card selected mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedServer.flag}</span>
            <div>
              <div className="font-medium">{selectedServer.name}</div>
              <div className="text-sm text-muted-foreground">{selectedServer.country}</div>
            </div>
          </div>
          
          <div className="text-right text-sm">
            <div className={`flex items-center space-x-1 ${getPingColor(selectedServer.ping)}`}>
              <Zap className="w-3 h-3" />
              <span>{selectedServer.ping}ms</span>
            </div>
            <div className={`flex items-center space-x-1 ${getLoadColor(selectedServer.load)}`}>
              <Users className="w-3 h-3" />
              <span>{selectedServer.load}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Server List */}
      {expanded && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {servers.map((server) => (
            <div
              key={server.id}
              className={`vpn-server-card ${server.id === selectedServer.id ? 'selected' : ''}`}
              onClick={() => onServerSelect(server)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{server.flag}</span>
                  <div>
                    <div className="font-medium flex items-center space-x-2">
                      <span>{server.name}</span>
                      {server.premium && (
                        <span className="px-2 py-1 text-xs bg-vpn-cyber-blue/20 text-vpn-cyber-blue rounded-full">
                          Pro
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{server.country}</div>
                  </div>
                </div>
                
                <div className="text-right text-sm">
                  <div className={`flex items-center space-x-1 ${getPingColor(server.ping)}`}>
                    <Zap className="w-3 h-3" />
                    <span>{server.ping}ms</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getLoadColor(server.load)}`}>
                    <Users className="w-3 h-3" />
                    <span>{server.load}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServerSelector;
