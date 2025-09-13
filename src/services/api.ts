import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/constants';
import type { ApiResponse } from '@/types';

class ApiService {
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors and refresh tokens
    this.api.interceptors.response.use(
      (response: any) => {
        return response;
      },
      async (error: any) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
            if (refreshToken) {
              const response = await this.post<{ token: string; refreshToken: string }>('/auth/refresh', {
                refreshToken,
              });

              if (response.data) {
                const { token, refreshToken: newRefreshToken } = response.data;
                localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.api(originalRequest);
              }
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            this.logout();
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  async get<T = any>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.api.get(url, { params });
    return response.data;
  }

  async post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post(url, data);
    return response.data;
  }

  async put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put(url, data);
    return response.data;
  }

  async delete<T = any>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete(url);
    return response.data;
  }

  async upload<T = any>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    const response = await this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;