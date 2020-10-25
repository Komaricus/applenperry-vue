<template>
  <div class="my-3">
    <div class="settings">
      <v-text-field
        v-model="search"
        color="primary"
        dense
        hide-details
        placeholder="Поиск..."
        prepend-inner-icon="fas fa-search"
        outlined
        class="pa-1 search"
      ></v-text-field>
      <v-spacer class="space"></v-spacer>
      <div class="d-flex align-center pa-1 per-page">
        <span class="caption">На странице:</span>
        <v-select
          item-color="primary"
          v-model="perPage"
          :items="items"
          dense
          item-value="value"
          item-text="name"
          outlined
          hide-details
          class="select ml-3"
        ></v-select>
      </div>
      <v-select
        item-color="primary"
        v-model="sort"
        :items="sortItems"
        dense
        return-object
        item-text="name"
        outlined
        hide-details
        append-icon="fa-sort"
        class="pa-1 sort"
      ></v-select>
    </div>
    <div class="products-container" v-if="products.length && !loading">
      <v-row>
        <v-col v-for="product in products" :key="product.id" class="product-col">
          <product-card :product="product" :base-path="$route.path"></product-card>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="!loading">
      <p class="text-center text--inactive mt-4">Товары не найдены</p>
    </div>
    <div
      v-if="products.length && !loading && perPage !== -1 && total > perPage"
      class="text-center"
    >
      <v-row justify="center">
        <v-col cols="8">
          <v-pagination v-model="page" :length="totalPages" color="primary"></v-pagination>
        </v-col>
      </v-row>
    </div>
    <div v-if="loading" class="d-flex align-center justify-center mt-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/Shop/Products/ProductCard'

export default {
  name: 'Products',
  components: {
    ProductCard
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      search: '',
      mode: 'grid',
      products: [],
      types: ['category', 'country', 'type', 'sugar', 'vendor'],
      page: 1,
      perPage: 12,
      total: 0,
      totalPages: 0,
      items: [
        { name: '12', value: 12 },
        { name: '24', value: 24 },
        { name: '40', value: 40 },
        { name: 'Все', value: -1 }
      ],
      sort: { name: 'Сначала новые', column: 'created_at', sort: 'desc' },
      sortItems: [
        { name: 'Сначала новые', column: 'created_at', sort: 'desc' },
        { name: 'Сначала старые', column: 'created_at', sort: 'asc' },
        { name: 'Сначала подешевле', column: 'price', sort: 'asc' },
        { name: 'Сначала подороже', column: 'price', sort: 'desc' }
      ]
    }
  },
  async created() {
    await this.getProducts()
  },
  methods: {
    async getProducts() {
      this.loading = true
      let params = {}
      if (this.type && this.url && this.types.includes(this.type)) params[this.type] = this.url
      params.search = this.search
      params.page = this.page
      params.perPage = this.perPage
      params.column = this.sort.column
      params.sort = this.sort.sort

      await this.$api
        .get(`/open/products`, {
          params: params
        })
        .then(({ data }) => {
          this.products = data.products
          this.total = data.total
          this.totalPages = Math.ceil(this.total / this.perPage)
        })
        .catch(error => {
          console.error(error)
          this.$router.back()
        })
        .finally(() =>
          setTimeout(() => {
            this.loading = false
          }, 300)
        )
    }
  },
  watch: {
    async search() {
      this.page = 1
      await this.getProducts()
    },
    async perPage() {
      this.page = 1
      await this.getProducts()
    },
    async page() {
      await this.getProducts()
    },
    async sort() {
      this.page = 1
      await this.getProducts()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/colors';
.active {
  i {
    color: $primary !important;
  }
}

.settings {
  display: flex;
  align-items: center;

  .search {
    max-width: 300px;
  }

  .select {
    max-width: 100px;
  }

  .sort {
    max-width: 230px;
  }

  .per-page {
    min-width: 200px;
  }
}

.product-col {
  min-width: 300px;
  max-width: 300px;
}

.products-container {
  margin: 0 auto;
  max-width: 1200px;
}

@media (max-width: 1240px) {
  .products-container {
    max-width: 900px;
  }
}

@media (max-width: 940px) {
  .products-container {
    max-width: 600px;
  }
}

@media (max-width: 640px) {
  .products-container {
    max-width: 300px;
  }

  .settings {
    flex-wrap: wrap;

    .space {
      display: none;
    }

    .search {
      max-width: 100%;
    }
  }
}
</style>
