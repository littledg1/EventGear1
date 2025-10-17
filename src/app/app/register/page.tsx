
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, UserPlus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const signatureImage = PlaceHolderImages.find(p => p.id === 'signature');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  const handleNewRegistration = () => {
    setIsRegistered(false);
  };

  if (isRegistered) {
    return (
      <div className="flex h-full flex-col">
        <AppHeader title="Registration Complete" />
        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check className="size-8" />
              </div>
              <CardTitle className="font-headline mt-4">Registration Successful</CardTitle>
              <CardDescription>
                John Doe has been successfully registered and their equipment has been assigned.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleNewRegistration} className="w-full">
                <UserPlus className="mr-2" />
                Start New Registration
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Register Attendee" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card className="mx-auto max-w-2xl">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle className="font-headline">New Attendee Registration</CardTitle>
              <CardDescription>
                Fill in the details to register an attendee and assign equipment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.d@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="123-456-7890" />
              </div>
              <div className="space-y-2">
                <Label>Signature</Label>
                <div className="rounded-md border bg-muted p-4">
                  {signatureImage && (
                    <Image
                      src={signatureImage.imageUrl}
                      alt="Signature"
                      width={400}
                      height={150}
                      className="mx-auto"
                      data-ai-hint={signatureImage.imageHint}
                    />
                  )}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Please sign on the device.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Complete Registration
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
