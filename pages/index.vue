<template>
  <div class="box">
    <Header />
    <div class="main-container">
      <dir class="container">
        <div class="search-form">
          <div class="main-form">
            <div>
              <h2 class="title">Unlimited movies, TV shows, and more.</h2>
              <p class="subtitle">Watch anywhere. Cancel anytime.</p>
            </div>
            <div>
              <span class="info">
                Ready to watch? Enter your email to log in your account.
              </span>
              <nuxt-link class="submit-btn" to="/login">Get Started</nuxt-link>
            </div>
          </div>
        </div>
      </dir>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: { Header },
}
</script>

<style scoped lang="scss">
.main-container {
  max-width: 1440px;
  padding: 15px 60px;
  margin: 0 auto;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.box {
  width: 100%;
  background-size: cover;
  height: 800px;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(~/assets/images/mainbg.jpeg);

  background-repeat: no-repeat;
  border-bottom: 8px solid #222;
}

.logo-icon {
  fill: #e50914;
  max-width: 170px;
}

.main-form {
  color: #fff;
  padding: 0px 10px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.submit-btn {
  text-decoration: none;
  display: block;
  margin: 0 auto;
  padding: 10px 30px;
  color: #fff;
  background-color: #e50914;
  width: 300px;
  border: none;
  border-radius: 5px;
  transition: all 0.5s;
}

.submit-btn:hover {
  text-decoration: none;
  background-color: #a50911;
  color: #fff;
}

.title {
  margin: 0;
  padding: 0;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;
}

.subtitle {
  font-size: 32px;
}

.info {
  font-size: 18px;
  margin-bottom: 20px;
  display: block;
}

@media screen and (min-width: 768px) {
  .submit-btn {
    width: 30%;
  }

  .title {
    font-size: 40px;
  }

  .subtitle {
    font-size: 25px;
  }
}
</style>
