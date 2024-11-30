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
  password: string;
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

export interface Category {
  id: string;
  name: string;
 
}
export const dayMap = {
  0:'Dimanche',
  1:'Lundi' ,
  2:'Mardi'  ,
  3:'Mercredi' ,
  4: 'Jeudi',
  5:'Vendredi' ,
  
    6: 'Samedi'
  } as const;
export const dayMap2 = {
  'Dimanche':0,
  'Lundi' :1,
   'Mardi' :2 ,
   'Mercredi' :3,
  'Jeudi':4,
  'Vendredi' :5,
  'Samedi':6
} as const;