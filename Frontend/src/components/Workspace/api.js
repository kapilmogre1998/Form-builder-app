import axios from 'axios'
import { API_URL } from '../../constant'

export const createFormBotAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/form-bot`, data);
    } catch (error) {
       throw error;
    }
}

export const fetchFormBotAPI = async ({ folderId, formId }) => {
    try {
        return await axios.get(`${API_URL}/api/get/form-bot?formId=${formId}&folderId=${folderId}`);
    } catch (error) {
       throw error;
    }
}