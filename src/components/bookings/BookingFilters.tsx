import React from 'react';

interface BookingFiltersProps {
  selectedDate: string;
  selectedStatus: string;
  onDateChange: (date: string) => void;
  onStatusChange: (status: string) => void;
}

const BookingFilters = ({
  selectedDate,
  selectedStatus,
  onDateChange,
  onStatusChange
}: BookingFiltersProps) => {
  return (
    <div className="mt-4 flex gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default BookingFilters;