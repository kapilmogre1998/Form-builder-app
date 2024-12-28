import axios from 'axios'
import { API_URL } from '../../constant'

export const updateUserAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/update`, data)
    } catch (error) {
       throw error;
    }
}