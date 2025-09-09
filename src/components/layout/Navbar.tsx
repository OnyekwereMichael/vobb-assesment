import { Building2, Settings, User, Plus, Sun, Moon, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useTheme } from '../theme/ThemeProvider';
import { useState } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-16 flex items-center justify-between px-6 border-b border-border bg-card theme-transition">
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold sm:text-xl">Vobb</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">Atlas Module</p>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/deals"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/' || location.pathname === '/deals'
              ? 'text-primary border-b-2 border-primary pb-4 -mb-4'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Deals
        </Link>
        <Link
          to="/settings"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/settings'
              ? 'text-primary border-b-2 border-primary pb-4 -mb-4'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Settings
        </Link>
        <Link
          to="/profile"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/profile'
              ? 'text-primary border-b-2 border-primary pb-4 -mb-4'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Profile
        </Link>
      </div>

      {/* Right Actions (Desktop) */}
      <div className="hidden md:flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="theme-transition"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>

        <Button className="theme-transition" asChild>
          <Link to="/deals/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Deals
          </Link>
        </Button>

        <Button variant="ghost" size="sm" asChild>
          <Link to="/settings">
            <Settings className="w-4 h-4" />
          </Link>
        </Button>

        <Button variant="ghost" size="sm" asChild>
          <Link to="/profile">
            <User className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Mobile: Theme Toggle + Hamburger */}
      <div className="flex md:hidden items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-card border-t border-border flex flex-col p-4 space-y-3 md:hidden">
          <Link to="/deals" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
            Deals
          </Link>
          <Link to="/settings" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
            Settings
          </Link>
          <Link to="/profile" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <Button className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
            <Link to="/deals/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Deals
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};
