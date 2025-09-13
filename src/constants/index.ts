// Application constants

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CharHub';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
export const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CHARACTERS: '/characters',
  CHARACTER_DETAIL: '/characters/:id',
  CHARACTER_CREATE: '/characters/create',
  STORIES: '/stories',
  STORY_DETAIL: '/stories/:id',
  STORY_CREATE: '/stories/create',
  CHAT: '/chat',
  CHAT_SESSION: '/chat/:sessionId',
  ASSISTANTS: '/assistants',
  ASSISTANT_DETAIL: '/assistants/:id',
  BILLING: '/billing',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const AGE_RATINGS = [
  { value: 'GENERAL', label: 'General (All Ages)' },
  { value: 'TEEN', label: 'Teen (13+)' },
  { value: 'MATURE', label: 'Mature (17+)' },
  { value: 'ADULT', label: 'Adult (18+)' },
] as const;

export const USER_ROLES = [
  { value: 'USER', label: 'Free User' },
  { value: 'PREMIUM', label: 'Premium User' },
  { value: 'ADMIN', label: 'Administrator' },
] as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'charverse_auth_token',
  REFRESH_TOKEN: 'charverse_refresh_token',
  USER_DATA: 'charverse_user_data',
  THEME: 'charverse_theme',
  LANGUAGE: 'charverse_language',
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const LANGUAGES = {
  EN: 'en',
  PT: 'pt',
  ES: 'es',
} as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 12,
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const WEBSOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  CHAT_MESSAGE: 'chat:message',
  CHAT_JOIN: 'chat:join',
  CHAT_LEAVE: 'chat:leave',
  NOTIFICATION: 'notification',
  USER_STATUS: 'user:status',
} as const;