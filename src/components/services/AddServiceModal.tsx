import React, { useState,useRef } from 'react';
import { Service } from '../../types/service';
import { createservicebySalon } from '../../../Service/ServiceService';

import{compressImage} from '../../../Service/util'
interface AddServiceModalProps {
  onClose: () => void;
  onAdd: (service: Omit<Service, 'id'>) => void;
}

const AddServiceModal = ({ onClose, onAdd }: AddServiceModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    image: ''
  
  });


 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
  
    const newservice = {
      ...formData,
      image: selectedImage || formData.image
    };
      const response = await  createservicebySalon(newservice,5)  
      
      if (response.service.id>0) {
   
        const addedStaffTemplate: Service = {
          id: response.service.id.toString(), // Convert to string to match interface
          name: response.service.name,
          price: Number(response.service.price),
          image: response.service.image,
          duration: Number( response.service.duration), // Provide default if not in response
         
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
        <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Enter service name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix Dinars</label>
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
              Image service
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
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;