'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Shipment } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ShipmentsTableProps {
  shipments: Shipment[];
}

export function ShipmentsTable({ shipments }: ShipmentsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [courierFilter, setCourierFilter] = useState<string>('All');

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.awb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.courier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourier =
      courierFilter === 'All' || shipment.courier === courierFilter;

    return matchesSearch && matchesCourier;
  });

  const couriers = [
    'All',
    ...new Set(shipments.map((s) => s.courier)),
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search shipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {couriers.map((courier) => (
            <button
              key={courier}
              onClick={() => setCourierFilter(courier)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                courierFilter === courier
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {courier}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f7f7f2]">
              <TableHead>AWB</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Courier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.length > 0 ? (
              filteredShipments.map((shipment) => (
                <TableRow key={shipment.awb} className="hover:bg-[#f8f8f4]">
                  <TableCell className="font-medium">{shipment.awb}</TableCell>
                  <TableCell>{shipment.customer}</TableCell>
                  <TableCell className="text-sm">{shipment.courier}</TableCell>
                  <TableCell>
                    <StatusBadge status={shipment.status} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {shipment.eta.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{shipment.cost}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No shipments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredShipments.length} of {shipments.length} shipments
      </div>
    </div>
  );
}
