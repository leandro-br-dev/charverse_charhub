import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { Languages, Globe, ChevronDown, Check } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { useTranslation } from '@/hooks/useTranslation';
import type { SupportedLocale } from '@/i18n';

interface LanguageSelectorProps {
  variant?: 'button' | 'icon' | 'dropdown' | 'menu';
  showLabel?: boolean;
  showFlag?: boolean;
  size?: 'sm' | 'default' | 'lg';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  showLabel = true,
  showFlag = false,
  size = 'default',
  placement = 'bottom',
  className = ''
}) => {
  const { t } = useTranslation('settings');
  const {
    currentLocale,
    availableLocales,
    changeLanguage,
    isLoading,
    getLocaleInfo
  } = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const currentLocaleInfo = getLocaleInfo(currentLocale);
  const locales = availableLocales();

  const handleLanguageChange = async (locale: SupportedLocale) => {
    if (locale === currentLocale) return;

    setIsChanging(true);
    setIsOpen(false);

    try {
      await changeLanguage(locale);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const getFlag = (locale: SupportedLocale): string => {
    const flags: Record<SupportedLocale, string> = {
      en: '🇺🇸',
      pt: '🇧🇷',
      es: '🇪🇸',
      fr: '🇫🇷',
      de: '🇩🇪',
      it: '🇮🇹',
      ja: '🇯🇵',
      ko: '🇰🇷',
      zh: '🇨🇳',
    };
    return flags[locale] || '🌐';
  };

  const getIcon = () => {
    if (showFlag) {
      return <span className="text-lg">{getFlag(currentLocale)}</span>;
    }
    return <Languages size={18} />;
  };

  const getLabel = () => {
    return showLabel ? currentLocaleInfo.nativeName : '';
  };

  // Simple dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('language')}
        </label>
        <select
          value={currentLocale}
          onChange={(e) => handleLanguageChange(e.target.value as SupportedLocale)}
          disabled={isLoading || isChanging}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {locales.map((locale) => (
            <option key={locale.code} value={locale.code}>
              {showFlag && `${getFlag(locale.code)} `}
              {locale.nativeName}
              {locale.name !== locale.nativeName && ` (${locale.name})`}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Menu variant with dropdown
  if (variant === 'menu') {
    return (
      <div className={`language-selector relative ${className}`}>
        <Button
          variant="outline"
          size={size}
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading || isChanging}
          icon={getIcon()}
          iconPosition="left"
          className="flex items-center justify-between min-w-[120px]"
          title={t('languageDescription')}
        >
          <span className="flex items-center space-x-2">
            {showFlag && <span>{getFlag(currentLocale)}</span>}
            <span>{getLabel()}</span>
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>

        {isOpen && (
          <div className={`absolute z-50 mt-1 w-full min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ${
            placement === 'top' ? 'bottom-full mb-1' : 'top-full'
          }`}>
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLanguageChange(locale.code)}
                  disabled={isChanging}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    {showFlag && <span>{getFlag(locale.code)}</span>}
                    <span>{locale.nativeName}</span>
                    {locale.name !== locale.nativeName && (
                      <span className="text-gray-500 text-xs">({locale.name})</span>
                    )}
                  </span>
                  {locale.code === currentLocale && (
                    <Check size={16} className="text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Button variant
  if (variant === 'button') {
    return (
      <div className={`language-selector relative ${className}`}>
        <Button
          variant="outline"
          size={size}
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading || isChanging}
          icon={getIcon()}
          iconPosition="left"
          title={`${t('language')}: ${currentLocaleInfo.nativeName}`}
        >
          {showLabel && getLabel()}
        </Button>

        {isOpen && (
          <div className={`absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ${
            placement === 'left' ? 'right-full mr-1' :
            placement === 'right' ? 'left-full ml-1' :
            placement === 'top' ? 'bottom-full mb-1' : 'top-full'
          }`}>
            <div className="py-1 min-w-[150px]">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLanguageChange(locale.code)}
                  disabled={isChanging}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {showFlag && <span>{getFlag(locale.code)}</span>}
                  <span>{locale.nativeName}</span>
                  {locale.code === currentLocale && (
                    <Check size={14} className="text-green-500 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default icon variant
  return (
    <div className={`language-selector relative ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || isChanging}
        icon={getIcon()}
        title={`${t('language')}: ${currentLocaleInfo.nativeName}`}
        className="w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800"
      />

      {isOpen && (
        <div className={`absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ${
          placement === 'left' ? 'right-0' : 'left-0'
        }`}>
          <div className="py-1 min-w-[150px]">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => handleLanguageChange(locale.code)}
                disabled={isChanging}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {showFlag && <span>{getFlag(locale.code)}</span>}
                <span>{locale.nativeName}</span>
                {locale.code === currentLocale && (
                  <Check size={14} className="text-green-500 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;