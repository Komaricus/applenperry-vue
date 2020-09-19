<template>
  <div id="app">
    <router-view v-if="yo" />
    <yo v-else-if="mode !== 'production'" />
    <wip v-else />
    <mobile-menu />
  </div>
</template>
<script>
import WIP from '@/views/WIP'
import MobileMenu from './components/MobileMenu'
import YearsOldCheck from './views/YearsOldCheck'

export default {
  components: {
    wip: WIP,
    'mobile-menu': MobileMenu,
    yo: YearsOldCheck
  },
  computed: {
    mode() {
      return process.env.NODE_ENV
    },
    yo() {
      return sessionStorage.getItem('yo') === 'true'
    }
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || 'Apple`n`Perry'
    }
  },
  created() {
    this.$api
      .get('/')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>
<style lang="scss">
@import url('assets/fonts.css');
@import 'assets/style';
@import 'assets/bulma';
</style>
