import React, { useState } from 'react';
import { Camera, Clock, Calendar, Info } from 'lucide-react';
import { SalonSettings, SalonHours, SalonHoliday } from '../types/salon';
import BusinessHours from '../components/settings/BusinessHours';
import HolidayManager from '../components/settings/HolidayManager';
import PhotoGallery from '../components/settings/PhotoGallery';
import SalonInfo from '../components/settings/SalonInfo';

const defaultBusinessHours: SalonHours[] = [
  { day: 'monday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'tuesday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'wednesday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'thursday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'friday', open: '09:00', close: '18:00', isClosed: false },
  { day: 'saturday', open: '10:00', close: '16:00', isClosed: false },
  { day: 'sunday', open: '00:00', close: '00:00', isClosed: true },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [settings, setSettings] = useState<SalonSettings>({
    id: '1',
    name: 'Beauty Salon',
    shortDescription: 'Your beauty destination in the heart of the city',
    longDescription: 'Detailed description of the salon...',
    photos: [],
    portfolioImages: [],
    businessHours: defaultBusinessHours,
    holidays: []
  });

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

  const handleDeleteHoliday = (id: string) => {
    setSettings(prev => ({
      ...prev,
      holidays: prev.holidays.filter(h => h.id !== id)
    }));
  };

  const handleAddPhotos = (type: 'photos' | 'portfolioImages', urls: string[]) => {
    setSettings(prev => ({
      ...prev,
      [type]: [...prev[type], ...urls]
    }));
  };

  const handleDeletePhoto = (type: 'photos' | 'portfolioImages', url: string) => {
    setSettings(prev => ({
      ...prev,
      [type]: prev[type].filter(p => p !== url)
    }));
  };

  const tabs = [
    { id: 'info', label: 'Salon Information', icon: Info },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'holidays', label: 'Holidays', icon: Calendar },
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