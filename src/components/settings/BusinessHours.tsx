import React, { useState } from 'react'
import { Clock,CheckCircle2  } from 'lucide-react';
import { SalonHours,dayMap,dayMap2 } from '../../types/salon';
import { updateTime } from '../../../Service/CalandarService';
 
interface BusinessHoursProps {
  hours: SalonHours[];
  onUpdate: (hours: SalonHours[]) => void;
}

const BusinessHours = ({ hours, onUpdate }: BusinessHoursProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const handleChange = (index: number, field: keyof SalonHours, value: string | boolean) => {
    const newHours = [...hours];
    newHours[index] = {
      ...newHours[index],
      [field]: value,
      ...(field === 'isClosed' && value === true && { open: '00:00', close: '00:00' })
    };
    onUpdate(newHours);
  };
  const delay = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms));
  const saveBusinessHours = async () => {
    setIsLoading(true);
    const SalonId = localStorage.getItem('SalonId');
    try {
      for (const hour of hours) {
        const dayNumber = dayMap2[hour.day]; // Convert day name to number
  
        const payload = {
          SalonId: parseInt(SalonId!, 0),
          jour: dayNumber,
          isClosed: hour.isClosed,
          heure_début: hour.isClosed ? 0 : parseInt(hour.open.split(':')[0]),
          heure_fin: hour.isClosed ? 0 : parseInt(hour.close.split(':')[0]),
        };
  
        console.log('Sending payload:', payload);
  
        try {
          // Make the API call with more detailed error handling
          const response = await updateTime(payload);
          console.log('Response for', hour.day, response);
        } catch (apiError) {
          console.error('Error updating hours for');
          // Optionally, you might want to break the loop or handle individual day errors
          throw apiError; // Re-throw to stop further processing
        }
  
        // Wait for 1 second (or desired delay) before the next call
        await delay(1000);
      }
      setUpdateSuccess(true);
      console.log('All updates completed successfully!');
    } catch (err) {
      console.error('Error updating business hours:', err);
      // Consider showing a user-friendly error message
      // e.g., toast.error('Failed to update business hours')
    } finally {
        
      setIsLoading(false);
       // Reset success message after 3 seconds
       if (updateSuccess) {
        const timer = setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);

        // Clear timeout to prevent memory leaks
        return () => clearTimeout(timer);
      }
    }
  }
  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="text-primary-600" size={24} />
        <h2 className="text-xl font-semibold">Heures d'ouverture</h2>
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
                Fermer
              </label>

              {!hour.isClosed && (
                <>
                  <input
                    type="time"
                    value={hour.open}
                    onChange={(e) => handleChange(index, 'open', e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <span>à</span>
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
          <button
              type="submit"
              onClick={saveBusinessHours}
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
            {isLoading ? 'Mise à jour en cours...' : 'Mettre à jour'}
            </button>
            {updateSuccess && (
          <div className="mt-4 flex items-center text-green-600 space-x-2">
            <CheckCircle2 size={24} />
            <span>Mise à jour réussie !</span>
          </div>
        )}
    </div>
  );
};

export default BusinessHours;