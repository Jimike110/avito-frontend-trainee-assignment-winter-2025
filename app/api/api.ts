import axios from "axios";

const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
    baseURL: API_BASE_URL,
})

export const fetchAdverts = async () => {
    const response = await api.get(`${API_BASE_URL}/items`);
    return response.data;
}

export const createAdvert = async (advertData) => {
    const response = await api.post(`${API_BASE_URL}/items`, advertData);
    return response.data;
}

export const fetchAdvertById = async (id) => {
    const response = await api.get(`${API_BASE_URL}/items/${id}`);
    return response.data;
}

export const updateAdvertById = async (id) => {
    const response = await api.put(`${API_BASE_URL}/items/${id}`);
    return response.data;
}

export const deleteAdvertById = async (id) => {
    await api.delete(`${API_BASE_URL}/items/${id}`);
}