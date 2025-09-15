// Global type definitions for CharHub

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'USER' | 'PREMIUM' | 'ADMIN';
  credits: number;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  background: string;
  avatar?: string;
  isPublic: boolean;
  ageRating: 'GENERAL' | 'TEEN' | 'MATURE' | 'ADULT';
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  content: string;
  isPublic: boolean;
  ageRating: 'GENERAL' | 'TEEN' | 'MATURE' | 'ADULT';
  tags: string[];
  characterIds: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  systemPrompt: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  characterId?: string;
  assistantId?: string;
}

export interface ChatSession {
  id: string;
  name: string;
  characterId?: string;
  assistantId?: string;
  messages: ChatMessage[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreditTransaction {
  id: string;
  amount: number;
  type: 'PURCHASE' | 'USAGE' | 'REFUND' | 'BONUS';
  description: string;
  userId: string;
  createdAt: string;
}

export interface PaymentPackage {
  id: string;
  name: string;
  description: string;
  credits: number;
  price: number;
  currency: string;
  isActive: boolean;
}