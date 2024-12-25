import axios from 'axios'
import { API_URL } from '../../constant'

export const loginAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/login`, data)
    } catch (error) {
       throw error;
    }
}