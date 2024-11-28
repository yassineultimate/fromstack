import React, { useState, useEffect } from 'react';
import { Bell, Plus, Search } from 'lucide-react';
import { Notification, NotificationType } from '../types/notification';
import NotificationList from '../components/notifications/NotificationList';
import AddNotificationModal from '../components/notifications/AddNotificationModal';
import {getallnotif,createNotif,deletenotif} from './../../Service/NotifSercice';
const AdminNotifications = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<NotificationType | ''>('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Replace {userId} with actual user ID from your auth system
         // Update this with actual user ID
      const response = await getallnotif();
      setNotifications(response);
      setError('');
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    try {
      const response = await createNotif(notification);
  
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isRead: false
      };
      setNotifications(prev => [newNotification, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding notification:', err);
      // Handle error (you might want to show an error message to the user)
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deletenotif(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
      // Handle error
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || notification.typeNotif === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Send Notification</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as NotificationType | '')}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              <option value="all">Global</option>
              <option value="Salons">Salons</option>
              <option value="Message">Message</option>
              <option value="offer">offer</option>
            </select>
          </div>
        </div>

        <NotificationList
          notifications={filteredNotifications}
          onDelete={handleDeleteNotification}
        />
      </div>

      {showAddModal && (
        <AddNotificationModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddNotification}
        />
      )}
    </div>
  );
};

export default AdminNotifications;