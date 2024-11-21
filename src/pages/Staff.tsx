import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Staff } from '../types/staff';
import AddStaffModal from '../components/staff/AddStaffModal';
import DayOffModal from '../components/staff/DayOffModal';
import StaffCard from '../components/staff/StaffCard';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

const StaffPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDayOffModal, setShowDayOffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  
  const [staffMembers, setStaffMembers] = useState<Staff[]>([
    {
      id: '1',
      name: 'Sophie Martin',
      speciality: 'Hair Stylist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      address: '123 Rue de Paris',
      phone: '+33 1 23 45 67 89',
      daysOff: []
    },
    {
      id: '2',
      name: 'Marie Dubois',
      speciality: 'Nail Artist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      address: '456 Avenue des Champs-Élysées',
      phone: '+33 1 98 76 54 32',
      daysOff: []
    }
  ]);

  const { query, setQuery, filteredItems: filteredStaff } = useSearch(
    staffMembers,
    ['name', 'speciality', 'phone', 'address']
  );

  const handleAddStaff = (newStaff: Omit<Staff, 'id' | 'daysOff'>) => {
    const staff: Staff = {
      ...newStaff,
      id: Date.now().toString(),
      daysOff: []
    };
    setStaffMembers(prev => [...prev, staff]);
    setShowAddModal(false);
  };

  const handleDeleteStaff = (id: string) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffMembers(prev => prev.filter(staff => staff.id !== id));
    }
  };

  const handleAddDayOff = (staffId: string, dayOff: { start: string; end: string; reason?: string }) => {
    setStaffMembers(prev => prev.map(staff => {
      if (staff.id === staffId) {
        return {
          ...staff,
          daysOff: [...staff.daysOff, dayOff]
        };
      }
      return staff;
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Staff</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search staff..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredStaff.map((member) => (
            <StaffCard
              key={member.id}
              staff={member}
              onEdit={() => {}}
              onDelete={handleDeleteStaff}
              onAddDayOff={(staff) => {
                setSelectedStaff(staff);
                setShowDayOffModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddStaffModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStaff}
        />
      )}

      {showDayOffModal && selectedStaff && (
        <DayOffModal
          staff={selectedStaff}
          onClose={() => {
            setShowDayOffModal(false);
            setSelectedStaff(null);
          }}
          onAddDayOff={handleAddDayOff}
        />
      )}
    </div>
  );
};

export default StaffPage;