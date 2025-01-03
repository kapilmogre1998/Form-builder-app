import axios from 'axios'
import { API_URL } from '../../constant'

const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

export const updateUserAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/update`, data, { headers: getHeaders() })
    } catch (error) {
       throw error;
    }
}