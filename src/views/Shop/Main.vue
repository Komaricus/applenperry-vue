<template>
  <div id="shop-main-container">
    <main-slider></main-slider>
    <products-slider :params="params" :title="title" linksBasePath="/shop/stock"></products-slider>
  </div>
</template>

<script>
import MainSlider from '@/components/Shop/MainSlider'
import ProductsSlider from '@/components/Shop/ProductsSlider'

export default {
  name: 'Main',
  components: {
    MainSlider,
    ProductsSlider
  },
  data() {
    return {
      params: {
        page: 1,
        perPage: 10,
        column: 'created_at',
        sort: 'desc'
      },
      title: 'Новинки'
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#shop-main-container {
  width: 100%;
}
</style>
