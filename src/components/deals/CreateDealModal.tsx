import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useMockDealStore } from '../../store/mockStore';
import { DealFormData, DealStage } from '../../types';
import { useToast } from '../../hooks/use-toast';

const STAGES: DealStage[] = [
  'Lead Generated',
  'Contacted',
  'Application Submitted',
  'Application Under Review',
  'Deal Finalized',
  'Payment Confirmed',
  'Completed',
  'Lost',
];

export const CreateDealModal = () => {
  const { 
    isCreateModalOpen, 
    setCreateModalOpen, 
    clients, 
    products, 
    addDeal 
  } = useMockDealStore();
  
  const { toast } = useToast();

  const [formData, setFormData] = useState<DealFormData>({
    clientId: '',
    productId: '',
    stage: 'Lead Generated',
    value: undefined,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientId) {
      newErrors.clientId = 'Client is required';
    }

    if (!formData.productId) {
      newErrors.productId = 'Product is required';
    }

    if (formData.value && formData.value <= 0) {
      newErrors.value = 'Deal value must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addDeal({
        clientId: formData.clientId,
        productId: formData.productId,
        stage: formData.stage,
        value: formData.value,
        notes: formData.notes,
      });

      toast({
        title: "Deal created successfully",
        description: "The new deal has been added to your pipeline.",
      });

      // Reset form
      setFormData({
        clientId: '',
        productId: '',
        stage: 'Lead Generated',
        value: undefined,
        notes: '',
      });
      
      setCreateModalOpen(false);
    } catch (error) {
      toast({
        title: "Error creating deal",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCreateModalOpen(false);
    setErrors({});
    setFormData({
      clientId: '',
      productId: '',
      stage: 'Lead Generated',
      value: undefined,
      notes: '',
    });
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Create New Deal
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Add a new deal to your sales pipeline. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client">Client *</Label>
            <Select
              value={formData.clientId}
              onValueChange={(value) => setFormData({ ...formData, clientId: value })}
            >
              <SelectTrigger className={errors.clientId ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg">
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.clientId && (
              <p className="text-sm text-destructive">{errors.clientId}</p>
            )}
          </div>

          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="product">Product *</Label>
            <Select
              value={formData.productId}
              onValueChange={(value) => setFormData({ ...formData, productId: value })}
            >
              <SelectTrigger className={errors.productId ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg">
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.productId && (
              <p className="text-sm text-destructive">{errors.productId}</p>
            )}
          </div>

          {/* Stage Selection */}
          <div className="space-y-2">
            <Label htmlFor="stage">Initial Stage</Label>
            <Select
              value={formData.stage}
              onValueChange={(value) => setFormData({ ...formData, stage: value as DealStage })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg">
                {STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Deal Value */}
          <div className="space-y-2">
            <Label htmlFor="value">Deal Value (USD)</Label>
            <Input
              id="value"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.value || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                value: e.target.value ? parseFloat(e.target.value) : undefined 
              })}
              className={errors.value ? 'border-destructive' : ''}
            />
            {errors.value && (
              <p className="text-sm text-destructive">{errors.value}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this deal..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-hover"
            >
              {isSubmitting ? 'Creating...' : 'Create Deal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};