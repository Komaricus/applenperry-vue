<template>
  <div id="vendor">
    <div class="container" v-if="!loading">
      <breadcrumbs :items="breadcrumbs" />
      <h1 class="text--main mb-3">{{ title }}</h1>
      <div v-if="description" v-html="description" class="html-wrapper"></div>
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

<style lang="scss">
@import 'src/assets/colors';

#vendor {
  .container {
    padding: 20px;
    max-width: 1240px;
  }

  .category-description {
    color: $main;
    font-size: 16px;
  }

  .html-wrapper {
    color: $main;
    text-align: justify;

    h1,
    h2,
    h3,
    p {
      font-family: 'Roboto', sans-serif;
      margin-bottom: 16px;
    }

    h1,
    h2,
    h3 {
      margin-top: 8px;
      color: $title !important;
    }

    ul {
      list-style: disc;
      margin-left: 24px;
      margin-bottom: 16px;
      p {
        margin-bottom: 8px;
      }
    }
  }
}

@media (max-width: 600px) {
  #vendor .container {
    padding: 10px;

    .html-wrapper {
      h1 {
        font-size: 22px;
      }

      h2 {
        font-size: 18px;
      }

      h3 {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 1240px) {
  #vendor .container {
    max-width: 940px;
  }
}

@media (max-width: 940px) {
  #vendor .container {
    max-width: 640px;
  }
}
</style>
