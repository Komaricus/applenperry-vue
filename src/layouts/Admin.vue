<template>
  <v-app v-if="mode !== 'production'">
    <v-app-bar app color="admin-primary" dark>
      <v-toolbar-title class="text-neucha">Apple`n`Perry</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <wip v-else />
</template>

<script>
import WIP from '../views/WIP'
export default {
  name: 'Admin',
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
