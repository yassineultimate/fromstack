import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SalonPackage } from '../types/package';
import PackageCard from '../components/packages/PackageCard';
import AddPackageModal from '../components/packages/AddPackageModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

const PackagesPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [packages, setPackages] = useState<SalonPackage[]>([
    {
      id: '1',
      name: 'Bridal Package',
      price: 299,
      duration: 180,
      image: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      isActive: true,
      description: 'Complete bridal beauty package including hair, makeup, and nails',
      services: ['1', '2'],
      discount: 15
    },
    {
      id: '2',
      name: 'Spa Day Package',
      price: 199,
      duration: 120,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      isActive: true,
      description: 'Relaxing spa day including massage and facial treatments',
      services: ['3', '4'],
      discount: 10
    }
  ]);

  const handleAddPackage = (newPackage: Omit<SalonPackage, 'id'>) => {
    setPackages(prev => [...prev, { ...newPackage, id: Date.now().toString() }]);
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
  };

  const { query, setQuery, filteredItems: filteredPackages } = useSearch(
    packages,
    ['name', 'description']
  );

  // ... rest of your existing code ...

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Packages Management</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
      >
        <Plus size={20} />
        <span>Add Package</span>
      </button>
    </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search packages..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onDelete={handleDeletePackage}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddPackageModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddPackage}
        />
      )}
    </div>
  );
};

export default PackagesPage;