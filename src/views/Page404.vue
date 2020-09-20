<template>
  <section class="container-404">
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
.container-404 {
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  .title-404 {
    font-size: 7rem;
    font-family: Roboto, sans-serif;
    color: #f07d10;
  }
}
</style>
