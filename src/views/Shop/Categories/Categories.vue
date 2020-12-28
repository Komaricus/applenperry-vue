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
          <div class="d-flex align-center">
            <div class="image-container" v-if="category.icon">
              <image-component :image-src="category.iconFile.path"></image-component>
            </div>
            <div class="text-h6 text--main" :class="{ 'ml-2': category.icon }">
              {{ category.name }}
            </div>
          </div>
          <ul class="pl-0">
            <li v-for="children in category.child" :key="children.id">
              <router-link :to="getLink(category, children)" class="d-flex align-center link">
                <div class="image-container" v-if="children.icon">
                  <image-component :image-src="children.iconFile.path"></image-component>
                </div>
                <v-icon v-else small color="primary" class="icon">
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
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'Categories',
  components: {
    ImageComponent
  },
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

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    width: 16px;

    img {
      max-width: 100%;
      max-height: 16px;
    }
  }

  .icon {
    height: 16px;
    width: 16px;
  }
}

.page-title {
  color: $main;
}

.category-col {
  min-width: 200px;
}

.link:hover {
  //i {
  //  color: $orange !important;
  //}

  span {
    color: $orange !important;
  }
}
</style>
