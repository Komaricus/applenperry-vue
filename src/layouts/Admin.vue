<template>
  <v-app>
    <v-app-bar app color="admin-primary" dark>
      <router-link to="/apple-admin/panel">
        <v-toolbar-title class="text-neucha text--white">Apple`n`Perry</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" v-bind="attrs" v-on="on" icon>
            <v-icon color="white">
              fa-cog
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/apple-admin/files">
            <v-list-item-title>Изображения</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-snackbar
      :value="snackbar"
      :color="snackbarColor"
      class="text-roboto"
      right
      shaped
      bottom
      elevation="1"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  async created() {
    if (window.location.pathname !== '/apple-admin')
      await this.$api.get('/admins/heartbeat').catch(error => {
        console.error(error)
      })
  },
  computed: {
    ...mapState(['snackbar', 'snackbarText', 'snackbarColor'])
  }
}
</script>
