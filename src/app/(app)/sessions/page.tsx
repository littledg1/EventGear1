
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/lib/data';
import { events as mockEvents } from '@/lib/data';
import { format } from 'date-fns';

export default function SessionsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [sessionName, setSessionName] = React.useState('');
  const [activeSession, setActiveSession] = React.useState<Event | null>(null);

  React.useEffect(() => {
    const storedSession = localStorage.getItem('activeSession');
    if (storedSession) {
      const session = JSON.parse(storedSession);
      // Ensure date is a Date object
      setActiveSession({ ...session, date: new Date(session.date) });
    }
  }, []);

  const handleSaveAndActivate = () => {
    if (!sessionName || !date) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a session name and select a date.',
      });
      return;
    }

    const username = localStorage.getItem('username') || 'user';
    const storedEventsString = localStorage.getItem('events');
    const currentEvents = storedEventsString ? JSON.parse(storedEventsString).map((e: any) => ({...e, date: new Date(e.date)})) : mockEvents;

    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      name: sessionName,
      date: date,
      location: 'TBD', // Default location
      createdBy: username,
    };

    const updatedEvents = [...currentEvents, newEvent];
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    localStorage.setItem('activeSession', JSON.stringify(newEvent));
    setActiveSession(newEvent);

    toast({
      title: 'Session Activated',
      description: `${sessionName} has been saved and is now active.`,
    });

    router.push('/events');
  };

  const handleDeactivate = () => {
    const sessionNameToDeactivate = activeSession?.name;
    localStorage.removeItem('activeSession');
    setActiveSession(null);
    toast({
        title: 'Session Deactivated',
        description: `${sessionNameToDeactivate} is no longer active.`,
        variant: 'destructive'
    });
  };

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Set Session" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Tabs defaultValue="create" className="mx-auto max-w-2xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Session</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <Card>
              {activeSession ? (
                <>
                  <CardHeader>
                    <CardTitle className="font-headline">{activeSession.name}</CardTitle>
                    <CardDescription>
                      This is the currently active session. To sync another device, tap on the session from the list on the other device.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-4">
                    <div className="text-center">
                        <p className="font-medium">Event Date:</p>
                        <p className="text-sm text-muted-foreground">{format(activeSession.date, 'MMMM do, yyyy')}</p>
                    </div>
                    <Button variant="destructive" className="w-full" onClick={handleDeactivate}>Deactivate Session</Button>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="font-headline">No Active Session</CardTitle>
                    <CardDescription>
                      There is no session currently active. Please create and activate a new session.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-muted text-center">
                        <p className="text-muted-foreground">Go to the "Create New" tab to start a session.</p>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Create a New Session</CardTitle>
                <CardDescription>
                  Give your event a unique name, date, and time. Activating it will start a tracking period.
                </CardDescription>
              </Header>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-name">Session Name</Label>
                  <Input 
                    id="session-name" 
                    placeholder="e.g., Corporate Gala 2025" 
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event Date</Label>
                   <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" />
                  </div>
                </div>
                <Button className="w-full" onClick={handleSaveAndActivate}>Save & Activate</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
