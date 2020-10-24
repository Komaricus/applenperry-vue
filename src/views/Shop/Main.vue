<template>
  <div id="shop-main-container">
    <main-slider></main-slider>
    <products-slider></products-slider>
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
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#shop-main-container {
  width: 100%;
}
</style>
