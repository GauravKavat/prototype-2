'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RTO } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface RTOTableProps {
  rtos: RTO[];
}

export function RTOTable({ rtos }: RTOTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredRTOs = rtos.filter((rto) => {
    const matchesSearch =
      rto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rto.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rto.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || rto.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statuses = ['All', ...new Set(rtos.map((r) => r.status))];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search RTOs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f7f7f2]">
              <TableHead>RTO ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRTOs.length > 0 ? (
              filteredRTOs.map((rto) => (
                <TableRow key={rto.id} className="hover:bg-[#f8f8f4]">
                  <TableCell className="font-medium">{rto.id}</TableCell>
                  <TableCell>{rto.customer}</TableCell>
                  <TableCell className="text-sm">{rto.reason}</TableCell>
                  <TableCell className="text-sm">
                    {rto.returnDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={rto.status} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No RTOs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredRTOs.length} of {rtos.length} RTOs
      </div>
    </div>
  );
}
