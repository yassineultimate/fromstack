import React, { useState, useEffect } from 'react';
import { Notification, NotificationType } from '../../types/notification';
import {getalluser} from './../../../Service/USerService';
import {getsalonsadmin} from './../../../Service/SalonService';
import {createNotif} from './../../../Service/NotifSercice';
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface Salon {
  id: string;
  name: string;
  // Add other salon properties as needed
}

interface AddNotificationModalProps {
  onClose: () => void;
  onAdd: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
}

const AddNotificationModal = ({ onClose, onAdd }: AddNotificationModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    typeNotif: 'Global' as NotificationType,
    targetId: '',
    expiresAt: ''
  });

  const [users, setUsers] = useState<User[]>([]);
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch users when needed
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getalluser(); // Replace with your API endpoint
    
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  // Fetch salons when needed
  const fetchSalons = async () => {
    setLoading(true);
    try {
      const response = await getsalonsadmin(); // Replace with your API endpoint
     
      setSalons(response.data);
    } catch (error) {
      console.error('Error fetching salons:', error);
    }
    setLoading(false);
  };

  // Handle type change and fetch appropriate data
  useEffect(() => {
    if (formData.typeNotif === 'offer' || formData.typeNotif === 'Message') {
      fetchUsers();
    } else if (formData.typeNotif === 'Salons') {
      fetchSalons();
    }
  }, [formData.typeNotif]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let UserId;
    let SalonId ;
   
    // Create notification object
    if (formData.typeNotif === 'offer' || formData.typeNotif === 'Message') {
      UserId = formData.targetId;
    } else if (formData.typeNotif === 'Salons') {
      SalonId = formData.targetId;
    }

    const notification = {
      title: formData.title,
      description: formData.description,
      typeNotif: formData.typeNotif,
      UserId,
      SalonId,
      dateTime:formData.expiresAt
    
    };


    try {
      // Save notification to backend
      const response = await createNotif(notification)
       
      

      // Call the onAdd callback with the new notification
      onAdd(notification);
      onClose();
    } catch (error) {
      console.error('Error saving notification:', error);
      // Handle error (show error message to user)
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset targetId when type changes
      ...(name === 'typeNotif' && { targetId: '' }),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Send New Notification</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="typeNotif"
              value={formData.typeNotif}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="Global">Global</option>
              <option value="Salons">Salon Specific</option>
              <option value="offer">Offer</option>
              <option value="Message">Message</option>
            </select>
          </div>

          {(formData.typeNotif === 'offer' || formData.typeNotif === 'Message') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select User
              </label>
              <select
                name="targetId"
                value={formData.targetId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.typeNotif === 'Salons' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Salon
              </label>
              <select
                name="targetId"
                value={formData.targetId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select a salon</option>
                {salons.map(salon => (
                  <option key={salon.id} value={salon.id}>
                    {salon.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date (Optional)
            </label>
            <input
              type="datetime-local"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {loading && (
            <div className="text-center text-gray-600">Loading...</div>
          )}

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
              disabled={loading}
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotificationModal;