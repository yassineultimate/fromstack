import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/reservation'; // Mettez à jour avec l'URL de votre API

export const getReservationBySalon= async (idsalon: number) => {
    
    try{
    const response = await axios.get(`${API_URL}/reservations/salon/${ idsalon }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const deletereservation= async (idreservation: number) => {
    
    try{
    const response = await axios.delete(`${API_URL}/reservations/${ idreservation }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const cancelReservation= async (idreservation: number,status:string) => {
    
    try{
    const response = await axios.put(`${API_URL}/cancelReservation/${ idreservation }`,{status},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const createReservation= async (date:string,status:string,CollaboratorId:Number,SalonId:Number,UserId:Number,startTime:string,endTime:string,totalPrice:number,SalonServiceId:number) => {
    
    try{
    const response = await axios.post(`${API_URL}/reservations`,{
      date,
      status,
      CollaboratorId,
      
      SalonId,
      UserId,
      startTime,
      endTime,
      totalPrice,
      SalonServiceId
    },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }