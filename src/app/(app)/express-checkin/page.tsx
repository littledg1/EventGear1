import Image from 'next/image';
import { AppHeader } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ExpressCheckinPage() {
  const qrCodeImage = PlaceHolderImages.find(p => p.id === 'qr-code-1');

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Check In" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card className="mx-auto max-w-lg text-center">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Attendee Check-in</CardTitle>
            <CardDescription>
              Display or print this QR code for your attendees. Scanning it allows them to pre-fill their information on their own device, generating a personal QR code for faster check-in at the registration desk.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
             {qrCodeImage && (
                <Image
                  src={qrCodeImage.imageUrl}
                  alt="Check-in QR Code"
                  width={300}
                  height={300}
                  className="rounded-lg border bg-white p-2"
                   data-ai-hint={qrCodeImage.imageHint}
                />
            )}
             <p className="text-sm text-muted-foreground">
              QR points to a secure web form.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
