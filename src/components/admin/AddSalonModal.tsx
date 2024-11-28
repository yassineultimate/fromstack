import React, { useState } from 'react';
import { Salon, SalonManager } from '../../types/salon';
import { addSalonadmin } from '../../../Service/SalonService';

interface AddSalonModalProps {
  onClose: () => void;
  onAdd: (salon: Omit<Salon, 'id'>) => void;
}

const AddSalonModal = ({ onClose, onAdd }: AddSalonModalProps) => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    address: '',
    manager: '',
    email: '',
    phone: '',
    managers: [] as SalonManager[],
    status: 'active' as const
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  // Validation functions
  const validateName = (name: string) => {
    if (name.trim().length < 2) {
      return 'Salon name must be at least 2 characters long';
    }
    return '';
  };

  const validateAddress = (address: string) => {
    if (address.trim().length < 5) {
      return 'Please provide a complete address';
    }
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate the field as it's being changed
    switch (name) {
      case 'name':
        setErrors(prev => ({ ...prev, name: validateName(value) }));
        break;
      case 'address':
        setErrors(prev => ({ ...prev, address: validateAddress(value) }));
        break;
      case 'email':
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case 'phone':
        setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const nameError = validateName(formData.name);
    const addressError = validateAddress(formData.address);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);

    // Update errors state
    setErrors({
      name: nameError,
      address: addressError,
      email: emailError,
      phone: phoneError
    });

    // Check if there are any validation errors
    if (nameError || addressError || emailError || phoneError) {
      return; // Stop submission if there are errors
    }

    try {
      const response = await addSalonadmin(formData);
      onAdd(formData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you could set a general error state or show a toast message
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Salon</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salon Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'
              }`}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                errors.address ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'
              }`}
              required
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'
              }`}
              required
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
              Add Salon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalonModal;