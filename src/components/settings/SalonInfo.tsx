import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { SalonSettings } from '../../types/salon';

interface SalonInfoProps {
  settings: SalonSettings;
  onUpdate: (info: Pick<SalonSettings, 'name' | 'shortDescription' | 'longDescription'>) => void;
}

const SalonInfo = ({ settings, onUpdate }: SalonInfoProps) => {
  const [formData, setFormData] = useState({
    name: settings.name,
    shortDescription: settings.shortDescription,
    longDescription: settings.longDescription
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Info className="text-primary-600" size={24} />
        <h2 className="text-xl font-semibold">Salon Information</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salon Name
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
            Short Description
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
            A brief description that appears in search results and cards
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Description
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
            Detailed description of your salon, services, and unique features
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalonInfo;