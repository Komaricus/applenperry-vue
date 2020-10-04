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
  </v-app>
</template>

<script>
export default {
  name: 'Admin'
}
</script>
