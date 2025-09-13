import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services';
import { STORAGE_KEYS } from '@/constants';
import type { AuthState, User, LoginCredentials, RegisterCredentials } from '@/types';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokenAction: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

interface AuthStore extends AuthState, AuthActions {
  error: string | null;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          if (response.success && response.data) {
            const { user, token, refreshToken } = response.data;

            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.error || 'Login failed');
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.error || error.message || 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(credentials);
          if (response.success && response.data) {
            const { user, token, refreshToken } = response.data;

            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.error || 'Registration failed');
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.error || error.message || 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_DATA);

          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      refreshTokenAction: async () => {
        const { refreshToken } = get();
        if (!refreshToken) throw new Error('No refresh token available');

        try {
          const response = await authService.refreshToken(refreshToken);
          if (response.success && response.data) {
            const { token, refreshToken: newRefreshToken } = response.data;

            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

            set({
              token,
              refreshToken: newRefreshToken,
            });
          } else {
            throw new Error(response.error || 'Token refresh failed');
          }
        } catch (error) {
          // If refresh fails, logout user
          get().logout();
          throw error;
        }
      },

      loadUser: async () => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await authService.getProfile();
          if (response.success && response.data) {
            set({
              user: response.data,
              token,
              refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error('Failed to load user');
          }
        } catch (error) {
          console.error('Load user error:', error);
          get().logout();
        } finally {
          set({ isLoading: false });
        }
      },

      updateUser: (user: User) => {
        set({ user });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: STORAGE_KEYS.USER_DATA,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);