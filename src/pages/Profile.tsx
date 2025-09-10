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
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 sm:px-6 py-3 sm:py-4">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Left Section */}
    <div className="flex items-start sm:items-center space-x-3">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden xs:inline">Back</span>
      </Button>

      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            View and manage your profile info
          </p>
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="flex max-sm:flex-row max-sm:mt-3 xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
      <Button className="w-full xs:w-auto theme-transition">
        <Edit3 className="w-4 h-4 mr-1 sm:mr-2" />
        <span className="text-sm sm:text-base">Edit</span>
      </Button>
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="w-full xs:w-auto theme-transition flex items-center justify-center"
      >
        <LogOut className="w-4 h-4 mr-1 sm:mr-2" />
        <span className="text-sm sm:text-base">Logout</span>
      </Button>
    </div>
  </div>
</div>


   <div className="p-6 mx-auto">
  <div className="grid gap-8 lg:grid-cols-3">
    {/* Profile Info */}
    <div className="lg:col-span-1">
      <Card className="premium-card theme-transition shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
        <CardHeader className="text-center pb-6">
          <Avatar className="w-28 h-28 mx-auto mb-4 ring-4 ring-primary/10 shadow-md">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold text-foreground">{user.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {user.role}
          </CardDescription>
          <Badge variant="secondary" className="mt-3 px-4 py-1.5 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Active
          </Badge>
        </CardHeader>
        <CardContent className="space-y-5 text-sm">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span>{user.company}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Performance & Activity */}
    <div className="lg:col-span-2 space-y-8">
      {/* Performance Overview */}
      <Card className="premium-card theme-transition shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
        <CardHeader className="pb-4 border-b">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
          </div>
          <CardDescription>Your sales performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-5 bg-muted/40 rounded-xl shadow-sm hover:bg-muted/60 transition">
              <Target className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{user.stats.totalDeals}</div>
              <div className="text-xs text-muted-foreground">Total Deals</div>
            </div>
            <div className="flex flex-col items-center p-5 bg-muted/40 rounded-xl shadow-sm hover:bg-muted/60 transition">
              <Award className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold">{user.stats.completedDeals}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="flex flex-col items-center p-5 bg-muted/40 rounded-xl shadow-sm hover:bg-muted/60 transition">
              <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold">{user.stats.winRate}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div className="flex flex-col items-center p-5 bg-muted/40 rounded-xl shadow-sm hover:bg-muted/60 transition">
              <DollarSign className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold">
                ${(user.stats.totalValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">Total Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="premium-card theme-transition shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
        <CardHeader className="pb-4 border-b">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </div>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            No recent activities yet.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</div>

    </div>
  );
};
