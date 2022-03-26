<template>
  <div id="other">
    <v-app-bar id="app-bar" app class="elevation-0" color="background-grey">
      <div class="d-flex container align-center">
        <div class="app-bar-logo">
          <router-link to="/">
            <img src="@/assets/images/small-logo.png" alt="logo" />
          </router-link>
        </div>
        <h1 class="page-name">{{ pageName }}</h1>
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
  </div>
</template>

<script>
export default {
  name: 'Other',
  data() {
    return {
      docs: [],
      pageName: ''
    }
  },
  async created() {
    this.$root.$on('page-name-changed', name => {
      this.pageName = name
    })

    this.$api
      .get(`/open/docs`)
      .then(({ data }) => {
        this.docs = data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#app-bar {
  z-index: 10;

  .app-bar-logo {
    height: 60px;
    margin: 0 10px;

    img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .page-name {
    margin-left: 20px;
    color: $title;
  }
}

#main {
  padding-top: 70px !important;
  min-height: calc(100vh - 137px);
  max-width: 1920px;
  margin: 0 auto;
}

#footer {
  .container {
    max-width: 600px;
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
</style>
