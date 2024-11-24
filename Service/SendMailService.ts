import axios from 'axios';
import ConfigService from './ConfigService';
const BASE_URL = ConfigService.getBaseUrl()+'/api/Email';


export const SendMAil= async (  
    to:string,
    subject:string,
    message:string,
    
 
    
   ) => {
    
    try{
    const response = await axios.post(`${BASE_URL}/send-email`,{to,subject,message});
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }