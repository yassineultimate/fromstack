export interface Admin {
    id: string;
    name: string;
    email: string;
    role: 'super_admin' | 'admin';
    status: 'active' | 'inactive';
    phone: string;
    lastLogin?: string;
  }