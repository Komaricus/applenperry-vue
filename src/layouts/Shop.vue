<template>
  <div id="shop">
    <burger type="shop" />
    <v-app-bar id="app-bar" app class="elevation-0" color="background-grey" absolute>
      <div id="shop-app-bar" class="d-flex justify-center align-center container">
        <router-link to="/categories" class="app-bar-link">Категории</router-link>
        <router-link to="/vendors" class="app-bar-link">Производители</router-link>

        <div class="app-bar-logo">
          <router-link to="/">
            <img src="@/assets/images/small-logo.png" alt="logo" />
          </router-link>
        </div>

        <router-link to="/contacts" class="app-bar-link">Контакты</router-link>
        <router-link to="/delivery" class="app-bar-link">Доставка</router-link>
      </div>

      <div id="shop-mobile-app-bar" class="d-flex container">
        <div class="app-bar-logo">
          <router-link to="/">
            <img src="@/assets/images/small-logo.png" alt="logo" />
          </router-link>
        </div>
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
    <mobile-menu type="shop"></mobile-menu>
  </div>
</template>

<script>
import MobileMenu from '@/components/MobileMenu'
import Burger from '@/components/Burger'

export default {
  name: 'Shop',
  components: {
    MobileMenu,
    Burger
  }
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

#shop-mobile-app-bar {
  display: none !important;
}

@media (max-width: 700px) {
  #shop-app-bar {
    display: none !important;
  }

  #shop-mobile-app-bar {
    display: flex !important;
  }

  .app-bar-logo {
    height: 60px;
  }
}
</style>
