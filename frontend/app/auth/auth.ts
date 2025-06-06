import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { UserPayload } from '../types/users';
import { jwtDecode } from 'jwt-decode';

// Patch Axios config to include _retry
declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL: 'https://avito-frontend-trainee-assignment-winter.onrender.com',
});

// Access token handling
const getAccessToken = (): string | null => localStorage.getItem('accessToken');
const setAccessToken = (token: string): void =>
  localStorage.setItem('accessToken', token);
const removeAccessToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

let refreshPromise: Promise<string> | null = null;

// Intercept requests: Add token
api.interceptors.request.use((config) => {
  const currentAccessToken = getAccessToken();
  if (currentAccessToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
  }
  return config;
});

// Intercept responses: Try refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = err.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = api
          .post<{ accessToken: string }>('/api/refresh_token')
          .then((r) => {
            setAccessToken(r.data.accessToken);
            return r.data.accessToken;
          })
          .catch((refreshError) => {
            logout();
            console.error('Refresh token failed:', refreshError);
            return Promise.reject(
              refreshError instanceof Error
                ? refreshError
                : new Error(String(refreshError))
            );
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        const newToken = await refreshPromise;
        if (newToken) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return api.request(originalRequest);
        }
      } catch (e) {
        return Promise.reject(e instanceof Error ? e : new Error(String(e)));
      }
    }

    return Promise.reject(err);
  }
);

// Auth API
export async function login(username: string, password: string): Promise<void> {
  const { data } = await api.post<{ accessToken: string }>('/api/login', {
    username,
    password,
  });
  setAccessToken(data.accessToken);
}

export async function signup(
  username: string,
  password: string
): Promise<void> {
  await api.post('/api/signup', { username, password });
}

export function logout(): void {
  removeAccessToken();
}

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const getCurrentUser = (): UserPayload | null => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<UserPayload>(token);
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return decoded;
  } catch (e) {
    console.error('JWT decode error:', e);
    return null;
  }
};

export default api;
