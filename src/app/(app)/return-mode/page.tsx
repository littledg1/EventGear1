import Link from 'next/link';
import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCheck, Nfc, Users } from 'lucide-react';

export default function ReturnModePage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Return Mode" />
      <main className="flex flex-1 items-center justify-center p-4 md:p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCheck className="size-8" />
            </div>
            <CardTitle className="font-headline mt-4 text-2xl">Return Mode Activated</CardTitle>
            <CardDescription>
              The equipment return process is now active. The NFC listener is on for quick returns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex animate-pulse items-center justify-center gap-2 text-muted-foreground">
              <Nfc className="size-5" />
              <span>Tap equipment to check it in...</span>
            </div>
             <Button asChild variant="outline" className="w-full">
               <Link href="/outstanding">
                <Users className="mr-2 size-4" />
                View Total Outstanding
               </Link>
             </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
