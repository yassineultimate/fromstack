import React, { useState,useEffect } from 'react';
import { Plus } from 'lucide-react';
import { SalonPackage } from '../types/package';
import PackageCard from '../components/packages/PackageCard';
import AddPackageModal from '../components/packages/AddPackageModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';
import { getPackageofSalonByid,deletePackage } from '../../Service/PackageService';
const PackagesPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [packages, setPackages] =  useState<SalonPackage[]>([]);
  useEffect(() => {
    const fetchCalloborateurSalonData = async () => {
      try {
        const data: SalonPackage[] = await getPackageofSalonByid(5); 
        
     
          
        
        setPackages(data);
      } catch (err) {
        console.error('Error fetching salon data:', err);
      }
    };

    fetchCalloborateurSalonData();
  }, []);

  const handleAddPackage = (newPackage: Omit<SalonPackage, 'id'>) => {
    setPackages(prev => [...prev, { ...newPackage, id: Date.now().toString() }]);
  };

  const handleDeletePackage= async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {

      try {
        const data = await deletePackage(5,parseInt(id));
        setPackages(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du membre du personnel:', error);
      }
  
    }
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