import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "../../src/components/Firebase/firebase";
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
  Clock,
  ArrowLeft,
  LogOut,
} from "lucide-react";

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "Anonymous User",
          email: firebaseUser.email,
          phone: firebaseUser.phoneNumber || "Not provided",
          role: "Sales Manager",
          company: "Vobb Atlas",
          location: "Not set",
          joinDate: firebaseUser.metadata?.creationTime
            ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString()
            : "Unknown",
          avatar: firebaseUser.photoURL || "/api/placeholder/120/120",
          stats: {
            totalDeals: 0,
            completedDeals: 0,
            winRate: 0,
            totalValue: 0,
          },
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background theme-transition">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Profile</h1>
                <p className="text-sm text-muted-foreground">
                  View and manage your profile information
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button className="theme-transition">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="theme-transition flex items-center space-x-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6 mx-auto">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="premium-card theme-transition">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg sm:text-xl lg:text-2xl bg-primary/10 text-primary">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg sm:text-xl">{user.name}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{user.role}</CardDescription>
                <Badge variant="secondary" className="mt-2 text-xs">
                  Active
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{user.company}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">Joined {user.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance & Activity */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Performance Overview */}
            <Card className="premium-card theme-transition">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <CardTitle className="text-base sm:text-lg">Performance Overview</CardTitle>
                </div>
                <CardDescription className="text-sm">Your sales performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">
                      {user.stats.totalDeals}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Deals</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">
                      {user.stats.completedDeals}
                    </div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">
                      {user.stats.winRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl">
                    <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">
                      ${(user.stats.totalValue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-muted-foreground">Total Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="premium-card theme-transition">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                </div>
                <CardDescription className="text-sm">Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No recent activities yet.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
