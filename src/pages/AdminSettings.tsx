import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Admin } from '../types/admin';
import AddAdminModal from '../components/admin/AddAdminModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';
import {getAlluseradmin,createadmin,deleteadmin } from './../../Service/UserAdminService';

const AdminSettings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [admins, setAdmins] = useState<Admin[]>([]);
 
  useEffect(() => {
    fetchuserlogin();
  }, []);

  const fetchuserlogin= async () => {
    try {
      setLoading(true);
      // Replace {userId} with actual user ID from your auth system
         // Update this with actual user ID
      const response = await getAlluseradmin();
      setAdmins(response);
      setError('');
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };
  const { query, setQuery, filteredItems: filteredAdmins } = useSearch(
    admins,
    ['name', 'email', 'Phone']
  );

  const handleAddAdmin = async (admin: Omit<Admin, 'id' | 'lastLogin'>) => {
    try {
      const response = await createadmin(admin);
    const newAdmin: Admin = {
      ...admin,
      id: Date.now().toString(),
       
    };
    setAdmins(prev => [...prev, newAdmin]);
  } catch (err) {
    console.error('Error adding notification:', err);
    // Handle error (you might want to show an error message to the user)
  }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await deleteadmin(id);
      setAdmins(prev => prev.filter(admin => admin.id !== id));
    } catch (err) {
      console.error('Error adding notification:', err);
      // Handle error (you might want to show an error message to the user)
    }
    }
  };

   

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Admin</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search admins..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{admin.email}</div>
                    <div className="text-sm text-gray-500">{admin.Phone}</div>
                  </td>
                   
                 
                   
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddAdmin}
        />
      )}
    </div>
  );
};

export default AdminSettings;