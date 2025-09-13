import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/types';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    loadUser,
    clearError,
  } = useAuthStore();

  // Load user on mount if token exists
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      const token = localStorage.getItem('charverse_auth_token');
      if (token) {
        loadUser();
      }
    }
  }, [isAuthenticated, isLoading, loadUser]);

  const handleLogin = async (credentials: LoginCredentials) => {
    clearError();
    await login(credentials);
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    clearError();
    await register(credentials);
  };

  const handleLogout = async () => {
    clearError();
    await logout();
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
  };
};