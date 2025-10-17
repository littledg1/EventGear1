
'use client'

import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';

export default function SessionsPage() {

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Set Session" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Tabs defaultValue="current" className="mx-auto max-w-2xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Session</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Summer Fest 2024</CardTitle>
                <CardDescription>
                  This is the currently active session. To sync another device, tap on the session from the list on the other device.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="text-center">
                    <p className="font-medium">Session ends in: 23 hours 14 minutes</p>
                    <p className="text-sm text-muted-foreground">Started on: July 26, 2024</p>
                </div>
                <Button variant="destructive" className="w-full">Deactivate Session</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Create a New Session</CardTitle>
                <CardDescription>
                  Give your event a unique name, date, and time. Activating it will start a tracking period.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-name">Session Name</Label>
                  <Input id="session-name" placeholder="e.g., Corporate Gala 2025" />
                </div>
                <div className="space-y-2">
                  <Label>Event Date</Label>
                   <Calendar
                      mode="single"
                      selected={new Date()}
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
                <Button className="w-full">Save & Activate</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
