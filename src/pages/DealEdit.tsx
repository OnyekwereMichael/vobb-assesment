import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDealStore } from '@/store/dealStore';
import { DealFormData, DealStage } from '@/types';

const DEAL_STAGES: DealStage[] = [
  'Lead Generated',
  'Contacted',
  'Application Submitted',
  'Application Under Review',
  'Deal Finalized',
  'Payment Confirmed',
  'Completed',
  'Lost',
];

export const DealEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deals, clients, products, updateDeal, getClientById, getProductById } = useDealStore();
  
  const deal = deals.find(d => d.id === id);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<DealFormData & { value?: number }>({
    defaultValues: deal ? {
      clientId: deal.clientId,
      productId: deal.productId,
      stage: deal.stage,
      value: deal.value || undefined,
      notes: deal.notes || ''
    } : undefined
  });

  if (!deal) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Deal Not Found</h1>
          <p className="text-muted-foreground mb-6">The deal you're trying to edit doesn't exist.</p>
          <Button asChild>
            <Link to="/deals">Back to Deals</Link>
          </Button>
        </div>
      </div>
    );
  }

  const watchedStage = watch('stage');
  const client = getClientById(deal.clientId);
  const product = getProductById(deal.productId);

  const onSubmit = (data: DealFormData & { value?: number }) => {
    updateDeal(deal.id, {
      clientId: data.clientId,
      productId: data.productId,
      stage: data.stage,
      value: data.value,
      notes: data.notes
    });
    navigate(`/deals/${deal.id}`);
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(`/deals/${deal.id}`);
      }
    } else {
      navigate(`/deals/${deal.id}`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Deal</h1>
            <p className="text-muted-foreground">
              Update deal information and track progress
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deal Information</CardTitle>
          <CardDescription>
            Modify the details of this deal and update its current stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Selection */}
              <div className="space-y-2">
                <Label htmlFor="clientId">Client *</Label>
                <Select
                  value={watch('clientId')}
                  onValueChange={(value) => setValue('clientId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} - {client.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clientId && (
                  <p className="text-sm text-destructive">Client is required</p>
                )}
              </div>

              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="productId">Product *</Label>
                <Select
                  value={watch('productId')}
                  onValueChange={(value) => setValue('productId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                        {product.price && (
                          <span className="text-muted-foreground ml-2">
                            (${product.price.toLocaleString()})
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.productId && (
                  <p className="text-sm text-destructive">Product is required</p>
                )}
              </div>

              {/* Deal Stage */}
              <div className="space-y-2">
                <Label htmlFor="stage">Deal Stage *</Label>
                <Select
                  value={watchedStage}
                  onValueChange={(value) => setValue('stage', value as DealStage)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEAL_STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stage && (
                  <p className="text-sm text-destructive">Stage is required</p>
                )}
              </div>

              {/* Deal Value */}
              <div className="space-y-2">
                <Label htmlFor="value">Deal Value ($)</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="Enter deal value"
                  {...register('value', {
                    min: { value: 0, message: 'Value must be positive' }
                  })}
                />
                {errors.value && (
                  <p className="text-sm text-destructive">{errors.value.message}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this deal..."
                className="min-h-[100px]"
                {...register('notes')}
              />
            </div>

            {/* Current Information Display */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Current Deal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium text-muted-foreground">Current Client</div>
                  <div>{client?.name || 'Unknown'}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Current Product</div>
                  <div>{product?.name || 'Unknown'}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Current Stage</div>
                  <div>{deal.stage}</div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" disabled={!isDirty}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};