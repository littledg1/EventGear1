
'use client';

import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { QrCode, Camera } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function ExpressCheckOutPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isScanning) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
          setIsScanning(false);
        }
      };

      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [isScanning, toast]);

  const handleScanClick = () => {
    setIsScanning(prev => !prev);
  };

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Check Out" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card className="mx-auto max-w-lg text-center">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Attendee Check-out</CardTitle>
            <CardDescription>
              Scan an attendee's personal QR code to quickly check out their assigned equipment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center">
               {isScanning ? (
                 <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
               ) : (
                <Camera className="w-24 h-24 text-muted-foreground" />
               )}
            </div>
            
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser settings to use the scanner.
                  </AlertDescription>
                </Alert>
            )}

            <Button onClick={handleScanClick} className="w-full">
              <QrCode className="mr-2" />
              {isScanning ? 'Stop Scanning' : 'Start QR Code Scan'}
            </Button>
            <p className="text-sm text-muted-foreground">
              The camera will be activated to scan the QR code.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
