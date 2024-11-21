export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  image: string;
  isActive: boolean;
  description?: string;
  category?: string;
}