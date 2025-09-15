/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#FFC917', // Cor principal laranja
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#FFC917',
          foreground: '#1f2937', // Texto escuro no botão laranja
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          DEFAULT: '#f3f4f6',
          foreground: '#1f2937',
        },
        // Light theme colors
        background: '#ffffff',
        foreground: '#1f2937',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1f2937',
        },
        muted: {
          DEFAULT: '#f9fafb',
          foreground: '#6b7280',
        },
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#FFC917',
        // Dark theme support
        dark: {
          background: '#0f172a',
          foreground: '#f1f5f9',
          card: {
            DEFAULT: '#1e293b',
            foreground: '#f1f5f9',
          },
          muted: {
            DEFAULT: '#1e293b',
            foreground: '#94a3b8',
          },
          border: '#334155',
          input: '#334155',
          ring: '#FFC917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}