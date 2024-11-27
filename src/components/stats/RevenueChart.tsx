import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: {
    name: string;
    revenue: number;
  }[];
}

const RevenueChart = ({ data }: RevenueChartProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Weekly Revenue</h2>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Revenue']}
          />
          <Bar dataKey="revenue" fill="#6B46C1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueChart;