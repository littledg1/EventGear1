
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { AppHeader } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { events as mockEvents } from '@/lib/data';
import { Calendar, MapPin, LogOut } from 'lucide-react';
import type { Event } from '@/lib/data';

// Helper to parse dates from localStorage
function parseEvents(events: any[]): Event[] {
  return events.map(event => ({
    ...event,
    date: new Date(event.date),
  }));
}

export default function EventsPage() {
  const router = useRouter();
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<Event[]>([]);

  useEffect(() => {
    setCurrentDateTime(new Date());
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('username');
    setUserRole(role);
    setUsername(name);

    // Initialize events from localStorage or fall back to mock data
    const storedEventsString = localStorage.getItem('events');
    const allEvents = storedEventsString ? parseEvents(JSON.parse(storedEventsString)) : mockEvents;

    if (role && name) {
      if (role === 'admin') {
        setUserEvents(allEvents);
      } else {
        setUserEvents(allEvents.filter(event => event.createdBy === name));
      }
    } else {
      setUserEvents(allEvents);
    }


    return () => clearInterval(timer);
  }, []); // Re-run only on mount

  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    // Optional: clear events cache on sign out
    // localStorage.removeItem('events');
    router.push('/login');
  };

  const sortedEvents = [...userEvents].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Events">
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 size-4" />
          Sign Out
        </Button>
      </AppHeader>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold">Welcome{username ? `, ${username}` : ''}</h1>
            <p className="text-lg text-muted-foreground">
              {currentDateTime ? format(currentDateTime, 'EEEE, MMMM do, yyyy - h:mm:ss a') : 'Loading...'}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Upcoming Events</CardTitle>
              <CardDescription>Here are the events lined up for you.</CardDescription>
            </CardHeader>
            <CardContent>
              {sortedEvents.length > 0 ? (
                <div className="space-y-4">
                  {sortedEvents.map((event) => (
                    <Card key={event.id} className="flex flex-col sm:flex-row">
                      <div className="flex-1 p-6">
                        <h3 className="font-headline text-xl font-semibold">{event.name}</h3>
                        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            <span>{format(event.date, 'MMMM do, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end border-t p-4 sm:border-l sm:border-t-0">
                        <Button>View Details</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted text-center">
                  <p className="text-muted-foreground">No upcoming events found.</p>
                  <p className="text-sm text-muted-foreground/80">Check back later or create a new event.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
