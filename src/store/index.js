import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      },
      paths: ['form', 'formId', 'needsAlert', 'mode', 'cartItems']
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
      },
      {
        id: 'shop-slider',
        name: 'Слайдер магазин'
      }
    ],
    slugSource: '',
    form: null,
    formId: '',
    needsAlert: false,
    mode: '',
    cartItems: [],
    cartDialog: false
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
    clearCart(state) {
      state.cartItems = []
    },
    deleteFromCart(state, index) {
      state.cartItems.splice(index, 1)
    },
    addToCart(state, payload) {
      let item = {
        id: payload.id,
        name: payload.name,
        image: payload.image,
        price: payload.price,
        amount: payload.amount,
        count: 1
      }

      const index = state.cartItems.findIndex(e => e.id === item.id)
      if (index !== -1) {
        state.cartItems[index].count++
      } else {
        state.cartItems.push(item)
      }

      state.cartDialog = true
    },
    setCartDialog(state, payload) {
      state.cartDialog = payload
    },
    toggleMobileMenu(state) {
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
    },
    setForm(state, payload) {
      state.form = payload
    },
    setFormId(state, payload) {
      state.formId = payload
    },
    setNeedsAlert(state, payload) {
      state.needsAlert = payload
    },
    setMode(state, payload) {
      state.mode = payload
    }
  },
  actions: {},
  modules: {}
})
