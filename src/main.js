import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({
      baseURL:
        process.env.NODE_ENV === 'production'
          ? window.location.origin + '/apple-api'
          : 'http://localhost:5001/apple-api'
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
