import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import vuetify from './plugins/vuetify'
import VueYandexMetrika from 'vue-yandex-metrika'

Vue.config.productionTip = false

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios
  }
})

Vue.filter('cropName', function(name) {
  if (!name) return ''
  let cropName = name
  if (cropName.length > 22) cropName = name.substr(0, 10) + '...' + name.substring(name.length - 10)
  return cropName
})

Vue.filter('space', function(val) {
  val = String(val)
    .split('')
    .reverse()
  let result = ''
  for (let i = 0; i < val.length; i++) {
    if (i % 3 === 0 && i !== 0 && i !== val.length) {
      result = ' ' + result
    }
    result = val[i] + result
  }

  return result
})

Vue.filter('humanFileSize', function(size) {
  let i = Math.floor(Math.log(size) / Math.log(1000))
  return (
    (size / Math.pow(1000, i)).toFixed(2) * 1 +
    ' ' +
    ['байт', 'КБайт', 'Мбайт', 'ГБайт', 'ТБайт'][i]
  )
})

Vue.use(VueYandexMetrika, {
  id: 69890680,
  router: router,
  env: process.env.NODE_ENV,
  // debug: true,
  ignoreRoutes: [
    'AdminLogin',
    'HomePanel',
    'HomePanelList',
    'HomePanelCreate',
    'HomePanelEdit',
    'Files',
    'Orders',
    'Order',
    'Admin404'
  ],
  options: {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
