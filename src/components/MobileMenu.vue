<template>
  <div :class="{ 'dropdown-after': mobileMenu }" class="row dropdown">
    <ul class="navlist">
      <li class="navlistitem">
        <router-link :to="'/shop'">Магазин</router-link>
      </li>
      <li class="navlistitem">
        <router-link :to="'/friends'">Наши Друзья</router-link>
      </li>
      <li class="navlistitem">
        <router-link :to="'/news'">Новости</router-link>
      </li>
      <li class="navlistitem">
        <router-link :to="'/pub'">Наш pub</router-link>
      </li>
      <li class="navlistitem">
        <router-link :to="'/shop/contacts'">Контакты</router-link>
      </li>
      <li class="navlistitem">
        <router-link :to="'/cider'">О сидре и перри</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MobileMenu',
  computed: {
    ...mapState(['mobileMenu'])
  }
}
</script>
<style lang="scss" scoped>
.dropdown {
  margin: 0;
  position: absolute;
  height: 0;
  background-color: #000;
  transition: height 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10;
  width: 100vw;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  top: 0;
  left: 0;
}

.dropdown-after {
  height: 100vh;
  transition: height 0.2s ease;
}

.navlist {
  list-style: none;
}

.navlistitem {
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
}

.navlistitem a {
  font-family: 'Neucha', cursive;
  color: #ffffff;
  letter-spacing: 1px;
  font-size: 1.5rem;
}

.navlistitem a:hover {
  color: #f07d10;
  font-weight: bold;
}
</style>
