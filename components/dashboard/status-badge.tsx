import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const statusColors: Record<string, { bg: string; text: string; variant: any }> = {
    'Pending': { bg: 'bg-yellow-50', text: 'text-yellow-700', variant: 'outline' },
    'Confirmed': { bg: 'bg-blue-50', text: 'text-blue-700', variant: 'outline' },
    'Shipped': { bg: 'bg-blue-50', text: 'text-blue-700', variant: 'outline' },
    'In Transit': { bg: 'bg-blue-50', text: 'text-blue-700', variant: 'outline' },
    'Out for Delivery': { bg: 'bg-purple-50', text: 'text-purple-700', variant: 'outline' },
    'Delivered': { bg: 'bg-green-50', text: 'text-green-700', variant: 'outline' },
    'Failed': { bg: 'bg-red-50', text: 'text-red-700', variant: 'destructive' },
    'Returned': { bg: 'bg-orange-50', text: 'text-orange-700', variant: 'outline' },
    'RTO': { bg: 'bg-orange-50', text: 'text-orange-700', variant: 'outline' },
    'Initiated': { bg: 'bg-orange-50', text: 'text-orange-700', variant: 'outline' },
    'In Progress': { bg: 'bg-blue-50', text: 'text-blue-700', variant: 'outline' },
    'Received': { bg: 'bg-green-50', text: 'text-green-700', variant: 'outline' },
    'Refunded': { bg: 'bg-green-50', text: 'text-green-700', variant: 'outline' },
    'Open': { bg: 'bg-red-50', text: 'text-red-700', variant: 'destructive' },
    'Resolved': { bg: 'bg-green-50', text: 'text-green-700', variant: 'outline' },
    'Scheduled': { bg: 'bg-cyan-50', text: 'text-cyan-700', variant: 'outline' },
    'Completed': { bg: 'bg-green-50', text: 'text-green-700', variant: 'outline' },
    'Cancelled': { bg: 'bg-red-50', text: 'text-red-700', variant: 'destructive' },
  };

  const config = statusColors[status] || statusColors['Pending'];

  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', config.bg, config.text)}>
      {status}
    </span>
  );
}
