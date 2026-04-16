'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Exception } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExceptionsTableProps {
  exceptions: Exception[];
}

export function ExceptionsTable({ exceptions }: ExceptionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  const filteredExceptions = exceptions.filter((exception) => {
    const matchesSearch =
      exception.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exception.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exception.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || exception.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statuses = ['All', ...new Set(exceptions.map((e) => e.status))];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search exceptions..."
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
              <TableHead>Exception ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Last Attempt</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExceptions.length > 0 ? (
              filteredExceptions.map((exception) => {
                const effectiveStatus = resolvedIds.has(exception.id) ? 'Resolved' : exception.status;

                return (
                <TableRow key={exception.id} className="hover:bg-[#f8f8f4]">
                  <TableCell className="font-medium">{exception.id}</TableCell>
                  <TableCell className="font-medium">{exception.orderId}</TableCell>
                  <TableCell className="text-sm">{exception.reason}</TableCell>
                  <TableCell className="text-sm">
                    {exception.lastAttempt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={effectiveStatus} />
                  </TableCell>
                  <TableCell>
                    {resolvedIds.has(exception.id) ? (
                      <Button size="sm" variant="outline" disabled>
                        Resolved
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setResolvedIds((prev) => new Set(prev).add(exception.id));
                          toast({ title: 'Exception resolved', description: `${exception.id} marked as resolved.` });
                        }}
                      >
                        Resolve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )})
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No exceptions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredExceptions.length} of {exceptions.length} exceptions
      </div>
    </div>
  );
}
