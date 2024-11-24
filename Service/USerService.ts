import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/users';




export const getUserById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/user/${ id }`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };


  export const getUserByMail = async (userMail: string) => {
    try {
      const response = await axios.get(`${API_URL}/user/email/${ userMail }`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };
  export const getUserByPhone = async (phone: string) => {
    try {
      const response = await axios.get(`${API_URL}/user/phone/${ phone }`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };


  export const resgisterAnonyme = async (Phone: string ,name: string,email: string) => {
    try {
      const response = await axios.post(`${API_URL}/registerAnonyms`,{
        name,
        email,
        Phone
      });
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };