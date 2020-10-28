<template>
  <div class="container">
    <h1 class="text--main mb-3">Ассортимент</h1>
    <products></products>
  </div>
</template>

<script>
import Products from '@/components/Shop/Products/Products'

export default {
  name: 'Stock',
  components: {
    Products
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

.container {
  padding: 20px;
  max-width: 1240px;
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
