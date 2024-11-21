import React, { useState } from 'react';
import { Camera, Plus, Trash2, Image } from 'lucide-react';

interface PhotoGalleryProps {
  salonPhotos: string[];
  portfolioImages: string[];
  onAddPhotos: (type: 'photos' | 'portfolioImages', urls: string[]) => void;
  onDeletePhoto: (type: 'photos' | 'portfolioImages', url: string) => void;
}

const PhotoGallery = ({
  salonPhotos,
  portfolioImages,
  onAddPhotos,
  onDeletePhoto
}: PhotoGalleryProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [selectedType, setSelectedType] = useState<'photos' | 'portfolioImages'>('photos');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPhotos(selectedType, [newPhotoUrl]);
    setNewPhotoUrl('');
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Camera className="text-primary-600" size={24} />
          <h2 className="text-xl font-semibold">Photos & Portfolio</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Photo</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'photos' | 'portfolioImages')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="photos">Salon Photos</option>
              <option value="portfolioImages">Portfolio Images</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Photo
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salon Photos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {salonPhotos.map((url) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt="Salon"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => onDeletePhoto('photos', url)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioImages.map((url) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt="Portfolio"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => onDeletePhoto('portfolioImages', url)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;