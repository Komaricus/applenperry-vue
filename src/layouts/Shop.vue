<template>
  <div>
    <v-app-bar app class="elevation-0" color="background-grey" prominent>
      <div class="d-flex justify-center align-center container">
        <v-spacer></v-spacer>
        <router-link to="/categories" class="app-bar-link">Категории</router-link>
        <router-link to="/vendors" class="app-bar-link">Производители</router-link>

        <div class="app-bar-logo">
          <router-link to="/">
            <img src="@/assets/images/small-logo.png" alt="logo" />
          </router-link>
        </div>

        <router-link to="/contacts" class="app-bar-link">Контакты</router-link>
        <router-link to="/delivery" class="app-bar-link">Доставка</router-link>
        <v-spacer></v-spacer>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app color="#eee">
      <div class="container text-center">
        <p class="text--inactive">Apple'n'Perry © 2020</p>
        <a href="https://www.instagram.com/applenperry/" title="Instagram">
          <v-icon large class="instagram-icon">fab fa-instagram</v-icon>
        </a>
      </div>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Shop'
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';
.app-bar-link {
  text-decoration: none;
  text-transform: uppercase;
  color: $primary;
  margin: 0 10px;
  font-size: 20px;
  font-family: 'Neucha', cursive;
}

.app-bar-link:hover,
.app-bar-link:active {
  color: $orange;
}

.app-bar-logo {
  height: 100px;
  margin: 0 10px;

  img {
    max-height: 100%;
    max-width: 100%;
  }
}

.instagram-icon {
  color: rgba(0, 0, 0, 0.54);
}
.instagram-icon:hover {
  color: $orange;
}
</style>
