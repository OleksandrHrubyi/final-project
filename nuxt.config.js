export default {
    head: {
        title: 'Netflix',
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    '@nuxtjs/auth-next',
  ],
  axios: {
    baseURL: process.env.BASE_API_URL,
  },
  cookie: {
    cookie: {
      // (optional) If set, we check this cookie existence for loggedIn check
      name: 'token',
    },
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          required: true,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: 'api/users/login', method: 'post' },
          user: { url: 'api/users/current', method: 'get' },
          logout: { url: 'api/users/logout', method: 'post' },
        }
      },
    },
     plugins: [ '~/plugins/auth.js' ]
  },
  toast: {
    position: 'top-right',
    duration: 3000,
    singleton: true,
  },
  

  postcss: {
    plugins: {
      'postcss-url': false,
      'postcss-nested': {},
      'postcss-responsive-type': {},
      'postcss-hexrgba': {},
    },
  },
    css: ['~/assets/styles/style.scss'],
  }
  