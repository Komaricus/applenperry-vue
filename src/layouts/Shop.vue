<template>
  <div id="shop">
    <burger type="shop" />
    <v-app-bar id="app-bar" app class="elevation-0" color="background-grey">
      <div id="shop-app-bar" class="d-flex justify-center align-center container">
        <div class="links-left">
          <router-link to="/shop" class="app-bar-link">Главная</router-link>
          <router-link to="/shop/categories" class="app-bar-link">Категории</router-link>
          <router-link to="/shop/vendors" class="app-bar-link">Производители</router-link>
        </div>
        <div class="app-bar-logo">
          <router-link to="/">
            <img src="@/assets/images/small-logo.png" alt="logo" />
          </router-link>
        </div>

        <div class="links-right">
          <router-link to="/shop/contacts" class="app-bar-link">Контакты</router-link>
          <router-link to="/shop/delivery" class="app-bar-link">Доставка</router-link>
          <router-link v-if="shopAvailable" to="/shop/cart" class="app-bar-link"
            >Корзина</router-link
          >
        </div>
      </div>

      <div id="shop-mobile-app-bar" class="d-flex container">
        <div class="app-bar-logo">
          <router-link to="/">
            <img src="@/assets/images/small-logo.png" alt="logo" />
          </router-link>
        </div>
      </div>
    </v-app-bar>

    <v-main id="main">
      <router-view></router-view>
    </v-main>

    <v-footer color="#eee">
      <div class="container text-center">
        <p class="text--inactive">Apple'n'Perry © {{ new Date().getFullYear() }}</p>
        <a href="https://www.instagram.com/applenperry" target="_blank" title="Instagram">
          <v-icon large class="instagram-icon">fab fa-instagram</v-icon>
        </a>
      </div>
      <!-- todo: add privacy policy -->
    </v-footer>
    <mobile-menu type="shop"></mobile-menu>
    <cart-dialog v-if="shopAvailable"></cart-dialog>
  </div>
</template>

<script>
import MobileMenu from '@/components/MobileMenu'
import Burger from '@/components/Burger'
import CartDialog from '@/components/Shop/CartDialog'
import { mapState } from 'vuex'

export default {
  name: 'Shop',
  components: {
    MobileMenu,
    Burger,
    CartDialog
  },
  computed: {
    ...mapState(['shopAvailable'])
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#app-bar {
  z-index: 10;
}

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

.links-left,
.links-right {
  width: 350px;
}

#shop-mobile-app-bar {
  display: none !important;
}

#burger {
  position: fixed;
}

#main {
  padding-top: 128px !important;
  min-height: calc(100vh - 112px);
  max-width: 1920px;
  margin: 0 auto;
}

@media (max-width: 860px) {
  #shop-app-bar {
    display: none !important;
  }

  #shop-mobile-app-bar {
    display: flex !important;
  }

  .app-bar-logo {
    height: 60px;
  }

  #main {
    padding-top: 70px !important;
  }
}
</style>
