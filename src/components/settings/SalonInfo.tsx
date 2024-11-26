import React, { useState, useEffect } from 'react';
import { Clock,CheckCircle2  } from 'lucide-react';
import { Info, MapPin } from 'lucide-react';
import { updateSalon } from '../../../Service/SalonService';

interface SalonSettings {
  name: string;
  shortDescription: string;
  longDescription: string;
  latitude: number | null;
  longitude: number | null;
  durreRendezvous: number | null;
  phone: string; // New phone field
  address: string; // New address field
}
interface SalonInfoProps {
  settings?: SalonSettings; // Make settings optional
  onUpdate: (info: Pick<SalonSettings, 'name' | 'shortDescription' | 'longDescription' | 'latitude' | 'longitude' | 'durreRendezvous' | 'phone' | 'address'>) => void;
}

const SalonInfo = ({ settings, onUpdate }: SalonInfoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState<SalonSettings>({
    name: '',
    shortDescription: '',
    longDescription: '',
    latitude: null,
    longitude: null,
    durreRendezvous: 30, // Default appointment duration
    phone: '', // Initialize phone field
    address: '' // Initialize address field
  });

  // Effect to update form data when settings prop changes
  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.name || '',
        shortDescription: settings.shortDescription || '',
        longDescription: settings.longDescription || '',
        latitude: settings.latitude || null,
        longitude: settings.longitude || null,
        durreRendezvous: settings.durreRendezvous || 30,
        phone: settings.phone || '', // Add phone
        address: settings.address || '' // Add address
      });
    }
    setIsLoading(false);
  }, [settings]);


  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
     try{
      const response = await  updateSalon(5,formData)  
     
        onUpdate(formData);
        setUpdateSuccess(true);
    
    } catch (error) {
      setUpdateSuccess(false);
      console.error('Error:', error);
    }


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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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
          {/* New Phone Number Field */}
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Ex: +33 1 23 45 67 89"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Numéro de téléphone du salon pour les réservations et contacts
          </p>
        </div>

        {/* New Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse complète
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Ex: 123 Rue de la Beauté, 75001 Paris"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Adresse complète de votre salon
          </p>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée standard d'un rendez-vous (minutes)
          </label>
          <input
            type="number"
            name="durreRendezvous"
            value={formData.durreRendezvous ?? ''}
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
          {updateSuccess && (
          <div className="mt-4 flex items-center text-green-600 space-x-2">
            <CheckCircle2 size={24} />
            <span>Mise à jour réussie !</span>
          </div>
        )}
        </div>
      </form>
    </div>
  );
};

export default SalonInfo;