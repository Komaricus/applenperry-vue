import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import axios from 'axios'

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

Vue.config.productionTip = false

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({ baseURL: 'https://applenperry.ru/apple-api' })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
