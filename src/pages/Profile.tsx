import { User, Mail, Phone, Building2, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const Profile = () => {
  // Mock user data - in a real app this would come from an API/auth service
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@vobb.com',
    phone: '+1 (555) 123-4567',
    company: 'Vobb Technologies',
    role: 'Senior Sales Agent',
    joinDate: '2023-01-15',
    avatar: null,
    stats: {
      totalDeals: 47,
      completedDeals: 23,
      winRate: 49,
      totalValue: 1250000
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account information and preferences</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={user.avatar || ''} alt={user.name} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mt-1">
                {user.role}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{user.company}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your deal performance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{user.stats.totalDeals}</div>
                  <div className="text-sm text-muted-foreground">Total Deals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{user.stats.completedDeals}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{user.stats.winRate}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    ${(user.stats.totalValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest deal activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Deal with Acme Corp completed</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">New lead from Tech Solutions Inc</div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                  <Badge variant="default">Lead Generated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Payment confirmed for Global Services</div>
                    <div className="text-xs text-muted-foreground">3 days ago</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Payment Confirmed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};