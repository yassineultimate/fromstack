import { useState, useEffect } from 'react';
import { Notification } from '../types/notification';
import {getallnotifbysalon,getallnotifbyuser } from './../../Service/NotifSercice';

export const useNotifications = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const SalonId = localStorage.getItem('SalonId');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Booking Request',
      description: 'You have a new booking request from Sarah for tomorrow at 2 PM',
      typeNotif: 'Salons',
      createdAt: new Date().toISOString(),
      isRead: false
    },
    {
      id: '2',
      title: 'Special Offer',
      description: 'New summer promotion is now active. 20% off on all services.',
      typeNotif: 'all',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      isRead: true
    },
    {
      id: '3',
      title: 'Client Review',
      description: 'Emma left a 5-star review for her last appointment',
      typeNotif: 'Message',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      isRead: false
    }
  ]);

  useEffect(() => {
    fetchnotif();
  }, []);

  const fetchnotif = async () => {
    try {
      setLoading(true);
      // Replace {userId} with actual user ID from your auth system
         // Update this with actual user ID
      const response = await getallnotifbysalon(parseInt(SalonId!, 0));
      setNotifications(response);
      setError('');
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.isRead).length);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    addNotification
  };
};