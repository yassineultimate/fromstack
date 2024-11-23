import axios from 'axios';
import ConfigService from './ConfigService';
const BASE_URL = ConfigService.getBaseUrl()+'/api/packagesService';



export const getPackageofSalonByid= async(idalon: number) => {
    try{
      const response = await axios.get(`${BASE_URL}/${ idalon }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  
  export const createPackagebySalon= async ( newpackage: any,salonId:number) => {
 
    let serviceData = { ...newpackage };
    try {
      const response = await axios.post(`${BASE_URL}/${ salonId }/package`,  serviceData,
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
  export const deletePackage= async(idalon: number,idservice:number) => {
    try{
      const response = await axios.delete(`${BASE_URL}/salons/:${ idalon }/services/${ idservice }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }