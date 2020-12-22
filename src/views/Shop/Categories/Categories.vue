<template>
  <div id="shop-categories-container">
    <div class="container">
      <h1 class="page-title">Категории</h1>
      <v-row>
        <v-col
          v-for="category in categories"
          :key="category.id"
          class="category-col"
          cols="12"
          md="6"
          lg="4"
        >
          <div class="text-h6 text--main">{{ category.name }}</div>
          <ul class="pl-0">
            <li v-for="children in category.child" :key="children.id">
              <router-link
                :to="'/apple-admin/site' + getLink(category, children)"
                class="d-flex align-center link"
              >
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
  },
  methods: {
    getLink(category, children) {
      switch (category.id) {
        case 'countries':
          return `/shop/categories/country/${children.url}`
        case 'product-type':
          return `/shop/categories/type/${children.url}`
        case 'sugar-type':
          return `/shop/categories/sugar/${children.url}`
        default:
          return `/shop/categories/category/${children.url}`
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/colors';

#shop-categories-container {
  width: 100%;

  .container {
    max-width: 840px;
    padding: 20px;
  }
}

.page-title {
  color: $main;
}

.category-col {
  min-width: 200px;
}

.link:hover {
  i {
    color: $orange !important;
  }

  span {
    color: $orange !important;
  }
}
</style>
