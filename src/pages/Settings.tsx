
// src/pages/Settings.tsx: Implements the settings page with a dark/light mode toggle
// and other mock settings.

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleDarkMode = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        Settings
        <img src="/lovable-uploads/93771cfd-8f79-43fd-acee-0ebc1bd6f4c5.png" alt="Fitness Icon" className="h-8 w-8" />
      </h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Appearance
            <img src="/lovable-uploads/93771cfd-8f79-43fd-acee-0ebc1bd6f4c5.png" alt="Fitness Icon" className="h-5 w-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" checked={isDark} onCheckedChange={toggleDarkMode} />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
