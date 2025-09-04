import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit, Trash2, Eye, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
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
import { Deal } from '../../types';
import { formatDate, getStageColor } from '../../utils/helpers';

export const DealsTable = () => {
  const { 
    deals, 
    preferences, 
    updatePreferences, 
    deleteDeal,
    getClientById,
    getProductById 
  } = useDealStore();

  const [sortBy, setSortBy] = useState<keyof Deal>('createdDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { tableColumns } = preferences;

  const sortedDeals = [...deals].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (column: keyof Deal) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const toggleColumn = (column: keyof typeof tableColumns) => {
    updatePreferences({
      tableColumns: {
        ...tableColumns,
        [column]: !tableColumns[column],
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Deals Overview</h3>
        
        {/* Column Visibility Settings */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Columns
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 bg-popover border border-border shadow-lg">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Toggle Columns</h4>
              {Object.entries(tableColumns).map(([key, visible]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={visible}
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') {
                        toggleColumn(key as keyof typeof tableColumns);
                      }
                    }}
                  />
                  <label
                    htmlFor={key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {tableColumns.clientName && (
                <TableHead 
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('clientId')}
                >
                  Client Name
                </TableHead>
              )}
              {tableColumns.productName && (
                <TableHead 
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('productId')}
                >
                  Product Name
                </TableHead>
              )}
              {tableColumns.dealStage && (
                <TableHead 
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('stage')}
                >
                  Deal Stage
                </TableHead>
              )}
              {tableColumns.createdDate && (
                <TableHead 
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('createdDate')}
                >
                  Created Date
                </TableHead>
              )}
              {tableColumns.actions && (
                <TableHead className="w-[70px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDeals.map((deal) => {
              const client = getClientById(deal.clientId);
              const product = getProductById(deal.productId);

              return (
                <TableRow key={deal.id} className="hover:bg-muted/30 transition-colors">
                  {tableColumns.clientName && (
                    <TableCell className="font-medium">
                      {client?.name || 'Unknown Client'}
                    </TableCell>
                  )}
                  {tableColumns.productName && (
                    <TableCell>{product?.name || 'Unknown Product'}</TableCell>
                  )}
                  {tableColumns.dealStage && (
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </TableCell>
                  )}
                  {tableColumns.createdDate && (
                    <TableCell className="text-muted-foreground">
                      {formatDate(deal.createdDate)}
                    </TableCell>
                  )}
                  {tableColumns.actions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
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
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {sortedDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No deals found</p>
            <p className="text-sm text-muted-foreground">Create your first deal to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};