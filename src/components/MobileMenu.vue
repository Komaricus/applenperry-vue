<template>
  <div :class="{ 'dropdown-after': mobileMenu }" class="row dropdown">
    <ul class="nav-list">
      <li v-for="(item, index) in items" :key="index" class="nav-list-item">
        <span @click="toggleMobileMenu"
          ><router-link :to="item.to">{{ item.title }}</router-link></span
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MobileMenu',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      itemsMain: [
        {
          to: '/shop',
          title: 'Магазин'
        },
        {
          to: '/friends',
          title: 'Наши Друзья'
        },
        {
          to: '/news',
          title: 'Новости'
        },
        {
          to: '/pub',
          title: 'Наш pub'
        },
        {
          to: '/shop/contacts',
          title: 'Контакты'
        },
        {
          to: '/about',
          title: 'О сидре и перри'
        }
      ],
      itemsShop: [
        {
          to: '/shop',
          title: 'Главная'
        },
        {
          to: '/shop/categories',
          title: 'Категории'
        },
        {
          to: '/shop/vendors',
          title: 'Производители'
        },
        {
          to: '/shop/contacts',
          title: 'Контакты'
        },
        {
          to: '/shop/delivery',
          title: 'Доставка'
        },
        {
          title: 'Корзина',
          to: '/shop/cart'
        }
      ]
    }
  },
  computed: {
    ...mapState(['mobileMenu']),
    items() {
      return this.type === 'shop' ? this.itemsShop : this.itemsMain
    }
  },
  methods: {
    ...mapMutations(['toggleMobileMenu'])
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

.nav-list {
  list-style: none;
}

.nav-list-item {
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
}

.nav-list-item a {
  font-family: 'Neucha', cursive;
  color: #ffffff;
  letter-spacing: 1px;
  font-size: 1.1rem;
}

.nav-list-item a:hover {
  color: #f07d10;
  font-weight: bold;
}
</style>
