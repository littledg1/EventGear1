
'use client';

import { AppHeader } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, CheckCircle, Package } from 'lucide-react';

export default function EventStatsPage() {
  const stats = [
    { title: 'Active Headsets', value: '150', icon: Users, description: 'Number of headsets currently in use by attendees.' },
    { title: 'Total Checked Out Headsets', value: '350', icon: Package, description: 'Total number of headset check-outs during the event.' },
    { title: 'Max Checked Out at Once', value: '120', icon: CheckCircle, description: 'The peak number of headsets in use simultaneously.' },
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
      </main>
    </div>
  );
}
