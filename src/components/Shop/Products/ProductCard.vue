<template>
  <router-link :to="product.url">
    <div class="product">
      <div class="product-image-container">
        <div class="image">
          <image-component :image-src="product.image.path"></image-component>
        </div>
      </div>
      <div class="product-price" v-if="product.price">
        {{ product.price | space }} <span class="product-price-currency">₽</span>
      </div>
      <h3 v-if="product.name" class="product-name">
        {{ product.name }}
      </h3>
    </div>
  </router-link>
</template>

<script>
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ImageComponent
  },
  filters: {
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
    color: $anchor;
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
    text-align: center;
    margin-top: 10px;

    &-currency {
      margin-left: -5px;
      font-size: 20px;
    }
  }
}
</style>
