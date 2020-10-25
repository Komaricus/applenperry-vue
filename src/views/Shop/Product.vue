<template>
  <div class="container">
    <v-row>
      <v-col cols="12" md="5" lg="6" class="image-container">
        <div class="image">
          <image-component v-if="product.image" :image-src="product.image.path"></image-component>
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
        <div class="product-price" v-if="product.price">
          {{ product.price | space }} <span class="product-price-currency">₽</span>
        </div>
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
    <div class="products-slider">
      <products-slider v-if="params !== null" :params="params" :title="title"></products-slider>
    </div>
  </div>
</template>

<script>
import ImageComponent from '@/components/ImageComponent'
import ProductsSlider from '@/components/Shop/ProductsSlider'

export default {
  name: 'Product',
  components: {
    ImageComponent,
    ProductsSlider
  },
  data() {
    return {
      product: {},
      params: null,
      title: ''
    }
  },
  filters: {
    dotToComma(val) {
      if (!val) return ''
      return String(val).replace('.', ',')
    },
    space(val) {
      val = String(val)
        .split('')
        .reverse()
      let result = ''
      for (let i = 0; i < val.length; i++) {
        if (i % 3 === 0 && i !== 0 && i !== val.length) {
          result = ' ' + result
        }
        result = val[i] + result
      }

      return result
    }
  },
  async created() {
    await this.loadProduct()
  },
  methods: {
    async loadProduct() {
      await this.$api
        .get(`/open/products/${this.$route.params.url}`)
        .then(({ data }) => {
          this.product = data
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
    }
  },
  watch: {
    async $route() {
      await this.loadProduct()
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

.container {
  padding: 8px;
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

    .details-row {
      padding: 5px 0;
      min-height: 32px;
    }

    .details-cell-left {
      padding-right: 20px;
      min-height: 32px;
    }

    .details-cell-right {
      display: flex;
      align-items: center;
      min-height: 32px;
    }
  }

  .categories {
    margin: 10px 0;
  }
}

.products-slider {
  margin: 10px 0;
}

@media (max-width: 959px) {
  .container {
    max-width: 600px;
    padding: 20px;
  }
}
</style>
