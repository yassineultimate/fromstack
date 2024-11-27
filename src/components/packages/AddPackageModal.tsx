import React, { useState,useRef } from 'react';
import { SalonPackage } from '../../types/package';
import { createPackagebySalon } from '../../../Service/PackageService';
interface AddPackageModalProps {
  onClose: () => void;
  onAdd: (pkg: Omit<SalonPackage, 'id'>) => void;
}

const AddPackageModal = ({ onClose, onAdd }: AddPackageModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    image: '',
    description: '',
   
  });
  const SalonId = localStorage.getItem('SalonId');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
  
      const newpackage = {
        ...formData,
        image: selectedImage || formData.image
      };
        const response = await  createPackagebySalon(newpackage,parseInt(SalonId!, 0))  
        
        if (response.package.id>0) {
     
          const addedStaffTemplate: SalonPackage = {
            id: response.package.id.toString(), // Convert to string to match interface
            name: response.package.name,
            price: Number(response.package.price),
            image: response.package.image,
            duration: Number( response.package.duration), // Provide default if not in response
            description:response.package.description
          };
          onAdd(addedStaffTemplate);
          onClose();
        } else {
          console.error('Failed to add staff');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
  
     
    };
    
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Package</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Enter package name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Minutes"
                min="1"
                required
              />
            </div>
          </div>

          

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Package
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div className="mt-1 flex items-center space-x-4">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Choose File
              </button>
              {selectedImage && (
                <div className="relative w-16 h-16">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
 

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Enter package description"
              rows={3}
            />
          </div>

          

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackageModal;