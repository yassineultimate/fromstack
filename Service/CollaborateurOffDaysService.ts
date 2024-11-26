import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/CollaborateurOffDay';

export const getCollaborateurOfByID= async (id: Number ) => {
    
    try{
    const response = await axios.get(`${API_URL}/consecutive-days/${ id }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const adddayof = async (CollaboratorId: number, reason: string, startDate: string,endDate : string) => {
    try {
      const response = await axios.post(`${API_URL}/off-days`, {
        startDate,
        endDate,
        reason,
        CollaboratorId
    
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


  export const deletedayof = async (CollaboratorId: number, startDate: string,endDate : string) => {
    try {
      const response = await axios.delete(`${API_URL}/off-days/period`, {
        data: {  // Add this data object
          startDate,
          endDate,
          CollaboratorId
        }
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
  
  