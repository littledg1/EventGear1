'use client';

import { AppHeader } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, Package } from 'lucide-react';

export default function EventStatsPage() {
  const stats = [
    { title: 'Active', value: '150', icon: Users },
    { title: 'Total Checked Out', value: '350', icon: Package },
    { title: 'Max Checked Out at Once', value: '120', icon: CheckCircle },
  ];

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Event Stats" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
