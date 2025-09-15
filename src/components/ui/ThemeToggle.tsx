import React, { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { Button } from './Button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { THEMES } from '@/constants';

interface ThemeToggleProps {
  variant?: 'button' | 'icon' | 'dropdown';
  showLabel?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  showLabel = false,
  size = 'default'
}) => {
  const { theme, actualTheme, setTheme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  const getIcon = () => {
    if (theme === THEMES.SYSTEM) {
      return <Monitor size={18} />;
    }
    return actualTheme === 'light' ? <Sun size={18} /> : <Moon size={18} />;
  };

  const getLabel = () => {
    switch (theme) {
      case THEMES.LIGHT:
        return 'Modo claro';
      case THEMES.DARK:
        return 'Modo escuro';
      case THEMES.SYSTEM:
        return 'Sistema';
      default:
        return 'Tema';
    }
  };

  const cycleTheme = () => {
    switch (theme) {
      case THEMES.LIGHT:
        setTheme(THEMES.DARK);
        break;
      case THEMES.DARK:
        setTheme(THEMES.SYSTEM);
        break;
      case THEMES.SYSTEM:
        setTheme(THEMES.LIGHT);
        break;
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tema
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={THEMES.LIGHT}>Claro</option>
          <option value={THEMES.DARK}>Escuro</option>
          <option value={THEMES.SYSTEM}>Sistema</option>
        </select>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={cycleTheme}
        icon={getIcon()}
        iconPosition="left"
        title={`Tema atual: ${getLabel()}`}
      >
        {showLabel && getLabel()}
      </Button>
    );
  }

  // Default icon variant
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      icon={getIcon()}
      title={`Tema atual: ${getLabel()}`}
      className="w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800"
    />
  );
};

export default ThemeToggle;