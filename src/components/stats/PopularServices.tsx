import React from 'react';

interface ServiceStat {
  name: string;
  bookings: number;
  revenue: number;
}

interface PopularServicesProps {
  services: ServiceStat[];
}

const PopularServices = ({ services }: PopularServicesProps) => {
  const maxBookings = Math.max(...services.map(s => s.bookings));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Popular Services</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{service.name}</p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>{service.bookings} bookings</span>
                <span>${service.revenue}</span>
              </div>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(service.bookings / maxBookings) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;