<template>
  <section class="page-404">
    <h1 class="title-404">404</h1>
    <div>
      <h1>Страница не найдена</h1>
      <v-btn color="primary" @click="$router.replace('/shop')">Перейти на главную</v-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShopPage404'
}
</script>

<style lang="scss" scoped>
.title-404 {
  font-size: 7rem;
  font-family: Roboto, sans-serif;
  color: #f07d10;
  font-weight: 400;
}

h1 {
  padding-top: 60px;
  padding-bottom: 10px;
  font-size: 32px;
  font-weight: 100;
}

.page-404 {
  display: flex;
  min-height: calc(100vh - 240px);
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
</style>
