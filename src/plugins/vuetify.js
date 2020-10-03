import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import light from './theme'

Vue.use(Vuetify)

import ru from 'vuetify/lib/locale/ru'

export default new Vuetify({
  icons: {
    iconfont: 'fa'
  },
  theme: {
    themes: { light },
    options: {
      cspNonce: '2726c7f26c'
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
})
