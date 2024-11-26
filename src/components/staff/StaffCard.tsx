import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Phone, MapPin } from 'lucide-react';
import { Staff } from '../../types/staff';
import {  icons, images } from '../../constants';
import { deletedayof } from '../../../Service/CollaborateurOffDaysService';
interface StaffCardProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
  onAddDayOff: (staff: Staff) => void;
}
 


const StaffCard = ({ staff, onEdit, onDelete, onAddDayOff }: StaffCardProps) => {

  const [periods, setPeriods] = useState(staff.daysOff);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteDayOff = async (id:number, startDate:string, endDate:string) => {
    setIsLoading(true);
    setError('');

    try {
      // Assuming deletedayofsalon is imported and returns a promise
      await deletedayof(5, startDate, endDate);
      
      // Update local state after successful API call
      setPeriods(prevPeriods => 
        prevPeriods.filter((_, idx) => idx !== id)
      );
    } catch (error) {
      setError('Failed to delete day off period. Please try again.');
      console.error('Error deleting day off:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src= {staff.image}
            alt={staff.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
            <p className="text-sm text-gray-500">{staff.speciality}</p>
          </div>
        </div>
 
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">jours de congé</h4>
          <div className="flex flex-wrap gap-2">
             {periods.map((period, index) => (
              <div
                key={index}
                className="group relative inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
              >
                {new Date(period.start).toLocaleDateString()} - {new Date(period.end).toLocaleDateString()}
                {period.reason && (
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {period.reason}
                    </div>
                  </div>
                  
                )}

              <button
                onClick={() => handleDeleteDayOff(index, period.start, period.end)}
               disabled={isLoading}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 size={20} />
            </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center pt-4 border-t">
          <button
            onClick={() => onAddDayOff(staff)}
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
          >
            <Calendar size={16} className="mr-1" />
            Ajouter des jours de congé
          </button>
          <div className="flex space-x-2">
          
            <button 
              onClick={() => onDelete(staff.id)}
              className="p-1 text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;