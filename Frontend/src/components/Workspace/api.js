import axios from 'axios'
import { API_URL } from '../../constant'

export const createFormWorkspaceAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/form-workspace`, data);
    } catch (error) {
       throw error;
    }
}

export const fetchFormWorkspaceAPI = async ({ folderId, formId }) => {
    try {
        return await axios.get(`${API_URL}/api/get/form-workspace?formId=${formId}&folderId=${folderId}`);
    } catch (error) {
       throw error;
    }
}