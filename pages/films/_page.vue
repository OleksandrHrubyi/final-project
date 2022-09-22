<template>
  <div class="box">
    <Header />
    <section class="main-section">
      <div class="title-container">
        <h1>My movies & TV shows</h1>
        <button @click="addNewFilm" class="btn-add">Add new item</button>
      </div>

      <table class="table">
        <thead class="thead">
          <tr class="thead-tr">
            <td class="thead-td">Name</td>
            <td class="thead-td">Year</td>
            <td class="thead-td">Genre</td>
            <td class="thead-td">Links</td>
            <td class="thead-td">Actions</td>
          </tr>
        </thead>
        <tbody v-if="getFilms && getFilms.list">
          <tr v-for="item in getFilms.list" :key="item.id">
            <td class="thead-td">{{ item.name }}</td>
            <td class="thead-td">{{ item.year ? item.year : '--' }}</td>
            <td class="thead-td">
              {{ item.favorite }}
            </td>
            <td class="thead-td">
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.name }}
              </a>
              <span v-else>--</span>
            </td>
            <td class="thead-td">
              <button @click="handleDeleteBtn(item)" class="td-btn">
                Delite
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <client-only>
        <div v-if="getFilms && getFilms.totalPage">
          <PaginationNew
            :total="Number(getFilms.totalPage)"
            @pagination="changePage($event)"
            :current="Number(selectedPage)"
          />
        </div>
      </client-only>
    </section>
    {{ totalCountPage }}
    <div class="modal" v-if="openModalItem">
      <div class="modal-title-wrap">
        <p class="modal-title">New movie or TV show</p>
        <button class="modal-btn-close" @click="closeModal">x</button>
      </div>
      <p class="main-title">Main information</p>
      <form class="modal-form">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter the name"
          v-model="filmName"
        />
        <label for="year">Year</label>
        <input
          id="year"
          type="text"
          placeholder="Enter the release year"
          v-model="filmYear"
        />
        <label for="links">Links to watch</label>
        <input type="text" id="links" v-model="links" />
      </form>

      <button @click="createFilm">Create</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaginationNew from '~/components/PaginationNew'
import Header from '~/components/Header'

export default {
  components: { Header, PaginationNew },
  data() {
    return {
      selectedPage: 1,
      filmName: '',
      filmYear: '',
      links: '',
      totalCountPage: 1,
      limit: 10,
      filmsArr: [
        {
          id: 1,
          name: 'Breaking Bad',
          year: 2000,
          genre: ['Crime drama', 'Thriller', 'Neo-Western'],
          links: ['netflix.com', 'amazon.com'],
        },
      ],
      openModalItem: false,
    }
  },

  async created() {
    if (process.browser) {
      await this.getListFilms(
        (this.$route.params && this.$route.params.page) || 1,
      )
    }
  },

  computed: {
    ...mapGetters({
      getFilms: 'films/getFilms',
    }),
  },

  methods: {
    addNewFilm() {
      this.openModalItem = true
    },

    closeModal() {
      this.openModalItem = false
    },
    async createFilm() {
      const params = {
        name: this.filmName,
        year: this.filmYear,
        link: this.links,
      }
      await this.$store.dispatch('films/addFilm', params)
      await this.$store.dispatch('films/getAllFilms')
      this.closeModal()
    },

    async getListFilms(numberPage) {
      const params = {
        page: numberPage,
      }
      await this.$store.dispatch('films/getAllFilms', params)
    },
    async handleDeleteBtn(film) {
      const params = {
        id: film._id,
        owner: film.owner.email,
      }
      await this.$store.dispatch('films/removeFilm', params)
      this.$store.dispatch('films/getAllFilms')
    },

    changePage(page) {
      this.selectedPage = page
      if (process.browser) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      const lastSlesh = this.$route.path.lastIndexOf('/')
      this.$router.push({
        path: `${this.$route.path.slice(0, lastSlesh + 1)}${page}`,
      })
      this.selectedPage = page
    },
  },

  middleware({ store, redirect }) {
    if (!store.$auth.loggedIn) {
      return redirect('/login')
    }
  },
}
</script>

<style scoped lang="scss">
.main-section {
  max-width: 1440px;
  padding: 16px 60px;
  margin: 0 auto;
  background-color: #f7f7fa;
}

.box {
  position: relative;
  width: 100%;
  background-size: cover;
  height: 100vh;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(~/assets/images/mainbg.jpeg);

  background-repeat: no-repeat;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-add {
  padding: 6px 20px;
  background: #fc003d;
  border-radius: 4px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
}

.table {
  width: 100%;
}

.thead {
  background-color: #3d373a;
  color: #fff;
}

.thead-td {
  padding: 8px;
}

.list {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
}

.list-item {
  margin-right: 5px;
}

.modal {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -1px -4px 20px rgba(163, 174, 208, 0.08),
    0px 16px 40px rgba(163, 174, 208, 0.12);
  border-radius: 15px;
  padding: 20px;
  background-color: #fff;
}

.modal-btn-close {
  display: block;
  outline: none;
  border: none;
  padding: 6px;
}

.modal-title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.main-title {
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  color: #3d373a;
}

.modal-form {
  display: flex;
  flex-direction: column;
  min-width: 400px;
}

.td-btn {
  outline: none;
  border: none;
  padding: 8px 12px;
}
</style>
