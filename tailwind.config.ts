import type { Config } from 'tailwindcss'

export default {
  darkMode: 'selector',
  content: [
    './components/**/*.{js,vue,ts}',
    './composables/**/*.{js,ts}',
    './assets/**/*.{css}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: ['1400px'],
    },
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      colors: {
        /*dark: {
          DEFAULT: '#344054',
          main_m: '#2e2c2c',
          // main: '#040E1A',
          main: '#111827',
          secondary: '#1F2937',
          third: '#374151',
          text_second: '#6B7280',
          700: '#35373d',
          input: '#233040',
        },*/
        blue: {
          DEFAULT: '#0062FF',
          900: '#040E1A',
        },
        white: {
          DEFAULT: '#fff',
          100: '#f1f1f1',
        },
        primary: {
          DEFAULT: '#006CE5',
          400: '#3389EA',
          300: '#66A7EF',
          200: '#99C4F5',
          100: '#CCE2FA',
          50: '#F1F7FD',
        },
        secondary: {
          DEFAULT: '#FFC900',
          400: '#FFD94F',
          300: '#FFE37B',
          200: '#FFECA7',
          100: '#FFF1BD',
          50: '#FFFAE9',
        },
        greyscale: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
          300: '#D1D5DB',
          200: '#E5E7EB',
          100: '#F3F4F6',
          50: '#F6F7F9',
        },
        portage: '#8C62FF',
        orange: '#FE964A',
        success: {
          DEFAULT: '#0CAF60',
          dark: '#0BA259',
          light: '#55C790',
        },
        warning: {
          DEFAULT: '#FFD023',
          dark: '#E6BB20',
          light: '#FFDE65',
        },
        danger: {
          DEFAULT: '#FF4C6D',
          dark: '#E64462',
          light: '#FF708A',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
