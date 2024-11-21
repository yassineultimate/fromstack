import React from 'react';
import { Clock } from 'lucide-react';
import { SalonHours } from '../../types/salon';

interface BusinessHoursProps {
  hours: SalonHours[];
  onUpdate: (hours: SalonHours[]) => void;
}

const BusinessHours = ({ hours, onUpdate }: BusinessHoursProps) => {
  const handleChange = (index: number, field: keyof SalonHours, value: string | boolean) => {
    const newHours = [...hours];
    newHours[index] = {
      ...newHours[index],
      [field]: value,
      ...(field === 'isClosed' && value === true && { open: '00:00', close: '00:00' })
    };
    onUpdate(newHours);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="text-primary-600" size={24} />
        <h2 className="text-xl font-semibold">Business Hours</h2>
      </div>

      <div className="space-y-4">
        {hours.map((hour, index) => (
          <div key={hour.day} className="flex items-center space-x-4">
            <div className="w-32">
              <span className="text-gray-700 capitalize">{hour.day}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hour.isClosed}
                  onChange={(e) => handleChange(index, 'isClosed', e.target.checked)}
                  className="mr-2 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                Closed
              </label>

              {!hour.isClosed && (
                <>
                  <input
                    type="time"
                    value={hour.open}
                    onChange={(e) => handleChange(index, 'open', e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={hour.close}
                    onChange={(e) => handleChange(index, 'close', e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessHours;