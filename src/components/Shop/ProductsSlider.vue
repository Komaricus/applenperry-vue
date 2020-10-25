<template>
  <div id="products-swiper" v-if="products.length">
    <h2 class="new-products-title" v-if="title">{{ title }}</h2>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="product in products" :key="product.id">
        <product-card :product="product" :base-path="linksBasePath"></product-card>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
      <v-btn
        fab
        class="products-prev elevation-2 clickable"
        slot="button-prev"
        color="white"
        v-ripple="false"
        small
      >
        <v-icon color="primary" small>fas fa-arrow-left</v-icon>
      </v-btn>
      <v-btn
        fab
        class="products-next elevation-2 clickable"
        slot="button-prev"
        color="white"
        v-ripple="false"
        small
      >
        <v-icon color="primary" small>fas fa-arrow-right</v-icon>
      </v-btn>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ProductCard from '@/components/Shop/Products/ProductCard'

export default {
  name: 'ProductsSlider',
  props: {
    params: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    },
    linksBasePath: {
      type: String,
      default: '/shop/stock'
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ProductCard
  },
  data() {
    return {
      swiperOption: {
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.products-next',
          prevEl: '.products-prev'
        },
        breakpoints: {
          1920: {
            slidesPerView: 5,
            spaceBetween: 0
          },
          1476: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          932: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          688: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          334: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      },
      products: []
    }
  },
  async created() {
    await this.$api
      .get('/open/products', {
        params: this.params
      })
      .then(({ data }) => {
        this.products = data.products
      })
      .catch(error => console.error(error))
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/colors';

#products-swiper {
  margin: 10px 100px;
}

.new-products-title {
  padding-left: 22px;
  color: $main;
}

.swiper {
  height: 345px;
}

.products-prev {
  position: absolute;
  top: 150px;
  left: 5px;
  z-index: 10;
}

.products-next {
  position: absolute;
  top: 150px;
  right: 5px;
  z-index: 10;
}

@media (max-width: 1132px) {
  #products-swiper {
    margin: 10px 0;
  }
}
</style>
