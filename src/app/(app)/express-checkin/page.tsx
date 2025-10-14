
'use client';

import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Nfc, ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';

export default function ExpressCheckOutPage() {
  
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Check Out" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
        <Card className="mx-auto max-w-lg text-center">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ArrowRightCircle className="size-8" />
            </div>
            <CardTitle className="font-headline text-3xl">Express Check-out</CardTitle>
            <CardDescription>
              The equipment check-out process is now active. The NFC listener is on for quick assignment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="flex animate-pulse items-center justify-center gap-2 text-muted-foreground">
              <Nfc className="size-5" />
              <span>Tap equipment to check it out...</span>
            </div>
            <p className="text-sm text-muted-foreground">
              After tapping the equipment, you will be prompted to select an attendee to assign it to.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
