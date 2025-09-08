import { Table, Kanban, Filter, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useDealStore } from '../../store/Store';
import { ViewMode } from '../../types';

export const DashboardHeader = () => {
  const { viewMode, setViewMode, deals } = useDealStore();

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div className="flex items-center justify-between p-6 bg-card border-b border-border">
      <div>
        <h2 className="text-2xl font-bold">Deal Management</h2>
        <p className="text-muted-foreground">
          Manage your sales pipeline • {deals.length} active deals
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
            className="pl-9 w-64"
          />
        </div>

        {/* Filter */}
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        {/* View Toggle */}
        <div className="flex rounded-lg border border-border p-1 bg-muted">
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewChange('table')}
            className={viewMode === 'table' ? 'bg-card shadow-sm' : ''}
          >
            <Table className="w-4 h-4 mr-2" />
            Table
          </Button>
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewChange('kanban')}
            className={viewMode === 'kanban' ? 'bg-card shadow-sm' : ''}
          >
            <Kanban className="w-4 h-4 mr-2" />
            Kanban
          </Button>
        </div>
      </div>
    </div>
  );
};