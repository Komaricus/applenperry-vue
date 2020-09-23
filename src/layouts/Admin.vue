<template>
  <v-app>
    <v-app-bar app color="admin-primary" dark>
      <v-toolbar-title class="text-neucha">Apple`n`Perry</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view v-if="mode !== 'production'" />
      <wip v-else />
    </v-main>
  </v-app>
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
