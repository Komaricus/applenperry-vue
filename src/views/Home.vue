<template>
  <div id="showcase">
    <div id="logo">
      <div id="contain">
        <ul id="cir_menu">
          <li>
            <router-link :to="'/shop'">Магазин</router-link>
          </li>
          <li>
            <router-link :to="'/friends'">Друзья</router-link>
          </li>
          <li>
            <router-link :to="'/pub'">Наш pub</router-link>
          </li>
          <li>
            <router-link :to="'/news'">Новости</router-link>
          </li>
          <li>
            <router-link :to="'/shop/contacts'">Контакты</router-link>
          </li>
          <li>
            <router-link :to="'/cider'">О сидре и перри</router-link>
          </li>
        </ul>
      </div>
      <img src="@/assets/images/showcase/logo.png" alt="logo" />
    </div>

    <b-carousel
      id="carousel"
      animated="fade"
      :interval="10000"
      :has-drag="false"
      :pause-hover="false"
      :arrow="false"
      :indicator="false"
    >
      <b-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        class="showcase-slide"
        :style="{
          backgroundImage: 'url(' + require(`./../assets/images/showcase/${slide}`) + ')'
        }"
      >
      </b-carousel-item>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      slides: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
    }
  }
}
</script>
<style lang="scss" scoped>
#showcase {
  background-color: #000;
  height: 100vh;
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
  }

  #carousel {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }

  .showcase-slide {
    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5) inset;
    height: 100vh;
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
  }
}
</style>
