export interface Staff {
  id: string;
  name: string;
  speciality: string;
  image: string;
  address: string;
  phone: string;
  daysOff: {
    start: string;
    end: string;
    reason?: string;
  }[];
}