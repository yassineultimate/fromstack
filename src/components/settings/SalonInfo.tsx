import React, { useState } from 'react';
import { Info, MapPin } from 'lucide-react';

interface SalonSettings {
  name: string;
  shortDescription: string;
  longDescription: string;
  latitude: number | null;
  longitude: number | null;
  durreRendezvous: number | null;  // New field for appointment duration
}

interface SalonInfoProps {
  settings: SalonSettings;
  onUpdate: (info: Pick<SalonSettings, 'name' | 'shortDescription' | 'longDescription' | 'latitude' | 'longitude' | 'durreRendezvous'>) => void;
}

const SalonInfo = ({ settings, onUpdate }: SalonInfoProps) => {
  const [formData, setFormData] = useState({
    name: settings.name,
    shortDescription: settings.shortDescription,
    longDescription: settings.longDescription,
    latitude: settings.latitude || null,
    longitude: settings.longitude || null,
    durreRendezvous: settings.durreRendezvous || 30  // Default to 30 minutes if not set
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' 
      ? e.target.value === '' ? null : parseFloat(e.target.value)
      : e.target.value;

    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Impossible d'obtenir la position. Veuillez vérifier vos paramètres de localisation.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Info className="text-primary-600" size={24} />
        <h2 className="text-xl font-semibold">Informations sur le salon</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
       

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom du salon
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brève description
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Une brève description qui apparaît dans les résultats de recherche et les cartes
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description complète
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Description détaillée de votre salon, de vos services et de vos caractéristiques uniques
          </p>
        </div>
         {/* Duration field - Added at the top */}
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée standard d'un rendez-vous (minutes)
          </label>
          <input
            type="number"
            name="durreRendezvous"
            value={formData.durreRendezvous}
            onChange={handleChange}
            min="1"
            max="480"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            La durée par défaut pour les rendez-vous dans votre salon (entre 1 et 480 minutes)
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Position géographique
            </label>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <MapPin size={16} />
              <span>Utiliser ma position actuelle</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude ?? ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: 48.8566"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude ?? ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: 2.3522"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalonInfo;