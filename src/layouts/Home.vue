<template>
  <v-main>
    <router-view />
    <mobile-menu />
  </v-main>
</template>
<script>
import MobileMenu from '../components/MobileMenu'

export default {
  name: 'Default',
  components: {
    'mobile-menu': MobileMenu
  }
}
</script>
