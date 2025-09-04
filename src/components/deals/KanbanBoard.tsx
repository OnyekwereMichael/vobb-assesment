import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, Edit, Trash2, Eye, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Checkbox } from '../ui/checkbox';
import { useDealStore } from '../../store/dealStore';
import { Deal, DealStage } from '../../types';
import { formatDate, getStageBgColor } from '../../utils/helpers';

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

export const KanbanBoard = () => {
  const { 
    deals, 
    preferences,
    updatePreferences,
    updateDeal,
    deleteDeal,
    getDealsByStage,
    getClientById,
    getProductById 
  } = useDealStore();

  const { kanbanMetadata } = preferences;

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const dealId = draggableId;
    const newStage = destination.droppableId as DealStage;
    
    updateDeal(dealId, { stage: newStage });
  };

  const toggleMetadata = (key: keyof typeof kanbanMetadata) => {
    updatePreferences({
      kanbanMetadata: {
        ...kanbanMetadata,
        [key]: !kanbanMetadata[key],
      },
    });
  };

  const handleDelete = (deal: Deal) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      deleteDeal(deal.id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Pipeline Overview</h3>
        
        {/* Metadata Settings */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Card Details
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 bg-popover border border-border shadow-lg">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Show on Cards</h4>
              {Object.entries(kanbanMetadata).map(([key, visible]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={visible}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        toggleMetadata(key as keyof typeof kanbanMetadata);
                      }
                    }}
                  />
                  <label
                    htmlFor={key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {key.replace(/show/g, '').replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 overflow-x-auto">
          {STAGES.map((stage) => {
            const stageDeals = getDealsByStage(stage);
            
            return (
              <div key={stage} className="min-w-[280px]">
                <div className={`${getStageBgColor(stage)} rounded-lg p-4 min-h-[600px]`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-sm text-foreground">
                      {stage}
                    </h4>
                    <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                      {stageDeals.length}
                    </span>
                  </div>

                  <Droppable droppableId={stage}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[500px] transition-colors ${
                          snapshot.isDraggingOver ? 'bg-muted/20' : ''
                        }`}
                      >
                        {stageDeals.map((deal, index) => {
                          const client = getClientById(deal.clientId);
                          const product = getProductById(deal.productId);

                          return (
                            <Draggable
                              key={deal.id}
                              draggableId={deal.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`deal-card ${
                                    snapshot.isDragging ? 'shadow-lg rotate-2' : ''
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      {kanbanMetadata.showClientName && (
                                        <h5 className="font-semibold text-sm text-card-foreground">
                                          {client?.name || 'Unknown Client'}
                                        </h5>
                                      )}
                                      {kanbanMetadata.showProductName && (
                                        <p className="text-xs text-muted-foreground">
                                          {product?.name || 'Unknown Product'}
                                        </p>
                                      )}
                                    </div>
                                    
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-6 w-6 p-0">
                                          <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="bg-popover border border-border shadow-lg">
                                         <DropdownMenuItem className="cursor-pointer" asChild>
                                           <Link to={`/deals/${deal.id}`}>
                                             <Eye className="mr-2 h-4 w-4" />
                                             View
                                           </Link>
                                         </DropdownMenuItem>
                                         <DropdownMenuItem className="cursor-pointer" asChild>
                                           <Link to={`/deals/${deal.id}/edit`}>
                                             <Edit className="mr-2 h-4 w-4" />
                                             Edit
                                           </Link>
                                         </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          className="cursor-pointer text-destructive hover:bg-destructive/10"
                                          onClick={() => handleDelete(deal)}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>

                                  {kanbanMetadata.showCreatedDate && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                      {formatDate(deal.createdDate)}
                                    </p>
                                  )}

                                  {deal.value && (
                                    <p className="text-sm font-semibold text-primary mt-2">
                                      ${deal.value.toLocaleString()}
                                    </p>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};