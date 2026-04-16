'use client';

import { X, Phone, MapPin, Calendar, Package, Truck, User } from 'lucide-react';
import { PickupRequest } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { toast } from '@/hooks/use-toast';

interface PickupDetailModalProps {
  pickup: PickupRequest;
  isOpen: boolean;
  onClose: () => void;
}

export function PickupDetailModal({ pickup, isOpen, onClose }: PickupDetailModalProps) {
  if (!isOpen) return null;

  const formatDate = (date: Date | undefined) => {
    if (!date) return '—';
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusTimeline = () => {
    const statuses = ['Pending', 'Scheduled', 'In Transit', 'Completed'];
    const statusIndex = statuses.indexOf(pickup.status);
    
    return statuses.map((status, idx) => (
      <div key={status} className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
            idx <= statusIndex
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}>
            {idx + 1}
          </div>
          {idx < statuses.length - 1 && (
            <div className={`w-0.5 h-12 mt-1 ${idx < statusIndex ? 'bg-primary' : 'bg-border'}`} />
          )}
        </div>
        <div className="pt-2">
          <p className={`font-medium ${idx <= statusIndex ? 'text-foreground' : 'text-muted-foreground'}`}>
            {status}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">
          <div>
            <h2 className="text-xl font-semibold">{pickup.id}</h2>
            <p className="text-sm text-muted-foreground">Order {pickup.orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Status Badge */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <StatusBadge status={pickup.status} />
          </div>

          {/* Customer Information */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium">{pickup.customer}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{pickup.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Addresses</h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground mb-1">Delivery Address</p>
                  <p className="font-medium">{pickup.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground mb-1">Billing Address</p>
                  <p className="font-medium">{pickup.billingAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Shipment Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Weight</p>
                <p className="font-medium">{pickup.weight} kg</p>
              </div>
              <div>
                <p className="text-muted-foreground">Number of Boxes</p>
                <p className="font-medium">{pickup.numberOfBoxes}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Dimensions</p>
                <p className="font-medium">
                  {pickup.dimensions.length} × {pickup.dimensions.width} × {pickup.dimensions.height} cm
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Preferred Vendor</p>
                <p className="font-medium">{pickup.preferredVendor}</p>
              </div>
            </div>
          </div>

          {/* Vehicle & Driver Information */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Vehicle & Driver</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Truck className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Vehicle Type</p>
                  <p className="font-medium">{pickup.vehicleType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Vehicle Number</p>
                  <p className="font-medium">{pickup.vehicleNumber || 'Not assigned'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Driver Name</p>
                  <p className="font-medium">{pickup.driverName || 'Not assigned'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Driver Phone</p>
                  <p className="font-medium">{pickup.driverPhone || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Pickup Timeline</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Requested Time:</span>
                <span className="font-medium">{formatDate(pickup.requestedPickupTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Scheduled Time:</span>
                <span className="font-medium">{formatDate(pickup.scheduledPickupTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Time:</span>
                <span className="font-medium">{formatDate(pickup.estimatedPickupTime)}</span>
              </div>
              {pickup.actualPickupTime && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Actual Pickup Time:</span>
                  <span className="font-medium">{formatDate(pickup.actualPickupTime)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Timeline */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Status Timeline</h3>
            <div className="space-y-4">
              {getStatusTimeline()}
            </div>
          </div>

          {/* Notes */}
          {pickup.notes && (
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">{pickup.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-border pt-6 flex gap-3">
            {pickup.status === 'Pending' && (
              <>
                <button
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                  onClick={() => {
                    toast({ title: 'Pickup scheduled', description: `${pickup.id} moved to scheduled queue.` });
                    onClose();
                  }}
                >
                  Schedule Pickup
                </button>
                <button
                  className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                  onClick={() => {
                    toast({ title: 'Pickup cancelled', description: `${pickup.id} has been cancelled.` });
                    onClose();
                  }}
                >
                  Cancel
                </button>
              </>
            )}
            {pickup.status === 'Scheduled' && (
              <>
                <button
                  className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                  onClick={() => toast({ title: 'Reschedule requested', description: `${pickup.id} moved to reschedule queue.` })}
                >
                  Reschedule
                </button>
                <button
                  className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                  onClick={() => {
                    toast({ title: 'Pickup cancelled', description: `${pickup.id} has been cancelled.` });
                    onClose();
                  }}
                >
                  Cancel
                </button>
              </>
            )}
            {(pickup.status === 'Completed' || pickup.status === 'Cancelled') && (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
