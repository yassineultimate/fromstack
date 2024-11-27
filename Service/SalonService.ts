// src/services/SalonService.ts
import axios from 'axios';
import ConfigService from './ConfigService';
const BASE_URL = ConfigService.getBaseUrl()+'/api/salons';

interface SalonUpdateData {
  name: string;
  DescriptionPetite: string;
  Description: string;
  position_géographique: {
    type: string;
    coordinates: [number | null, number | null];
  };
  durreRendezvous: number | null;
  Phone: string;
  adresse: string;
}


export const getSalonsAttributeByID= async (id: number) => {
    
    try{
    const response = await axios.get(`${BASE_URL}/saloninfo/${ id }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  export const getsalonsadmin= async () => {
    
    try{
    const response = await axios.get(`${BASE_URL}/salonsadmin`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  export const updateImage= async (idsalon: number,imageG:any,type:string ,idimageSLot:string,portfolioImageSlots:number) => {

    const data: { 
        id: number; 
        [key: string]: any 
      } = {
        id: idsalon
      };
    
      // Dynamically create the image key based on the type
      if (type === 'photos') {
        data[`${idimageSLot}`] = imageG;
      } else {
        data[`${idimageSLot}`] = imageG;
      }
    
      try {
        const response = await axios.put(`${BASE_URL}/salonimage/${idsalon}`,data);
        return response.data;
      } catch (error) {
        console.error('Axios error:', error);
        throw new Error('Failed to fetch salon info');
      }
    };


    export const deleteimage= async (idsalon: number, alt:string) => {

         
          try {
            const response = await axios.put(`${BASE_URL}/salonimage/${idsalon}/imagecolumn/${alt}`);
            return response.data;
          } catch (error) {
            console.error('Axios error:', error);
            throw new Error('Failed to fetch salon info');
          }
        };


        export const updateSalon = async (salonId: number, formData: any): Promise<any> => {
          try {
            // Restructure the data according to the specified format
            const updatePayload: SalonUpdateData = {
              name: formData.name,
              DescriptionPetite: formData.shortDescription,
              Description: formData.longDescription,
              position_géographique: {
                type: 'Point', // Explicitly set the type
                coordinates: [formData.longitude, formData.latitude] // Note the order: [longitude, latitude]
              },
              durreRendezvous: formData.durreRendezvous,
              Phone: formData.phone,
              adresse: formData.address
            };
        
            // Make the API call with the restructured payload
            const response = await axios.put(`${BASE_URL}/salonupdate/${salonId}`, updatePayload);
            
            return response.data;
          } catch (error) {
            console.error('Error updating salon:', error);
            throw error;
          }
        };
       
        