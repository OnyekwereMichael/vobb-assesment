import { DealStage } from '@/types';

export const formatDate = (date?: string | number | null) => {
  if (!date) return "N/A"; // fallback when no date
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "Invalid Date"; // guard against bad values
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getStageColor = (stage: DealStage): string => {
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
  return colors[stage] || 'bg-gray-100 text-gray-800';
};

export const getStageBgColor = (stage: DealStage): string => {
  const colors = {
    'Lead Generated': 'bg-blue-50',
    'Contacted': 'bg-green-50',
    'Application Submitted': 'bg-yellow-50',
    'Application Under Review': 'bg-purple-50',
    'Deal Finalized': 'bg-green-50',
    'Payment Confirmed': 'bg-blue-50',
    'Completed': 'bg-green-100',
    'Lost': 'bg-red-50',
  };
  return colors[stage] || 'bg-gray-50';
};