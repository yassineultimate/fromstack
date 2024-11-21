 
import { Staff, SalonCollaData } from '../src/types/staff';
export  const convertToBase64 = (imageArray: Uint8Array | null): string | null => {
    if (!imageArray) return null;
    return `data:image/jpeg;base64,${Buffer.from(imageArray).toString('base64')}`;
    };


    export function convertSalonCollaToStaff(data: SalonCollaData[]): Staff[] {
        return data.map(item => ({
          id: String(item.id),
          name: item.name,
          speciality: item.specialization,
          // Convert base64 string to Uint8Array if needed
          image: item.profilePicture 
            ? new TextEncoder().encode(item.profilePicture as unknown as string) 
            : null,
          phone: item.Phone,
          address: '', // You may want to update this source of address
          daysOff: []
        }));
      }
      
      // Alternative approach if you prefer a more explicit conversion
      export function base64ToUint8Array(base64: string | null): Uint8Array | null {
        if (!base64) return null;
        
        try {
          // Remove data URL prefix if present
          const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
          
          // Decode base64 to binary string
          const binaryString = atob(base64Data);
          
          // Convert binary string to Uint8Array
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          
          return bytes;
        } catch (error) {
          console.error('Error converting base64 to Uint8Array:', error);
          return null;
        }
      }