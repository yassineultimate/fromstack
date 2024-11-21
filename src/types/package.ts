export interface SalonPackage {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  image: string;
  isActive: boolean;
  description?: string;
  services: string[]; // IDs of included services
  discount?: number; // Percentage discount compared to buying services separately
}