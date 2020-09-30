<template>
  <section class="full-page-centered">
    <h1 id="title-404">404</h1>
    <div>
      <h1>Страница не найдена</h1>
      <v-btn color="primary" @click="$router.replace('/')">Перейти на главную</v-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Page404'
}
</script>

<style lang="scss" scoped>
#title-404 {
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
</style>
