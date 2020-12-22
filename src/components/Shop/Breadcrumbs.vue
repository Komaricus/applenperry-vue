<template>
  <v-card v-if="items.length" id="breadcrumbs" color="rgb(238, 238, 238)" class="elevation-0 mb-5">
    <v-breadcrumbs :items="items" large>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="'/apple-admin/site' + item.to"
          :disabled="isDisabled(item.to)"
          class="breadcrumb"
          exact
          exact-active-class="active-breadcrumb"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-card>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isDisabled(to) {
      return this.$route.path === to
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/colors';
#breadcrumbs {
  ul {
    padding: 10px 20px;
  }

  .breadcrumb {
    a {
      color: $main;
    }

    a:hover {
      color: $orange;
    }
  }

  .active-breadcrumb {
    color: $orange !important;
  }
}
</style>
