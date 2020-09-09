<template>
  <div id="app">
    <router-view v-if="mode !== 'production'" />
    <wip v-else />
    <mobile-menu />
  </div>
</template>
<script>
import WIP from '@/views/WIP'
import MobileMenu from './components/MobileMenu'

export default {
  components: {
    wip: WIP,
    'mobile-menu': MobileMenu
  },
  computed: {
    mode() {
      return process.env.NODE_ENV
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
