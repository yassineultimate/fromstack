import React, { useState } from 'react';
import { SalonManager } from '../../../types/salon';
import { resgisterManager } from '../../../../Service/MAnegerService';
import { Phone } from 'lucide-react';

interface AddManagerModalProps {
  salonId: string;
  onClose: () => void;
  onAdd: (manager: Omit<SalonManager, 'id' | 'joinedAt'>) => void;
}

const AddManagerModal = ({salonId, onClose, onAdd }: AddManagerModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Validation functions
  const validateName = (name: string) => {
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
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

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
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
      case 'email':
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case 'phone':
        setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
        break;
      case 'password':
        setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const passwordError = validatePassword(formData.password);

    // Update errors state
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError
    });

    // Check if there are any validation errors
    if (nameError || emailError || phoneError || passwordError) {
      return; // Stop submission if there are errors
    }

    try {
      const response = await resgisterManager(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        parseInt(salonId!, 0)
      );
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
        <h3 className="text-lg font-semibold mb-4">Add New Manager</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Manager Name
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'
              }`}
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
              Add Manager
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddManagerModal;