import axios from 'axios'
import { API_URL } from '../../constant'

const headers = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
};

export const getFormBotAnalyticDataAPI = async (id) => {
    try {
        return await axios.get(`${API_URL}/api/form-bot/analytics?formId=${id}`, {headers})
    } catch (error) {
       throw error;
    }
}