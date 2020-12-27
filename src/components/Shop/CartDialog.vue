<template>
  <v-dialog v-model="dialog" width="800" scrollable>
    <v-card>
      <v-card-title class="text--title">Корзина</v-card-title>
      <h3 class="text-roboto px-6 pb-3" v-if="cartItems.length">Товары в корзине:</h3>
      <v-card-text class="text--main" v-if="cartItems.length">
        <cart-items></cart-items>
      </v-card-text>
      <v-card-text v-else class="text--main">
        <p>Корзина пока пуста.</p>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <div class="total d-flex">
          Итого:
          <v-spacer></v-spacer>
          <div>{{ total | space }} <span class="item-price-currency">₽</span></div>
        </div>
        <div class="d-flex actions">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            to="/shop/cart"
            @click="dialog = false"
            class="text--white"
            :disabled="!cartItems.length"
            >Оформить заказ</v-btn
          >
          <v-btn color="beige" @click="dialog = false" class="ml-2">Продолжить покупки</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CartItems from '@/components/Shop/CartItems'

export default {
  name: 'CartDialog',
  components: {
    CartItems
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapMutations(['setCartDialog'])
  },
  computed: {
    ...mapState(['cartDialog', 'cartItems']),
    total() {
      let total = 0
      for (let item of this.cartItems) {
        total += item.price * item.count
      }

      return total
    }
  },
  watch: {
    cartDialog() {
      if (this.cartDialog) {
        this.dialog = true
      }
    },
    dialog() {
      if (!this.dialog) {
        this.setCartDialog(false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

.item-price-currency {
  margin-left: -2px;
  font-size: 16px;
}

.total {
  border-top: 1px solid $border;
  width: 100%;
  padding: 24px;
  font-size: 20px;
  font-weight: 600;
}

.actions {
  width: 100%;
}
</style>
