import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  TrendingUp,
  Target,
  DollarSign,
  Award,
  Edit3,
  MapPin,
  Clock
} from 'lucide-react';

export const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Sales Manager',
    company: 'Vobb Atlas',
    location: 'New York, NY',
    joinDate: 'January 2023',
    avatar: '/api/placeholder/120/120',
    stats: {
      totalDeals: 142,
      completedDeals: 89,
      winRate: 62.7,
      totalValue: 2450000
    }
  };

  const recentActivities = [
    { action: 'Closed deal with TechCorp', time: '2 hours ago', type: 'success' },
    { action: 'Updated Acme Inc proposal', time: '5 hours ago', type: 'info' },
    { action: 'Scheduled call with StartupXYZ', time: '1 day ago', type: 'info' },
    { action: 'Lost deal with BigCorp', time: '2 days ago', type: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-background theme-transition">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile</h1>
              <p className="text-sm text-muted-foreground">View and manage your profile information</p>
            </div>
          </div>
          <Button className="theme-transition">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="premium-card theme-transition">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="text-sm">{user.role}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Active
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{user.company}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Joined {user.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview */}
            <Card className="premium-card theme-transition">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Performance Overview</CardTitle>
                </div>
                <CardDescription>Your sales performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{user.stats.totalDeals}</div>
                    <div className="text-xs text-muted-foreground">Total Deals</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{user.stats.completedDeals}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{user.stats.winRate}%</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      ${(user.stats.totalValue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-muted-foreground">Total Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="premium-card theme-transition">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </div>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};