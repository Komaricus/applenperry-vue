import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['token']
    })
  ],
  state: {
    mobileMenu: false,
    token: ''
  },
  mutations: {
    toggleSideMenu(state) {
      state.mobileMenu = !state.mobileMenu
    },
    setAuthToken(state, payload) {
      state.token = payload
    }
  },
  actions: {},
  modules: {}
})
