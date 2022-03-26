<template>
  <div id="shop">
    <burger type="shop" />
    <v-app-bar id="app-bar" app class="elevation-0" color="background-grey">
      <div id="shop-app-bar" class="d-flex justify-center align-center container">
        <div class="links-left">
          <router-link to="/shop" class="app-bar-link" exact-active-class="active-link"
            >Главная</router-link
          >
          <router-link to="/shop/categories" class="app-bar-link" exact-active-class="active-link"
            >Категории</router-link
          >
        </div>

        <div class="app-bar-logo">
          <router-link to="/">
            <img src="@/assets/images/small-logo.png" alt="logo" />
          </router-link>
        </div>

        <div class="links-right">
          <router-link to="/shop/vendors" class="app-bar-link" exact-active-class="active-link"
            >Производители</router-link
          >
          <router-link to="/shop/contacts" class="app-bar-link" exact-active-class="active-link"
            >Контакты</router-link
          >
          <!-- <router-link to="/shop/delivery" class="app-bar-link" exact-active-class="active-link">Доставка</router-link>-->
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

    <v-footer id="footer" color="#eee">
      <div class="container pa-0">
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="6" class="py-0 px-2 text-sm-right phone">
            <div class="d-flex flex-column">
              <div class="mb-1 caption text--inactive">Позвоните нам</div>
              <div><a class="phone-link" href="tel: +79653714731">+7 (965) 371-47-31</a></div>
            </div>
          </v-col>
          <v-col v-if="docs.length" cols="12" sm="6" class="py-0 px-2 docs">
            <div class="mb-1 caption text--inactive">Соглашения и правила</div>
            <div v-for="doc of docs" :key="doc.id">
              <router-link class="footer-link" :to="`/shop/docs/${doc.url}`">{{
                doc.name
              }}</router-link>
            </div>
          </v-col>
        </v-row>
        <div class="text--inactive text-center pa-1 copyright">
          © Apple'n'Perry, {{ new Date().getFullYear() }}
        </div>
      </div>
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
  data() {
    return {
      docs: []
    }
  },
  created() {
    this.$api
      .get(`/open/docs`)
      .then(({ data }) => {
        this.docs = data
      })
      .catch(error => {
        console.error(error)
      })
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

.links-left,
.links-right {
  display: flex;
  width: 350px;
}

.links-left {
  justify-content: flex-end;
}

.links-right {
  justify-content: flex-start;
}

#footer {
  .container {
    max-width: 600px;
  }

  .social {
    width: 120px;
  }

  .phone {
    width: 180px;

    .phone-link {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.54);
    }

    .phone-link:hover {
      color: $orange;
    }
  }

  .docs {
    width: 300px;

    .footer-link {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.54);
    }

    .footer-link:hover {
      color: $orange;
    }
  }

  .copyright {
    font-size: 14px;
  }
}

.active-link {
  color: $orange;
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
