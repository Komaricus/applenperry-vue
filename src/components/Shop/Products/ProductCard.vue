<template>
  <div class="product clickable" @click="$router.push(productLink(product.url))">
    <div class="product-image-container">
      <div class="image">
        <image-component :image-src="product.image.path"></image-component>
      </div>
    </div>
    <div class="d-flex align-end">
      <div class="product-price" v-if="product.price && shopAvailable">
        {{ product.price | space }} <span class="product-price-currency">₽</span>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          v-if="product.amount > 0 && shopAvailable"
          color="primary"
          class="mb-2 text--white"
          small
          @click.stop="addToCart(product)"
          >Заказать</v-btn
        >
        <p v-else-if="shopAvailable" class="caption text--error mb-2 font-weight-bold">
          Нет в наличии
        </p>
      </div>
    </div>
    <h3 v-if="product.name" class="product-name" :class="{ 'mt-3': !shopAvailable }">
      {{ product.name }}
    </h3>
  </div>
</template>

<script>
import ImageComponent from '@/components/ImageComponent'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    basePath: {
      type: String,
      default: '/shop/stock'
    }
  },
  components: {
    ImageComponent
  },
  methods: {
    ...mapMutations(['addToCart']),
    productLink(url) {
      return this.basePath + '/' + url
    }
  },
  computed: {
    ...mapState(['shopAvailable'])
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';
.product {
  background-color: white;
  width: 100%;
  padding: 10px;
  height: 315px;
  max-width: 300px;

  &-name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: $title;
    margin: 5px 5px 0;
  }

  &-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;

    .image {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    img {
      max-width: 100%;
      max-height: 200px;
    }
  }

  &-price {
    color: $main;
    font-size: 26px;
    font-weight: 700;
    margin-top: 10px;

    &-currency {
      margin-left: -5px;
      font-size: 20px;
    }
  }
}
</style>
