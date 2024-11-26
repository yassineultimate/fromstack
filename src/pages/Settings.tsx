import React, { useState,useEffect } from 'react';
import { Camera, Clock, Calendar, Info } from 'lucide-react';
import { SalonSettings, SalonHours, SalonHoliday,dayMap } from '../types/salon';
import BusinessHours from '../components/settings/BusinessHours';
import HolidayManager from '../components/settings/HolidayManager';
import PhotoGallery from '../components/settings/PhotoGallery';
import SalonInfo from '../components/settings/SalonInfo';
import { getSalonsAttributeByID,deleteimage } from '../../Service/SalonService';
import { formatHour ,transformHolidays} from '../../Service/util';
import { adddayofsalon,deletedayofsalon } from '../../Service/SalonDayOffservice';
 

const Settings = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [settings, setSettings] = useState<SalonSettings>({
    id: '',
    name: '',
    shortDescription: '',
    longDescription: '',
    photos: [],
    portfolioImages: [],
    businessHours: [],
    holidays: [],
    latitude: null,
    longitude: null,
    durreRendezvous: null,
    phone: '',
    address: '',
  });
 

  useEffect(() => {
    const fetchSalonData = async () => {
      try {
        const data = await getSalonsAttributeByID(5);
        type DayNumber = keyof typeof dayMap;
         
        // Transform photos array - remove null values
        const photos = [
          data.image1,
          data.image2,
          data.image3,
          data.image4
        ].filter((img): img is string => img !== null);
  
        // Transform portfolio images array - remove null values
        const portfolioImages = [
          data.imagegal1, data.imagegal2, data.imagegal3, data.imagegal4,
          data.imagegal5, data.imagegal6, data.imagegal7, data.imagegal8,
          data.imagegal9, data.imagegal10, data.imagegal11, data.imagegal12,
          data.imagegal13, data.imagegal14, data.imagegal15
        ].filter((img): img is string => img !== null);
  
        // Transform Calendars to match SalonHours interface
        const businessHours: SalonHours[] = data.CalendarSalons.map((calendar: any) => ({
             
          day: dayMap[calendar.jour as DayNumber],
          open: formatHour(calendar.heure_début) || '',
          close: formatHour(calendar.heure_fin) || '',
          isClosed: calendar.isClosed || false
        }));
  
        // Transform SalonOffDays to match SalonHoliday interface
        const holidays: SalonHoliday[] = transformHolidays(data.SalonOffDays);
       
  
        // Extract coordinates from position_géographique
        const latitude = data.position_géographique?.coordinates[1] ?? null;
        const longitude = data.position_géographique?.coordinates[0] ?? null;
  
        const transformedSalonData: SalonSettings = {
          id: String(data.id),
          name: data.name,
          shortDescription: data.DescriptionPetite || '',
          longDescription: data.Description || '',
          photos,
          portfolioImages,
          businessHours,
          holidays,
          latitude,
          longitude,
          durreRendezvous: data.DureeRendezVous || null,
          phone:  data.Phone,
          address: data.adresse
        };
  
        setSettings(transformedSalonData);
      } catch (err) {
        console.error('Error fetching salon data:', err);
      }
    };
  
    fetchSalonData();
  }, []);
  const handleUpdateInfo = (info: Pick<SalonSettings, 'name' | 'shortDescription' | 'longDescription'>) => {
    setSettings(prev => ({ ...prev, ...info }));
  };

  const handleUpdateHours = (hours: SalonHours[]) => {
    setSettings(prev => ({ ...prev, businessHours: hours }));
  };

  const handleAddHoliday = (holiday: Omit<SalonHoliday, 'id'>) => {
    const newHoliday = { ...holiday, id: Date.now().toString() };
    setSettings(prev => ({
      ...prev,
      holidays: [...prev.holidays, newHoliday]
    }));
  };

  const handleDeleteHoliday =async (id:string,startDate: string,endDate:string) => {
    try{
      const response = await  deletedayofsalon(5,startDate,endDate)  ;
    
    setSettings(prev => ({
      ...prev,
      holidays: prev.holidays.filter(h => h.id !== id)
    })); 
  } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleAddPhotos = (type: 'photos' | 'portfolioImages', urls: string[]) => {
    setSettings(prev => ({
      ...prev,
      [type]: [...prev[type], ...urls]
    }));
  };

  const handleDeletePhoto  = async (type: 'photos' | 'portfolioImages', url: string, alt: string) => {
    
    try{
      const data = await deleteimage(5,alt);
      setSettings(prev => ({
      ...prev,
      [type]: prev[type].filter(p => p !== url)
    }));
  } catch (error) {
    console.error('Erreur lors de la suppression du membre du personnel:', error);
  }
  };

  const tabs = [
    { id: 'info', label: 'Informations sur le salon', icon: Info },
    { id: 'hours', label: 'Heures d\'ouverture', icon: Clock },
    { id: 'holidays', label: 'Vacances', icon: Calendar },
    { id: 'photos', label: 'Photos & Portfolio', icon: Camera },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Salon Settings</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex space-x-4 p-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <SalonInfo
              settings={settings}
              onUpdate={handleUpdateInfo}
            />
          )}

          {activeTab === 'hours' && (
            <BusinessHours
              hours={settings.businessHours}
              onUpdate={handleUpdateHours}
            />
          )}

          {activeTab === 'holidays' && (
            <HolidayManager
              holidays={settings.holidays}
              onAdd={handleAddHoliday}
              onDelete={handleDeleteHoliday}
            />
          )}

          {activeTab === 'photos' && (
            <PhotoGallery
              salonPhotos={settings.photos}
              portfolioImages={settings.portfolioImages}
              onAddPhotos={handleAddPhotos}
              onDeletePhoto={handleDeletePhoto}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;