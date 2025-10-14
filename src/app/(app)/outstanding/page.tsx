
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { equipment, attendees } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

export default function OutstandingPage() {
  const outstandingEquipment = equipment.filter(
    (item) => item.status === 'checked-out'
  );

  const getAttendeeName = (attendeeId: string) => {
    const attendee = attendees.find((a) => a.id === attendeeId);
    return attendee ? attendee.name : 'Unknown';
  };

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Outstanding Equipment" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="font-headline">
              Checked-Out Items ({outstandingEquipment.length})
            </CardTitle>
            <CardDescription>
              This is a list of all equipment that is currently checked out to
              attendees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {outstandingEquipment.length > 0 ? (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Assigned To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outstandingEquipment.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Image
                            src={item.imageUrl}
                            alt={item.type}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {item.serialNumber}
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          {item.assignedTo ? (
                            getAttendeeName(item.assignedTo)
                          ) : (
                            <Badge variant="destructive">Unassigned</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
                <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted text-center">
                    <AlertCircle className="size-10 text-muted-foreground" />
                    <p className="mt-4 text-lg font-medium text-muted-foreground">No Outstanding Items</p>
                    <p className="text-sm text-muted-foreground/80">All equipment has been returned.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
