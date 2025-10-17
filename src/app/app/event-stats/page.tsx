
'use client';

import { AppHeader } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, CheckCircle, Package, CalendarDays, Headset } from 'lucide-react';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function EventStatsPage() {
  const stats = [
    { title: 'Active Headsets', value: '150', icon: Users, description: 'Number of headsets currently in use by attendees.' },
    { title: 'Total Checked Out Headsets', value: '350', icon: Package, description: 'Total number of headset check-outs during the event.' },
    { title: 'Max Checked Out at Once', value: '120', icon: CheckCircle, description: 'The peak number of headsets in use simultaneously.' },
  ];

  const currentEvent = {
    title: 'Summer Fest 2024',
    startDate: new Date('2024-08-15T09:00:00'),
    endDate: new Date('2024-08-16T21:00:00'),
  };
  
    const headsetUsageData = [
      { time: '09:00', checkedOut: 25, checkedIn: 0 },
      { time: '10:00', checkedOut: 75, checkedIn: 5 },
      { time: '11:00', checkedOut: 110, checkedIn: 15 },
      { time: '12:00', checkedOut: 150, checkedIn: 30 },
      { time: '13:00', checkedOut: 130, checkedIn: 60 },
      { time: '14:00', checkedOut: 115, checkedIn: 95 },
      { time: '15:00', checkedOut: 90, checkedIn: 130 },
      { time: '16:00', checkedOut: 60, checkedIn: 160 },
      { time: '17:00', checkedOut: 30, checkedIn: 180 },
    ];


  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Event Stats" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-headline font-bold">Headset Usage Statistics</h2>
          <p className="text-muted-foreground">Real-time stats for the currently active event session.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Headset className="size-5" />
                    Headset Activity Over Time
                </CardTitle>
                <CardDescription>
                    Number of headsets checked out and returned during the event.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={headsetUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))'
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="checkedOut" name="Checked Out" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="checkedIn" name="Returned" stroke="hsl(var(--accent))" strokeWidth={2} />
                </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <CalendarDays className="size-5" />
              Current Event Details
            </CardTitle>
            <CardDescription>Information about the event being tracked.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-lg">{currentEvent.title}</p>
              <p className="text-sm text-muted-foreground">Event Title</p>
            </div>
            <div>
              <p className="font-semibold">{format(currentEvent.startDate, 'MMMM do, yyyy')}</p>
              <p className="text-sm text-muted-foreground">Beginning Date</p>
            </div>
            <div>
              <p className="font-semibold">{format(currentEvent.endDate, 'MMMM do, yyyy')}</p>
              <p className="text-sm text-muted-foreground">End Date</p>
            </div>
             <div>
              <p className="font-semibold">{format(currentEvent.startDate, 'h:mm a')}</p>
              <p className="text-sm text-muted-foreground">Beginning Time</p>
            </div>
            <div>
              <p className="font-semibold">{format(currentEvent.endDate, 'h:mm a')}</p>
              <p className="text-sm text-muted-foreground">End Time</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
