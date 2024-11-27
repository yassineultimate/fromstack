import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/Manager';




export const getUserById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/Manager/${ id }`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };


   
  


  export const resgisterManager = async (Phone: string ,name: string,email: string,password:string ) => {
    try {
      const response = await axios.post(`${API_URL}/register`,{
        name,
        email,
        password,
        Phone,
      });
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };

  export const loginManager = async (email: string,password:string ) => {
    try {
      const response = await axios.post(`${API_URL}/loginManager`,{
         
        email,
        password,
      
      });
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };