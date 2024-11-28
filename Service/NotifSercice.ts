import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/notifications'; // Mettez à jour avec l'URL de votre API


export const getnotreadNotif= async (id: number) => {
    
    try{
    const response = await axios.get(`${API_URL}/${ id }/unread`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  export const getnotreadNotiftoday= async (id: number) => {
    
    try{
    const response = await axios.get(`${API_URL}/${ id }/unreaddate`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  export const createNotif= async (formadate: any) => {
    let notifData = { ...formadate };
    try{
    const response = await axios.post(`${API_URL}/`,{notifData});
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  export const getallnotif= async () => {
    
    try{
    const response = await axios.get(`${API_URL}/all/upcomings`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const getallnotifbyuser= async (iduser:string) => {
    
    try{
    const response = await axios.get(`${API_URL}/all/upcomingusers/${ iduser }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  
  export const getallnotifbysalon= async (idsalon:number) => {
    
    try{
    const response = await axios.get(`${API_URL}/all/upcomingsalon/${ idsalon }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const deletenotif= async (id: string) => {
    
    try{
    const response = await axios.delete(`${API_URL}/${ id }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }