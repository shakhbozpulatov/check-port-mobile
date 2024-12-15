// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from 'vite-plugin-eslint'

import { locales } from './languages/locale-list'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['@/plugins/vue3-easy-data-table.ts'],
  vite: {
    plugins: [eslintPlugin()],
    build: {
      cssCodeSplit: false,
    },
  },
  appConfig: {
    ui: {
      primary: 'primary',
      gray: 'cool',
    },
  },
  app: {
    // pageTransition: { name: 'slide-left', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        {
          rel: 'canonical',
          href: 'https://asialuxe.uz/',
        },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
        },
      ],
      meta: [
        {
          name: 'msapplication-TileColor',
          content: '#0ed3cf',
        },
        {
          name: 'theme-color',
          content: '#0073ff',
        },

        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        {
          property: 'og:image',
          content: '/images/logo.jpg',
        },
        {
          name: 'og:type',
          content: 'article',
          'data-page-subject': 'true',
        },
        {
          name: 'robots',
          content: 'max-image-preview:large',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'author',
          content: 'Asialuxe Travel',
        },
        {
          property: 'og:site_name',
          content: 'Asialuxe Travel',
        },
        {
          name: 'theme-color',
          content: '#000',
        },
        {
          property: 'og:site_name',
          content: 'asialuxe.uz',
        },
        {
          name: 'telegram:channel',
          content: '@Asialuxe',
        },
        {
          name: 'description',
          content:
            'Asialuxe Travel – национальный туроператор, специализирующийся на международном выездном, въездном и внутреннем туризме в Узбекистане.',
        },
      ],
      script: [
        {
          children: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/service-worker.js')
                .then(function (reg) {
                  console.log('Service Worker registered: ', reg);
                })
                .catch(function (err) {
                  console.error('Service Worker registration failed: ', err);
                });
            }
          `,
          type: 'text/javascript',
        },
        // {
        //   src: 'https://accounts.google.com/gsi/client',
        //   async: true,
        //   defer: true,
        // },
      ],
    },
  },
  css: [
    '~/assets/style/main_index.css',
    '@vuepic/vue-datepicker/dist/main.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/sitemap',
    '@nuxt/ui',
  ],
  colorMode: {
    preference: 'light',
  },
  // robots: {
  //   UserAgent: '*',
  //   Allow: '*',
  //   Sitemap: 'https:///dev.b2c.asialuxe.app/sitemap.xml',
  // },
  site: {
    url: 'https://dev.b2c.asialuxe.app/',
  },
  image: {
    quality: 80,
    format: ['webp'],
    densities: [1, 2],
  },
  i18n: {
    defaultLocale: 'ru',
    langDir: './languages',
    strategy: 'prefix',
    locales,
    detectBrowserLanguage: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker', 'vue-toastification'],
  },
  server: {
    host: '127.0.0.1',
    port: 3003,
  },
  devServer: {
    port: 5173, // Set your desired port here
  },
})
