<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>
<script>
import Default from './layouts/Default'
import Admin from './layouts/Admin'

export default {
  components: {
    default: Default,
    admin: Admin
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default'
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
