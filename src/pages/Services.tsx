import  { useState,useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Service } from '../types/service';
import ServiceCard from '../components/services/ServiceCard';
import AddServiceModal from '../components/services/AddServiceModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';
import { getServiceofSalonByid,deleteService } from '../../Service/ServiceService';
const ServicesPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [services, setServices] =  useState<Service[]>([]);
  const SalonId = localStorage.getItem('SalonId');
  useEffect(() => {
    const fetchCalloborateurSalonData = async () => {
      try {
        const data: Service[] = await getServiceofSalonByid(parseInt(SalonId!, 0)); 
        
     
          
        
        setServices(data);
      } catch (err) {
        console.error('Error fetching salon data:', err);
      }
    };

    fetchCalloborateurSalonData();
  }, []);

  const handleAddService = (newService: Omit<Service, 'id'>) => {
    setServices(prev => [...prev, { ...newService, id: Date.now().toString() }]);
  };

  const handleDeleteService  = async (id: string) => {
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce service?')) {
      try {
        const data = await deleteService(parseInt(SalonId!, 0),parseInt(id));
        setServices(prev => prev.filter(s => s.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du membre du personnel:', error);
      }
      
    }
  };

 

 

  const { query, setQuery, filteredItems: filteredServices } = useSearch(
    services,
    ['name']
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