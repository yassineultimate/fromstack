import React, { useEffect, useState } from 'react';
import { getallCollaborateurBYsalon } from '../../../Service/CollaboratorService';

interface BookingFiltersProps {
  selectedDate: string;
  selectedStatus: string;
  selectedCollaborator: string;
 
  onDateChange: (date: string) => void;
  onStatusChange: (status: string) => void;
  onCollaboratorChange: (collaboratorId: string) => void;
}

interface SalonColla {
  id: number;
  name: string;
}

const BookingFilters = ({
  selectedDate,
  selectedStatus,
  selectedCollaborator,
  onDateChange,
  onStatusChange,
  onCollaboratorChange
}: BookingFiltersProps) => {
  const [salonCollaborateurData, setSalonCollaborateurData] = useState<SalonColla[]>([]);
  
  useEffect(() => {
    const fetchCalloborateurSalonData = async () => {
      try {
        const data: SalonColla[] = await getallCollaborateurBYsalon(5);
        setSalonCollaborateurData(data);
      } catch (err) {
        console.error('Error fetching salon data:', err);
      }
    };

    fetchCalloborateurSalonData();
  }, []);

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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Staff
        </label>
        <select
          value={selectedCollaborator}
          onChange={(e) => onCollaboratorChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Tous le staff </option>
          {salonCollaborateurData.map((collaborator) => (
            <option key={collaborator.id} value={collaborator.id}>
              {collaborator.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookingFilters;