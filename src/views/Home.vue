<template>
  <div id="showcase">
    <burger type="home" />

    <div id="logo">
      <div id="contain">
        <ul id="cir_menu">
          <li>
            <router-link :to="'/shop'">Магазин</router-link>
          </li>
          <li>
            <router-link :to="'/pages/friends'">Друзья</router-link>
          </li>
          <li>
            <router-link :to="'pages/our-pub'">Наш pub</router-link>
          </li>
          <li>
            <router-link :to="'/news'">Новости</router-link>
          </li>
          <li>
            <router-link :to="'/shop/contacts'">Контакты</router-link>
          </li>
          <li>
            <router-link :to="'/about'">О сидре и перри</router-link>
          </li>
        </ul>
      </div>
      <img src="@/assets/images/showcase/logo.png" alt="logo" />
    </div>

    <div class="slider">
      <div v-for="(slide, i) in slides" :class="slide.class" :key="i">
        <image-component :image-src="slide.image.path"></image-component>
      </div>
    </div>

    <p id="phone">
      <a href="tel: +79653714731">+7 (965) 371-47-31</a>
    </p>
  </div>
</template>

<script>
import Burger from '../components/Burger'
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'Home',
  components: {
    burger: Burger,
    ImageComponent
  },
  data() {
    return {
      slides: []
    }
  },
  async created() {
    this.$api
      .get('/open/slides')
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            this.slides.push(Object.assign(data[i], { class: 'slide current' }))
            continue
          }
          this.slides.push(Object.assign(data[i], { class: 'slide' }))
        }
      })
      .catch(error => {
        console.error(error)
      })
    setInterval(this.nextSlide, 10000)
  },
  methods: {
    nextSlide() {
      const index = this.slides.findIndex(e => e.class.includes('current'))

      if (index !== this.slides.length - 1) {
        this.slides[index].class = 'slide'
        this.slides[index + 1].class = 'slide current'
      } else {
        this.slides[index].class = 'slide'
        this.slides[0].class = 'slide current'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#showcase {
  background-color: #000;
  min-height: 100vh;
  width: 100%;
  z-index: 1;

  a {
    color: white;
  }

  #cir_menu a {
    color: #fff;
    display: block;
    font-size: 180%;
    text-transform: uppercase;
    font-family: 'Neucha', cursive;
    letter-spacing: 1px;
  }

  #cir_menu a:hover {
    color: #f07d10;
    font-weight: bold;
  }

  #contain {
    position: absolute;
    transform: translate(-50%, 50%);
    height: 350px;
    width: 500px;
  }

  #cir_menu li {
    position: absolute;
    right: 0;
    transform-origin: 100% 50%;
    padding-right: 250px;
  }

  #cir_menu > li:nth-child(1) {
    transform: rotate(60deg);
  }

  #cir_menu > li:nth-child(2) {
    transform: rotate(120deg);
  }

  #cir_menu > li:nth-child(2) > a {
    transform: rotate(180deg);
  }

  #cir_menu > li:nth-child(3) {
    transform: rotate(180deg);
  }

  #cir_menu > li:nth-child(3) > a {
    transform: rotate(180deg);
  }

  #cir_menu > li:nth-child(4) {
    transform: rotate(240deg);
  }

  #cir_menu > li:nth-child(4) > a {
    transform: rotate(180deg);
  }

  #cir_menu > li:nth-child(5) {
    transform: rotate(300deg);
  }

  #cir_menu > li:nth-child(5) > a {
    transform: rotate(360deg);
  }

  #logo {
    position: relative;
    margin: auto;
    width: 45%;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    max-width: 400px;

    img {
      min-width: 300px;
      max-height: 400px;
    }
  }

  .slider {
    position: absolute;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    background: #000;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    display: flex;
    justify-content: center;

    img {
      position: absolute;
      opacity: 0.6;
    }
  }

  .slide.current {
    opacity: 1;
  }

  #phone {
    position: absolute;
    left: calc(50% - 66px);
    bottom: 20px;
    font-size: 1rem;
    z-index: 5;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
  }
}

@media (max-width: 980px) {
  #contain {
    display: none;
  }

  #phone {
    left: 20px !important;
  }

  #logo {
    img {
      max-height: 300px !important;
    }
  }
}
</style>
