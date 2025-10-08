'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, MessageSquare } from 'lucide-react';
import { equipment, attendees } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const outstandingEquipment = equipment.filter(e => e.status === 'checked-out');

export default function OutstandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };
  
  if (!isAuthenticated) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <Card className="w-full max-w-sm">
            <form onSubmit={handleAuth}>
                <CardHeader className="text-center">
                    <CardTitle className="font-headline">Password Required</CardTitle>
                    <CardDescription>This page contains sensitive information. Please enter the password to continue.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Admin Password</Label>
                        <Input 
                          id="password" 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Unlock</Button>
                </CardFooter>
            </form>
          </Card>
        </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Outstanding Equipment" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">All Outstanding Items</CardTitle>
            <CardDescription>
              A list of all equipment that is still checked out and pending return.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button><Mail className="mr-2" /> Email All</Button>
              <Button><MessageSquare className="mr-2" /> SMS All</Button>
            </div>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Equipment ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outstandingEquipment.length > 0 ? outstandingEquipment.map(item => {
                    const attendee = attendees.find(a => a.id === item.assignedTo);
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={attendee?.avatarUrl} />
                              <AvatarFallback>{attendee?.name.slice(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{attendee?.name}</div>
                              <div className="text-muted-foreground text-sm">{attendee?.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{item.serialNumber}</TableCell>
                        <TableCell>{item.type}</TableCell>
                         <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Send Reminder</Button>
                        </TableCell>
                      </TableRow>
                    );
                  }) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        All equipment has been returned.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
