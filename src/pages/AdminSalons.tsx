import React, { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Salon } from '../types/salon';
import AddSalonModal from '../components/admin/AddSalonModal';
import EditSalonModal from '../components/admin/EditSalonModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

const AdminSalons = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [salons, setSalons] = useState<Salon[]>([
    {
      id: '1',
      name: 'Elegance Beauty Salon',
      address: '123 Main St, Paris',
      manager: 'Sophie Martin',
      email: 'sophie@elegance.com',
      phone: '+33 1 23 45 67 89',
      status: 'active',
    },
    {
      id: '2',
      name: 'Modern Cuts',
      address: '456 Avenue des Champs-Élysées',
      manager: 'Jean Dupont',
      email: 'jean@moderncuts.com',
      phone: '+33 1 98 76 54 32',
      status: 'active',
    },
  ]);

  const { query, setQuery, filteredItems: filteredSalons } = useSearch(
    salons,
    ['name', 'address', 'manager', 'email', 'phone']
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSalons.map((salon) => (
                <tr key={salon.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{salon.name}</div>
                    <div className="text-sm text-gray-500">{salon.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{salon.email}</div>
                    <div className="text-sm text-gray-500">{salon.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{salon.manager}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
};

export default AdminSalons;