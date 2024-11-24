// src/services/SalonService.ts
import axios from 'axios';
import ConfigService from './ConfigService';
const BASE_URL = ConfigService.getBaseUrl()+'/api/salons';




export const getSalonsAttributeByID= async (id: number) => {
    
    try{
    const response = await axios.get(`${BASE_URL}/saloninfo/${ id }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }