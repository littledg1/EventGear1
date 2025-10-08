'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const SETTINGS_KEY = 'eventGearSettings';

type AppSettings = {
  isPhoneMandatory: boolean;
  isEmailMandatory: boolean;
};

const defaultSettings: AppSettings = {
  isPhoneMandatory: true,
  isEmailMandatory: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const handleSettingChange = (key: keyof AppSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      toast({
        title: "Settings Saved",
        description: "Your device settings have been updated.",
      });
    } catch (error) {
       console.error("Failed to save settings to localStorage", error);
       toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save your settings.",
      });
    }
  };
  
  const SettingsSkeleton = () => (
     <div className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
                <Skeleton className="h-6 w-48 mb-2"/>
                <Skeleton className="h-4 w-80"/>
            </div>
            <Skeleton className="h-6 w-11 rounded-full"/>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
                <Skeleton className="h-6 w-40 mb-2"/>
                <Skeleton className="h-4 w-72"/>
            </div>
            <Skeleton className="h-6 w-11 rounded-full"/>
        </div>
     </div>
  )

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Settings" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline">App Settings</CardTitle>
            <CardDescription>
              Customize the app experience for this device. These settings do not sync with other devices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isLoaded ? <SettingsSkeleton /> : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <Label htmlFor="phone-mandatory" className="text-base font-medium">Phone Number is Mandatory</Label>
                        <p className="text-sm text-muted-foreground">If enabled, staff must enter a phone number for each attendee.</p>
                      </div>
                      <Switch
                        id="phone-mandatory"
                        checked={settings.isPhoneMandatory}
                        onCheckedChange={(value) => handleSettingChange('isPhoneMandatory', value)}
                        aria-label="Toggle if phone number is mandatory"
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <Label htmlFor="email-mandatory" className="text-base font-medium">Email is Mandatory</Label>
                        <p className="text-sm text-muted-foreground">If enabled, staff must enter an email address for each attendee.</p>
                      </div>
                      <Switch
                        id="email-mandatory"
                        checked={settings.isEmailMandatory}
                        onCheckedChange={(value) => handleSettingChange('isEmailMandatory', value)}
                        aria-label="Toggle if email is mandatory"
                      />
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
