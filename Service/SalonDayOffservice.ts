// src/services/SalonService.ts
import axios from 'axios';
import ConfigService from './ConfigService';
const BASE_URL = ConfigService.getBaseUrl()+'/api/SalonOffDay';


export const adddayofsalon = async (SalonId: number, reason: string, startDate: string,endDate : string) => {
    try {
      const response = await axios.post(`${BASE_URL}/off-days`, {
        startDate,
        endDate,
        reason,
        SalonId
    
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response.data.message);
      }
      console.error('Failed to create off day:', error);
      throw new Error('Failed to create off day. Please try again.');
    }
  };
  export const deletedayofsalon = async (SalonId: number, startDate: string, endDate: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/off-days/period`, {
        data: {  // Add this data object
          startDate,
          endDate,
          SalonId
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error(error.response.data.message);
      }
      console.error('Failed to delete off days:', error);
      throw new Error('Failed to delete off days. Please try again.');
    }
  };