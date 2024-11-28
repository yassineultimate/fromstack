import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Banner } from '../types/banner';
import BannerList from '../components/banners/BannerList';
import AddBannerModal from '../components/banners/AddBannerModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';
import {allbanner,createBanner,deletebanner } from './../../Service/BannerService';

const AdminBanners = () => { 
   const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [banners, setBanners] = useState<Banner[]>([]);
   
  useEffect(() => {
    fetchbanner();
  }, []);

  const fetchbanner = async () => {
    try {
      setLoading(true);
      // Replace {userId} with actual user ID from your auth system
         // Update this with actual user ID
      const response = await allbanner();
      setBanners(response);
      setError('');
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleAddBanner = async  (banner: Omit<Banner, 'id'>) => {
    try {
      const response = await createBanner(banner);
    const newBanner: Banner = {
      ...banner,
      id: Date.now().toString()
    };
    setBanners(prev => [...prev, newBanner]);

  } catch (err) {
    console.error('Error adding notification:', err);
    // Handle error (you might want to show an error message to the user)
  }
  };

  const handleDeleteBanner =  async (id: string) => {
    try {
      await deletebanner(id);
    setBanners(prev => prev.filter(b => b.id !== id));

  } catch (err) {
    console.error('Error adding notification:', err);
    // Handle error (you might want to show an error message to the user)
  }
  };

 

 

  const { query, setQuery, filteredItems: filteredBanners } = useSearch(
    banners,
    ['Title', 'Subtitle', 'discountName']
  );

 

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