
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="flex items-center justify-center gap-4">
        <Icons.logo className="size-12 animate-pulse text-primary" />
        <h1 className="font-headline text-3xl font-semibold text-primary">
          EventGear
        </h1>
      </div>
    </main>
  );
}
