
'use client';

import { AppHeader } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { equipment } from '@/lib/data';
import { AlertCircle, Headphones } from 'lucide-react';

export default function OutstandingPage() {
  const outstandingEquipment = equipment.filter(
    (item) => item.status === 'checked-out'
  );

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
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {outstandingEquipment.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center text-card-foreground shadow-sm"
                  >
                    <Headphones className="size-12 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-semibold">{item.type}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {item.serialNumber}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted text-center">
                <AlertCircle className="size-10 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                  No Outstanding Items
                </p>
                <p className="text-sm text-muted-foreground/80">
                  All equipment has been returned.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
