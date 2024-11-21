import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2} from 'lucide-react';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  status: 'active' | 'inactive';
}
 
 
const AdminSettings = () => {
 
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (e:any) => {
    setSelectedRole(e.target.value);
  };
  
  const [admins, setadmins] = useState<Admin[]>([
    {
      id: '1',
      name: 'Elegance Beauty Salon',
      email: 'yassine.harbeg@gmail.com',
      role: 'admin',
      status: 'active',
    },
    {
      id: '2',
      name: 'Modern Cuts',
     
      email: 'yassine.harbeg@gmail.com',
      role: 'admin',
      status: 'active',
    },
  ]);
  const { query, setQuery, filteredItems: filteredAdmins } = useSearch(
    admins,
    ['name', 'email', 'role']
  );

  // ... rest of your existing code ...
  const AddadminModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add New admin</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">admin Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter salon name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">email</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter address"
            />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select a role</option>
        <option value="super_admin">Super Admin</option>
        <option value="admin">Admin</option>
      </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Salon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage admin</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          <span>Add admin</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search admin..."
          />
        </div>
      <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                role
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
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{admin.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
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
      {showAddModal && <AddadminModal />}
    </div>
  );
};

export default AdminSettings;