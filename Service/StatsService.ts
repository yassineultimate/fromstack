import axios from 'axios';
import ConfigService from './ConfigService';
 
const BASE_URL_Reservation = ConfigService.getBaseUrl()+'/api/reservation';
 

export const getcustomergrowth= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/customer-growth`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const getcustomergrowthdetailed= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/customer-growth-detailed`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  export const getappointmentsmetrics= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/appointments-metrics`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  export const getappointmentsbreakdown= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/appointments-breakdown`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const getrevenuemetrics= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/revenue-metrics`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  export const getrevenuebreakdown= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/revenue-breakdown`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const getpackagesbookedmetrics= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/packages-booked-metrics`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  export const getpackagesbreakdown= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/packages-breakdown`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  export const getservicebookedmetrics= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/service-booked-metrics`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  export const getservicebreakdown= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/${ salonId }/service-breakdown`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }


  export const getmonthlygrowth= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/monthly-growth/${ salonId }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  export const getweeklyrevenue= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/weekly-revenue/${ salonId }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }

  export const getupcomingappointments= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/upcoming-appointments/${ salonId }`);
    
      return response.data;

     

    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  

  export const getpopularservices= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/popular-services/${ salonId }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  export const getpopularpackages= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/popular-packages/${ salonId }`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }
  
  export const getstaffperformance= async(salonId: number) => {
    try{
      const response = await axios.get(`${BASE_URL_Reservation}/salon/${ salonId }/collaborators/top-performance`);
     return response.data; // 
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  }