<template>
  <div class="container" v-if="!loading">
    <div v-if="accepted">
      <v-card width="500" outlined class="mx-auto elevation-0 ">
        <v-card-title class="justify-center text--title">Ваш заказ принят</v-card-title>
        <v-card-text class="text-justify text--main">
          <h3 class="mb-4 text-roboto">Заказ номер {{ code }}</h3>
          <p>В ближайшее время мы свяжемся с вами для подтверждения заказа.</p>
          <p>Пожалуйста, запишите номер заказа, чтобы предоставить его при получении в пабе.</p>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
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
          Услуга доставки недоступна в нашем магазине. Вы можете оформить заказ на сайте и забрать
          его в нашем пабе. Оплата возможна банковской картой или наличными.
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
            Нажимая на кнопку, вы даете согласие на обработку своих персональных данных и
            соглашаетесь с
            <a class="link" href="/shop/docs/pravila-obrabotki-personalnyh-dannyh" target="_blank"
              >правилами обработки персональных данных</a
            >
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
  </div>
  <div class="container fill-height" v-else>
    <v-progress-circular
      size="50"
      indeterminate
      color="primary"
      class="mx-auto"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
      },
      loading: false,
      accepted: false,
      code: ''
    }
  },
  methods: {
    ...mapMutations(['clearCart']),
    async saveOrder() {
      if (!this.$refs['cart-form'].validate(true)) return

      this.loading = true
      await this.$api
        .post(`/open/order`, {
          userName: this.name,
          userPhone: this.phone,
          products: this.cartItems.map(e => {
            return { productId: e.id, productCount: e.count }
          })
        })
        .then(({ data }) => {
          this.clearCart()
          this.accepted = true
          this.code = data.code
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 500)
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
