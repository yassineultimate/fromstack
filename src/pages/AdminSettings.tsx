import React, { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Admin } from '../types/admin';
import AddAdminModal from '../components/admin/AddAdminModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

const AdminSettings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2024-03-19T10:30:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-03-18T15:45:00Z'
    }
  ]);

  const { query, setQuery, filteredItems: filteredAdmins } = useSearch(
    admins,
    ['name', 'email', 'phone']
  );

  const handleAddAdmin = (admin: Omit<Admin, 'id' | 'lastLogin'>) => {
    const newAdmin: Admin = {
      ...admin,
      id: Date.now().toString(),
      lastLogin: new Date().toISOString()
    };
    setAdmins(prev => [...prev, newAdmin]);
  };

  const handleDeleteAdmin = (id: string) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(prev => prev.filter(admin => admin.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setAdmins(prev => prev.map(admin =>
      admin.id === id
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
        : admin
    ));
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
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
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
                    <div className="text-sm text-gray-500">{admin.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.role === 'super_admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(admin.id)}
                      className={`inline-flex items-center ${
                        admin.status === 'active'
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {admin.status === 'active' ? (
                        <ToggleRight size={20} />
                      ) : (
                        <ToggleLeft size={20} />
                      )}
                      <span className="ml-2 text-sm">
                        {admin.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(admin.lastLogin!).toLocaleString()}
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