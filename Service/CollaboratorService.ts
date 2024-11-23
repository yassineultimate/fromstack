import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/collaborators';

 
export const  createCollaborator = async(data: any) =>{
  try{ 
    const response =await axios.post(API_URL, data);
  return response.data;
} catch (error) {
  console.log('Axios error:', error);
  throw new Error('Failed to log in');
}
}

  export const getCollaborators= async (salonId: string)=> {
    try{ const response = await axios.get(`${API_URL}/${salonId}`);
    return response.data;
  } catch (error) {
    console.log('Axios error:', error);
    throw new Error('Failed to log in');
  }
}
  export const getunisqueCollaborateurBySalon= async (salonId: number,CollaberID: number)=> {
    try{ const response = await  axios.get(`${API_URL}/salons/${salonId}/collaborators/${CollaberID}`); 
    return response.data;
    // Assurez-vous que cette route existe dans vos routes
  } catch (error) {
    console.log('Axios error:', error);
    throw new Error('Failed to log in');
  }
}


export const getallCollaborateurBYsalon= async (salonId: number) => {
    
  try{
  const response = await axios.get(`${API_URL}/salons/${salonId}/collaborators`); 
   return response.data; // 
  } catch (error) {
    console.log('Axios error:', error);
    throw new Error('Failed to log in');
  }
}

export const deleteStaff= async (collabID: number) => {
    
  try{
  const response = await axios.delete(`${API_URL}/${collabID}`); 
   return response.data; // 
  } catch (error) {
    console.log('Axios error:', error);
    throw new Error('Failed to log in');
  }
}
 
export const addstaff2 = async (salonId: number, newStaff: any) => {
  try {
    // If the image is a File object, convert it to base64
    let staffData = { ...newStaff };
    
    if (staffData.profilePicture instanceof File) {
      const base64Image = await convertFileToBase64(staffData.profilePicture);
      staffData.profilePicture = base64Image;
    }

    const response = await axios.post(
      `${API_URL}/salons/${salonId}/collaborators2`,
      staffData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
  
  }
};
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
