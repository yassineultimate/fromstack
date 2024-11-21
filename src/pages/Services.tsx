import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Service } from '../types/service';
import ServiceCard from '../components/services/ServiceCard';
import AddServiceModal from '../components/services/AddServiceModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

const ServicesPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Haircut & Styling',
      price: 50,
      duration: 60,
      image: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      isActive: true,
      description: 'Professional haircut and styling service',
      category: 'Hair'
    },
    {
      id: '2',
      name: 'Manicure',
      price: 35,
      duration: 45,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      isActive: true,
      description: 'Complete manicure treatment',
      category: 'Nails'
    }
  ]);

  const handleAddService = (newService: Omit<Service, 'id'>) => {
    setServices(prev => [...prev, { ...newService, id: Date.now().toString() }]);
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

 

  const { query, setQuery, filteredItems: filteredServices } = useSearch(
    services,
    ['name', 'category', 'description']
  );
  

  // ... rest of your existing code ...

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
      >
        <Plus size={20} />
        <span>Add Service</span>
      </button>
    </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search services..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={handleDeleteService}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddServiceModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddService}
        />
      )}
    </div>
  );
};

export default ServicesPage;