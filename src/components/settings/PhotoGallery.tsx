import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Plus, Trash2, Image } from 'lucide-react';
import { updateImage } from '../../../Service/SalonService';

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
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'photos' | 'portfolioImages'>('photos');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Track available image slots for each type
  const [salonPhotoSlots, setSalonPhotoSlots] = useState<number>(4);
  const [portfolioImageSlots, setPortfolioImageSlots] = useState<number>(15);

  // Update available slots when photos change
  useEffect(() => {
    setSalonPhotoSlots(4 - salonPhotos.length);
  }, [salonPhotos]);

  useEffect(() => {
    setPortfolioImageSlots(15 - portfolioImages.length);
  }, [portfolioImages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result will be a data URL like 'data:image/jpeg;base64,...'
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Reset previous error and start upload
    setUploadError(null);
    setIsUploading(true);

    try {
      // Replace with your actual backend endpoint
     
      const response = await updateImage(5,selectedFile,selectedType,salonPhotoSlots,portfolioImageSlots)
    

      // Assuming the backend returns the URL of the uploaded image
      const uploadedImageUrl = response.data.imageUrl;

      // Update the parent component's state with the new image URL
      onAddPhotos(selectedType, [uploadedImageUrl]);

      // Reset form state
      setSelectedFile(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Image upload failed:', error);
      
      // Handle different types of upload errors
      if (axios.isAxiosError(error)) {
        setUploadError(error.response?.data?.message || 'Upload failed. Please try again.');
      } else {
        setUploadError('An unexpected error occurred.');
      }
    } finally {
      setIsUploading(false);
    }
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
          disabled={
            (selectedType === 'photos' && salonPhotoSlots === 0) ||
            (selectedType === 'portfolioImages' && portfolioImageSlots === 0)
          }
        >
          <Plus size={20} />
          <span>Add Photo</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleImageUpload} className="bg-gray-50 p-4 rounded-lg mb-6">
          {uploadError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {uploadError}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'photos' | 'portfolioImages')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="photos">Salon Photos (Slots: {salonPhotoSlots}/4)</option>
              <option value="portfolioImages">Portfolio Images (Slots: {portfolioImageSlots}/15)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select a photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-600 file:text-white
                hover:file:bg-primary-700
                file:transition-colors"
              required
              disabled={
                (selectedType === 'photos' && salonPhotoSlots === 0) ||
                (selectedType === 'portfolioImages' && portfolioImageSlots === 0)
              }
            />
            {selectedFile && (
              <div className="mt-4">
                <img 
                  src={selectedFile} 
                  alt="Selected" 
                  className="max-w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setSelectedFile(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              disabled={
                !selectedFile || 
                isUploading || 
                (selectedType === 'photos' && salonPhotoSlots === 0) ||
                (selectedType === 'portfolioImages' && portfolioImageSlots === 0)
              }
            >
              {isUploading ? (
                <>
                  <span className="mr-2">Uploading...</span>
                  <svg 
                    className="animate-spin h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </>
              ) : (
                'Add Photo'
              )}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Salon Photos ({salonPhotos.length}/4)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Portfolio Images ({portfolioImages.length}/15)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
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