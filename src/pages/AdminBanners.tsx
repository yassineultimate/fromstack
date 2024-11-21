import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Banner } from '../types/banner';
import BannerList from '../components/banners/BannerList';
import AddBannerModal from '../components/banners/AddBannerModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

const AdminBanners = () => { 
   const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      title: 'Summer Special',
      subtitle: 'Get ready for summer with our special offers',
      discount: 20,
      discountName: 'SUMMER20',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      salonId: 'salon123',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ]);

  const handleAddBanner = (banner: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...banner,
      id: Date.now().toString()
    };
    setBanners(prev => [...prev, newBanner]);
  };

  const handleDeleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setBanners(prev => prev.map(banner => 
      banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
    ));
  };

 

  const { query, setQuery, filteredItems: filteredBanners } = useSearch(
    banners,
    ['title', 'subtitle', 'discountName']
  );

  // ... rest of your existing code ...

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
      >
        <Plus size={20} />
        <span>Add Banner</span>
      </button>
    </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search banners..."
          />
        </div>

        <BannerList
          banners={filteredBanners}
          onDelete={handleDeleteBanner}
          onToggleActive={handleToggleActive}
        />
      </div>

      {showAddModal && (
        <AddBannerModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddBanner}
        />
      )}
    </div>
  );
};

export default AdminBanners;