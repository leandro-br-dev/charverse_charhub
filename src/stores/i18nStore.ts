import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n, {
  type SupportedLocale,
  type Namespace,
  changeLanguage,
  getCurrentLocale,
  getAvailableLanguages,
  SUPPORTED_LOCALES
} from '@/i18n';
import { translationService } from '@/services/translationService';
import type { TranslationStats, SupportedLocalesResponse, TranslationHealthResponse } from '@/services/translationService';

interface I18nState {
  // Current state
  currentLocale: SupportedLocale;
  supportedLocales: SupportedLocalesResponse['locales'];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Translation data
  loadedNamespaces: Set<string>;
  translationStats: Record<SupportedLocale, TranslationStats>;

  // Health status
  healthStatus: TranslationHealthResponse | null;
  lastHealthCheck: Date | null;
}

interface I18nActions {
  // Language management
  setLanguage: (locale: SupportedLocale) => Promise<void>;
  initializeI18n: () => Promise<void>;

  // Namespace management
  loadNamespace: (namespace: Namespace, locale?: SupportedLocale) => Promise<void>;
  preloadNamespaces: (namespaces: Namespace[], locale?: SupportedLocale) => Promise<void>;

  // Data fetching
  fetchSupportedLocales: () => Promise<void>;
  fetchTranslationStats: (locale?: SupportedLocale) => Promise<void>;
  fetchHealthStatus: () => Promise<void>;

  // Cache management
  clearTranslationCache: (locale?: SupportedLocale) => Promise<void>;
  refreshTranslations: (namespace?: Namespace, locale?: SupportedLocale) => Promise<void>;

  // Error handling
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Utility functions
  isLocaleSupported: (locale: string) => boolean;
  getLocaleDisplayName: (locale: SupportedLocale) => string;
  getTranslationCompleteness: (locale: SupportedLocale) => number;
}

interface I18nStore extends I18nState, I18nActions {}

const STORAGE_KEY = 'charverse-i18n-store';

export const useI18nStore = create<I18nStore>()(
  persist(
    (set, get) => ({
      // Initial State
      currentLocale: getCurrentLocale(),
      supportedLocales: getAvailableLanguages(),
      isLoading: false,
      isInitialized: false,
      error: null,
      loadedNamespaces: new Set(),
      translationStats: {} as Record<SupportedLocale, TranslationStats>,
      healthStatus: null,
      lastHealthCheck: null,

      // Actions
      setLanguage: async (locale: SupportedLocale) => {
        if (!get().isLocaleSupported(locale)) {
          throw new Error(`Locale ${locale} is not supported`);
        }

        set({ isLoading: true, error: null });

        try {
          await changeLanguage(locale);

          set({
            currentLocale: locale,
            isLoading: false
          });

          // Preload common namespaces for the new locale
          get().preloadNamespaces(['common', 'navigation'], locale);

        } catch (error: any) {
          const errorMessage = error.message || `Failed to change language to ${locale}`;
          set({
            error: errorMessage,
            isLoading: false
          });
          throw error;
        }
      },

      initializeI18n: async () => {
        if (get().isInitialized) return;

        set({ isLoading: true, error: null });

        try {
          // Fetch supported locales from backend
          await get().fetchSupportedLocales();

          // Fetch health status
          await get().fetchHealthStatus();

          // Preload essential namespaces
          await get().preloadNamespaces(['common', 'navigation', 'errors']);

          set({
            isInitialized: true,
            isLoading: false
          });

        } catch (error: any) {
          const errorMessage = error.message || 'Failed to initialize i18n system';
          set({
            error: errorMessage,
            isLoading: false,
            isInitialized: true // Still mark as initialized to prevent retry loops
          });
          console.error('I18n initialization error:', error);
        }
      },

      loadNamespace: async (namespace: Namespace, locale?: SupportedLocale) => {
        const targetLocale = locale || get().currentLocale;
        const namespaceKey = `${targetLocale}:${namespace}`;

        if (get().loadedNamespaces.has(namespaceKey)) {
          return; // Already loaded
        }

        try {
          // Load via i18next (which will call our backend)
          await i18n.loadNamespaces(namespace);

          const newLoadedNamespaces = new Set(get().loadedNamespaces);
          newLoadedNamespaces.add(namespaceKey);

          set({
            loadedNamespaces: newLoadedNamespaces
          });

        } catch (error: any) {
          console.error(`Failed to load namespace ${namespace} for locale ${targetLocale}:`, error);
          // Don't throw here - let the app continue with fallback translations
        }
      },

      preloadNamespaces: async (namespaces: Namespace[], locale?: SupportedLocale) => {
        const targetLocale = locale || get().currentLocale;

        try {
          const loadPromises = namespaces.map(namespace =>
            get().loadNamespace(namespace, targetLocale)
          );

          await Promise.allSettled(loadPromises);

        } catch (error: any) {
          console.error(`Failed to preload namespaces for locale ${targetLocale}:`, error);
        }
      },

      fetchSupportedLocales: async () => {
        try {
          const response = await translationService.getSupportedLocales();

          if (response.success && response.data) {
            set({
              supportedLocales: response.data.locales
            });
          }

        } catch (error: any) {
          console.error('Failed to fetch supported locales:', error);
          // Continue with default locales
        }
      },

      fetchTranslationStats: async (locale?: SupportedLocale) => {
        try {
          if (locale) {
            const response = await translationService.getTranslationStats(locale);

            if (response.success && response.data) {
              set(state => ({
                translationStats: {
                  ...state.translationStats,
                  [locale]: response.data!
                }
              }));
            }
          } else {
            // Fetch stats for all supported locales
            const { supportedLocales } = get();
            const statsPromises = supportedLocales.map(async ({ code }) => {
              try {
                const response = await translationService.getTranslationStats(code);
                return { locale: code, stats: response.data };
              } catch {
                return null;
              }
            });

            const results = await Promise.allSettled(statsPromises);
            const newStats = { ...get().translationStats };

            results.forEach((result) => {
              if (result.status === 'fulfilled' && result.value && result.value.stats) {
                newStats[result.value.locale] = result.value.stats;
              }
            });

            set({ translationStats: newStats });
          }

        } catch (error: any) {
          console.error('Failed to fetch translation stats:', error);
        }
      },

      fetchHealthStatus: async () => {
        try {
          const response = await translationService.getHealth();

          if (response.success && response.data) {
            set({
              healthStatus: response.data,
              lastHealthCheck: new Date()
            });
          }

        } catch (error: any) {
          console.error('Failed to fetch health status:', error);
          set({
            healthStatus: {
              status: 'unhealthy',
              details: {
                database: 'error',
                llmService: 'error',
                cache: 'error',
                supportedLocales: 0,
                totalTranslations: 0
              }
            },
            lastHealthCheck: new Date()
          });
        }
      },

      clearTranslationCache: async (locale?: SupportedLocale) => {
        try {
          if (locale) {
            await translationService.clearCache(locale);
          } else {
            await translationService.clearAllCache();
          }

          // Clear local namespace cache
          if (locale) {
            const newLoadedNamespaces = new Set(
              Array.from(get().loadedNamespaces).filter(
                key => !key.startsWith(`${locale}:`)
              )
            );
            set({ loadedNamespaces: newLoadedNamespaces });
          } else {
            set({ loadedNamespaces: new Set() });
          }

        } catch (error: any) {
          console.error('Failed to clear translation cache:', error);
          throw error;
        }
      },

      refreshTranslations: async (namespace?: Namespace, locale?: SupportedLocale) => {
        const targetLocale = locale || get().currentLocale;

        try {
          if (namespace) {
            // Clear specific namespace from cache
            const namespaceKey = `${targetLocale}:${namespace}`;
            const newLoadedNamespaces = new Set(get().loadedNamespaces);
            newLoadedNamespaces.delete(namespaceKey);
            set({ loadedNamespaces: newLoadedNamespaces });

            // Reload the namespace
            await get().loadNamespace(namespace, targetLocale);
          } else {
            // Clear all cache for locale and reload current namespaces
            await get().clearTranslationCache(targetLocale);
            await i18n.reloadResources(targetLocale);
          }

        } catch (error: any) {
          console.error('Failed to refresh translations:', error);
          throw error;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Utility functions
      isLocaleSupported: (locale: string): boolean => {
        return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
      },

      getLocaleDisplayName: (locale: SupportedLocale): string => {
        const localeData = get().supportedLocales.find(l => l.code === locale);
        return localeData?.name || locale;
      },

      getTranslationCompleteness: (locale: SupportedLocale): number => {
        const stats = get().translationStats[locale];
        return stats ? stats.completionPercentage : 0;
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        currentLocale: state.currentLocale,
        supportedLocales: state.supportedLocales,
        translationStats: state.translationStats,
      }),
      // Custom storage to handle Set serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          try {
            const parsed = JSON.parse(str);
            return {
              ...parsed,
              state: {
                ...parsed.state,
                loadedNamespaces: new Set(),
                isLoading: false,
                error: null,
              }
            };
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              loadedNamespaces: undefined, // Don't persist Set
            }
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);