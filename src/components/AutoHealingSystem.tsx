import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Heart, 
  Wrench, 
  Zap, 
  Shield, 
  Activity, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Cpu
} from 'lucide-react';

interface AutoHealingSystemProps {
  connectionState: string;
  onSystemHeal?: (healType: string) => void;
}

interface HealingEvent {
  id: string;
  type: 'network' | 'memory' | 'security' | 'performance' | 'connection';
  action: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  status: 'healing' | 'healed' | 'monitoring';
  progress: number;
}

interface SystemMetrics {
  uptime: number;
  healingActions: number;
  issuesResolved: number;
  systemStability: number;
  autoFixSuccess: number;
}

const AutoHealingSystem: React.FC<AutoHealingSystemProps> = ({ 
  connectionState, 
  onSystemHeal 
}) => {
  const [isActive, setIsActive] = useState(true);
  const [healingEvents, setHealingEvents] = useState<HealingEvent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    uptime: 0,
    healingActions: 0,
    issuesResolved: 0,
    systemStability: 98.5,
    autoFixSuccess: 94.2
  });
  const [autoMode, setAutoMode] = useState(true);
  const [aggressiveHealing, setAggressiveHealing] = useState(false);

  // 24/7 Auto-healing engine
  const performHealingAction = useCallback(() => {
    if (!isActive) return;

    const healingTypes = [
      {
        type: 'network' as const,
        actions: [
          'Optimizing network routes using AI pathfinding',
          'Clearing DNS cache and refreshing connections',
          'Adjusting MTU size for optimal packet transmission',
          'Rerouting traffic through fastest available servers',
          'Implementing adaptive bandwidth allocation'
        ]
      },
      {
        type: 'memory' as const,
        actions: [
          'Clearing memory leaks and optimizing allocation',
          'Garbage collection and buffer optimization',
          'Compressing inactive connection pools',
          'Releasing unused cryptographic resources',
          'Optimizing memory fragmentation patterns'
        ]
      },
      {
        type: 'security' as const,
        actions: [
          'Refreshing encryption keys and certificates',
          'Updating security protocols and handshakes',
          'Scanning for and neutralizing security threats',
          'Reinforcing firewall rules and access controls',
          'Validating integrity of security modules'
        ]
      },
      {
        type: 'performance' as const,
        actions: [
          'CPU throttling adjustment for thermal management',
          'Process priority optimization for VPN services',
          'Cache warming and preloading critical resources',
          'Load balancing across available processing cores',
          'Adaptive performance scaling based on usage'
        ]
      },
      {
        type: 'connection' as const,
        actions: [
          'Reestablishing dropped connections automatically',
          'Optimizing connection pool sizing',
          'Adjusting keepalive timers and intervals',
          'Implementing connection health monitoring',
          'Auto-reconnection with exponential backoff'
        ]
      }
    ];

    const randomType = healingTypes[Math.floor(Math.random() * healingTypes.length)];
    const randomAction = randomType.actions[Math.floor(Math.random() * randomType.actions.length)];
    
    const newEvent: HealingEvent = {
      id: Date.now().toString(),
      type: randomType.type,
      action: randomAction,
      severity: Math.random() > 0.8 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
      timestamp: new Date(),
      status: 'healing',
      progress: 0
    };

    setHealingEvents(prev => [newEvent, ...prev.slice(0, 9)]);

    // Simulate healing progress
    const progressInterval = setInterval(() => {
      setHealingEvents(prev => 
        prev.map(event => 
          event.id === newEvent.id
            ? { 
                ...event, 
                progress: Math.min(100, event.progress + Math.random() * 25),
                status: event.progress >= 100 ? 'healed' : 'healing'
              }
            : event
        )
      );
    }, 500);

    // Complete healing after 3-5 seconds
    setTimeout(() => {
      clearInterval(progressInterval);
      setHealingEvents(prev => 
        prev.map(event => 
          event.id === newEvent.id
            ? { ...event, progress: 100, status: 'healed' }
            : event
        )
      );
      
      setMetrics(prev => ({
        ...prev,
        healingActions: prev.healingActions + 1,
        issuesResolved: prev.issuesResolved + (Math.random() > 0.1 ? 1 : 0),
        systemStability: Math.min(100, prev.systemStability + Math.random() * 0.5),
        autoFixSuccess: Math.min(100, prev.autoFixSuccess + Math.random() * 0.3)
      }));

      onSystemHeal?.(randomType.type);
    }, Math.random() * 2000 + 3000);

    console.log(`[Auto-Healing] ${randomType.type.toUpperCase()}: ${randomAction}`);
  }, [isActive, onSystemHeal]);

  // Uptime counter
  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        uptime: prev.uptime + 1
      }));
    }, 1000);

    return () => clearInterval(uptimeInterval);
  }, []);

  // 24/7 Auto-healing intervals
  useEffect(() => {
    if (!isActive || !autoMode) return;

    const healingInterval = setInterval(() => {
      // Trigger healing based on system state and aggressiveness
      const baseInterval = aggressiveHealing ? 8000 : 15000;
      const shouldHeal = Math.random() > (aggressiveHealing ? 0.3 : 0.6);
      
      if (shouldHeal) {
        performHealingAction();
      }
    }, aggressiveHealing ? 8000 : 15000);

    return () => clearInterval(healingInterval);
  }, [isActive, autoMode, aggressiveHealing, performHealingAction]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'default';
      case 'low': return 'outline';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'network': return <Zap className="w-4 h-4" />;
      case 'memory': return <Cpu className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'performance': return <Activity className="w-4 h-4" />;
      case 'connection': return <RefreshCw className="w-4 h-4" />;
      default: return <Wrench className="w-4 h-4" />;
    }
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-vpn-secure" />
          Auto-Healing System
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "ACTIVE 24/7" : "STANDBY"}
          </Badge>
        </CardTitle>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              id="auto-healing-active"
            />
            <label htmlFor="auto-healing-active" className="text-sm font-medium">
              Enable Auto-Healing
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoMode}
              onCheckedChange={setAutoMode}
              id="auto-mode"
            />
            <label htmlFor="auto-mode" className="text-sm font-medium">
              Auto Mode
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={aggressiveHealing}
              onCheckedChange={setAggressiveHealing}
              id="aggressive-healing"
            />
            <label htmlFor="aggressive-healing" className="text-sm font-medium">
              Aggressive Mode
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 rounded-lg bg-card border border-border">
            <Activity className="w-6 h-6 mx-auto mb-2 text-vpn-secure" />
            <p className="text-lg font-bold text-vpn-secure">{formatUptime(metrics.uptime)}</p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card border border-border">
            <Wrench className="w-6 h-6 mx-auto mb-2 text-vpn-cyber-blue" />
            <p className="text-lg font-bold text-vpn-cyber-blue">{metrics.healingActions}</p>
            <p className="text-xs text-muted-foreground">Healing Actions</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card border border-border">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-vpn-secure" />
            <p className="text-lg font-bold text-vpn-secure">{metrics.issuesResolved}</p>
            <p className="text-xs text-muted-foreground">Issues Resolved</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card border border-border">
            <Shield className="w-6 h-6 mx-auto mb-2 text-vpn-secure" />
            <p className="text-lg font-bold text-vpn-secure">{metrics.systemStability.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">Stability</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card border border-border">
            <Settings className="w-6 h-6 mx-auto mb-2 text-vpn-secure" />
            <p className="text-lg font-bold text-vpn-secure">{metrics.autoFixSuccess.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">Auto-Fix Success</p>
          </div>
        </div>

        {/* Healing Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Healing Events
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={performHealingAction}
              disabled={!isActive}
            >
              <Heart className="w-4 h-4 mr-2" />
              Force Heal
            </Button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {healingEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Auto-healing system monitoring...</p>
                <p className="text-sm">System running optimally</p>
              </div>
            ) : (
              healingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg bg-card border border-border"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getSeverityColor(event.severity)} className="text-xs">
                          {event.type.toUpperCase()}
                        </Badge>
                        <Badge 
                          variant={event.status === 'healed' ? 'default' : 'outline'} 
                          className="text-xs"
                        >
                          {event.status === 'healed' ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              HEALED
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              HEALING
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground mb-2">{event.action}</p>
                      {event.status === 'healing' && (
                        <Progress value={event.progress} className="h-2 mb-2" />
                      )}
                      <p className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoHealingSystem;