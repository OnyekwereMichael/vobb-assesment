import { useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DealsTable } from '../deals/DealsTable';
import { KanbanBoard } from '../deals/KanbanBoard';
import { CreateDealModal } from '../deals/CreateDealModal';
import { useMockDealStore } from '../../store/mockStore';
import { useViewModeStore } from '../../store/Store';
import { mockApi } from '../../services/mockApi';
import { useToast } from '../../hooks/use-toast';

export const Dashboard = () => {
  const { 
    setDeals, 
    setClients, 
    setProducts, 
    setLoading, 
    setError,
    isLoading 
  } = useMockDealStore();
  
  const { viewMode } = useViewModeStore();
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [deals, clients, products] = await Promise.all([
          mockApi.getDeals(),
          mockApi.getClients(),
          mockApi.getProducts(),
        ]);
        
        setDeals(deals);
        setClients(clients);
        setProducts(products);
      } catch (error) {
        console.error('Failed to load data:', error);
        setError('Failed to load dashboard data');
        toast({
          title: "Error loading data",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setDeals, setClients, setProducts, setLoading, setError, toast]);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      
      <div className="flex-1">
        {viewMode === 'table' ? <DealsTable /> : <KanbanBoard />}
      </div>
      
      <CreateDealModal />
    </div>
  );
};