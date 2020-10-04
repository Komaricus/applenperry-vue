import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: []
    })
  ],
  state: {
    mobileMenu: false,
    snackbar: false,
    snackbarColor: '',
    snackbarText: ''
  },
  mutations: {
    toggleSideMenu(state) {
      state.mobileMenu = !state.mobileMenu
    },
    showSnackbar(state, payload) {
      if (!payload) return
      if (!payload.text || !payload.color) return

      state.snackbarColor = payload.color
      state.snackbarText = payload.text
      state.snackbar = true

      setTimeout(() => {
        state.snackbar = false
      }, 3000)
    }
  },
  actions: {},
  modules: {}
})
