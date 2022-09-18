
export const state = () => ({
   isAuthenticated: false,
})

export const mutations = {
    SET_AUTH(state, data) {
        state.isAuthenticated = data
      },
}
export const actions = {
    async registration({ commit }, params) {
        try {
            const resp = await this.$axios({
                method: 'POST',
                url: 'api/users/signup',
               data: params,
            })
          if (resp.data.code === 201) {
            return 'success'
          } else {
              throw new Error('error in registration');
          }
        }
        catch (err) {
            console.error(err.name, 'error in registration');   
            return err
               
        }
     
  },
}

export const getters = {
  getHomeMail: (state) => state.homeMail,
}
