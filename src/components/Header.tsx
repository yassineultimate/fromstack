import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import NotificationViewer from './notifications/NotificationViewer';
import { useNotifications } from '../hooks/useNotifications';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const name = localStorage.getItem('name');
  const user1 = new URL('../assets/icons/user3.png', import.meta.url).href;
  const isAdmin = localStorage.getItem('role') === 'admin';
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationViewer
            notifications={notifications}
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            onMarkAsRead={markAsRead}
          />
        </div>
        <div className="flex items-center space-x-3">
          <img
            src={user1}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400"> {isAdmin ? 'Admin' : 'Manager'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;