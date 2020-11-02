<template>
  <section class="admin-full-page-centered">
    <h1 id="title-404">404</h1>
    <div>
      <h1 class="text-roboto font-weight-medium">Страница не найдена</h1>
      <v-btn
        color="admin-primary"
        class="text--white"
        @click="$router.replace('/apple-admin/panel')"
        >Перейти на главную</v-btn
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdminPage404'
}
</script>

<style lang="scss" scoped>
@import 'src/assets/colors';
.admin-full-page-centered {
  display: flex;
  min-height: calc(100vh - 64px);
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

#title-404 {
  font-size: 7rem;
  font-family: Roboto, sans-serif;
  color: $admin-secondary;
  font-weight: 400;
}

h1 {
  padding-top: 60px;
  padding-bottom: 10px;
  font-size: 32px;
  font-weight: 100;
}
</style>
