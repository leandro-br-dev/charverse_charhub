import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { API_BASE_URL } from '@/constants';

// Supported locales
export const SUPPORTED_LOCALES = [
  'en', // English
  'pt', // Portuguese
  'es', // Spanish
  'fr', // French
  'de', // German
  'it', // Italian
  'ja', // Japanese
  'ko', // Korean
  'zh', // Chinese
] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

// Namespaces based on the application structure
export const NAMESPACES = [
  'common',     // Shared components and UI elements
  'navigation', // Header, Sidebar, Menu
  'auth',       // Login, Register, Forgot Password
  'home',       // Home page
  'dashboard',  // Dashboard page
  'characters', // Character management
  'stories',    // Story management
  'settings',   // Settings page
  'errors',     // Error messages
] as const;

export type Namespace = typeof NAMESPACES[number];

// Language detection options
const DETECTION_OPTIONS = {
  // order and from where user language should be detected
  order: ['localStorage', 'navigator', 'htmlTag'],

  // keys or params to lookup language from
  lookupLocalStorage: 'charverse-locale',

  // cache user language on
  caches: ['localStorage'],

  // optional expire and domain for set cookie
  excludeCacheFor: ['cimode'], // languages to not persist (dev mode)
};

// Backend options for loading translations
const BACKEND_OPTIONS = {
  // path where resources get loaded from
  loadPath: `${API_BASE_URL}/api/v1/i18n/{{lng}}/{{ns}}`,

  // path to post missing resources
  addPath: `${API_BASE_URL}/api/v1/i18n/{{lng}}/{{ns}}`,

  // allow cross domain requests
  crossDomain: true,

  // allow credentials on cross domain requests
  withCredentials: false,

  // define how to send data to the backend
  // POST vs GET
  requestOptions: {
    mode: 'cors',
    credentials: 'same-origin',
    cache: 'default',
  },

  // add custom headers
  customHeaders: {
    'Accept': 'application/json',
  },

  // can be used to reload resources in a specific interval (useful in dev mode)
  reloadInterval: false,
};

// i18next configuration
const i18nConfig = {
  // debug mode for development
  debug: process.env.NODE_ENV === 'development',

  // fallback language
  fallbackLng: 'en',

  // default namespace
  defaultNS: 'common',

  // namespaces
  ns: NAMESPACES,

  // interpolation options
  interpolation: {
    escapeValue: false, // React already escapes values
  },

  // react specific options
  react: {
    // turn off if you want to use Suspense
    useSuspense: true,
    // wait for the first render cycle to end before triggering the i18n change event
    wait: true,
  },

  // backend options
  backend: BACKEND_OPTIONS,

  // detection options
  detection: DETECTION_OPTIONS,

  // load strategy
  load: 'languageOnly', // no region specific locales like en-US, just en

  // preload languages
  preload: ['en'],

  // key separator
  keySeparator: '.',

  // char to split namespace from key
  nsSeparator: ':',

  // char to split keys
  pluralSeparator: '_',

  // char to split context from key
  contextSeparator: '_',

  // fallback keys
  fallbackOnNull: true,
  fallbackOnEmpty: true,

  // save missing
  saveMissing: process.env.NODE_ENV === 'development',
  saveMissingTo: 'current',

  // parsing
  parseMissingKeyHandler: (key: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation key: ${key}`);
    }
    return key;
  },
};

// Initialize i18next
i18n
  .use(Backend) // Backend plugin for loading translations
  .use(LanguageDetector) // Language detector plugin
  .use(initReactI18next) // React integration
  .init(i18nConfig);

// Helper function to check if locale is supported
export const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
};

// Helper function to get the current locale
export const getCurrentLocale = (): SupportedLocale => {
  const current = i18n.language;
  return isSupportedLocale(current) ? current : 'en';
};

// Helper function to change language
export const changeLanguage = async (locale: SupportedLocale): Promise<void> => {
  try {
    await i18n.changeLanguage(locale);
    // Store in localStorage for persistence
    localStorage.setItem('charverse-locale', locale);
  } catch (error) {
    console.error('Error changing language:', error);
    throw error;
  }
};

// Helper function to load namespace
export const loadNamespace = async (namespace: Namespace, locale?: SupportedLocale): Promise<void> => {
  const targetLocale = locale || getCurrentLocale();
  try {
    await i18n.loadNamespaces(namespace);
    await i18n.setDefaultNamespace(namespace);
  } catch (error) {
    console.error(`Error loading namespace ${namespace} for locale ${targetLocale}:`, error);
    throw error;
  }
};

// Helper function to get available languages
export const getAvailableLanguages = () => {
  return SUPPORTED_LOCALES.map(locale => ({
    code: locale,
    name: getLanguageName(locale),
    nativeName: getLanguageNativeName(locale),
  }));
};

// Helper function to get language name in English
const getLanguageName = (locale: SupportedLocale): string => {
  const names: Record<SupportedLocale, string> = {
    en: 'English',
    pt: 'Portuguese',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
  };
  return names[locale];
};

// Helper function to get language name in native language
const getLanguageNativeName = (locale: SupportedLocale): string => {
  const nativeNames: Record<SupportedLocale, string> = {
    en: 'English',
    pt: 'Português',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    ja: '日本語',
    ko: '한국어',
    zh: '中文',
  };
  return nativeNames[locale];
};

export default i18n;