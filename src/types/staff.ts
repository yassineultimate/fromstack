export interface Staff {
  id: string;
  name: string;
  speciality: string;
  image: string
  address: string;
  phone: string;
  daysOff: {
    start: string;
    end: string;
    reason?: string;
  }[];
}

export interface SalonCollaData {
  id: number;
  name: string;
  specialization: string;
  profilePicture: Uint8Array | null;
  Phone: string;
  Open: boolean;
}
export interface DayOff {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
 
}