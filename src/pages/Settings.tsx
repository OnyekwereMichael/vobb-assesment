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
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 px-3 sm:px-6 py-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <BackButton />
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Manage your account and application preferences</p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6 mx-auto">
        <div className="px-0 sm:px-3 pt-3 sm:pt-6">
          <p className={`text-base sm:text-lg font-semibold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Name: {userName}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Appearance */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">Appearance</CardTitle>
              </div>
              <CardDescription className="text-sm">Customize how Vobb looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Theme</Label>
                  <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="theme-transition flex-1 sm:flex-none"
                  >
                    <Sun className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="text-xs sm:text-sm">Light</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="theme-transition flex-1 sm:flex-none"
                  >
                    <Moon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="text-xs sm:text-sm">Dark</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Preferences */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">Dashboard Preferences</CardTitle>
              </div>
              <CardDescription className="text-sm">Configure your dashboard view and data display</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-sm font-medium">Default View Mode</Label>
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">Table View</Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">Kanban View</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
              </div>
              <CardDescription className="text-sm">Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-3 sm:space-y-4">
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
                  <div key={item.title} className="flex items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1 flex-1">
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
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">Privacy & Security</CardTitle>
              </div>
              <CardDescription className="text-sm">Manage your security settings and data privacy</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200 self-start sm:self-center">
                    Enabled
                  </Badge>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Export Data</Label>
                    <p className="text-xs text-muted-foreground">Download a copy of your data</p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start sm:self-center">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Export</span>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Clear Preferences</Label>
                    <p className="text-xs text-muted-foreground">Reset all settings to default</p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start sm:self-center">
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Clear</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="premium-card theme-transition">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">Account Management</CardTitle>
              </div>
              <CardDescription className="text-sm">Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="compact-spacing">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Account Status</Label>
                    <p className="text-xs text-muted-foreground">Your current account status</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 self-start sm:self-center">
                    Active
                  </Badge>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Change Password</Label>
                    <p className="text-xs text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start sm:self-center">
                    <Key className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Change</span>
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
