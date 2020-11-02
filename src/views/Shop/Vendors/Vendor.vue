<template>
  <div class="container" v-if="!loading">
    <breadcrumbs :items="breadcrumbs" />
    <h1 class="text--main mb-3">{{ title }}</h1>
    <div v-if="description" v-html="description" class="vendor-description"></div>
    <products :type="'vendor'" :url="$route.params.id"></products>
  </div>
  <div class="container fill-height" v-else>
    <v-progress-circular
      size="50"
      indeterminate
      color="primary"
      class="mx-auto"
    ></v-progress-circular>
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
      ],
      loading: false
    }
  },
  async created() {
    this.loading = true
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
      .finally(() => {
        this.loading = false
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
