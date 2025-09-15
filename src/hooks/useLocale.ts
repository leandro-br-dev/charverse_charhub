import { useCallback, useEffect } from 'react';
import { useI18nStore } from '@/stores/i18nStore';
import type { SupportedLocale, Namespace } from '@/i18n';

/**
 * Hook for locale management and internationalization state
 */
export function useLocale() {
  const {
    currentLocale,
    supportedLocales,
    isLoading,
    isInitialized,
    error,
    setLanguage,
    initializeI18n,
    clearError,
    isLocaleSupported,
    getLocaleDisplayName,
  } = useI18nStore();

  // Initialize i18n system on mount
  useEffect(() => {
    if (!isInitialized) {
      initializeI18n();
    }
  }, [isInitialized, initializeI18n]);

  // Change language with error handling
  const changeLanguage = useCallback(async (locale: SupportedLocale) => {
    if (!isLocaleSupported(locale)) {
      throw new Error(`Locale ${locale} is not supported`);
    }

    try {
      clearError();
      await setLanguage(locale);
      return true;
    } catch (error: any) {
      console.error('Failed to change language:', error);
      return false;
    }
  }, [setLanguage, isLocaleSupported, clearError]);

  // Get locale information
  const getLocaleInfo = useCallback((locale: SupportedLocale) => {
    const localeData = supportedLocales.find(l => l.code === locale);
    return {
      code: locale,
      name: localeData?.name || locale,
      nativeName: localeData?.nativeName || locale,
      isActive: localeData?.isActive ?? false,
      displayName: getLocaleDisplayName(locale),
    };
  }, [supportedLocales, getLocaleDisplayName]);

  // Get all available locales with info
  const availableLocales = useCallback(() => {
    return supportedLocales.map(locale => getLocaleInfo(locale.code));
  }, [supportedLocales, getLocaleInfo]);

  // Check if locale is currently active
  const isCurrentLocale = useCallback((locale: SupportedLocale) => {
    return currentLocale === locale;
  }, [currentLocale]);

  // Get browser preferred language
  const getBrowserLocale = useCallback((): SupportedLocale => {
    const browserLang = navigator.language.split('-')[0] as SupportedLocale;
    return isLocaleSupported(browserLang) ? browserLang : 'en';
  }, [isLocaleSupported]);

  // Auto-detect and set best locale
  const autoDetectLocale = useCallback(async () => {
    const stored = localStorage.getItem('charverse-locale') as SupportedLocale;
    const browser = getBrowserLocale();

    const targetLocale = (stored && isLocaleSupported(stored)) ? stored : browser;

    if (!isCurrentLocale(targetLocale)) {
      await changeLanguage(targetLocale);
    }
  }, [getBrowserLocale, isLocaleSupported, isCurrentLocale, changeLanguage]);

  return {
    // Current state
    currentLocale,
    supportedLocales,
    isLoading,
    isInitialized,
    error,

    // Actions
    changeLanguage,
    autoDetectLocale,
    clearError,

    // Utilities
    getLocaleInfo,
    availableLocales,
    isCurrentLocale,
    isLocaleSupported,
    getBrowserLocale,
    getLocaleDisplayName,
  };
}

/**
 * Hook for namespace-specific locale management
 */
export function useNamespaceLocale(namespace: Namespace) {
  const {
    loadNamespace,
    refreshTranslations,
    loadedNamespaces,
  } = useI18nStore();

  const { currentLocale } = useLocale();

  // Check if namespace is loaded for current locale
  const isNamespaceLoaded = useCallback((locale?: SupportedLocale) => {
    const targetLocale = locale || currentLocale;
    const namespaceKey = `${targetLocale}:${namespace}`;
    return loadedNamespaces.has(namespaceKey);
  }, [loadedNamespaces, namespace, currentLocale]);

  // Load namespace for specific locale
  const loadNamespaceForLocale = useCallback(async (locale?: SupportedLocale) => {
    const targetLocale = locale || currentLocale;
    await loadNamespace(namespace, targetLocale);
  }, [loadNamespace, namespace, currentLocale]);

  // Refresh namespace translations
  const refreshNamespaceTranslations = useCallback(async (locale?: SupportedLocale) => {
    const targetLocale = locale || currentLocale;
    await refreshTranslations(namespace, targetLocale);
  }, [refreshTranslations, namespace, currentLocale]);

  // Ensure namespace is loaded
  useEffect(() => {
    if (!isNamespaceLoaded()) {
      loadNamespaceForLocale();
    }
  }, [isNamespaceLoaded, loadNamespaceForLocale]);

  return {
    namespace,
    currentLocale,
    isNamespaceLoaded,
    loadNamespaceForLocale,
    refreshNamespaceTranslations,
  };
}

/**
 * Hook for detecting locale changes
 */
export function useLocaleChange(callback: (newLocale: SupportedLocale, oldLocale: SupportedLocale) => void) {
  const { currentLocale } = useLocale();

  useEffect(() => {
    let previousLocale = currentLocale;

    return () => {
      if (previousLocale !== currentLocale) {
        callback(currentLocale, previousLocale);
        previousLocale = currentLocale;
      }
    };
  }, [currentLocale, callback]);
}

/**
 * Hook for RTL (Right-to-Left) language support
 */
export function useRTL() {
  const { currentLocale } = useLocale();

  // RTL languages
  const RTL_LANGUAGES: SupportedLocale[] = []; // Add RTL locales when needed

  const isRTL = useCallback(() => {
    return RTL_LANGUAGES.includes(currentLocale);
  }, [currentLocale]);

  const direction = useCallback(() => {
    return isRTL() ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Apply direction to document
  useEffect(() => {
    document.documentElement.dir = direction();
    document.documentElement.lang = currentLocale;
  }, [direction, currentLocale]);

  return {
    isRTL: isRTL(),
    direction: direction(),
    currentLocale,
  };
}