'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Courier } from '@/lib/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CouriersTableProps {
  couriers: Courier[];
}

export function CouriersTable({ couriers }: CouriersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCouriers = couriers.filter((courier) =>
    courier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search couriers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f7f7f2]">
              <TableHead>Courier Name</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Avg Delivery Time</TableHead>
              <TableHead>Cost Efficiency</TableHead>
              <TableHead>Active Shipments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCouriers.length > 0 ? (
              filteredCouriers.map((courier) => (
                <TableRow key={courier.id} className="hover:bg-[#f8f8f4]">
                  <TableCell className="font-medium">{courier.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${courier.successRate}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {courier.successRate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {courier.avgDeliveryTime} days
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${(courier.costEfficiency / 5.5) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {courier.costEfficiency}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {courier.activeShipments}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No couriers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCouriers.length} of {couriers.length} couriers
      </div>
    </div>
  );
}
