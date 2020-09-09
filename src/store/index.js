import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mobileMenu: false
  },
  mutations: {
    toggleSideMenu(state) {
      state.mobileMenu = !state.mobileMenu
    }
  },
  actions: {},
  modules: {}
})
