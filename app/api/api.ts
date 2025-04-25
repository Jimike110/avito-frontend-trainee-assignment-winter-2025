import axios, { AxiosResponse } from 'axios';
import { AdvertItem } from '../types/form';

export const API_BASE_URL: string = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchAdverts = async (): Promise<AdvertItem[]> => {
  const response: AxiosResponse<AdvertItem[]> = await api.get('/items');
  return response.data;
};

export const createAdvert = async (
  advertData: AdvertItem
): Promise<AdvertItem> => {
  const response: AxiosResponse<AdvertItem> = await api.post(
    '/items',
    advertData
  );
  return response.data;
};

export const fetchAdvertById = async (id: string): Promise<AdvertItem> => {
  const response: AxiosResponse<AdvertItem> = await api.get(`/items/${id}`);
  return response.data;
};

export const updateAdvertById = async (id: string, advertData: AdvertItem) => {
  const response: AxiosResponse<AdvertItem> = await api.put(
    `/items/${id}`,
    advertData
  );
  return response.data;
};

export const deleteAdvertById = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};
