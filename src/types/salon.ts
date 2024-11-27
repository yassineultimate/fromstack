export interface SalonHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
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

export interface SalonManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'primary' | 'assistant';
  joinedAt: string;
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
}

export interface Salon {
  id: string;
  name: string;
  address: string;
  managers: SalonManager[];
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}