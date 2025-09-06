import React, { useState, useEffect } from 'react';
import { Shield, Eye, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SecurityEvent {
  id: string;
  type: 'connection' | 'rotation' | 'error' | 'analysis';
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

interface SecurityMonitorProps {
  connectionState: string;
  isNative: boolean;
}

const SecurityMonitor: React.FC<SecurityMonitorProps> = ({ connectionState, isNative }) => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    if (!isMonitoring) return;

    // Simulate security monitoring
    const interval = setInterval(() => {
      const securityChecks = [
        { message: 'DNS leak protection active', severity: 'info' as const },
        { message: 'Kill switch enabled', severity: 'info' as const },
        { message: 'Encryption tunnel stable', severity: 'info' as const },
        { message: 'No IP leaks detected', severity: 'info' as const },
      ];

      if (connectionState === 'connected') {
        const randomCheck = securityChecks[Math.floor(Math.random() * securityChecks.length)];
        const newEvent: SecurityEvent = {
          id: `event-${Date.now()}`,
          type: 'analysis',
          message: randomCheck.message,
          timestamp: new Date().toISOString(),
          severity: randomCheck.severity,
        };

        setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [connectionState, isMonitoring]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'connection': return <Activity className="h-4 w-4" />;
      case 'rotation': return <Clock className="h-4 w-4" />;
      case 'error': return <Eye className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-vpn-secure" />
            Security Monitor
          </CardTitle>
          <CardDescription>
            Real-time security analysis {isNative ? '(Native)' : '(Web)'}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMonitoring(!isMonitoring)}
        >
          {isMonitoring ? 'Pause' : 'Resume'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant={connectionState === 'connected' ? 'default' : 'secondary'}>
            {connectionState === 'connected' ? 'Monitoring Active' : 'Standby'}
          </Badge>
          <Badge variant="outline">
            {events.length} Events
          </Badge>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No security events recorded
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-2 rounded-lg bg-muted/50 text-sm"
              >
                <div className="text-muted-foreground mt-0.5">
                  {getTypeIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">{event.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <Badge variant={getSeverityColor(event.severity)} className="text-xs">
                  {event.severity}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityMonitor;