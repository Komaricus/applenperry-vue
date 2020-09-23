<template>
  <section class="full-page-centered">
    <h1 class="title-404">404</h1>
    <div>
      <h1 class="is-size-3">Страница не найдена</h1>
      <b-button class="is-primary" @click="$router.replace('/')">Перейти на главную</b-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Page404'
}
</script>

<style lang="scss" scoped>
.title-404 {
  font-size: 7rem;
  font-family: Roboto, sans-serif;
  color: #f07d10;
}

h1 {
  padding-top: 60px;
  padding-bottom: 10px;
}
</style>
