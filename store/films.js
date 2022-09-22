export const state = () => ({
  allFilms: null,
})

export const mutations = {
  SET_ALL_FILMS(state, data) {
    state.allFilms = data
  },
}
export const actions = {
  async getAllFilms({ commit }, params) {
    try {
      const resp = await this.$axios({
        method: 'GET',
        url: '/api/films',
      })
      if (resp.data.code === 200) {
        commit('SET_ALL_FILMS', resp.data.data.films)
      } else {
        throw new Error('error get all film')
      }
    } catch (err) {
      return err
    }
  },

  async addFilm({ commit }, params) {
    try {
      await this.$axios({
        method: 'POST',
        url: '/api/films',
        data: params,
      })
    } catch (err) {
      return err
    }
  },
  async removeFilm({ commit }, params) {
    try {
      await this.$axios({
        method: 'DELETE',
        url: `/api/films/${params.id}`,
        data: params,
      })
    } catch (err) {
      return err
    }
  },
}

export const getters = {
  getFilms: (state) => state.allFilms,
}
