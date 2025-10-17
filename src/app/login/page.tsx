
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
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loginMode, setLoginMode] = useState<'user' | 'admin'>('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMode === 'admin') {
      if (username.toLowerCase() === 'silentspeakeasycdmx' && password === 'SilentDisco2025!') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('username', 'Admin User');
        router.push('/events');
         toast({
          title: 'Admin Login Successful',
          description: 'Redirecting to the dashboard.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid Credentials',
          description: 'The admin username or password you entered is incorrect.',
        });
      }
    } else {
      // For now, any user login is successful for demonstration
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('username', username);
      router.push('/events');
    }
  };

  const toggleLoginMode = () => {
    setLoginMode(loginMode === 'user' ? 'admin' : 'user');
    setUsername('');
    setPassword('');
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
             <div className="mx-auto mb-4 flex items-center justify-center gap-2">
                <Icons.logo className="size-10 text-primary" />
                <h1 className="font-headline text-2xl font-semibold text-primary">
                    Silent Speakeasy
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
              <Input 
                id="username" 
                placeholder={loginMode === 'user' ? 'username' : 'admin_user'} 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                 {loginMode === 'user' ? 'Password' : 'Admin Password'}
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
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
