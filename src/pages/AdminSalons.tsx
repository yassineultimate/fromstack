import React, { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Salon, SalonManager } from '../types/salon';
import AddSalonModal from '../components/admin/AddSalonModal';
import EditSalonModal from '../components/admin/EditSalonModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';
import SalonManagersList from '../components/admin/salon/SalonManagersList';
import AddManagerModal from '../components/admin/salon/AddManagerModal';

const AdminSalons = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [salons, setSalons] = useState<Salon[]>([
    {
      id: '1',
      name: 'Elegance Beauty Salon',
      address: '123 Main St, Paris',
      managers: [
        {
          id: '1',
          name: 'Sophie Martin',
          email: 'sophie@elegance.com',
          phone: '+33 1 23 45 67 89',
          role: 'primary',
          joinedAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Marie Dubois',
          email: 'marie@elegance.com',
          phone: '+33 1 23 45 67 90',
          role: 'assistant',
          joinedAt: '2024-02-01'
        }
      ],
      email: 'contact@elegance.com',
      phone: '+33 1 23 45 67 89',
      status: 'active',
    },
    {
      id: '2',
      name: 'Modern Cuts',
      address: '456 Avenue des Champs-Élysées',
      managers: [
        {
          id: '3',
          name: 'Jean Dupont',
          email: 'jean@moderncuts.com',
          phone: '+33 1 98 76 54 32',
          role: 'primary',
          joinedAt: '2024-01-01'
        }
      ],
      email: 'info@moderncuts.com',
      phone: '+33 1 98 76 54 32',
      status: 'active',
    },
  ]);

  const { query, setQuery, filteredItems: filteredSalons } = useSearch(
    salons,
    ['name', 'address', 'email', 'phone']
  );

  const handleAddSalon = (salon: Omit<Salon, 'id'>) => {
    const newSalon: Salon = {
      ...salon,
      id: Date.now().toString()
    };
    setSalons(prev => [...prev, newSalon]);
  };

  const handleEditSalon = (updatedSalon: Salon) => {
    setSalons(prev => prev.map(salon =>
      salon.id === updatedSalon.id ? updatedSalon : salon
    ));
    setShowEditModal(false);
    setSelectedSalon(null);
  };

  const handleDeleteSalon = (id: string) => {
    if (window.confirm('Are you sure you want to delete this salon?')) {
      setSalons(prev => prev.filter(salon => salon.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setSalons(prev => prev.map(salon =>
      salon.id === id
        ? { ...salon, status: salon.status === 'active' ? 'inactive' : 'active' }
        : salon
    ));
  };

  const handleAddManager = (salonId: string, managerData: Omit<SalonManager, 'id' | 'joinedAt'>) => {
    const newManager: SalonManager = {
      ...managerData,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString()
    };

    setSalons(prev => prev.map(salon =>
      salon.id === salonId
        ? { ...salon, managers: [...salon.managers, newManager] }
        : salon
    ));
  };

  const handleRemoveManager = (salonId: string, managerId: string) => {
    if (window.confirm('Are you sure you want to remove this manager?')) {
      setSalons(prev => prev.map(salon =>
        salon.id === salonId
          ? { ...salon, managers: salon.managers.filter(m => m.id !== managerId) }
          : salon
      ));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Salons</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Salon</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search salons..."
          />
        </div>

        <div className="divide-y divide-gray-200">
          {filteredSalons.map((salon) => (
            <div key={salon.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{salon.name}</h2>
                  <p className="text-gray-500">{salon.address}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Email: {salon.email}</p>
                    <p>Phone: {salon.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggleStatus(salon.id)}
                    className={`inline-flex items-center ${
                      salon.status === 'active'
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {salon.status === 'active' ? (
                      <ToggleRight size={20} />
                    ) : (
                      <ToggleLeft size={20} />
                    )}
                    <span className="ml-2 text-sm">
                      {salon.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSalon(salon);
                      setShowEditModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteSalon(salon.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <SalonManagersList
                managers={salon.managers}
                onAddManager={() => {
                  setSelectedSalon(salon);
                  setShowAddManagerModal(true);
                }}
                onRemoveManager={(managerId) => handleRemoveManager(salon.id, managerId)}
              />
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddSalonModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSalon}
        />
      )}

      {showEditModal && selectedSalon && (
        <EditSalonModal
          salon={selectedSalon}
          onClose={() => {
            setShowEditModal(false);
            setSelectedSalon(null);
          }}
          onUpdate={handleEditSalon}
        />
      )}

      {showAddManagerModal && selectedSalon && (
        <AddManagerModal
          onClose={() => {
            setShowAddManagerModal(false);
            setSelectedSalon(null);
          }}
          onAdd={(managerData) => {
            handleAddManager(selectedSalon.id, managerData);
            setShowAddManagerModal(false);
            setSelectedSalon(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminSalons;