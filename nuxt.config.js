export default {
  vue: {
    config: {
      devtools: process.env.NODE_ENV === 'development'
    }
  },
  server: {
    port: 3010,
    host: '0.0.0.0'
  },
  head: {
    title: 'ot-code-challenge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['~/static/css/tailwind.css'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', '@nuxtjs/proxy'],
  runtimeConfig: {
    public: {
      apiKey: process.env.VUE_APP_API_KEY
    }
  },
  axios: {
    baseURL: '/api/',
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'https://v3.football.api-sports.io',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.VUE_APP_API_KEY
      }
    }
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
};
