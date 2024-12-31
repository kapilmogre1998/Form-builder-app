import axios from 'axios'
import { API_URL } from '../../constant'

export const getFormBotAPI = async (id) => {
    try {
        return await axios.get(`${API_URL}/api/get/form-bot/${id}`, )
    } catch (error) {
       throw error;
    }
}

export const submitFormBotAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/submit/form-bot`, data)
    } catch (error) {
       throw error;
    }
}

export const addViewCountAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/view/count`, data)
    } catch (error) {
       throw error;
    }
}

export const startViewCountAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/form/start-count`, data)
    } catch (error) {
       throw error;
    }
}