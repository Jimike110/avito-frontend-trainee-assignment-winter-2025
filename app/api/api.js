import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchAdverts = async () => {
    const response = await api.get('/items');
    return response.data;
}

export const createAdvert = async (advertData) => {
    const response = await api.post('/items', advertData);
    return response.data;
}

export const fetchAdvertById = async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
}

export const updateAdvertById = async (id, advertData) => {
    const response = await api.put(`/items/${id}`, advertData);
    return response.data;
}

export const deleteAdvertById = async (id) => {
    await api.delete(`/items/${id}`);
}