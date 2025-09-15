import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { useI18nStore } from '@/stores/i18nStore';
import type { Namespace, SupportedLocale } from '@/i18n';

/**
 * Enhanced useTranslation hook with namespace management and Zustand integration
 */
export function useTranslation(namespace: Namespace = 'common') {
  const { t, i18n, ready } = useI18nextTranslation(namespace);
  const {
    currentLocale,
    isLoading,
    error,
    loadNamespace,
    setLanguage,
    clearError
  } = useI18nStore();

  // Load namespace on mount if not already loaded
  useEffect(() => {
    if (ready && !isLoading) {
      loadNamespace(namespace);
    }
  }, [namespace, ready, isLoading, loadNamespace]);

  // Enhanced translation function with fallback
  const translate = useCallback((
    key: string,
    options?: {
      defaultValue?: string;
      interpolation?: Record<string, any>;
      count?: number;
    }
  ): string => {
    const { defaultValue, interpolation, count } = options || {};

    try {
      const result = t(key, {
        defaultValue: defaultValue || key,
        ...interpolation,
        count,
      });

      // If result is the same as key, it might be missing
      if (result === key && !defaultValue) {
        console.warn(`Missing translation for key: ${namespace}:${key} (locale: ${currentLocale})`);
      }

      return result;
    } catch (error) {
      console.error(`Translation error for key ${namespace}:${key}:`, error);
      return defaultValue || key;
    }
  }, [t, namespace, currentLocale]);

  // Change language function
  const changeLanguage = useCallback(async (locale: SupportedLocale) => {
    try {
      clearError();
      await setLanguage(locale);
    } catch (error: any) {
      console.error('Failed to change language:', error);
      throw error;
    }
  }, [setLanguage, clearError]);

  // Check if translation exists
  const hasTranslation = useCallback((key: string): boolean => {
    return i18n.exists(`${namespace}:${key}`);
  }, [i18n, namespace]);

  // Get plural form
  const plural = useCallback((
    key: string,
    count: number,
    options?: { defaultValue?: string; interpolation?: Record<string, any> }
  ): string => {
    return translate(key, {
      ...options,
      count,
    });
  }, [translate]);

  return {
    // Core translation function
    t: translate,

    // Convenience functions
    plural,
    hasTranslation,
    changeLanguage,

    // State
    currentLocale,
    isLoading,
    error,
    ready,

    // i18next instance for advanced usage
    i18n,

    // Namespace info
    namespace,
  };
}

/**
 * Hook for managing multiple namespaces
 */
export function useMultipleTranslations(namespaces: Namespace[]) {
  const { i18n, ready } = useI18nextTranslation(namespaces);
  const {
    currentLocale,
    isLoading,
    error,
    preloadNamespaces,
    clearError
  } = useI18nStore();

  // Load all namespaces on mount
  useEffect(() => {
    if (ready && !isLoading) {
      preloadNamespaces(namespaces);
    }
  }, [namespaces, ready, isLoading, preloadNamespaces]);

  // Translation function with namespace prefix
  const translate = useCallback((
    namespaceKey: string,
    options?: {
      defaultValue?: string;
      interpolation?: Record<string, any>;
      count?: number;
    }
  ): string => {
    const { defaultValue, interpolation, count } = options || {};

    try {
      const result = i18n.t(namespaceKey, {
        defaultValue: defaultValue || namespaceKey,
        ...interpolation,
        count,
      });

      return result;
    } catch (error) {
      console.error(`Translation error for key ${namespaceKey}:`, error);
      return defaultValue || namespaceKey;
    }
  }, [i18n]);

  return {
    t: translate,
    currentLocale,
    isLoading,
    error,
    ready,
    namespaces,
    clearError,
  };
}

/**
 * Hook for translation statistics and management
 */
export function useTranslationManagement() {
  const {
    supportedLocales,
    translationStats,
    healthStatus,
    fetchTranslationStats,
    fetchHealthStatus,
    clearTranslationCache,
    refreshTranslations,
    getTranslationCompleteness,
    getLocaleDisplayName,
  } = useI18nStore();

  const refreshStats = useCallback(async (locale?: SupportedLocale) => {
    await fetchTranslationStats(locale);
  }, [fetchTranslationStats]);

  const refreshHealth = useCallback(async () => {
    await fetchHealthStatus();
  }, [fetchHealthStatus]);

  const clearCache = useCallback(async (locale?: SupportedLocale) => {
    await clearTranslationCache(locale);
  }, [clearTranslationCache]);

  const refresh = useCallback(async (namespace?: Namespace, locale?: SupportedLocale) => {
    await refreshTranslations(namespace, locale);
  }, [refreshTranslations]);

  return {
    // Data
    supportedLocales,
    translationStats,
    healthStatus,

    // Actions
    refreshStats,
    refreshHealth,
    clearCache,
    refresh,

    // Utilities
    getTranslationCompleteness,
    getLocaleDisplayName,
  };
}