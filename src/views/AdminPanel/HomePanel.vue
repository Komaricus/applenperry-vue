<template>
  <div>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="12" sm="4">
        <v-card class="pa-2" outlined tile>
          One of three columns
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomePanel'
}
</script>

<style scoped></style>
