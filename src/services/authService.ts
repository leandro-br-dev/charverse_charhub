import { apiService } from './api';
import type { User, LoginCredentials, RegisterCredentials, ApiResponse } from '@/types';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/login', credentials);
  }

  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/register', credentials);
  }

  async logout(): Promise<ApiResponse> {
    return apiService.post('/auth/logout');
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
    return apiService.post('/auth/refresh', { refreshToken });
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/auth/me');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put<User>('/auth/me', data);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<ApiResponse> {
    return apiService.post('/auth/change-password', data);
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return apiService.post('/auth/forgot-password', { email });
  }

  async resetPassword(data: { token: string; password: string }): Promise<ApiResponse> {
    return apiService.post('/auth/reset-password', data);
  }

  async verifyEmail(token: string): Promise<ApiResponse> {
    return apiService.post('/auth/verify-email', { token });
  }

  async resendVerification(): Promise<ApiResponse> {
    return apiService.post('/auth/resend-verification');
  }
}

export const authService = new AuthService();
export default authService;