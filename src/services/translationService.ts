import { apiService } from './api';
import type { SupportedLocale, Namespace } from '@/i18n';
import type { ApiResponse } from '@/types';

// Translation data types
export interface Translation {
  [key: string]: string | Translation;
}

export interface TranslationResponse {
  locale: string;
  namespace: string;
  translations: Translation;
  version: string;
  lastModified: string;
}

export interface TranslateRequest {
  text: string;
  targetLocale: SupportedLocale;
  sourceLocale?: SupportedLocale;
  context?: string;
  namespace?: Namespace;
}

export interface TranslateResponse {
  translatedText: string;
  sourceLocale: string;
  targetLocale: string;
  confidence: number;
  cost: number;
}

export interface SupportedLocalesResponse {
  locales: Array<{
    code: SupportedLocale;
    name: string;
    nativeName: string;
    isActive: boolean;
  }>;
}

export interface TranslationStats {
  locale: string;
  totalKeys: number;
  translatedKeys: number;
  completionPercentage: number;
  lastUpdated: string;
}

export interface TranslationHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  details: {
    database: string;
    llmService: string;
    cache: string;
    supportedLocales: number;
    totalTranslations: number;
  };
}

class TranslationService {
  private baseUrl = '/api/v1/i18n';

  /**
   * Get health status of translation service
   */
  async getHealth(): Promise<ApiResponse<TranslationHealthResponse>> {
    return apiService.get(`${this.baseUrl}/health`);
  }

  /**
   * Get supported locales
   */
  async getSupportedLocales(): Promise<ApiResponse<SupportedLocalesResponse>> {
    return apiService.get(`${this.baseUrl}/locales`);
  }

  /**
   * Get translations for a specific locale and namespace
   */
  async getTranslations(
    locale: SupportedLocale,
    namespace: Namespace
  ): Promise<ApiResponse<TranslationResponse>> {
    return apiService.get(`${this.baseUrl}/${locale}/${namespace}`);
  }

  /**
   * Update translations for a specific locale and namespace
   */
  async updateTranslations(
    locale: SupportedLocale,
    namespace: Namespace,
    translations: Translation
  ): Promise<ApiResponse<TranslationResponse>> {
    return apiService.put(`${this.baseUrl}/${locale}/${namespace}`, {
      translations,
    });
  }

  /**
   * Translate text using LLM
   */
  async translateText(request: TranslateRequest): Promise<ApiResponse<TranslateResponse>> {
    return apiService.post(`${this.baseUrl}/translate`, request);
  }

  /**
   * Get translation statistics for a locale
   */
  async getTranslationStats(locale: SupportedLocale): Promise<ApiResponse<TranslationStats>> {
    return apiService.get(`${this.baseUrl}/stats/${locale}`);
  }

  /**
   * Clear translation cache for a specific locale
   */
  async clearCache(locale: SupportedLocale): Promise<ApiResponse<{ success: boolean }>> {
    return apiService.delete(`${this.baseUrl}/cache/${locale}`);
  }

  /**
   * Clear all translation cache
   */
  async clearAllCache(): Promise<ApiResponse<{ success: boolean }>> {
    return apiService.delete(`${this.baseUrl}/cache`);
  }

  /**
   * Batch translate multiple texts
   */
  async batchTranslate(
    texts: string[],
    targetLocale: SupportedLocale,
    sourceLocale: SupportedLocale = 'en',
    namespace?: Namespace
  ): Promise<ApiResponse<TranslateResponse[]>> {
    return apiService.post(`${this.baseUrl}/translate/batch`, {
      texts,
      targetLocale,
      sourceLocale,
      namespace,
    });
  }

  /**
   * Get translation progress for all locales
   */
  async getTranslationProgress(): Promise<ApiResponse<TranslationStats[]>> {
    return apiService.get(`${this.baseUrl}/progress`);
  }

  /**
   * Export translations for a locale
   */
  async exportTranslations(
    locale: SupportedLocale,
    format: 'json' | 'csv' = 'json'
  ): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiService.get(`${this.baseUrl}/export/${locale}`, { format });
  }

  /**
   * Import translations from file
   */
  async importTranslations(
    locale: SupportedLocale,
    namespace: Namespace,
    file: File
  ): Promise<ApiResponse<{ imported: number; errors: string[] }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('locale', locale);
    formData.append('namespace', namespace);

    return apiService.upload(`${this.baseUrl}/import`, formData);
  }

  /**
   * Validate translations for missing keys
   */
  async validateTranslations(
    locale: SupportedLocale,
    namespace?: Namespace
  ): Promise<ApiResponse<{ missingKeys: string[]; extraKeys: string[] }>> {
    const params = namespace ? { namespace } : {};
    return apiService.get(`${this.baseUrl}/validate/${locale}`, params);
  }

  /**
   * Auto-translate missing keys for a locale
   */
  async autoTranslateMissing(
    locale: SupportedLocale,
    namespace?: Namespace,
    sourceLocale: SupportedLocale = 'en'
  ): Promise<ApiResponse<{ translated: number; failed: number; cost: number }>> {
    return apiService.post(`${this.baseUrl}/auto-translate/${locale}`, {
      namespace,
      sourceLocale,
    });
  }

  /**
   * Get translation history/changelog
   */
  async getTranslationHistory(
    locale: SupportedLocale,
    namespace?: Namespace,
    limit: number = 50
  ): Promise<ApiResponse<Array<{
    id: string;
    locale: string;
    namespace: string;
    action: 'created' | 'updated' | 'deleted';
    changes: Record<string, { old?: string; new?: string }>;
    timestamp: string;
    user?: string;
  }>>> {
    const params = { limit, ...(namespace && { namespace }) };
    return apiService.get(`${this.baseUrl}/history/${locale}`, params);
  }

  /**
   * Search translations across all locales
   */
  async searchTranslations(
    query: string,
    locale?: SupportedLocale,
    namespace?: Namespace
  ): Promise<ApiResponse<Array<{
    locale: string;
    namespace: string;
    key: string;
    value: string;
    score: number;
  }>>> {
    const params = {
      q: query,
      ...(locale && { locale }),
      ...(namespace && { namespace }),
    };
    return apiService.get(`${this.baseUrl}/search`, params);
  }

  /**
   * Get translation key suggestions
   */
  async getKeySuggestions(
    partial: string,
    namespace?: Namespace
  ): Promise<ApiResponse<string[]>> {
    const params = { partial, ...(namespace && { namespace }) };
    return apiService.get(`${this.baseUrl}/suggestions`, params);
  }

  /**
   * Report translation issue
   */
  async reportIssue(
    locale: SupportedLocale,
    namespace: Namespace,
    key: string,
    issue: string,
    suggestion?: string
  ): Promise<ApiResponse<{ reportId: string }>> {
    return apiService.post(`${this.baseUrl}/report-issue`, {
      locale,
      namespace,
      key,
      issue,
      suggestion,
    });
  }
}

export const translationService = new TranslationService();
export default translationService;