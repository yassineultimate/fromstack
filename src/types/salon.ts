export interface SalonHours {
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  open: string;
  close: string;
  isClosed: boolean;
}

export interface SalonHoliday {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface SalonSettings {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  photos: string[];
  portfolioImages: string[];
  businessHours: SalonHours[];
  holidays: SalonHoliday[];
  latitude: number | null;
  longitude: number | null;
  durreRendezvous: number | null;
}

export const dayMap = {
  0: 'Dimanche',
  1: 'Lundi',
  2: 'Mardi',
  3: 'Mercredi',
  4: 'Jeudi',
  5: 'Vendredi',
  6: 'Samedi'
} as const;

