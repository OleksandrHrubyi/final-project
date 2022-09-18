<template>
  <header class="headert">
    <div class="container">
      <nuxt-link class="link" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 111 30"
          class="logo-icon"
          data-src="/static/media/logo.9b52e823.svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M105.062 14.28 111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28ZM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0Zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657ZM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406Zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874ZM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688ZM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968Z"
          ></path>
        </svg>
      </nuxt-link>
      <div v-if="!$auth.loggedIn">
        <nuxt-link class="link" to="/login">
          Login
        </nuxt-link>

        <nuxt-link class="link" to="/sign-up">
          Sign-up
        </nuxt-link>
      </div>
      <div v-else>
        <span class="user-name">{{ this.$auth.user }}</span>
        <button class="btn-logout" @click="logOut">Log Out</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  methods: {
    async logOut() {
      await this.$auth.logout('local')
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1440px;
  padding: 15px 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link {
  display: inline-block;
  text-decoration: none;
  color: #e6e6e6;
  padding: 5px;

  &:last-child {
    margin-right: 0;
  }
}

.logo-icon {
  max-width: 170px;
  width: 100%;
  fill: #e50914;
}

.btn-logout {
  display: inline-block;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 8px 16px;
  color: #fff;
  background-color: #292021;
  border-radius: 5px;
  transition: all 0.5s;
}

.user-name {
  margin: 0 15px 0 0;
  padding: 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.1;
  color: #fff;
}
</style>
