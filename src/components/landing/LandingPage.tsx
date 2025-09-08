import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Building2, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  Star,
  Award,
  Target
} from 'lucide-react';
import heroImage from '../../assets/hero-dashboard.jpg';

export const LandingPage = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track deal performance with detailed analytics and insights that help you make data-driven decisions."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members, assign deals, and track progress in real-time."
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Streamline your sales process with automated deal progression and smart notifications."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security ensures your deal data is always protected and compliant."
    }
  ];

  const stats = [
    { label: "Active Deals", value: "2,500+" },
    { label: "Team Members", value: "150+" },
    { label: "Success Rate", value: "94%" },
    { label: "Revenue Tracked", value: "$12M+" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Director",
      company: "TechCorp Inc.",
      content: "Vobb has transformed our deal management process. We've seen a 40% increase in deal closure rates since implementation.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "VP of Sales",
      company: "Growth Dynamics",
      content: "The Kanban view and analytics features are game-changers. Our team productivity has increased significantly.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Account Manager",
      company: "Scale Solutions",
      content: "The collaboration features make it easy to work with our global team. Everything is organized and accessible.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Vobb</h1>
                <p className="text-xs text-muted-foreground">Deal Management</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </Link>
              <Link to="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Atlas Module • Deal Management Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Manage Deals Like a
                  <span className="text-primary"> Pro</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your sales process with our powerful deal management platform. 
                  Track, manage, and close deals faster with advanced Kanban boards, 
                  analytics, and team collaboration features.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-base font-semibold" asChild>
                  <Link to="/signup">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold" asChild>
                  <Link to="/deals">
                    View Demo Dashboard
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Vobb Dashboard Interface"
                  className="rounded-2xl shadow-2xl border border-border"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-3xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Everything you need to manage deals
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools your sales team needs 
              to track, manage, and close deals efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Trusted by sales teams worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about their experience with Vobb.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary via-primary-light to-primary-glow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                Ready to transform your deal management?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of sales teams who have already improved their deal closure rates with Vobb.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-base font-semibold" asChild>
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/login">
                  Sign In to Your Account
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Vobb</h1>
                  <p className="text-xs text-muted-foreground">Deal Management</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                The most powerful deal management platform for modern sales teams.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Status</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Vobb. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};