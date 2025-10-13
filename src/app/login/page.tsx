'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
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

export default function LoginPage() {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState<'user' | 'admin'>('user');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to the events page on login
    router.push('/events');
  };

  const toggleLoginMode = () => {
    setLoginMode(loginMode === 'user' ? 'admin' : 'user');
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
             <div className="mx-auto mb-4 flex items-center justify-center gap-2">
                <Icons.logo className="size-10 text-primary" />
                <h1 className="font-headline text-2xl font-semibold text-primary">
                    EventGear
                </h1>
            </div>
            <CardTitle className="font-headline text-2xl">
              {loginMode === 'user' ? 'Sign In' : 'Admin Sign In'}
            </CardTitle>
            <CardDescription>
                {loginMode === 'user'
                ? 'Enter your credentials to access your account.'
                : 'Enter your admin credentials.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">
                {loginMode === 'user' ? 'Username' : 'Admin Username'}
              </Label>
              <Input id="username" placeholder={loginMode === 'user' ? 'username' : 'admin_user'} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                 {loginMode === 'user' ? 'Password' : 'Admin Password'}
              </Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <Button variant="link" type="button" onClick={toggleLoginMode} className="w-full">
              {loginMode === 'user' ? 'Switch to Admin Login' : 'Switch to User Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
