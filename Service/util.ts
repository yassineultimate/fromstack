 
import { Staff, SalonCollaData,DayOff } from '../src/types/staff';
import {Buffer} from 'buffer'
import imageCompression from 'browser-image-compression';
import { getCollaborateurOfByID } from '../Service/CollaborateurOffDaysService';
export const convertToBase64 = (imageArray: Uint8Array | null): string | null => {
  if (!imageArray) return null;
  return `data:image/jpeg;base64,${Buffer.from(imageArray).toString('base64')}`;
};


export const validateImage = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Type de fichier invalide. Veuillez télécharger un JPEG, PNG ou GIF.');
  }

  if (file.size > maxSize) {
    throw new Error('Fichier trop volumineux. Veuillez télécharger une image de moins de 5MB.');
  }

  return true;
};
 
export const renderProfileImage = (profilePicture:any) => {
  // If the image is stored as base64
  if (profilePicture && profilePicture.startsWith('data:image')) {
    return profilePicture;
  }
  // If the image is stored as binary/buffer, convert it to base64
  else if (profilePicture) {
    return `data:image/jpeg;base64,${profilePicture}`;
  }
  return '/api/placeholder/64/64'; // Fallback placeholder
};

  
export function mapToDayOffs(databaseObjects: Array<{ 
  startDate: string, 
  endDate: string, 
  numberOfDays: number 
}>): DayOff[] {
  return databaseObjects.map((obj, index) => ({
    id: index + 1, // Use index-based ID
    startDate: obj.startDate,
    endDate: obj.endDate,
    reason: '' // Default empty reason
  }));
}
export async function convertSalonCollaToStaff(data: SalonCollaData[]): Promise<Staff[]> {
  // Use Promise.all to handle multiple async operations in parallel
  return await Promise.all(data.map(async item => {
      try {
          const [img, dayoff] = await Promise.all([
            renderProfileImage(item.profilePicture),
              getCollaborateurOfByID(item.id)
          ]);
          const daysOff = dayoff.data.map((off :any) => ({
            start: off.startDate,
            end: off.endDate,
            reason: ''
        }));
        
          
          return {
              id: String(item.id),
              name: item.name,
              speciality: item.specialization,
              image: img ?? '',
              phone: item.Phone,
              address: '', // Can be updated based on requirements
              daysOff: daysOff // Assuming dayoff has a daysOff property
          };
      } catch (error) {
          console.error(`Error processing staff member ${item.id}:`, error);
          // Return a default object in case of error
          return {
              id: String(item.id),
              name: item.name,
              speciality: item.specialization,
              image: '',
              phone: item.Phone,
              address: '',
              daysOff: []
          };
      }
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




    export  const compressImage = async (imageFile: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800;
              const MAX_HEIGHT = 600;
              let width = img.width;
              let height = img.height;
              
              // Calculate new dimensions
              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              
              // Convert to base64 with reduced quality
              const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
              resolve(compressedBase64);
            };
            
            img.onerror = (error) => {
              reject(error);
            };
          };
          
          reader.onerror = (error) => {
            reject(error);
          };
        });
      };
 