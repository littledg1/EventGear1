
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Nfc, Headphones, X, Check, CheckCircle, PlusCircle } from 'lucide-react';
import { equipment, type Equipment } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function ExpressCheckOutPage() {
  const [scannedItems, setScannedItems] = useState<Equipment[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSimulateScan = () => {
    // Find the first available piece of equipment that hasn't been scanned yet.
    const nextAvailableItem = equipment.find(
      (item) => item.status === 'available' && !scannedItems.some((scanned) => scanned.id === item.id)
    );

    if (nextAvailableItem) {
      setScannedItems((prevItems) => [...prevItems, nextAvailableItem]);
    } else {
      // In a real app, you might show a toast notification.
      console.warn('No more available items to scan or all have been staged.');
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setScannedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  
  const handleClearAll = () => {
    setScannedItems([]);
  }

  const handleAcceptCheckout = () => {
    // Here you would typically update the status of the equipment in your database.
    console.log('Checking out items:', scannedItems.map(item => item.id));
    setIsFinished(true);
  };
  
  const handleStartNew = () => {
    setScannedItems([]);
    setIsFinished(false);
  }
  
  if (isFinished) {
    return (
       <div className="flex h-full flex-col">
        <AppHeader title="Check Out Complete" />
        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check className="size-8" />
              </div>
              <CardTitle className="font-headline mt-4">Checkout Successful</CardTitle>
              <CardDescription>
                {scannedItems.length} item(s) have been successfully checked out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleStartNew} className="w-full">
                <PlusCircle className="mr-2" />
                Start New Check Out
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Check Out" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">Ready to Scan</CardTitle>
                  <CardDescription>
                    Tap equipment to add it to the checkout list.
                  </CardDescription>
                </div>
                 <div className="flex animate-pulse items-center justify-center gap-2 text-muted-foreground">
                  <Nfc className="size-6 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button onClick={handleSimulateScan} className="w-full">
                Simulate Scan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle className="font-headline text-2xl">Staged Equipment</CardTitle>
                        <Badge variant="secondary">{scannedItems.length}</Badge>
                    </div>
                     {scannedItems.length > 0 && (
                        <Button variant="outline" size="sm" onClick={handleClearAll}>
                            <X className="mr-2 size-4"/> Clear
                        </Button>
                     )}
                </div>
              <CardDescription>
                These items will be checked out together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scannedItems.length > 0 ? (
                <div className="space-y-3">
                  {scannedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border bg-card p-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <Headphones className="size-8 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{item.type}</p>
                          <p className="font-mono text-xs text-muted-foreground">{item.serialNumber}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                        <X className="size-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted text-center">
                  <p className="text-muted-foreground">No items staged for checkout.</p>
                  <p className="text-sm text-muted-foreground/80">Scan an item to begin.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {scannedItems.length > 0 && (
             <Button size="lg" onClick={handleAcceptCheckout}>
                <CheckCircle className="mr-2"/>
                Accept Checkout
            </Button>
          )}

        </div>
      </main>
    </div>
  );
}
