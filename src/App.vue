<template>
  <div id="app">
    <v-app>
      <yo v-if="!yo && layout !== 'admin'"></yo>
      <component v-else :is="layout" />
      <cookie-alert></cookie-alert>
    </v-app>
  </div>
</template>
<script>
import Default from '@/layouts/Default'
import Home from '@/layouts/Home'
import Admin from '@/layouts/Admin'
import Shop from '@/layouts/Shop'
import Other from '@/layouts/Other'
import YearsOldCheck from '@/views/YearsOldCheck'
import CookieAlert from '@/components/CookieAlert'

export default {
  components: {
    home: Home,
    default: Default,
    admin: Admin,
    yo: YearsOldCheck,
    shop: Shop,
    Other,
    CookieAlert
  },
  computed: {
    mode() {
      return process.env.NODE_ENV
    },
    yo() {
      return sessionStorage.getItem('yo') === 'true'
    },
    layout() {
      if (this.$route.meta.layout) return this.$route.meta.layout

      if (window.location.href.includes('apple-admin')) return 'admin'

      if (window.location.href.includes('/shop')) return 'shop'

      if (window.location.href.includes('pages')) return 'other'

      return 'default'
    }
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || 'Apple`n`Perry'
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="scss">
@import url('assets/fonts.css');
@import 'assets/style';
</style>
