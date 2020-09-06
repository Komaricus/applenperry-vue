<template>
  <div id="app">
    <router-view v-if="mode !== 'production'" />
    <wip v-else />
  </div>
</template>
<script>
import WIP from '@/views/WIP'

export default {
  components: {
    wip: WIP
  },
  computed: {
    mode() {
      return process.env.NODE_ENV
    }
  }
}
</script>
<style lang="scss">
@import url('assets/fonts.css');
@import 'assets/style';
</style>
