'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Barcode, Nfc, Type, QrCode } from 'lucide-react';

import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Mock data
const mockEquipment = [
  { id: 'HP-00123', type: 'Headphones', image: PlaceHolderImages.find(p => p.id === 'equipment-1')?.imageUrl, hint: PlaceHolderImages.find(p => p.id === 'equipment-1')?.imageHint },
];

export default function RegistrationPage() {
  const [assignedEquipment, setAssignedEquipment] = useState<(typeof mockEquipment)>([]);

  const handleAssign = () => {
    setAssignedEquipment(prev => [...prev, ...mockEquipment]);
  };
  
  const signatureImage = PlaceHolderImages.find(p => p.id === 'signature');
  const avatarImage = PlaceHolderImages.find(p => p.id === 'avatar-1');

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Registration" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Attendee Information</CardTitle>
              <CardDescription>Enter the attendee's details or scan their Express Check-in QR code.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-20">
                  {avatarImage && <AvatarImage src={avatarImage.imageUrl} data-ai-hint={avatarImage.imageHint}/>}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid w-full gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                   <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                      <QrCode className="size-4" />
                      <span className="sr-only">Scan QR Code</span>
                   </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">Assigned Equipment</CardTitle>
              <CardDescription>Items assigned to this attendee.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {assignedEquipment.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
                  <p className="text-muted-foreground">No equipment assigned yet.</p>
                  <p className="text-sm text-muted-foreground/80">Use the actions below to assign an item.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignedEquipment.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      {item.image && <Image src={item.image} alt={item.type} width={64} height={64} className="rounded-md" data-ai-hint={item.hint}/>}
                      <div>
                        <p className="font-medium">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
             <CardFooter>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full" disabled={assignedEquipment.length === 0}>
                            Finalize Agreement
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="font-headline">Rental Agreement</DialogTitle>
                            <DialogDescription>
                                Please review and sign the agreement below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                I, John Doe, agree to return all equipment in the condition it was received. I understand I am liable for any damages or loss.
                            </p>
                            <div className="space-y-2">
                                <Label>Signature</Label>
                                <div className="rounded-lg border bg-muted p-4">
                                    {signatureImage && <Image src={signatureImage.imageUrl} alt="Signature" width={400} height={150} data-ai-hint={signatureImage.imageHint} className="mx-auto" />}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full">Confirm & Complete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="sticky bottom-0 border-t bg-background/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-around gap-2 rounded-full border bg-card p-2 shadow-lg">
          <Button variant="outline" size="lg" className="flex-1 flex-col h-auto" onClick={handleAssign}>
            <Nfc className="size-6" />
            <span className="text-xs">NFC Tap</span>
          </Button>
          <Button variant="outline" size="lg" className="flex-1 flex-col h-auto" onClick={handleAssign}>
            <Barcode className="size-6" />
            <span className="text-xs">Scan Code</span>
          </Button>
          <Button variant="outline" size="lg" className="flex-1 flex-col h-auto" onClick={handleAssign}>
            <Type className="size-6" />
            <span className="text-xs">Manual Entry</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
