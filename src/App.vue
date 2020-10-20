<template>
  <div id="app">
    <v-app>
      <wip v-if="mode === 'production' && layout !== 'admin'"></wip>
      <yo v-else-if="!yo && layout !== 'admin'"></yo>
      <component v-else :is="layout" />
    </v-app>
  </div>
</template>
<script>
import Default from '@/layouts/Default'
import Home from '@/layouts/Home'
import Admin from '@/layouts/Admin'
import Shop from '@/layouts/Shop'
import WIP from '@/views/WIP'
import YearsOldCheck from '@/views/YearsOldCheck'

export default {
  components: {
    home: Home,
    default: Default,
    admin: Admin,
    wip: WIP,
    yo: YearsOldCheck,
    shop: Shop
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

      return 'default'
    }
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || 'Apple`n`Perry'
    }
  }
}
</script>
<style lang="scss">
@import url('assets/fonts.css');
@import 'assets/style';
</style>
