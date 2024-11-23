import axios from 'axios';
import ConfigService from './ConfigService';
const BASE_URL =ConfigService.getBaseUrl()+'/api/SalonService';

export const createservicebySalon= async ( newService: any,salonId:number) => {
 
    let serviceData = { ...newService };
    try {
      const response = await axios.post(`${BASE_URL}/${ salonId }/services`,  serviceData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error( 'Failed to create salon');
    }
  }
  export const deleteService= async(idalon: number,idservice:number) => {
    try{
      const response = await axios.delete(`${BASE_URL}/salons/:${ idalon }/services/${ idservice }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  

  export const getServiceofSalonByid= async(idalon: number) => {
    try{
      const response = await axios.get(`${BASE_URL}/salons/${ idalon }/services`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  

