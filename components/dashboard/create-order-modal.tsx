'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { toast } from '@/hooks/use-toast';

interface CreateOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrderModal({
  open,
  onOpenChange,
}: CreateOrderModalProps) {
  const [formData, setFormData] = useState({
    customer: '',
    phone: '',
    address: '',
    pincode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Order created',
      description: `New order prepared for ${formData.customer}.`,
    });
    setFormData({ customer: '', phone: '', address: '', pincode: '' });
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Add a new order to the system. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Customer Name</FieldLabel>
              <Input
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="e.g., Rajesh Kumar"
                required
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +91-9876543210"
                required
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Address</FieldLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., 123 MG Road, Bangalore"
                required
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Pincode</FieldLabel>
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g., 560001"
                required
              />
            </Field>
          </FieldGroup>

          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
