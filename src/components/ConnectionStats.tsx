
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Clock, Shield } from "lucide-react";
import { ConnectionState } from "@/pages/Index";

interface ConnectionStatsProps {
  connectionState: ConnectionState;
  bytesTransferred: { up: number; down: number };
  connectionTime: number;
}

const ConnectionStats = ({ connectionState, bytesTransferred, connectionTime }: ConnectionStatsProps) => {
  const [displayTime, setDisplayTime] = useState('00:00:00');

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatSpeed = (bytes: number) => {
    return formatBytes(bytes) + '/s';
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (connectionState === 'connected' && connectionTime > 0) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - connectionTime) / 1000);
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;
        
        setDisplayTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setDisplayTime('00:00:00');
    }
    
    return () => clearInterval(interval);
  }, [connectionState, connectionTime]);

  return (
    <div className="vpn-status-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Connection Statistics</h3>
        <Shield className={`w-5 h-5 ${connectionState === 'connected' ? 'text-vpn-secure' : 'text-muted-foreground'}`} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-vpn-dark-surface rounded-lg">
          <Clock className="w-6 h-6 text-vpn-cyber-blue mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Session Time</div>
          <div className="stats-display">{displayTime}</div>
        </div>

        <div className="text-center p-4 bg-vpn-dark-surface rounded-lg">
          <ArrowUp className="w-6 h-6 text-vpn-secure mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Upload</div>
          <div className="stats-display">{formatBytes(bytesTransferred.up)}</div>
        </div>

        <div className="text-center p-4 bg-vpn-dark-surface rounded-lg">
          <ArrowDown className="w-6 h-6 text-vpn-cyber-blue mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Download</div>
          <div className="stats-display">{formatBytes(bytesTransferred.down)}</div>
        </div>

        <div className="text-center p-4 bg-vpn-dark-surface rounded-lg">
          <div className="w-6 h-6 text-2xl mx-auto mb-2">⚡</div>
          <div className="text-sm text-muted-foreground">Speed</div>
          <div className="stats-display">
            {connectionState === 'connected' ? formatSpeed(Math.random() * 10000) : '0 B/s'}
          </div>
        </div>
      </div>

      {connectionState === 'connected' && (
        <div className="mt-6 p-4 bg-vpn-secure/10 border border-vpn-secure/20 rounded-lg">
          <div className="flex items-center space-x-2 text-vpn-secure">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Your connection is protected with AES-256 encryption</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStats;
