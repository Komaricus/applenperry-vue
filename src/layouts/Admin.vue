<template>
  <div>
    <v-app-bar app color="admin-primary" dark class="admin-app-bar">
      <router-link to="/apple-admin/panel">
        <v-toolbar-title class="text-neucha text--white">Apple`n`Perry</v-toolbar-title>
      </router-link>

      <div class="links" v-if="$route.path !== '/apple-admin'">
        <router-link to="/apple-admin/files">Изображения</router-link>
        <router-link to="/apple-admin/orders">Заказы</router-link>
      </div>
      <v-spacer></v-spacer>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  computed: {
    ...mapState(['snackbar', 'snackbarText', 'snackbarColor'])
  }
}
</script>
<style scoped lang="scss">
.admin-app-bar {
  z-index: 10 !important;

  .links {
    margin-left: 50px;

    a {
      color: white;
      margin: 0 10px;
    }
  }
}
</style>
