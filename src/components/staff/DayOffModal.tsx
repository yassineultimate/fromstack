import React, { useState } from 'react';
import { Staff } from '../../types/staff';
import { adddayof } from '../../../Service/CollaborateurOffDaysService';
interface DayOffModalProps {
  staff: Staff;
  onClose: () => void;
  onAddDayOff: (staffId: string, dayOff: { start: string; end: string; reason?: string }) => void;
}

const DayOffModal = ({ staff, onClose, onAddDayOff }: DayOffModalProps) => {
  const [formData, setFormData] = useState({
    start: '',
    end: '',
    reason: ''
  });
  const [error, setError] = useState<string>('');
  const validateDates = () => {
    const startDate = new Date(formData.start);
    const endDate = new Date(formData.end);
    
    if (endDate < startDate) {
      setError('End date cannot be before start date');
      return false;
    }
    
    if (startDate < new Date()) {
      setError('Start date cannot be in the past');
      return false;
    }
    
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDates()) {
      return;
    }
    const sata= await  adddayof(parseInt(staff.id), formData.reason,formData.start,formData.end);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          Add Days Off for {staff.name}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="start"
              value={formData.start}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="end"
              value={formData.end}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              min={formData.start || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Enter reason for days off"
              rows={3}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Days Off
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DayOffModal;