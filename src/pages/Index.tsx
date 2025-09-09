import { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Table as TableIcon,
  Kanban,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';
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
import { Navbar } from '@/components/layout/Navbar';
import {
  useDeleteDeal,
  useGetClient,
  useGetDealByDealId,
  useGetDeals,
  useGetProduct,
  useUpdateDeal
} from '@/lib/query';
import { formatToShortDate } from '@/lib/utils';
import { toast } from 'sonner';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useKanbanStore, usePreferencesStore, useViewModeStore } from '@/store/Store';
import { Checkbox } from "@/components/ui/checkbox";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { stages } from '@/components/Dummy';
import { auth } from '../../src/components/Firebase/firebase';
import { useTheme } from '@/components/theme/ThemeProvider';

const Index = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  // ✅ get logged in user
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email); 
    }
  }, []);

  const { tableColumns, kanbanMetadata, toggleTableColumn, toggleKanbanMetadata } = usePreferencesStore();
  const { viewMode, setViewMode } = useViewModeStore();

  const { data: deals = [], isLoading: dealsLoading } = useGetDeals();
  const { data: clients = [] } = useGetClient();
  const { data: products = [] } = useGetProduct();

  const { items, moveItem } = useKanbanStore();
  const updateDeal = useUpdateDeal();
  const deleteDealMutation = useDeleteDeal();

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const getClientById = (id: string) => clients.find(c => c.id === id);
  const getProductById = (id: string | number) => products.find(p => p.id === Number(id) || p.id === id);

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'Lead Generated': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-green-100 text-green-800',
      'Application Submitted': 'bg-yellow-100 text-yellow-800',
      'Application Under Review': 'bg-purple-100 text-purple-800',
      'Deal Finalized': 'bg-green-100 text-green-800',
      'Payment Confirmed': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-200 text-green-900',
      'Lost': 'bg-red-100 text-red-800',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStage = destination.droppableId;
    moveItem(draggableId, newStage);

    updateDeal.mutate({
      dealId: draggableId,
      deal: { stage: newStage },
    });
  };

  const handleDelete = (dealId: string | number | any) => {
    deleteDealMutation.mutate(dealId, {
      onSuccess: () => toast.success("Deal deleted successfully!"),
      onError: () => toast.error("Failed to delete deal"),
    });
  };

  // ✅ Filter deals based on debounced search
  const filteredDeals = deals.filter(deal => {
    const client = getClientById(deal.clientId);
    const product = getProductById(deal.productId);

    return (
      client?.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      product?.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      deal.stage.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  });

  if (dealsLoading) {
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
      <Navbar />

      {/* 👇 show logged in user */}
      <div className="px-6 pt-6">
        <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Welcome, {userName || "Guest"} 👋
        </h2>
      </div>

      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-3 sm:p-6 bg-card border-b border-border space-y-4 lg:space-y-0">
        <div className="text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">Deal Management</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your sales pipeline • {deals.length} active deals
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Input
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 lg:w-64"
            />
            {searchQuery !== debouncedQuery && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>

          <div className="flex rounded-lg border border-border p-1 bg-muted">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={`flex-1 sm:flex-none ${viewMode === 'table' ? `bg-card shadow-sm ${theme === 'dark' ? 'text-white' : 'text-black'}` : theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              <TableIcon className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Table</span>
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className={`flex-1 sm:flex-none ${viewMode === 'kanban' ? `bg-card shadow-sm ${theme === 'dark' ? 'text-white' : 'text-black'}` : theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              <Kanban className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Kanban</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-6">
        {viewMode === 'table' ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">Deals Overview</h3>

            {/* Table Preferences */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
              {Object.keys(tableColumns).map((col) => (
                <label key={col} className="flex items-center space-x-2 text-xs sm:text-sm">
                  <Checkbox
                    checked={tableColumns[col]}
                    onCheckedChange={() => toggleTableColumn(col)}
                  />
                  <span>{col}</span>
                </label>
              ))}
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {tableColumns.clientName && <TableHead className="min-w-[120px]">Client Name</TableHead>}
                      {tableColumns.productName && <TableHead className="min-w-[150px]">Product Name</TableHead>}
                      {tableColumns.stage && <TableHead className="min-w-[140px]">Deal Stage</TableHead>}
                      {tableColumns.createdAt && <TableHead className="min-w-[120px]">Created Date</TableHead>}
                      <TableHead className="min-w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeals.map((deal) => {
                      const client = getClientById(deal.clientId);
                      const product = getProductById(deal.productId);
                      return (
                        <TableRow key={deal.id} className="hover:bg-muted/30">
                          {tableColumns.clientName && <TableCell className="font-medium text-xs sm:text-sm">{client?.name}</TableCell>}
                          {tableColumns.productName && <TableCell className="text-xs sm:text-sm">{product?.name}</TableCell>}
                          {tableColumns.stage && (
                            <TableCell>
                              <Badge className={`${getStageColor(deal.stage)} text-xs`}>{deal.stage}</Badge>
                            </TableCell>
                          )}
                          {tableColumns.createdAt && <TableCell className="text-xs sm:text-sm">{formatToShortDate(deal.createdAt)}</TableCell>}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/deals/${deal.id}`)}>
                                  <Eye className="mr-2 h-4 w-4" />View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate(`/deals/${deal.id}/edit`)}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
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
              </div>
            </Card>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4 sm:mb-6">Pipeline Overview</h3>

            {/* Kanban Preferences */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
              {Object.keys(kanbanMetadata).map((meta) => (
                <label key={meta} className="flex items-center space-x-2 text-xs sm:text-sm">
                  <Checkbox
                    checked={kanbanMetadata[meta]}
                    onCheckedChange={() => toggleKanbanMetadata(meta)}
                  />
                  <span>{meta}</span>
                </label>
              ))}
            </div>

            {/* Kanban */}
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 overflow-x-auto">
                {stages.map((stage) => {
                  const stageDeals = filteredDeals.filter((deal) => deal.stage === stage);
                  return (
                    <Droppable droppableId={stage} key={stage}>
                      {(provided) => (
                        <Card 
                          ref={provided.innerRef} 
                          {...provided.droppableProps} 
                          className="p-3 sm:p-4 min-h-[350px] sm:min-h-[400px] w-full min-w-[250px] sm:min-w-[280px]"
                        >
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h4 className="font-semibold text-xs sm:text-sm truncate">{stage}</h4>
                            <Badge variant="outline" className="text-xs">{stageDeals.length}</Badge>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {stageDeals.map((deal, index) => {
                              const client = getClientById(deal.clientId);
                              const product = getProductById(deal.productId);
                              return (
                                <Draggable draggableId={deal.id} index={index} key={deal.id}>
                                  {(provided) => (
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="p-2 sm:p-3 hover:shadow-md transition-shadow cursor-move"
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        {kanbanMetadata.clientName && (
                                          <h5 className="font-semibold text-xs sm:text-sm truncate flex-1 mr-2">{client?.name}</h5>
                                        )}
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                              <MoreHorizontal className="h-3 w-3" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => navigate(`/deals/${deal.id}`)}>
                                              <Eye className="mr-2 h-4 w-4" />View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate(`/deals/${deal.id}/edit`)}>
                                              <Edit className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(deal.id)}>
                                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                      {kanbanMetadata.productName && (
                                        <p className="text-xs text-muted-foreground truncate mb-1">{product?.name}</p>
                                      )}
                                      {kanbanMetadata.createdAt && (
                                        <p className="text-xs font-semibold text-primary">{formatToShortDate(deal.createdAt)}</p>
                                      )}
                                    </Card>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        </Card>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
