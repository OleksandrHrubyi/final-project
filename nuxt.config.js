export default {
    head: {
        title: 'Netflix',
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: process.env.BASE_API_URL,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          required: true,
          //type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'api/users/login', method: 'post' },
          user: { url: 'api/users/current', method: 'get' },
          logout: { url: 'api/users/logout', method: 'post' },
        }
      }
    }
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
  