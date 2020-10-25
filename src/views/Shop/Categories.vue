<template>
  <div id="shop-categories-container">
    <div class="container">
      <h1 class="page-title">Категории</h1>
      <v-row class="d-flex">
        <v-col
          v-for="category in categories"
          :key="category.id"
          class="category-col"
          cols="12"
          md="6"
          lg="4"
        >
          <router-link :to="category.url" class="category-link">
            <div class="text-h6 text--main">{{ category.name }}</div>
          </router-link>
          <ul class="pl-0">
            <li v-for="children in category.child" :key="children.id">
              <router-link :to="children.url" class="d-flex align-center child-link">
                <v-icon small color="primary">
                  fas fa-apple-alt
                </v-icon>
                <span class="text--main ml-2 subtitle-1">{{ children.name }}</span>
              </router-link>
            </li>
          </ul>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      categories: []
    }
  },
  async created() {
    await this.$api
      .get('/open/categories')
      .then(({ data }) => (this.categories = data))
      .catch(error => console.error(error))
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#shop-categories-container {
  width: 100%;

  .container {
    max-width: 1000px;
    padding: 20px;
  }
}

.page-title {
  color: $main;
}

.category-col {
  min-width: 300px;
}

.category-link:hover {
  div {
    color: $orange !important;
  }
}

.child-link:hover {
  i {
    color: $orange !important;
  }

  span {
    color: $orange !important;
  }
}
</style>
