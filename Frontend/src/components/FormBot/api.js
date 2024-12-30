import axios from 'axios'
import { API_URL } from '../../constant'

export const getFormBotAPI = async (id) => {
    try {
        return await axios.get(`${API_URL}/api/get/form-bot/${id}`, )
    } catch (error) {
       throw error;
    }
}

export const storeFormBotAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/store/form-bot`, data)
    } catch (error) {
       throw error;
    }
}