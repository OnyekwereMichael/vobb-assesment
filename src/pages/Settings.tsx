import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Eye, 
  EyeOff, 
  Bell, 
  Shield, 
  User, 
  Palette,
  Database,
  Download,
  Trash2,
  Key,
  Sun,
  Moon
} from 'lucide-react';
import { auth } from '../../src/components/Firebase/firebase';
import { useState } from 'react';
import { BackButton } from '@/components/Backbutton';
import { useTheme } from '@/components/theme/ThemeProvider';

export const Settings = () => {
  const { theme, setTheme } = useTheme();
   const [userName, setUserName] = useState<string | null>(null);

       // ✅ get logged in user
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email); 
    }
  }, []);

  return (
    <div className="min-h-screen bg-background theme-transition">
      {/* Header */}
     <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-20">
  <div className="flex items-center gap-2 sm:gap-3">
    <BackButton />

    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/10 rounded-xl flex items-center justify-center">
      <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
    </div>

    <div>
      <h1 className="text-lg sm:text-2xl font-bold text-foreground leading-snug">
        Settings
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground">
        Manage your account and application preferences
      </p>
    </div>
  </div>
</div>


      <div className="p-6  mx-auto">

         <div className="px-6 pt-6">
        <h2 className="text-lg font-semibold text-gray-800">
       <p
  className={`text-lg font-semibold mb-6 ${
    theme === "dark" ? "text-white" : "text-gray-900"
  }`}
>
 Name: {userName}
</p>

        </h2>
      </div>

        <div className="grid gap-6">
          {/* Appearance */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Appearance</CardTitle>
              </div>
              <CardDescription>Customize how Vobb looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Theme</Label>
                  <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="theme-transition"
                  >
                    <Sun className="w-4 h-4 mr-1" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="theme-transition"
                  >
                    <Moon className="w-4 h-4 mr-1" />
                    Dark
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Preferences */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Dashboard Preferences</CardTitle>
              </div>
              <CardDescription>Configure your dashboard view and data display</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Default View Mode</Label>
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm">Table View</Button>
                    <Button variant="outline" size="sm">Kanban View</Button>
                  </div>
                </div>

                {/* <Separator /> */}

                {/* <div className="space-y-3">
                  <Label className="text-sm font-medium">Table Columns</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Client Name', checked: true },
                      { label: 'Product Name', checked: true },
                      { label: 'Stage', checked: true },
                      { label: 'Created Date', checked: false }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center space-x-2">
                        <Switch id={item.label} defaultChecked={item.checked} />
                        <Label htmlFor={item.label} className="text-sm">{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* <Separator /> */}

                {/* <div className="space-y-3">
                  <Label className="text-sm font-medium">Kanban Card Metadata</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Show Client', checked: true },
                      { label: 'Show Product', checked: true },
                      { label: 'Show Value', checked: false },
                      { label: 'Show Created Date', checked: false }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center space-x-2">
                        <Switch id={item.label} defaultChecked={item.checked} />
                        <Label htmlFor={item.label} className="text-sm">{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Notifications</CardTitle>
              </div>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-4">
                {[
                  { 
                    title: 'Deal Updates', 
                    description: 'Notifications for deal stage changes and updates',
                    checked: true 
                  },
                  { 
                    title: 'Email Digest', 
                    description: 'Daily summary of your deals and activities',
                    checked: true 
                  },
                  { 
                    title: 'Mobile Alerts', 
                    description: 'Push notifications on your mobile device',
                    checked: false 
                  },
                  { 
                    title: 'Weekly Reports', 
                    description: 'Comprehensive weekly performance reports',
                    checked: true 
                  }
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">{item.title}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Privacy & Security</CardTitle>
              </div>
              <CardDescription>Manage your security settings and data privacy</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Enabled
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Export Data</Label>
                    <p className="text-xs text-muted-foreground">Download a copy of your data</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Clear Preferences</Label>
                    <p className="text-xs text-muted-foreground">Reset all settings to default</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Account Management</CardTitle>
              </div>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Account Status</Label>
                    <p className="text-xs text-muted-foreground">Your current account status</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Active
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Change Password</Label>
                    <p className="text-xs text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Key className="w-4 h-4 mr-2" />
                    Change
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
