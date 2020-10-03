<template>
  <v-app>
    <v-app-bar app color="admin-primary" dark>
      <v-toolbar-title class="text-neucha">Apple`n`Perry</v-toolbar-title>

      <v-spacer></v-spacer>
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
