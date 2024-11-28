export interface Notification {
  id: string;
  title: string;
  description: string;
  typeNotif: 'all' | 'offer' | 'Message'|'Global'|'Salons';
  targetId?: string; // salonId or clientId
  createdAt: string;
  isRead: boolean;
  expiresAt?: string;
}

export type NotificationType = 'all' | 'offer' | 'Message'|'Global'|'Salons';