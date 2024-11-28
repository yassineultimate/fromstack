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


   
  


  export const resgisterManager = async (name: string,email: string,phone: string ,password:string ,SalonId:number) => {
    try {
      const response = await axios.post(`${API_URL}/register`,{
        name,
        email,
        password,
        phone,
        SalonId,
      
       
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


  export const deletemanager = async (idmanager:string ) => {
    try {
      const response = await axios.delete(`${API_URL}/deletManager/${ idmanager }`)
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };