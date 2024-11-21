export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'all' | 'salon' | 'client';
  targetId?: string; // salonId or clientId
  createdAt: string;
  isRead: boolean;
  expiresAt?: string;
}

export type NotificationType = 'all' | 'salon' | 'client';