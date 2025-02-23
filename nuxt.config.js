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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    'bootstrap-vue/nuxt',
  ],

  build: {
  }
}
