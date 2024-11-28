import React from 'react';
import { Bell, X, Calendar, Info, Tag,MessageCircleCode,AlarmCheck,Workflow } from 'lucide-react';
import { Notification } from '../../types/notification';

interface NotificationViewerProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationViewer = ({ notifications, isOpen, onClose, onMarkAsRead }: NotificationViewerProps) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type: Notification['typeNotif']) => {
    switch (type) {
      case 'Salons':
        return <Workflow className="text-blue-500" size={18} />;
      case 'Message':
        return <MessageCircleCode className="text-green-500" size={18} />;
      case 'offer':
        return <AlarmCheck className="text-green-500" size={18} />;
      case 'Global':
            return <Tag className="text-green-500" size={18} />;
      default:
        return <Info className="text-purple-500" size={18} />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Bell className="text-primary-600" size={20} />
          <h3 className="font-semibold text-gray-900">Notifications</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No new notifications
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  notification.isRead ? 'opacity-75' : ''
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.typeNotif)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.description}
                    </p>
                    {!notification.isRead && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default NotificationViewer;