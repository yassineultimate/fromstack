export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  discount: number;
  discountName: string;
  startDate: string;
  endDate: string;
  salonId: string;
  isActive: boolean;
  image?: string;
}