import React from 'react';

interface PackageStat {
  name: string;
  bookings: number;
  revenue: number;
}

interface PopularpackageProps {
    packages: PackageStat[];
}

const PopularServices = ({ packages }: PopularpackageProps) => {
  const maxBookings = Math.max(...packages.map(s => s.bookings));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Popular packages</h2>
      <div className="space-y-4">
        {packages.map((packag, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{packag.name}</p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>{packag.bookings} bookings</span>
                <span>${packag.revenue}</span>
              </div>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(packag.bookings / maxBookings) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;