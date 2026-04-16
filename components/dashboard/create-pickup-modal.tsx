'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { PickupRequest, VendorName, VehicleType } from '@/lib/types';
import { mockOrders } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CreatePickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder?: () => void;
  onSubmit: (pickup: Omit<PickupRequest, 'id' | 'status' | 'createdAt' | 'actualPickupTime' | 'scheduledPickupTime' | 'vehicleNumber' | 'driverName' | 'driverPhone' | 'estimatedPickupTime'>) => void;
}

export function CreatePickupModal({ isOpen, onClose, onCreateOrder, onSubmit }: CreatePickupModalProps) {
  const [formData, setFormData] = useState({
    orderId: '',
    customer: '',
    phone: '',
    deliveryAddress: '',
    billingAddress: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    numberOfBoxes: '',
    preferredVendor: 'DHL' as VendorName,
    vehicleType: '4-wheeler' as VehicleType,
    requestedPickupTime: '',
    notes: '',
  });

  const selectedOrder = mockOrders.find(o => o.id === formData.orderId);

  const handleCreateNewOrder = () => {
    if (onCreateOrder) {
      onCreateOrder();
      return;
    }

    toast({
      title: 'Create Order',
      description: 'Order form is not available at the moment.',
    });
  };

  const handleOrderChange = (orderId: string) => {
    if (orderId === '__new_order__') {
      handleCreateNewOrder();
      return;
    }

    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      setFormData(prev => ({
        ...prev,
        orderId,
        customer: order.customer,
        phone: order.phone,
        deliveryAddress: order.address,
        billingAddress: order.address,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.orderId || !formData.requestedPickupTime || !formData.weight) {
      toast({
        title: 'Missing required fields',
        description: 'Order, pickup time and weight are required.',
        variant: 'destructive',
      });
      return;
    }

    onSubmit({
      orderId: formData.orderId,
      customer: formData.customer,
      phone: formData.phone,
      deliveryAddress: formData.deliveryAddress,
      billingAddress: formData.billingAddress,
      weight: parseFloat(formData.weight),
      dimensions: {
        length: parseFloat(formData.length) || 0,
        width: parseFloat(formData.width) || 0,
        height: parseFloat(formData.height) || 0,
      },
      numberOfBoxes: parseInt(formData.numberOfBoxes) || 1,
      preferredVendor: formData.preferredVendor,
      vehicleType: formData.vehicleType,
      requestedPickupTime: new Date(formData.requestedPickupTime),
      notes: formData.notes,
    });

    setFormData({
      orderId: '',
      customer: '',
      phone: '',
      deliveryAddress: '',
      billingAddress: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      numberOfBoxes: '',
      preferredVendor: 'DHL',
      vehicleType: '4-wheeler',
      requestedPickupTime: '',
      notes: '',
    });

    onClose();

    toast({
      title: 'Pickup created',
      description: `Pickup request for ${formData.customer} created successfully.`,
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Pickup Request</DialogTitle>
          <DialogDescription>
            Add a new pickup request to the system. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Order Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Order *</label>
              <select
                value={formData.orderId}
                onChange={(e) => handleOrderChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select an order</option>
                <option value="__new_order__">+ Create New Order</option>
                {mockOrders.map(order => (
                  <option key={order.id} value={order.id}>
                    {order.id} - {order.customer}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Info (auto-filled) */}
            <div>
              <label className="block text-sm font-medium mb-1">Customer Phone *</label>
              <input
                type="text"
                value={formData.phone}
                className="w-full px-3 py-2 border border-border rounded-md bg-muted text-foreground text-sm"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Delivery Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Delivery Address *</label>
              <textarea
                value={formData.deliveryAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
            </div>

            {/* Billing Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Billing Address *</label>
              <textarea
                value={formData.billingAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, billingAddress: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Weight */}
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg) *</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="2.5"
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Number of Boxes */}
            <div>
              <label className="block text-sm font-medium mb-1">Number of Boxes</label>
              <input
                type="number"
                value={formData.numberOfBoxes}
                onChange={(e) => setFormData(prev => ({ ...prev, numberOfBoxes: e.target.value }))}
                placeholder="1"
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium mb-1">Length (cm)</label>
              <input
                type="number"
                value={formData.length}
                onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                placeholder="30"
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Width (cm)</label>
              <input
                type="number"
                value={formData.width}
                onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
                placeholder="20"
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                placeholder="15"
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Preferred Vendor */}
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Vendor *</label>
              <select
                value={formData.preferredVendor}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredVendor: e.target.value as VendorName }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="DHL">DHL</option>
                <option value="DTDC">DTDC</option>
                <option value="FedEx">FedEx</option>
                <option value="Bluedart">Blue Dart</option>
                <option value="Local">Local</option>
              </select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type *</label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData(prev => ({ ...prev, vehicleType: e.target.value as VehicleType }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="2-wheeler">2-wheeler</option>
                <option value="4-wheeler">4-wheeler</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Pickup Time *</label>
            <input
              type="datetime-local"
              value={formData.requestedPickupTime}
              onChange={(e) => setFormData(prev => ({ ...prev, requestedPickupTime: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any special instructions or notes"
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Create Pickup
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
