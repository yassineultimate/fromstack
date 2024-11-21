import React from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { Notification } from '../../types/notification';

interface NotificationListProps {
  notifications: Notification[];
  onDelete: (id: string) => void;
}

const NotificationList = ({ notifications, onDelete }: NotificationListProps) => {
  return (
    <div className="divide-y">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 flex items-start justify-between ${
            notification.isRead ? 'bg-white' : 'bg-blue-50'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${
              notification.isRead ? 'bg-gray-100' : 'bg-blue-100'
            }`}>
              <Bell size={20} className={notification.isRead ? 'text-gray-600' : 'text-blue-600'} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{notification.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  notification.type === 'all'
                    ? 'bg-purple-100 text-purple-800'
                    : notification.type === 'salon'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {notification.type === 'all' ? 'Global' : notification.type === 'salon' ? 'Salon' : 'Client'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(notification.id)}
            className="text-red-600 hover:text-red-700 p-2"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;