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
    snackbarText: '',
    items: [
      {
        id: 'categories',
        name: 'Категории товара'
      },
      {
        id: 'about-cider',
        name: 'О сидре и перри'
      },
      {
        id: 'countries',
        name: 'Страны'
      },
      {
        id: 'home-slider',
        name: 'Слайдер главная'
      },
      {
        id: 'vendors',
        name: 'Производители'
      },
      {
        id: 'news-sections',
        name: 'Разделы новостей'
      },
      {
        id: 'news',
        name: 'Новости'
      },
      {
        id: 'products-types',
        name: 'Типы товаров'
      },
      {
        id: 'products-sugar-types',
        name: 'Сахар'
      },
      {
        id: 'products',
        name: 'Товары'
      }
    ],
    slugSource: ''
  },
  getters: {
    lists: state => {
      return state.items.map(e => {
        return e.id
      })
    },
    itemNameById: state => id => {
      return state.items.find(i => i.id === id).name
    }
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
    },
    setSlugSource(state, payload) {
      state.slugSource = payload
    }
  },
  actions: {},
  modules: {}
})
