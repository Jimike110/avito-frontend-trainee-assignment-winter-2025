import axios from 'axios';
import { UserPayload } from '../types/users';
import { jwtDecode } from 'jwt-decode';

// Configure default axios
export const api = axios.create({ baseURL: 'http://localhost:3000' }); // Make sure this matches your server

// Function to get the token from localStorage
const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Function to set the token in localStorage
const setAccessToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

// Function to remove the token from localStorage
const removeAccessToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken'); // Also remove refresh token if you store it here
};

let refreshPromise: Promise<string> | null = null;

// Attach access token
api.interceptors.request.use(config => {
  const currentAccessToken = getAccessToken();
  if (currentAccessToken) {
    config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
  }
  return config;
});

// On 401, try to refresh
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    const status = err.response?.status;

    // Only attempt refresh if it's a 401 and not a retry request itself
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've tried to refresh for this request

      if (!refreshPromise) {
        refreshPromise = api.post<{ accessToken: string }>('/api/refresh_token') // Assuming your backend uses cookies for refresh token
          .then(r => {
            setAccessToken(r.data.accessToken);
            return r.data.accessToken;
          })
          .catch(refreshError => {
            // If refresh fails, logout the user
            logout();
            console.error("Refresh token failed, logging out:", refreshError);
            // Optionally redirect to login or show a message
            // window.location.href = '/login';
            return Promise.reject(refreshError);
          })
          .finally(() => { refreshPromise = null; });
      }
      
      try {
        const newToken = await refreshPromise;
        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api.request(originalRequest); // Retry original request with new token
        }
      } catch (e) {
        return Promise.reject(e); // refreshPromise already handled logout
      }
    }
    return Promise.reject(err);
  }
);

export async function login(username: string, password: string): Promise<void> {
  const { data } = await api.post<{ accessToken: string; refreshToken?: string }>('/api/login', { username, password });
  setAccessToken(data.accessToken);
  // If your backend also sends a refreshToken to be stored in localStorage (less secure but common)
  // if (data.refreshToken) {
  //   localStorage.setItem('refreshToken', data.refreshToken);
  // }
}

export async function signup(username: string, password: string): Promise<void> {
  await api.post('/api/signup', { username, password });
}

export function logout(): void {
  removeAccessToken();
  // Optionally: make an API call to invalidate the token on the server
  // api.post('/api/logout').catch(err => console.error("Logout API call failed", err));
  // Here you might want to redirect or update UI state via a state manager/context
}

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const getCurrentUser = (): UserPayload | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  try {
    const decodedToken: UserPayload = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('accessToken');
      return null;
    }
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}



export default api;