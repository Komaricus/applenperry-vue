<template>
  <div id="shop-main-container">
    <div v-if="Array.isArray(slides) && slides.length">
      <div class="swiper" v-if="slides.length === 1">
        <div class="slide swiper-slide">
          <image-component
            v-if="slides[0].fileId"
            :image-src="slides[0].image.path"
          ></image-component>
          <div class="slide-content">
            <h2 v-if="slides[0].header">{{ slides[0].header }}</h2>
            <div v-if="slides[0].description" v-html="slides[0].description"></div>
          </div>
        </div>
      </div>

      <swiper v-else class="swiper mt-3" :options="swiperOption">
        <swiper-slide
          v-for="slide in slides"
          :key="slide.id"
          class="slide"
          :class="{ clickable: slide.link }"
        >
          <router-link v-if="slide.link" :to="slide.link">
            <image-component
              v-if="slides[0].fileId"
              :image-src="slide.image.path"
            ></image-component>
            <div class="slide-content">
              <h2 v-if="slide.header">{{ slide.header }}</h2>
              <div v-if="slide.description" v-html="slide.description"></div>
            </div>
          </router-link>
          <div v-else>
            <image-component
              v-if="slides[0].fileId"
              :image-src="slide.image.path"
            ></image-component>
            <div class="slide-content">
              <h2 v-if="slide.header">{{ slide.header }}</h2>
              <div v-if="slide.description" v-html="slide.description"></div>
            </div>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
        <v-btn icon class="prev" slot="button-prev" color="white">
          <v-icon color="white">fas fa-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="next" slot="button-prev" color="white">
          <v-icon color="white">fas fa-chevron-right</v-icon>
        </v-btn>
      </swiper>
    </div>

    <div class="container">
      <h1>Shop main</h1>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'Main',
  components: {
    Swiper,
    SwiperSlide,
    ImageComponent
  },
  data() {
    return {
      swiperOption: {
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.next',
          prevEl: '.prev'
        }
      },
      slides: []
    }
  },
  async created() {
    await this.$api
      .get('/open/shop-slides')
      .then(({ data }) => {
        this.slides = data
      })
      .catch(error => console.error(error))
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#shop-main-container {
  background-color: $background-grey;
  width: 100%;
}

.swiper {
  height: 430px;
}

.prev {
  position: absolute;
  top: 200px;
  left: 5px;
  z-index: 10;
}

.next {
  position: absolute;
  top: 200px;
  right: 5px;
  z-index: 10;
}

.slide {
  background-color: black;
  height: 400px;

  img {
    min-width: 100%;
    height: auto;
    opacity: 0.5;
  }
}

.slide-content {
  position: absolute;
  //width: 100%;
  bottom: 0;
  color: white;
  left: 0;
  padding: 40px;
}

@media (max-width: 600px) {
  .prev {
    display: none;
  }

  .next {
    display: none;
  }
}
</style>
