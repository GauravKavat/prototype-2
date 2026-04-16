import { Alert } from '@/lib/types';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface AlertsPanelProps {
  alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getIcon = (severity: Alert['severity']) => {
    const iconProps = 'h-4 w-4';
    
    switch (severity) {
      case 'error':
        return <AlertTriangle className={`${iconProps} text-red-600`} />;
      case 'warning':
        return <AlertCircle className={`${iconProps} text-yellow-600`} />;
      case 'info':
      default:
        return <Info className={`${iconProps} text-blue-600`} />;
    }
  };

  const getSeverityBg = (severity: Alert['severity']) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-950/35 dark:border-red-800/70';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/35 dark:border-yellow-800/70';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950/35 dark:border-blue-800/70';
    }
  };

  const getSeverityText = (severity: Alert['severity']) => {
    switch (severity) {
      case 'error':
        return 'text-red-900 dark:text-red-100';
      case 'warning':
        return 'text-yellow-900 dark:text-yellow-100';
      case 'info':
      default:
        return 'text-blue-900 dark:text-blue-100';
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold">Alerts</h3>
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border p-3 ${getSeverityBg(alert.severity)}`}
          >
            <div className="flex gap-2">
              <div className="mt-1">{getIcon(alert.severity)}</div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${getSeverityText(alert.severity)}`}>
                  {alert.message}
                </p>
                {alert.actionRequired && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 bg-background/80 dark:bg-card/80"
                    onClick={() =>
                      toast({
                        title: 'Action queued',
                        description: `Investigation started for ${alert.id}.`,
                      })
                    }
                  >
                    Take Action
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
