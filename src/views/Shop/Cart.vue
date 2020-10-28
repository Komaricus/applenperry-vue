<template>
  <div class="container">
    <h1>Корзина</h1>
    <h3 class="text-roboto pb-3" v-if="cartItems.length">Товары в корзине:</h3>
    <div class="text--main" v-if="cartItems.length">
      <cart-items></cart-items>
    </div>
    <div v-else class="text--main">
      <p>Корзина пока пуста.</p>
    </div>
    <div class="total d-flex" v-if="cartItems.length">
      Итого:
      <v-spacer></v-spacer>
      <div>{{ total | space }} <span class="item-price-currency">₽</span></div>
    </div>
    <div v-if="cartItems.length">
      <h1>Доставка и оплата</h1>
      <p>
        Услуга доставки недоступна в нашем магазине. Вы можете оформить заказ на сайте и забрать его
        в нашем пабе. Оплата возможна банковской картой или наличными.
      </p>
    </div>
    <div v-if="cartItems.length">
      <h1>Оформление заказа</h1>
      <p>
        Пожалуйста, укажите вашу контактную информацию, чтобы мы могли с вами связаться для
        подтверждения заказа.
      </p>
      <v-form ref="cart-form" class="cart-form text--main">
        <div class="mb-1">Как к вам обращаться?<span class="text--error ml-1">*</span></div>
        <v-text-field
          v-model="name"
          placeholder="Введите ваше имя"
          maxlength="100"
          counter="100"
          outlined
          :rules="[rules.required]"
          color="primary"
        ></v-text-field>
        <div class="mb-1">Ваш телефон<span class="text--error ml-1">*</span></div>
        <v-text-field
          v-model="phone"
          placeholder="+7"
          outlined
          :rules="[rules.required, rules.phone]"
          v-mask="'+7 (###) ###-##-##'"
          color="primary"
        ></v-text-field>
        <div class="mb-1">
          Согласие на обработку персональных данных<span class="text--error ml-1">*</span>
        </div>
        <p>
          Нажимая на кнопку, вы даете согласие на обработку своих персональных данных и соглашаетесь
          с <a class="link" href="#">политикой конфиденциальности</a>
        </p>
        <v-checkbox :rules="[rules.required]" color="primary" label="Согласен"></v-checkbox>
      </v-form>

      <v-btn color="primary" class="text--white mt-5" @click="saveOrder" v-ripple="false"
        >Создать заказ</v-btn
      >
    </div>
    <div v-if="!cartItems.length">
      <v-btn color="primary" to="/shop/stock" v-ripple="false">Перейти к ассортименту</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CartItems from '@/components/Shop/CartItems'
import { mask } from 'vue-the-mask'

export default {
  name: 'Cart',
  components: {
    CartItems
  },
  directives: { mask },
  data() {
    return {
      name: '',
      phone: '',
      rules: {
        required: value => !!value || 'Обязательное поле',
        phone: value => {
          const pattern = /^\+7 \([0-9][0-9][0-9]\) [0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/
          return pattern.test(value) || 'Неверно указан телефон'
        }
      }
    }
  },
  methods: {
    async saveOrder() {
      if (!this.$refs['cart-form'].validate(true)) return

      await this.$api
        .post(`/open/order`, {
          userName: this.name,
          userPhone: this.phone,
          products: this.cartItems.map(e => {
            return { productId: e.id, productCount: e.count }
          })
        })
        .then(response => {
          console.log(response)
          // todo: clear cart and show order accepted dialog
        })
    }
  },
  computed: {
    ...mapState(['cartItems']),
    total() {
      let total = 0
      for (let item of this.cartItems) {
        total += item.price * item.count
      }

      return total
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

h1 {
  margin-bottom: 10px;
}

.container {
  padding: 20px;
  max-width: 900px;
  color: $main;
}

.total {
  border-top: 1px solid $border;
  width: 100%;
  padding: 24px;
  font-size: 20px;
  font-weight: 600;
}

.cart-form {
  max-width: 500px;
}

.link:hover {
  color: $orange;
}
</style>
