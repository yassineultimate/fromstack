import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/TimeSlot'; // Mettez à jour avec l'URL de votre API


export const addtimeSlot= async (
    date:string,
    dayOfWeek:number,
    CollaboratorId:number,
  
     
    startTime:string,
    endTime:string,
    
 
    
  ) => {
    
    try{
    const response = await axios.post(`${API_URL}/`,{    date,dayOfWeek,CollaboratorId,startTime,endTime});
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }