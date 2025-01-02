import axios from 'axios'
import { API_URL } from '../../constant'

const headers = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
};

export const createFormWorkspaceAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/form-workspace`, data, { headers });
    } catch (error) {
        throw error;
    }
}

export const fetchFormWorkspaceAPI = async ({ folderId, formId, ownerId }) => {
    try {
        return await axios.get(`${API_URL}/api/get/form-workspace?ownerId=${ownerId}&formId=${formId}&folderId=${folderId}`, { headers });
    } catch (error) {
        throw error;
    }
}