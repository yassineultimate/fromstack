import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Staff, SalonCollaData } from '../types/staff';
import AddStaffModal from '../components/staff/AddStaffModal';
import DayOffModal from '../components/staff/DayOffModal';
import StaffCard from '../components/staff/StaffCard';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';
import { getallCollaborateurBYsalon,deleteStaff } from '../../Service/CollaboratorService';
import { convertSalonCollaToStaff } from '../../Service/util';
const SalonId = localStorage.getItem('SalonId');
const StaffPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDayOffModal, setShowDayOffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [salonCollaborateurData, setSalonCollaborateurData] = useState<Staff[]>([]);
  
  useEffect(() => {
    const fetchCalloborateurSalonData = async () => {
      try {
        const data: SalonCollaData[] = await getallCollaborateurBYsalon(parseInt(SalonId!, 0)); 
        
        const saloncoll= await convertSalonCollaToStaff(data);
          
        
        setSalonCollaborateurData(saloncoll);
      } catch (err) {
        console.error('Error fetching salon data:', err);
      }
    };

    fetchCalloborateurSalonData();
  }, []);

  const { query, setQuery, filteredItems: filteredStaff } = useSearch(
    salonCollaborateurData,
    ['name', 'speciality']
  );
  

  const handleAddStaff = (newStaff: Omit<Staff, 'id' | 'daysOff'>) => {
    const staff: Staff = {
      ...newStaff,
      id: Date.now().toString(),
      daysOff: []
    };
    setSalonCollaborateurData(prev => [...prev, staff]);
    setShowAddModal(false);
  };

  const handleDeleteStaff = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre du staff?')) {
      try {
        const data = await deleteStaff(parseInt(id));
        setSalonCollaborateurData(prev => prev.filter(staff => staff.id !=id));
      } catch (error) {
        console.error('Erreur lors de la suppression du membre du personnel:', error);
      }
    }
  };
 
  const handleAddDayOff = (staffId: string, dayOff: { start: string; end: string; reason?: string }) => {
    setSalonCollaborateurData(prev => prev.map(staff => 
      staff.id === staffId 
        ? { ...staff, daysOff: [...staff.daysOff, dayOff] }
        : staff
    ));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Ajouter Staff</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search staff..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredStaff.map((member) => (
            <StaffCard
              key={member.id}
              staff={member}
              onEdit={() => {}}
              onDelete={handleDeleteStaff}
              onAddDayOff={(staff) => {
                setSelectedStaff(staff);
                setShowDayOffModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddStaffModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStaff}
        />
      )}

      {showDayOffModal && selectedStaff && (
        <DayOffModal
          staff={selectedStaff}
          onClose={() => {
            setShowDayOffModal(false);
            setSelectedStaff(null);
          }}
          onAddDayOff={handleAddDayOff}
        />
      )}
    </div>
  );
};

export default StaffPage;