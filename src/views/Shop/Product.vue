<template>
  <div id="product" class="container" v-if="!loading">
    <breadcrumbs :items="breadcrumbs" />
    <v-row>
      <v-col cols="12" md="5" lg="6" class="image-container">
        <div class="image">
          <image-component v-if="product.image" :image-src="product.image.path" />
        </div>
        <!--todo: add images gallery -->
      </v-col>
      <v-col cols="12" md="7" lg="6" class="product-info">
        <div class="mb-4">
          <h1 class="product-name">{{ product.name }}</h1>
          <h3 v-if="product.subheader" class="text-roboto product-subheader">
            {{ product.subheader }}
          </h3>
        </div>
        <div class="product-price" v-if="product.price && shopAvailable">
          {{ product.price | space }} <span class="product-price-currency">₽</span>
        </div>

        <div class="amount" v-if="shopAvailable">
          <div class="pints">
            <IconSVG :color="pintColor" :type="getPintType(1)"></IconSVG>
            <IconSVG :color="pintColor" :type="getPintType(2)"></IconSVG>
            <IconSVG :color="pintColor" :type="getPintType(3)"></IconSVG>
          </div>
          <p class="amount-text pl-4" :class="`text--${pintColor.substr(1)}`">{{ amountText }}</p>
        </div>

        <v-btn
          color="primary"
          class="mb-2 text--white"
          @click.stop="addToCart(product)"
          :disabled="product.amount <= 0"
          v-if="shopAvailable"
          >Заказать</v-btn
        >
        <div class="details">
          <table>
            <tr v-if="product.vendor" class="details-row">
              <td class="details-cell-left">Производитель:</td>
              <td class="details-cell-right">{{ product.vendor.name }}</td>
            </tr>
            <tr v-if="product.vendor && product.vendor.country" class="details-row">
              <td class="details-cell-left">Страна:</td>
              <td class="details-cell-right">
                {{ product.vendor.country.name }}
                <div class="country-image">
                  <image-component
                    v-if="product.vendor && product.vendor.country && product.vendor.country.image"
                    :image-src="product.vendor.country.image.path"
                  ></image-component>
                </div>
              </td>
            </tr>
            <tr v-if="product.size" class="details-row">
              <td class="details-cell-left">Объём:</td>
              <td class="details-cell-right">{{ product.size | dotToComma }}л</td>
            </tr>
            <tr v-if="product.strength" class="details-row">
              <td class="details-cell-left">Крепость:</td>
              <td class="details-cell-right">{{ product.strength | dotToComma }}%</td>
            </tr>
            <tr v-if="product.productsType" class="details-row">
              <td class="details-cell-left">Тип:</td>
              <td class="details-cell-right">{{ product.productsType.name }}</td>
            </tr>
            <tr v-if="product.productsSugarType" class="details-row">
              <td class="details-cell-left">Сахар:</td>
              <td class="details-cell-right">{{ product.productsSugarType.name }}</td>
            </tr>
          </table>

          <div class="categories" v-if="product.categories">
            {{
              product.categories
                .map(e => {
                  return e.name
                })
                .join(', ')
            }}
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="product-description">
      <div v-if="product.description" v-html="product.description" class="html-wrapper"></div>
    </div>
    <div class="products-slider">
      <products-slider
        v-if="params !== null"
        :params="params"
        :title="title"
        :links-base-path="`/shop/vendors/${this.$route.params.id}`"
      ></products-slider>
    </div>
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
import ImageComponent from '@/components/ImageComponent'
import ProductsSlider from '@/components/Shop/ProductsSlider'
import Breadcrumbs from '@/components/Shop/Breadcrumbs'
import IconSVG from '@/components/IconSVG'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Product',
  components: {
    ImageComponent,
    ProductsSlider,
    IconSVG,
    Breadcrumbs
  },
  data() {
    return {
      product: {},
      params: null,
      title: '',
      breadcrumbs: [
        {
          text: 'Главная',
          to: '/shop'
        }
      ],
      loading: false
    }
  },
  filters: {
    dotToComma(val) {
      if (!val) return ''
      return String(val).replace('.', ',')
    }
  },
  async created() {
    await this.loadProduct()
  },
  methods: {
    ...mapMutations(['addToCart']),
    async loadProduct() {
      this.loading = true
      this.breadcrumbs = [{ text: 'Главная', to: '/shop' }]
      await this.$api
        .get(`/open/products/${this.$route.params.url}`)
        .then(({ data }) => {
          this.product = data
          document.title = this.product.name
          this.params = {
            page: 1,
            perPage: 10,
            column: 'created_at',
            sort: 'desc',
            vendor: this.product.vendor.url,
            except: this.product.id
          }

          this.title = 'Ещё от ' + this.product.vendor.name + ':'
        })
        .catch(error => {
          console.error(error)
          this.$router.back()
        })

      this.initBreadcrumbs()
      this.loading = false
    },
    getPintType(number) {
      switch (number) {
        case 1:
          if (this.product.amount <= 0) return 'empty'
          return 'filled'
        case 2:
          if (this.product.amount <= 10) return 'empty'
          return 'filled'
        case 3:
          if (this.product.amount <= 50) return 'empty'
          return 'filled'
      }
    },
    initBreadcrumbs() {
      const paths = this.$route.path.split('/')

      for (let i = 0; i < paths.length; i++) {
        if (paths[i] === 'vendors')
          this.breadcrumbs.push(
            { text: 'Производители', to: '/shop/vendors' },
            {
              text: this.product.vendor.name,
              to: '/shop/vendors/' + this.product.vendor.url
            }
          )

        if (paths[i] === 'categories')
          this.breadcrumbs.push({ text: 'Категории', to: '/shop/categories' })

        if (paths[i] === 'category') {
          if (i + 1 === paths.length) continue
          const index = this.product.categories.findIndex(e => e.url === paths[i + 1])
          if (index !== -1) {
            let { name, url } = this.product.categories[index]
            this.breadcrumbs.push({
              text: name,
              to: `/shop/categories/category/${url}`
            })
          }
        }

        if (paths[i] === 'country')
          this.breadcrumbs.push({
            text: this.product.vendor.country.name,
            to: `/shop/categories/country/${this.product.vendor.country.url}`
          })

        if (paths[i] === 'type')
          this.breadcrumbs.push({
            text: this.product.productsType.name,
            to: `/shop/categories/type/${this.product.productsType.url}`
          })

        if (paths[i] === 'sugar')
          this.breadcrumbs.push({
            text: this.product.productsSugarType.name,
            to: `/shop/categories/sugar/${this.product.productsSugarType.url}`
          })

        if (paths[i] === 'stock') this.breadcrumbs.push({ text: 'Ассортимент', to: '/shop/stock' })
      }
      this.breadcrumbs.push({ text: this.product.name, to: this.$route.path })
    }
  },
  watch: {
    async $route() {
      this.params = null
      await this.loadProduct()
    }
  },
  computed: {
    ...mapState(['shopAvailable']),
    pintColor() {
      if (this.product.amount <= 10) return '#ad050d'
      else if (this.product.amount >= 11 && this.product.amount <= 50) return '#f9aa33'
      else if (this.product.amount >= 51) return '#009a00'
      else return 'black'
    },
    amountText() {
      if (this.product.amount <= 0) return 'Нет в наличии'
      else if (this.product.amount >= 1 && this.product.amount <= 10) return 'Осталось немного'
      else if (this.product.amount >= 11 && this.product.amount <= 50) return 'Скоро закончится'
      else if (this.product.amount >= 51) return 'В наличии'
      else return ''
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/colors';

#product {
  .text--ad050d {
    color: #ad050d;
  }
  .text--f9aa33 {
    color: #f9aa33;
  }
  .text--009a00 {
    color: #009a00;
  }

  .container {
    padding: 20px;
    max-width: 1240px;
  }

  .image-container {
    width: 100%;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 424px;

    .image {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    img {
      max-width: 100%;
      max-height: 400px;
    }
  }

  .product-info {
    padding: 12px;

    .product-name {
      line-height: 1;
      color: $title;
    }

    .product-subheader {
      color: $main;
      font-weight: 300;
      font-size: 18px;
    }

    .product-price {
      color: $main;
      font-size: 32px;
      font-weight: 700;
      margin: 10px 0;

      &-currency {
        margin-left: -5px;
        font-size: 24px;
      }
    }

    .amount {
      max-height: 200px;
      margin-left: -14px;

      svg {
        height: 50px;
      }
    }

    .country-image {
      width: 100%;
      max-height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 32px;
      margin-left: 12px;

      img {
        max-width: 100%;
        max-height: 32px;
      }
    }

    .details {
      color: $main;
      font-size: 18px;
      background-color: #eee;
      padding: 10px;
      border-radius: 5px;

      .details-row {
        padding: 5px 0;
        min-height: 32px;
      }

      .details-cell-left {
        font-weight: 500;
        padding-right: 20px;
        min-height: 32px;
      }

      .details-cell-right {
        font-weight: 300;
        display: flex;
        align-items: center;
        min-height: 32px;
      }
    }

    .categories {
      margin: 10px 0;
      font-weight: 300;
    }
  }

  .product-description {
    margin: 10px auto;
  }

  .products-slider {
    margin: 10px auto;
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

@media (max-width: 959px) {
  #product.container {
    max-width: 600px;
    padding: 20px;

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
</style>
