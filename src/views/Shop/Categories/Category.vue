<template>
  <div class="container">
    <h1 class="text--main">{{ title }}</h1>
    <div v-if="description" v-html="description" class="category-description"></div>
    <products :type="$route.params.type" :url="$route.params.id"></products>
  </div>
</template>

<script>
import Products from '@/components/Shop/Products/Products'

export default {
  name: 'Category',
  components: {
    Products
  },
  data() {
    return {
      title: '',
      description: ''
    }
  },
  async created() {
    let url = ''
    let id = this.$route.params.id
    switch (this.$route.params.type) {
      case 'country':
        url = `/open/countries/${id}`
        break
      case 'type':
        url = `/open/products-types/${id}`
        break
      case 'sugar':
        url = `/open/products-sugar-types/${id}`
        break
      default:
        url = `/open/categories/${id}`
    }

    this.$api
      .get(url)
      .then(({ data }) => {
        this.title = data.name
        document.title = this.title
        this.description = data.description
      })
      .catch(error => {
        console.error(error)
        this.$router.back()
      })
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

.container {
  padding: 20px;
  max-width: 1240px;
}

.category-description {
  color: $main;
  font-size: 16px;
}

@media (max-width: 1240px) {
  .container {
    max-width: 940px;
  }
}

@media (max-width: 940px) {
  .container {
    max-width: 640px;
  }
}
</style>
