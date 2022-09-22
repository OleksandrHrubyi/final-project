<template>
  <div>
    <div class="container">
      <Header />
      <div class="wrapper">
        <h2 class="title">Sign Up</h2>
        <form class="form">
          <input
            type="text"
            id="email"
            autocomplete="off"
            placeholder="Enter your name"
            class="input email-input"
            v-model="nameValue"
          />
          <input
            type="text"
            id="email"
            autocomplete="off"
            placeholder="Enter your email"
            class="input email-input"
            v-model="emailValue"
          />
          <input
            type="text"
            id="password"
            autocomplete="off"
            placeholder="Password"
            class="input"
            v-model="passwordValue"
          />
          <button type="button" @click="handleSignUp" class="btn">
            Sign in
          </button>

          <div>
            <span class="sign-up">Not New to Netflix?</span>
            <nuxt-link class="registration" to="/login">
              <span>Sign Up</span>
            </nuxt-link>
          </div>
          <a :href="getGoogleUrl(from)" class="google-auth">
            <span>Google</span>
          </a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'
import { getGoogleUrl } from '~/utils/getGoogleUrl'

export default {
  components: { Header },
  data() {
    return {
      nameValue: null,
      emailValue: null,
      passwordValue: null,
      from: '/',
    }
  },

  methods: {
    getGoogleUrl,
    handleSignUp() {
      const params = {
        name: this.nameValue,
        email: this.emailValue,
        password: this.passwordValue,
      }
      this.$store.dispatch('user/registration', params).then((resp) => {
        if (resp === 'success') {
          this.$toast.success('Registration succeed')
          this.clearInputs()
          this.$router.push('login')
        } else {
          this.$toast.error('Registration error')
        }
      })
    },
    clearInputs() {
      this.nameValue = null
      this.emailValu = null
      this.passwordValue = null
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(~/assets/images/mainbg.jpeg);

  * {
    box-sizing: border-box;
  }
}

.wrapper {
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 60px 0px;
  border-radius: 5px;
  height: 500px;
}

.form {
  padding: 0px 40px 30px;
}

.email {
  margin-bottom: 20px;
}

.label {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 28px;
}

.btn {
  background-color: #e50914;
  margin-top: 50px;
  margin-bottom: 30px;
  display: block;
  width: 100%;
  display: inline-block;
  font-weight: 400;
  color: #fff;
  text-align: center;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  cursor: pointer;
}

.registration {
  color: #fff;
}

.sign-up {
  color: #737373;
}

.title {
  margin: 0 0 24px;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  padding: 0 40px;
}

.input {
  display: block;
  width: 100%;
  height: 38px;
  padding: 4px 16px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.email-input {
  margin-bottom: 24px;
}
</style>
