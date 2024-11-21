import React from 'react';
import { Edit, Trash2, Calendar, Phone, MapPin } from 'lucide-react';
import { Staff } from '../../types/staff';
import {  icons, images } from '../../constants';
interface StaffCardProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
  onAddDayOff: (staff: Staff) => void;
}

const StaffCard = ({ staff, onEdit, onDelete, onAddDayOff }: StaffCardProps) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={staff.image? { uri: staff.image} : images.user1}
            alt={staff.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
            <p className="text-sm text-gray-500">{staff.speciality}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Phone size={16} className="mr-2" />
            {staff.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2" />
            {staff.address}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Days Off</h4>
          <div className="flex flex-wrap gap-2">
            {staff.daysOff.map((period, index) => (
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
            Add Days Off
          </button>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(staff)}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <Edit size={18} />
            </button>
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