import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Package, 
  Scissors,
  Settings,
  LogOut,
  Bell,
  Flag,
  Building2
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('role') === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const menuItems = isAdmin
    ? [
        { icon: Building2, label: 'Salons', path: '/admin/salons' },
        { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
        { icon: Flag, label: 'Banners', path: '/admin/banners' },
        { icon: Users, label: 'Admin Management', path: '/admin/settings' },
      ]
    : [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Staff', path: '/dashboard/staff' },
        { icon: Scissors, label: 'Services', path: '/dashboard/services' },
        { icon: Package, label: 'Packages', path: '/dashboard/packages' },
        { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
      ];

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-500">
          {isAdmin ? 'Admin Portal' : 'Salon Manager'}
        </h1>
      </div>
      
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-500'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 w-full px-4 py-3"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;