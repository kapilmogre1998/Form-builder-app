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

export const createNewFileAPI = async (data) => {
    try {
        return await axios.post(`${API_URL}/api/create/file`, data)
    } catch (error) {
       throw error;
    }
}