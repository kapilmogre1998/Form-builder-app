import axios from 'axios'
import { API_URL } from '../../constant'

const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

export const getFolderListAPI = async (id) => {
    try {
        return await axios.get(`${API_URL}/api/all/folders?id=${id}`, { headers: getHeaders() } )
    } catch (error) {
       throw error;
    }
}

export const createNewFolderAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/folder`, data, { headers })
    } catch (error) {
       throw error;
    }
}

export const deleteFolderAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/delete/folder`, data, { headers })
    } catch (error) {
       throw error;
    }
}

export const createNewFormAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/new-form`, data, { headers })
    } catch (error) {
       throw error;
    }
}

export const deleteFormAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/delete/form`, data, { headers })
    } catch (error) {
       throw error;
    }
}

export const allWorkspaceAPI = async (id) => {
    try {
        return await axios.get(`${API_URL}/api/all-workspace?ownerId=${id}`, { headers })
    } catch (error) {
       throw error;
    }
}

export const shareWorkspaceAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/share-url`, data, { headers })
    } catch (error) {
       throw error;
    }
}