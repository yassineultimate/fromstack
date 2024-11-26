import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/CalendarSalon';





export const updateTime = async (
   
    data: {
      SalonId: number;
      jour: number;
      isClosed?: boolean;
      heure_début?: number;
      heure_fin?: number;
    }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/update-days/${ data.SalonId }`, {
        SalonId: data.SalonId,
        jour: data.jour,
        isClosed: data.isClosed,
        heure_début: data.heure_début,
        heure_fin: data.heure_fin
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
      return response.data;
    } catch (error) {
      console.error('Axios error:', error);
      throw new Error('Failed to update calendar time');
    }
  };