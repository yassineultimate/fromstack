import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  trendColor: string;
}

const StatsCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend,
  trendColor
}: StatsCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg">
        <Icon className="text-purple-700" size={24} />
      </div>
    </div>
    <p className={`mt-4 text-sm ${trendColor === 'green' ? 'text-green-600' : 'text-red-600'}`}>
      <TrendingUp size={16} className="inline mr-1" />
      {trend} vs last month
    </p>
  </div>
);

export default StatsCard;