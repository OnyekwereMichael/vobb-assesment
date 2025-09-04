import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, DollarSign, User, Package, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useDealStore } from '@/store/dealStore';
import { formatDate, getStageColor } from '@/utils/helpers';

export const DealView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deals, getClientById, getProductById, deleteDeal } = useDealStore();
  
  const deal = deals.find(d => d.id === id);
  
  if (!deal) {
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
  
  const client = getClientById(deal.clientId);
  const product = getProductById(deal.productId);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
      deleteDeal(deal.id);
      navigate('/deals');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Deal Details</h1>
            <p className="text-muted-foreground">
              Created {formatDate(deal.createdDate)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Deal Info */}
        <div className="lg:col-span-2 space-y-6">
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
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Client</div>
                    <div className="text-sm text-muted-foreground">
                      {client?.name || 'Unknown Client'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Product</div>
                    <div className="text-sm text-muted-foreground">
                      {product?.name || 'Unknown Product'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Stage</div>
                    <div className="text-sm text-muted-foreground">
                      {deal.stage}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Created</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(deal.createdDate)}
                    </div>
                  </div>
                </div>
              </div>
              
              {deal.value && (
                <>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Deal Value</div>
                      <div className="text-2xl font-bold text-primary">
                        ${deal.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {deal.notes && (
                <>
                  <Separator />
                  <div>
                    <div className="font-medium mb-2">Notes</div>
                    <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                      {deal.notes}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Deal Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Deal Timeline</CardTitle>
              <CardDescription>
                Track the progress of this deal through different stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Deal Created</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(deal.createdDate)}
                    </div>
                  </div>
                </div>
                
                {deal.updatedDate && deal.updatedDate !== deal.createdDate && (
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">Last Updated</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(deal.updatedDate)}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Current Stage</div>
                    <div className="text-xs text-muted-foreground">
                      {deal.stage}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Details */}
          {client && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-muted-foreground">{client.email}</div>
                </div>
                {client.company && (
                  <div>
                    <div className="text-sm font-medium">Company</div>
                    <div className="text-sm text-muted-foreground">{client.company}</div>
                  </div>
                )}
                {client.phone && (
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{client.phone}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Product Details */}
          {product && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium">{product.name}</div>
                  {product.description && (
                    <div className="text-sm text-muted-foreground">{product.description}</div>
                  )}
                </div>
                {product.category && (
                  <div>
                    <div className="text-sm font-medium">Category</div>
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                  </div>
                )}
                {product.price && (
                  <div>
                    <div className="text-sm font-medium">Price</div>
                    <div className="text-sm font-semibold text-primary">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to={`/deals/${deal.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Deal
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button variant="destructive" className="w-full justify-start" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Deal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};