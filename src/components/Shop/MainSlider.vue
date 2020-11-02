<template>
  <div v-if="Array.isArray(slides) && slides.length">
    <div class="swiper swiper-container" v-if="slides.length === 1">
      <div class="slide swiper-slide">
        <router-link v-if="slides[0].link" :to="slides[0].link">
          <image-component
            v-if="slides[0].fileId"
            :image-src="slides[0].image.path"
          ></image-component>
          <div class="slide-content">
            <h2 v-if="slides[0].header">{{ slides[0].header }}</h2>
            <div v-if="slides[0].description" v-html="slides[0].description"></div>
          </div>
        </router-link>
        <div v-else>
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
    </div>

    <swiper v-else class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="slide in slides"
        :key="slide.id"
        class="slide"
        :class="{ clickable: slide.link }"
      >
        <router-link v-if="slide.link" :to="slide.link">
          <image-component v-if="slides[0].fileId" :image-src="slide.image.path"></image-component>
          <div class="slide-content">
            <h2 v-if="slide.header">{{ slide.header }}</h2>
            <div v-if="slide.description" v-html="slide.description"></div>
          </div>
        </router-link>
        <div v-else>
          <image-component v-if="slides[0].fileId" :image-src="slide.image.path"></image-component>
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
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'MainSlider',
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
        effect: 'fade',
        autoplay: {
          delay: 10000,
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
.swiper {
  height: 430px;
  max-width: 1920px;
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
    max-height: 400px;
    max-width: 1920px;
  }
}

.slide-content {
  position: absolute;
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
