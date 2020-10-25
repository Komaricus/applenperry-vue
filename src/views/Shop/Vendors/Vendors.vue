<template>
  <div id="shop-vendors-container">
    <div class="container">
      <h1 class="page-title">Производители</h1>
      <v-row class="vendors-container">
        <v-col v-for="vendor in vendors" :key="vendor.id" class="vendor" cols="12" md="6" lg="4">
          <router-link :to="`/shop/vendors/${vendor.url}`">
            <div class="image-container">
              <image-component :image-src="vendor.image.path"></image-component>
            </div>
            <div class="text-h6 text--main text-center mt-2">{{ vendor.name }}</div>
          </router-link>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'Vendors',
  components: {
    ImageComponent
  },
  data() {
    return {
      vendors: []
    }
  },
  async created() {
    await this.$api
      .get(`/open/vendors`)
      .then(({ data }) => {
        this.vendors = data
      })
      .catch(error => console.error(error))
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/colors';

#shop-vendors-container {
  width: 100%;

  .container {
    max-width: 920px;
    padding: 20px;
  }

  .vendor {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    height: 250px;
    justify-content: center;
    padding: 20px;

    .image-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 170px;

      img {
        max-width: 100%;
        max-height: 170px;
      }
    }
  }

  .vendor:hover {
    div {
      color: $orange !important;
    }
  }
}

@media (max-width: 920px) {
  #shop-vendors-container {
    .container {
      max-width: 620px;
    }
  }
}
@media (max-width: 620px) {
  #shop-vendors-container {
    .vendors-container {
      margin: 0 auto;
      max-width: 320px;
    }
  }
}
</style>
