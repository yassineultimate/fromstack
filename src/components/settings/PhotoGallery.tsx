import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Plus, Trash2, Image } from 'lucide-react';
import { updateImage,getSalonsAttributeByID } from '../../../Service/SalonService';

interface PhotoGalleryProps {
  salonPhotos: string[];
  portfolioImages: string[];
  onAddPhotos: (type: 'photos' | 'portfolioImages', urls: string[]) => void;
  onDeletePhoto: (type: 'photos' | 'portfolioImages', url: string, alt: string) => void;
}

const PhotoGallery = ({
  salonPhotos,
  portfolioImages,
  onAddPhotos,
  onDeletePhoto
}: PhotoGalleryProps) => {
  const MAX_SALON_PHOTOS = 4;
  const MAX_PORTFOLIO_IMAGES = 15;

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'photos' | 'portfolioImages'>('photos');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const SalonId = localStorage.getItem('SalonId');
  // Calculate available slots dynamically
  const [salonPhotoSlots, setSalonPhotoSlots] = useState<number>(MAX_SALON_PHOTOS);
  const [portfolioImageSlots, setPortfolioImageSlots] = useState<number>(MAX_PORTFOLIO_IMAGES);

  // Update available slots when photos change
  useEffect(() => {
    setSalonPhotoSlots(MAX_SALON_PHOTOS - salonPhotos.length);
  }, [salonPhotos]);

  useEffect(() => {
    setPortfolioImageSlots(MAX_PORTFOLIO_IMAGES - portfolioImages.length);
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
  const findFirstEmptyImageKey = async (
    salonId: number, 
    type: 'photos' | 'portfolioImages'
  ): Promise<string | null> => {
    try {
      // Fetch the current salon data to check existing image keys
      const response = await getSalonsAttributeByID(salonId)
      const salon = response;
  
      // Define the keys to check based on the type
      const keysToCheck = type === 'photos' 
        ? ['image1', 'image2', 'image3', 'image4']
        : Array.from({length: 15}, (_, i) => `imagegal${i + 1}`);
  
      // Find the first key that is empty or has a null/undefined value
      for (const key of keysToCheck) {
        if (!salon[key]) {
          return key;
        }
      }
  
      // If all keys are filled, return null
      return null;
    } catch (error) {
      console.error('Error checking image keys:', error);
      throw error;
    }
  };
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Reset previous error and start upload
    setUploadError(null);
    setIsUploading(true);

    try {
      // Determine current available slots based on selected type
      const availableSlots = selectedType === 'photos' 
        ? salonPhotoSlots 
        : portfolioImageSlots;

      // Prevent upload if no slots available
      if (availableSlots <= 0) {
        throw new Error(`No more slots available for ${selectedType}`);
      }
      const imageKey = await findFirstEmptyImageKey(parseInt(SalonId!, 0), selectedType);

      // If no empty key found, throw an error
      if (!imageKey) {
        throw new Error(`No available slots for ${selectedType}`);
      }
  
      

      // Assuming updateImage now takes current slot count and dynamically generated image key
      const response = await updateImage(
        parseInt(SalonId!, 0), // presumably salon ID or user ID
        selectedFile, 
        selectedType, 
        imageKey, // Pass the dynamically generated image key
        selectedType === 'photos' ? salonPhotoSlots : portfolioImageSlots
      );

      // Dynamically get the uploaded image URL based on the response structure
      const uploadedImageUrl = response.salon[imageKey];

      // Verify the image URL exists before adding
      if (!uploadedImageUrl) {
        throw new Error('Failed to retrieve uploaded image URL');
      }

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
        setUploadError(error instanceof Error ? error.message : 'An unexpected error occurred.');
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
              <option value="photos">Salon Photos (Slots: {salonPhotoSlots}/{MAX_SALON_PHOTOS})</option>
              <option value="portfolioImages">Portfolio Images (Slots: {portfolioImageSlots}/{MAX_PORTFOLIO_IMAGES})</option>
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
            Salon Photos ({salonPhotos.length}/{MAX_SALON_PHOTOS})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {salonPhotos.map((url, index) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt={`image${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                
                />
                <button
                  onClick={() => onDeletePhoto('photos', url,`image${index + 1}`)}
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
            Portfolio Images ({portfolioImages.length}/{MAX_PORTFOLIO_IMAGES})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {portfolioImages.map((url, index) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt={`imagegal${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                
                />
                <button
                  onClick={() => onDeletePhoto('portfolioImages', url,`imagegal${index + 1}`)}
            
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