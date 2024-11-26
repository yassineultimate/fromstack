import React, { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { SalonHoliday } from '../../types/salon';
import { adddayofsalon,deletedayofsalon } from '../../../Service/SalonDayOffservice';

interface HolidayManagerProps {
  holidays: SalonHoliday[];
  onAdd: (holiday: Omit<SalonHoliday, 'id'>) => void;
  onDelete: (id:string,startDate: string,endDate: string) => void;
}

const HolidayManager = ({ holidays, onAdd, onDelete }: HolidayManagerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await  adddayofsalon(5,newHoliday.reason,newHoliday.startDate,newHoliday.endDate)  
      if (response.message="Days off period created successfully") {
      onAdd(newHoliday);
      setNewHoliday({ startDate: '', endDate: '', reason: '' });
      setShowAddForm(false);
    } else {
      console.error('Failed to add staff');
    }
    } catch (error) {
      console.error('Error:', error);
    }

   
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="text-primary-600" size={24} />
          <h2 className="text-xl font-semibold">Vacances</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Ajouter des vacances</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de début
              </label>
              <input
                type="date"
                value={newHoliday.startDate}
                onChange={(e) => setNewHoliday(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                value={newHoliday.endDate}
                onChange={(e) => setNewHoliday(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Raison
            </label>
            <input
              type="text"
              value={newHoliday.reason}
              onChange={(e) => setNewHoliday(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Holiday
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {holidays.map((holiday) => (
          <div
            key={holiday.id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg"
          >
            <div>
              <div className="font-medium text-gray-900">
                {new Date(holiday.startDate).toLocaleDateString()} - {new Date(holiday.endDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">{holiday.reason}</div>
            </div>
            <button
              onClick={() => onDelete(holiday.id,holiday.startDate,holiday.endDate)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayManager;