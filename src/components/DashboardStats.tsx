import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const StatsCard = ({ icon: Icon, label, value, trend }: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}) => (
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
    <p className="mt-4 text-sm text-green-600">
      <TrendingUp size={16} className="inline mr-1" />
      {trend} vs last month
    </p>
  </div>
);

const DashboardStats = () => {
  const stats = [
    {
      icon: Users,
      label: 'Total Customers',
      value: '1,482',
      trend: '+12.5%'
    },
    {
      icon: Calendar,
      label: 'Appointments Today',
      value: '32',
      trend: '+8.1%'
    },
    {
      icon: DollarSign,
      label: 'Revenue Today',
      value: '$2,854',
      trend: '+6.3%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;