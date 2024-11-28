import axios from 'axios';
import ConfigService from './ConfigService';
const API_URL = ConfigService.getBaseUrl()+'/api/UserAdmin';




export const getUserAdminById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/UserAdmin/${ id }`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };


  export const getAlluseradmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/alluser`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };
  
 
  export const createadmin = async (admin: any ) => {
    try {
      let admindata = { ...admin }
      const response = await axios.post(`${API_URL}/create`,{admindata
       
      });
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };

  export const deleteadmin = async (id:string) => {
    try {
      const response = await axios.delete(`${API_URL}/${ id }`);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };
  export const resgisterUserAdmin = async (Phone: string ,name: string,email: string,password:string ) => {
    try {
      const response = await axios.post(`${API_URL}/resgisterUserAdmin`,{
        name,
        email,
        password,
        Phone,
      });
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };

  export const loginUserAdmin = async (email: string,password:string ) => {
    try {
      const response = await axios.post(`${API_URL}/loginUserAdmin`,{
         
        email,
        password,
      
      });
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw new Error('Failed to log in');
    }
  };