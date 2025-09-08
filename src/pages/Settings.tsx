import { Moon, Sun, Bell, Lock, User, Palette, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const Settings = () => {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your application preferences and account settings
        </p>
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
                <Button variant="default" size="sm">Table View</Button>
                <Button variant="outline" size="sm">Kanban View</Button>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium mb-3 block">Table Column Visibility</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Switch checked />
                  <Label className="text-sm">Client Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked />
                  <Label className="text-sm">Product Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Stage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Created Date</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium mb-3 block">Kanban Card Metadata</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Switch checked />
                  <Label className="text-sm">Show Client</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked />
                  <Label className="text-sm">Show Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Show Value</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Show Created Date</Label>
                </div>
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
                <Switch />
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
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Deal Updates</Label>
                <div className="text-sm text-muted-foreground">
                  Get notified when deals change status
                </div>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Digest</Label>
                <div className="text-sm text-muted-foreground">
                  Receive daily email summaries
                </div>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Mobile Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Push notifications on mobile devices
                </div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Report</Label>
                <div className="text-sm text-muted-foreground">
                  Weekly performance reports
                </div>
              </div>
              <Switch checked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
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
              <Button variant="destructive" size="sm">
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
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active
              </Badge>
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
