import { AxiosResponse } from 'axios';
import { AdvertItem } from '../types/form';
import { Username } from '../types/users';
import { api } from '../auth/auth'

export let API_BASE_URL: string = import.meta.env.VITE_APP_BASE_URL;

if (
  window.location.hostname !== 'localhost' &&
  window.location.protocol === 'http:'
) {
  // Assuming if not localhost and using HTTP, it might be the phone
  API_BASE_URL = `http://192.168.18.254:3000`;
}


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

export const verifyUserToAdvert = async (id: string, username: string) => {
  const response: AxiosResponse<boolean> = await api.get(
    `/api/verify/${id}`,
    username
  );
  return response.data;
}

export const updateAdvertById = async (id: string, advertData: AdvertItem, username: Username["username"]) => {
  const response: AxiosResponse<AdvertItem> = await api.put(
    `/items/${id}`,
    advertData,
    username
  );
  return response.data;
};

export const deleteAdvertById = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};
