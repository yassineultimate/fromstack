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


  export const updateImage= async (idsalon: number,imageG:any,type:string ,idimageSLot:number,portfolioImageSlots:number) => {

    const data: { 
        id: number; 
        [key: string]: any 
      } = {
        id: idsalon
      };
    
      // Dynamically create the image key based on the type
      if (type === 'photos') {
        data[`image${idimageSLot}`] = imageG;
      } else {
        data[`imagegal${portfolioImageSlots}`] = imageG;
      }
    
      try {
        const response = await axios.put(`${BASE_URL}/salonimage/${idsalon}`,data);
        return response.data;
      } catch (error) {
        console.error('Axios error:', error);
        throw new Error('Failed to fetch salon info');
      }
    };