import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, DollarSign, User, Package, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate, getStageColor } from '@/utils/helpers';
import { useDeleteDeal, useGetDealByDealId, useGetClient, useGetProduct } from '@/lib/query'; // ✅ import hooks

export const DealView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: deal, isLoading, isError } = useGetDealByDealId(id!);
  const deleteDealMutation = useDeleteDeal();

  // ✅ fetch all clients + products
  const { data: clients } = useGetClient();
  const { data: products } = useGetProduct();

  // ✅ match client & product by ID
  const client = clients?.find((c: any) => c.id === deal?.clientId);
  const product = products?.find((p: any) => Number(p.id) === Number(deal?.productId));

  if (isLoading) {
    return <p className="p-6 text-center text-muted-foreground">Loading deal...</p>;
  }

  if (isError || !deal) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Deal Not Found</h1>
          <p className="text-muted-foreground mb-6">The deal you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/deals">Back to Deals</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
      deleteDealMutation.mutate(deal.id, {
        onSuccess: () => navigate('/deals'),
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Deal Details</h1>
            <p className="text-muted-foreground">
              Created {deal.createdDate ? formatDate(deal.createdDate) : "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link to={`/deals/${deal.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Deal Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Deal Overview
            <Badge className={getStageColor(deal.stage)}>
              {deal.stage}
            </Badge>
          </CardTitle>
          <CardDescription>
            Deal ID: {deal.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* ✅ Client Name */}
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Client</div>
                <div className="text-sm text-muted-foreground">
                  {client?.name || "Unknown Client"}
                </div>
              </div>
            </div>

            {/* ✅ Product Name */}
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Product</div>
                <div className="text-sm text-muted-foreground">
                  {product?.name || "Unknown Product"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
