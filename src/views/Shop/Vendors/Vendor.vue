<template>
  <div class="container">
    <breadcrumbs :items="breadcrumbs" />
    <h1 class="text--main mb-3">{{ title }}</h1>
    <div v-if="description" v-html="description" class="vendor-description"></div>
    <products :type="'vendor'" :url="$route.params.id"></products>
  </div>
</template>

<script>
import Products from '@/components/Shop/Products/Products'
import Breadcrumbs from '@/components/Shop/Breadcrumbs'

export default {
  name: 'Vendor',
  components: {
    Products,
    Breadcrumbs
  },
  data() {
    return {
      title: '',
      description: '',
      image: null,
      breadcrumbs: [
        {
          text: 'Главная',
          to: '/shop'
        },
        {
          text: 'Производители',
          to: '/shop/vendors'
        }
      ]
    }
  },
  async created() {
    this.$api
      .get(`/open/vendors/${this.$route.params.id}`)
      .then(({ data }) => {
        this.title = data.name
        document.title = this.title
        this.description = data.description
        this.image = data.image
        this.breadcrumbs.push({
          text: this.title,
          to: this.$route.path
        })
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
