import axios from 'axios'
import { API_URL } from '../../constant'

export const getFolderListAPI = async (id) => {
    try {
        return await axios.get(`${API_URL}/api/all/folders?id=${id}`, )
    } catch (error) {
       throw error;
    }
}

export const createNewFolderAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/folder`, data)
    } catch (error) {
       throw error;
    }
}

export const deleteFolderAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/delete/folder`, data)
    } catch (error) {
       throw error;
    }
}

export const createNewFormAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/form`, data)
    } catch (error) {
       throw error;
    }
}

export const deleteFormAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/delete/form`, data)
    } catch (error) {
       throw error;
    }
}