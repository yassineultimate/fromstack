import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Salon, SalonManager } from '../types/salon';
import AddSalonModal from '../components/admin/AddSalonModal';
import EditSalonModal from '../components/admin/EditSalonModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';
import SalonManagersList from '../components/admin/salon/SalonManagersList';
import AddManagerModal from '../components/admin/salon/AddManagerModal';
import {getsalonsadmin,deletesalon} from './../../Service/SalonService';
import {deletemanager} from './../../Service/MAnegerService';
const AdminSalons = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchSalons = async () => {
    try {
      setLoading(true);
      const response = await getsalonsadmin();
      if (response.success) {
        setSalons(response.data);
      }
    } catch (err) {
      setError('Failed to fetch salons');
      console.error('Error fetching salons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalons();
  }, []);
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

  const handleDeleteSalon = async (id: string) => {
    
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce salon ?')) {
      try {
        const response = await deletesalon(id );
      setSalons(prev => prev.filter(salon => salon.id !== id));
      } catch (error) {
      console.error('Error:', error);
      }}
  };

  const handleToggleStatus = (id: string) => {
    setSalons(prev => prev.map(salon =>
      salon.id === id
        ? { ...salon, status: salon.status === 'active' ? 'inactive' : 'active' }
        : salon
    ));
  };

  const handleAddManager = (salonId: string, managerData: Omit<SalonManager, 'id' >) => {
    const newManager: SalonManager = {
      ...managerData,
      id: Date.now().toString(),
     
    };

    setSalons(prev => prev.map(salon =>
      salon.id === salonId
        ? { ...salon, managers: [...salon.managers, newManager] }
        : salon
    ));
  };

  const handleRemoveManager = async (salonId: string, managerId: string) => {
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce gestionnaire ?')) {
      try {
        const response = await deletemanager(managerId) ;
      setSalons(prev => prev.map(salon =>
        salon.id === salonId
          ? { ...salon, managers: salon.managers.filter(m => m.id !== managerId) }
          : salon
      ));
    } catch (error) {
      console.error('Error:', error);
    }
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
                {/* <button
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
                  </button>*/}
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
        salonId={selectedSalon.id} 
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