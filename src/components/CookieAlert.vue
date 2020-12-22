<template>
  <div v-if="alert && $route.meta.layout !== 'admin' && yo" class="cookie-wrapper">
    <v-alert id="cookie-alert" dark prominent max-width="1000">
      <v-row align="center">
        <v-col cols="1" id="cookie-icon">
          <v-icon large>fas fa-cookie-bite</v-icon>
        </v-col>
        <v-col cols="12" sm="9">
          Этот веб-сайт использует файлы cookie для удобного и эффективного использования. Продолжая
          пользоваться сайтом, вы соглашаетесь
          <span @click="alert = false"
            ><router-link
              class="text--orange"
              to="/apple-admin/site/shop/docs/pravila-obrabotki-personalnyh-dannyh"
              >с использованием файлов cookie</router-link
            ></span
          >.
        </v-col>
        <v-col cols="12" sm="2" class="d-flex justify-end">
          <v-btn color="orange" large v-ripple="false" @click="alert = false">Окей</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'CookieAlert',
  data() {
    return {
      alert: false
    }
  },
  created() {
    this.alert = sessionStorage.getItem('cookieOK') !== 'true'
    if (this.$route.meta.layout !== 'admin' && this.yo) sessionStorage.setItem('cookieOK', 'true')
  },
  computed: {
    yo() {
      return sessionStorage.getItem('yo') === 'true'
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';
.cookie-wrapper {
  position: fixed;
  z-index: 20;
  bottom: 0;
  width: 100%;
  background-color: rgba(35, 83, 53, 0.9);
}

#cookie-alert {
  border-radius: 0;
  margin: 0 auto;
  background: none;

  #cookie-icon {
    display: block;
  }
}

@media (max-width: 600px) {
  #cookie-alert #cookie-icon {
    display: none;
  }
}
</style>
