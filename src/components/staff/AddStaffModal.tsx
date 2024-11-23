import React, { useState, useRef } from 'react';
import { Staff } from '../../types/staff';
import { addstaff2 } from '../../../Service/CollaboratorService';
interface AddStaffModalProps {
  onClose: () => void;
  onAdd: (staff: Omit<Staff, 'id' | 'daysOff'>) => void;
}

const specialities = ['hairecut', 'bruching', 'manicure'];

const AddStaffModal = ({ onClose, onAdd }: AddStaffModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    profilePicture: '',
   
  
  });
   
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.specialization) {
      alert('Please select a specialization');
      return;
    }
    const newStaff = {
      ...formData,
      profilePicture: selectedImage || formData.profilePicture
    };

    try {
      const response = await  addstaff2(5,newStaff)  
      
      if (response.id>0) {
   
        const addedStaffTemplate: Staff = {
          id: response.id.toString(), // Convert to string to match interface
          name: response.name,
          speciality: response.specialization,
          image: response.profilePicture,
          address:  '', // Provide default if not in response
          phone:  '', // Provide default if not in response
          daysOff: [] // Initialize empty array for daysOff
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
        <h3 className="text-lg font-semibold mb-4">Add New Staff Member</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter staff name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speciality
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              {specialities.map(specialization => (
                <option key={specialization} value={specialization}>
                  {specialization.charAt(0).toUpperCase() + specialization.slice(1)}
                </option>
              ))}
            </select>
          </div>

          

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;