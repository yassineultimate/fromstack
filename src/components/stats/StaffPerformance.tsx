import React from 'react';

interface StaffStat {
  id: string;
  name: string;
  image: string;
  appointments: number;
  revenue: number;
 
}

interface StaffPerformanceProps {
  staffStats: StaffStat[];
}

const StaffPerformance = ({ staffStats }: StaffPerformanceProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Staff Performance</h2>
    <div className="space-y-4">
      {staffStats.map((staff) => (
        <div key={staff.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <img
              src={staff.image}
              alt={staff.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{staff.name}</p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>{staff.appointments} appointments</span>
                <span>${staff.revenue}</span>
              </div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  </div>
);

export default StaffPerformance;