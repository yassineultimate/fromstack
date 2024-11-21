import React, { useState } from 'react';
import { Notification, NotificationType } from '../../types/notification';

interface AddNotificationModalProps {
  onClose: () => void;
  onAdd: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
}

const AddNotificationModal = ({ onClose, onAdd }: AddNotificationModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'all' as NotificationType,
    targetId: '',
    expiresAt: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title: formData.title,
      message: formData.message,
      type: formData.type,
      ...(formData.targetId && { targetId: formData.targetId }),
      ...(formData.expiresAt && { expiresAt: formData.expiresAt })
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Global</option>
              <option value="salon">Salon Specific</option>
              <option value="client">Client Specific</option>
            </select>
          </div>

          {formData.type !== 'all' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'salon' ? 'Salon ID' : 'Client ID'}
              </label>
              <input
                type="text"
                name="targetId"
                value={formData.targetId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
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
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotificationModal;