import { useState, useEffect } from 'react';
import { Building2, Plus, Table as TableIcon, Kanban, MoreHorizontal, Edit, Trash2, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data and store inline for demo
const mockData = {
  deals: [
    { id: '1', clientId: 'client-1', productId: 'product-1', stage: 'Lead Generated', createdDate: new Date().toISOString(), value: 50000 },
    { id: '2', clientId: 'client-2', productId: 'product-2', stage: 'Contacted', createdDate: new Date().toISOString(), value: 75000 },
    { id: '3', clientId: 'client-1', productId: 'product-3', stage: 'Application Submitted', createdDate: new Date().toISOString(), value: 100000 },
    { id: '4', clientId: 'client-2', productId: 'product-1', stage: 'Deal Finalized', createdDate: new Date().toISOString(), value: 125000 },
  ],
  clients: [
    { id: 'client-1', name: 'Acme Corporation' },
    { id: 'client-2', name: 'TechStart Solutions' },
  ],
  products: [
    { id: 'product-1', name: 'Enterprise CRM Suite' },
    { id: 'product-2', name: 'Analytics Dashboard Pro' },
    { id: 'product-3', name: 'Marketing Automation Hub' },
  ]
};

const Index = () => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [deals, setDeals] = useState(mockData.deals);
  const [clients] = useState(mockData.clients);
  const [products] = useState(mockData.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const getClientById = (id: string) => clients.find(c => c.id === id);
  const getProductById = (id: string) => products.find(p => p.id === id);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
  
  const getStageColor = (stage: string) => {
    const colors = {
      'Lead Generated': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-green-100 text-green-800',
      'Application Submitted': 'bg-yellow-100 text-yellow-800',
      'Application Under Review': 'bg-purple-100 text-purple-800',
      'Deal Finalized': 'bg-green-100 text-green-800',
      'Payment Confirmed': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-200 text-green-900',
      'Lost': 'bg-red-100 text-red-800',
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleDelete = (dealId: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(d => d.id !== dealId));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Vobb Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Navbar */}
      <nav className="navbar h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Vobb</h1>
              <p className="text-xs text-muted-foreground">Atlas Module</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#deals" className="text-sm font-medium text-primary border-b-2 border-primary pb-4 -mb-4">
              Deals
            </a>
            <a href="#settings" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Settings
            </a>
            <a href="#profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Dashboard Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-border">
        <div>
          <h2 className="text-2xl font-bold">Deal Management</h2>
          <p className="text-muted-foreground">
            Manage your sales pipeline • {deals.length} active deals
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Input placeholder="Search deals..." className="w-64" />
          
          <div className="flex rounded-lg border border-border p-1 bg-muted">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-card shadow-sm' : ''}
            >
              <TableIcon className="w-4 h-4 mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm" 
              onClick={() => setViewMode('kanban')}
              className={viewMode === 'kanban' ? 'bg-card shadow-sm' : ''}
            >
              <Kanban className="w-4 h-4 mr-2" />
              Kanban
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {viewMode === 'table' ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">Deals Overview</h3>
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Client Name</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Deal Stage</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map((deal) => {
                    const client = getClientById(deal.clientId);
                    const product = getProductById(deal.productId);

                    return (
                      <TableRow key={deal.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{client?.name}</TableCell>
                        <TableCell>{product?.name}</TableCell>
                        <TableCell>
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(deal.createdDate)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                              <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(deal.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-6">Pipeline Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Lead Generated', 'Contacted', 'Application Submitted', 'Deal Finalized'].map((stage) => {
                const stageDeals = deals.filter(deal => deal.stage === stage);
                
                return (
                  <Card key={stage} className="p-4 min-h-[400px]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-sm">{stage}</h4>
                      <Badge variant="outline">{stageDeals.length}</Badge>
                    </div>

                    <div className="space-y-3">
                      {stageDeals.map((deal) => {
                        const client = getClientById(deal.clientId);
                        const product = getProductById(deal.productId);

                        return (
                          <Card key={deal.id} className="p-3 hover:shadow-md transition-shadow cursor-move">
                            <div className="flex justify-between mb-2">
                              <h5 className="font-semibold text-sm">{client?.name}</h5>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                                  <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(deal.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-xs text-muted-foreground">{product?.name}</p>
                            <p className="text-sm font-semibold text-primary mt-2">
                              ${deal.value?.toLocaleString()}
                            </p>
                          </Card>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;