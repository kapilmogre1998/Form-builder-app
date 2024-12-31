import axios from 'axios'
import { API_URL } from '../../constant'

export const getFormBotAnalyticDataAPI = async (id) => {
    try {
        return await axios.get(`${API_URL}/api/form-bot/analytics?formId=${id}`, )
    } catch (error) {
       throw error;
    }
}