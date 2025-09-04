import { useState } from 'react';
import { Moon, Sun, Bell, Lock, User, Palette, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useDealStore } from '@/store/dealStore';

export const Settings = () => {
  const { preferences, updatePreferences } = useDealStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    dealUpdates: true,
    emailDigest: true,
    mobileAlerts: false,
    weeklyReport: true
  });

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all preferences? This action cannot be undone.')) {
      localStorage.removeItem('vobb-dashboard-preferences');
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences and account settings</p>
      </div>

      <div className="space-y-6">
        {/* Dashboard Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Dashboard Preferences
            </CardTitle>
            <CardDescription>
              Configure your dashboard view settings and data display preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Default View Mode</Label>
              <div className="flex space-x-2">
                <Button
                  variant={preferences.viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updatePreferences({ viewMode: 'table' })}
                >
                  Table View
                </Button>
                <Button
                  variant={preferences.viewMode === 'kanban' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updatePreferences({ viewMode: 'kanban' })}
                >
                  Kanban View
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium mb-3 block">Table Column Visibility</Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(preferences.tableColumns).map(([key, visible]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Switch
                      id={key}
                      checked={visible}
                      onCheckedChange={(checked) => {
                        updatePreferences({
                          tableColumns: {
                            ...preferences.tableColumns,
                            [key]: checked
                          }
                        });
                      }}
                    />
                    <Label htmlFor={key} className="text-sm">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium mb-3 block">Kanban Card Metadata</Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(preferences.kanbanMetadata).map(([key, visible]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Switch
                      id={key}
                      checked={visible}
                      onCheckedChange={(checked) => {
                        updatePreferences({
                          kanbanMetadata: {
                            ...preferences.kanbanMetadata,
                            [key]: checked
                          }
                        });
                      }}
                    />
                    <Label htmlFor={key} className="text-sm">
                      {key.replace(/show/g, '').replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage how you receive updates and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    {key === 'dealUpdates' && 'Get notified when deals change status'}
                    {key === 'emailDigest' && 'Receive daily email summaries'}
                    {key === 'mobileAlerts' && 'Push notifications on mobile devices'}
                    {key === 'weeklyReport' && 'Weekly performance reports'}
                  </div>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => {
                    setNotifications(prev => ({ ...prev, [key]: checked }));
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your account security and data preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Two-Factor Authentication</Label>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Badge variant="outline">Not Enabled</Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Data Export</Label>
                <div className="text-sm text-muted-foreground">
                  Download all your account data
                </div>
              </div>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Clear Preferences</Label>
                <div className="text-sm text-muted-foreground">
                  Reset all dashboard preferences to default
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={handleClearData}>
                Clear Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account Management
            </CardTitle>
            <CardDescription>
              Manage your account status and subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Account Status</Label>
                <div className="text-sm text-muted-foreground">
                  Your current account status and plan
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Change Password</Label>
                <div className="text-sm text-muted-foreground">
                  Update your account password
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};