import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, THEMES } from '@/constants';

type Theme = typeof THEMES.LIGHT | typeof THEMES.DARK | typeof THEMES.SYSTEM;

interface ThemeState {
  theme: Theme;
  actualTheme: 'light' | 'dark';
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

interface ThemeStore extends ThemeState, ThemeActions {}

const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getActualTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === THEMES.SYSTEM) {
    return getSystemTheme();
  }
  return theme as 'light' | 'dark';
};

const applyTheme = (actualTheme: 'light' | 'dark') => {
  const root = document.documentElement;

  if (actualTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Update CSS custom properties for themes
  if (actualTheme === 'dark') {
    // Dark theme - usando cores específicas fornecidas
    root.style.setProperty('--color-primary', '255 201 23'); // #FFC917
    root.style.setProperty('--color-primary-foreground', '22 22 24'); // #161618 - color-content-dark
    root.style.setProperty('--color-secondary', '47 47 47'); // #2F2F2F - color-light (inverted)
    root.style.setProperty('--color-secondary-foreground', '255 255 255'); // #FFFFFF - color-title (inverted)
    root.style.setProperty('--color-background', '22 22 24'); // #161618 - color-normal (inverted)
    root.style.setProperty('--color-foreground', '255 255 255'); // #FFFFFF - color-content (inverted)
    root.style.setProperty('--color-card', '47 47 47'); // #2F2F2F - color-light (inverted)
    root.style.setProperty('--color-card-foreground', '255 255 255'); // #FFFFFF - color-title (inverted)
    root.style.setProperty('--color-muted', '47 47 47'); // #2F2F2F - color-light (inverted)
    root.style.setProperty('--color-muted-foreground', '156 156 156'); // #9C9C9C - color-description
    root.style.setProperty('--color-border', '47 47 47'); // #2F2F2F - color-light (inverted)
    root.style.setProperty('--color-input', '47 47 47'); // #2F2F2F - color-light (inverted)
    root.style.setProperty('--color-ring', '255 201 23'); // #FFC917
  } else {
    // Light theme - usando cores específicas fornecidas
    root.style.setProperty('--color-primary', '255 201 23'); // #FFC917
    root.style.setProperty('--color-primary-foreground', '22 22 24'); // #161618 - color-dark
    root.style.setProperty('--color-secondary', '230 230 234'); // #E6E6EA - color-light
    root.style.setProperty('--color-secondary-foreground', '47 47 47'); // #2F2F2F - color-title
    root.style.setProperty('--color-background', '255 255 255'); // white
    root.style.setProperty('--color-foreground', '47 47 47'); // #2F2F2F - color-content
    root.style.setProperty('--color-card', '243 241 241'); // #f3f1f1 - color-normal
    root.style.setProperty('--color-card-foreground', '47 47 47'); // #2F2F2F - color-title
    root.style.setProperty('--color-muted', '230 230 234'); // #E6E6EA - color-light
    root.style.setProperty('--color-muted-foreground', '156 156 156'); // #9C9C9C - color-description
    root.style.setProperty('--color-border', '230 230 234'); // #E6E6EA - color-light
    root.style.setProperty('--color-input', '243 241 241'); // #f3f1f1 - color-normal
    root.style.setProperty('--color-ring', '255 201 23'); // #FFC917
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // State
      theme: THEMES.SYSTEM,
      actualTheme: getSystemTheme(),

      // Actions
      setTheme: (theme: Theme) => {
        const actualTheme = getActualTheme(theme);
        applyTheme(actualTheme);
        set({ theme, actualTheme });
      },

      toggleTheme: () => {
        const { theme } = get();
        if (theme === THEMES.SYSTEM) {
          // If system, switch to opposite of current system theme
          const systemTheme = getSystemTheme();
          const newTheme = systemTheme === 'light' ? THEMES.DARK : THEMES.LIGHT;
          get().setTheme(newTheme);
        } else {
          // Toggle between light and dark
          const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
          get().setTheme(newTheme);
        }
      },

      initializeTheme: () => {
        const { theme } = get();
        const actualTheme = getActualTheme(theme);
        applyTheme(actualTheme);
        set({ actualTheme });

        // Listen for system theme changes if using system theme
        if (theme === THEMES.SYSTEM) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (get().theme === THEMES.SYSTEM) {
              const newActualTheme = e.matches ? 'dark' : 'light';
              applyTheme(newActualTheme);
              set({ actualTheme: newActualTheme });
            }
          };
          mediaQuery.addEventListener('change', handleSystemThemeChange);
        }
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);