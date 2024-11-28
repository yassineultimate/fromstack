import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/banner';

export const allbanner = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };
  

  export const createBanner = async (banner: any) => {
    let bannerData = { ...banner };
    try{
      const response = await axios.post(`${API_URL}/`,{bannerData});
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };
  export const deletebanner = async (id:string) => {
    try {
      const response = await axios.delete(`${API_URL}/${ id }`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };