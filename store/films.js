
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
                 url: '/api/contacts'
             })
             console.log(resp);
             if (resp.data.code === 200) {
                 commit('SET_ALL_FILMS', resp.data.data.contacts)
             }
             else {
                       throw new Error('error get all film');
                   }
        //    if (resp.data.code === 201) {
        //      return 'success'
        //    } else {
        //        throw new Error('error in registration');
        //    }
         }
         catch (err) {
             console.error(err.name, 'error get all film');   
             return err
                
         }
      
     },

     async addFilm({ commit }, params) {
        try {
            const resp = await this.$axios({
                method: 'POST',
                url: '/api/contacts',
                data: params,
            })
            console.log(resp);
       //    if (resp.data.code === 201) {
       //      return 'success'
       //    } else {
       //        throw new Error('error in registration');
       //    }
        }
        catch (err) {
            console.error(err.name, 'error in registration');   
            return err
               
        }
     
    },
     

 }
 
 export const getters = {
   getFilms: (state) => state.allFilms,
 }
 