import React, { useState } from 'react';
import { Admin } from '../../types/admin';

interface AddAdminModalProps {
  onClose: () => void;
  onAdd: (admin: Omit<Admin, 'id' | 'lastLogin'>) => void;
}

const AddAdminModal = ({ onClose, onAdd }: AddAdminModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    Phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    Phone: '',
    password: ''
  });

  const validatePhoneNumber = (phone: string): boolean => {
    // Validate phone number for exactly 8 digits
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone.trim());
  };

  const validateEmail = (email: string): boolean => {
    // Standard email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = (password: string): boolean => {
    // Password validation: 
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: formData.name.trim() ? '' : 'Name is required',
      email: validateEmail(formData.email) ? '' : 'Invalid email format',
      Phone: validatePhoneNumber(formData.Phone) ? '' : 'Invalid phone number',
      password: validatePassword(formData.password) ? '' : 'Password must be at least 8 characters with uppercase, lowercase, and number'
    };

    setErrors(newErrors);

    // Check if any errors exist
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form before submission
    if (validateForm()) {
      // Sanitize inputs before submission
      const sanitizedData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        Phone: formData.Phone.trim(),
        password: formData.password
      };

      onAdd(sanitizedData);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Admin</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
                ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'}`}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'}`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
                ${errors.Phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'}`}
              placeholder="Enter 8-digit phone number (e.g., 22042202)"
              required
            />
            {errors.Phone && <p className="text-red-500 text-xs mt-1">{errors.Phone}</p>}
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
                ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'}`}
              placeholder="Min. 8 chars, uppercase, lowercase, number"
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
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;