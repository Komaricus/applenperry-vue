<template>
  <div class="items-container">
    <div v-for="(item, index) in cartItems" :key="item.id" class="item d-flex align-center">
      <div class="image-container">
        <image-component :image-src="item.image.path"></image-component>
      </div>
      <div class="d-flex flex-column">
        <router-link :to="`/shop/stock/${item.url}`" class="link">
          <div class="item-name">{{ item.name }}</div>
        </router-link>
        <div class="item-count-container">
          <span class="caption mr-3">Количество: </span>
          <v-btn small icon color="primary" @click="decrease(index)" :disabled="item.count === 0">
            <v-icon small>fas fa-minus</v-icon>
          </v-btn>
          <div class="item-count">{{ item.count }}</div>
          <v-btn
            small
            icon
            color="primary"
            @click="item.count++"
            :disabled="item.count === item.amount"
          >
            <v-icon small>fas fa-plus</v-icon>
          </v-btn>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex flex-column">
        <div class="item-price">
          {{ (item.price * item.count) | space }} <span class="item-price-currency">₽</span>
        </div>
        <v-tooltip left max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="inactive"
              @click="deleteFromCart(index)"
              small
              icon
              v-bind="attrs"
              v-on="on"
              class="ml-auto"
            >
              <v-icon small>fa-trash</v-icon>
            </v-btn>
          </template>
          <span>Удалить из корзины</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from '@/components/ImageComponent'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'CartItems',
  components: {
    ImageComponent
  },
  methods: {
    ...mapMutations(['setCartDialog', 'deleteFromCart']),
    decrease(index) {
      this.cartItems[index].count--
      if (this.cartItems[index].count === 0) this.deleteFromCart(index)
    }
  },
  computed: {
    ...mapState(['cartItems'])
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';
.item {
  padding: 10px;

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .link {
    color: $anchor;
  }

  .link:hover {
    color: $orange;
  }

  .item-name {
    font-weight: 600;
    font-size: 18px;
  }

  .item-count-container {
    display: flex;
    align-items: center;
  }

  .item-count {
    min-width: 30px;
    font-size: 16px;
    display: inline-block;
    text-align: center;
  }

  .item-price {
    font-weight: 600;
    font-size: 20px;
  }
}

.item-price-currency {
  margin-left: -2px;
  font-size: 16px;
}
</style>
