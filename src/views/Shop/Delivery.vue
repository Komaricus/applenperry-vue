<template>
  <div id="shop-delivery-container">
    <div class="container">
      <h1>Доставка и оплата</h1>
      <p>
        Услуга доставки недоступна в нашем магазине. Вы можете оформить заказ на сайте и забрать его
        в нашем пабе. Оплата возможна банковской картой или наличными.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Delivery'
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#shop-delivery-container {
  width: 100%;

  .container {
    padding: 20px;
  }
}
</style>
