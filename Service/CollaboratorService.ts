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
 
