<template>
  <v-app>
    <v-main>
      <router-view v-if="yo" />
      <yo v-else-if="mode !== 'production'" />
      <wip v-else />
      <mobile-menu />
    </v-main>
  </v-app>
</template>
<script>
import WIP from '../views/WIP'
import MobileMenu from '../components/MobileMenu'
import YearsOldCheck from '../views/YearsOldCheck'

export default {
  name: 'Default',
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
  }
}
</script>
