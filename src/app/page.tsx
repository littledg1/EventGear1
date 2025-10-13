'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';

export default function IntroPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAppName, setShowAppName] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setShowAppName(true);
    }, 1500); // Welcome shows for 1.5s

    const appNameTimer = setTimeout(() => {
      router.push('/login');
    }, 3500); // App name shows for 2s then navigates

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(appNameTimer);
    };
  }, [router]);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="relative h-20 w-80 text-center">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            showWelcome ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="font-headline text-5xl font-bold text-primary">Welcome</h1>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-1000 ${
            showAppName ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Icons.logo className="size-12 text-primary" />
          <h1 className="font-headline text-3xl font-semibold text-primary">
            EventGear
          </h1>
        </div>
      </div>
    </main>
  );
}
