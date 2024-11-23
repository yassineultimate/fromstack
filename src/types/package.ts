export interface SalonPackage {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  image: string;
  
  description?: string;
 
}