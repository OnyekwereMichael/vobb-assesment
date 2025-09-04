import { Building2, Settings, User, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDealStore } from '../../store/dealStore';

export const Navbar = () => {
  const setCreateModalOpen = useDealStore((state) => state.setCreateModalOpen);
  const location = useLocation();

  return (
    <nav className="navbar h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Vobb</h1>
            <p className="text-xs text-muted-foreground">Atlas Module</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
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
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button 
          onClick={() => setCreateModalOpen(true)}
          className="bg-primary hover:bg-primary-hover"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Deal
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
    </nav>
  );
};