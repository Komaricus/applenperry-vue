<template>
  <div class="container">
    <div v-if="order !== null">
      <div class="d-flex">
        <h1 class="text-roboto">Заказ {{ order.code }}</h1>
        <v-spacer></v-spacer>
        <v-btn class="ml-2" color="admin-secondary" @click="$router.back()" v-ripple="false"
          >Назад</v-btn
        >
        <v-btn
          class="ml-2 text--white"
          color="admin-primary"
          @click="confirmOrder"
          :disabled="order.status === 'complete' || order.status === 'confirmed'"
          v-ripple="false"
          >Подтвердить</v-btn
        >
        <v-btn
          class="ml-2"
          color="success"
          @click="completeOrder"
          v-ripple="false"
          :disabled="order.status === 'complete'"
          >Выполнить</v-btn
        >
        <v-btn
          class="ml-2 text--white"
          color="danger"
          @click="cancelOrderDialog = true"
          v-ripple="false"
          >Отменить</v-btn
        >
      </div>
      <table class="order-info">
        <tr>
          <td class="font-weight-bold">Дата создания:</td>
          <td>{{ new Date(order.createdAt.substring(0, 10)).toLocaleDateString('ru') }}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Покупатель:</td>
          <td>{{ order.userName }}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Телефон:</td>
          <td>{{ order.userPhone }}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Статус:</td>
          <td>{{ translatedStatus[order.status] }}</td>
        </tr>
      </table>

      <h3 class="text-roboto mt-10 mb-2" v-if="order.products && order.products.length">Товары:</h3>
      <div class="items-container">
        <div v-for="item in order.products" :key="item.productId" class="item d-flex align-center">
          <div class="image-container">
            <image-component :image-src="item.product.image.path"></image-component>
          </div>
          <div class="d-flex flex-column">
            <router-link :to="`/shop/stock/${item.product.url}`" class="link">
              <div class="item-name">{{ item.product.name }}</div>
            </router-link>
            <div class="item-count-container">
              <span class="caption mr-3">Количество: </span>
              <div class="item-count">{{ item.productCount }}</div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex flex-column">
            <div class="item-price">
              {{ (item.product.price * item.productCount) | space }}
              <span class="item-price-currency">₽</span>
            </div>
            <v-btn
              class="text--white"
              color="danger"
              @click="openDeleteProductDialog(item)"
              small
              v-ripple="false"
              >Удалить</v-btn
            >
          </div>
        </div>
      </div>
      <div class="total d-flex mt-2" v-if="order.products && order.products.length">
        Итого:
        <v-spacer></v-spacer>
        <div>{{ total | space }} <span class="item-price-currency">₽</span></div>
      </div>
      <div v-else>
        <p class="mt-4">Товары не найдены</p>
      </div>
    </div>

    <v-dialog v-model="deleteProductDialog" max-width="500px" scrollable>
      <v-card>
        <v-card-title>
          <span class="text--title">Подтверждение удаления</span>
        </v-card-title>
        <v-card-text class="text--main">
          <p class="text-body-1">Вы уверены, что хотите удалить товар из заказа?</p>
          <v-checkbox
            v-model="amountBack"
            color="admin-primary"
            label="Вернуть товары на склад"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="admin-primary" dark @click="deleteProduct" v-ripple="false">
            Да
          </v-btn>
          <v-btn @click="deleteProductDialog = false" v-ripple="false">
            Нет
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cancelOrderDialog" max-width="500px" scrollable>
      <v-card>
        <v-card-title>
          <span class="text--title">Подтверждение отмены</span>
        </v-card-title>
        <v-card-text class="text--main">
          <p class="text-body-1">Вы уверены, что хотите отменить заказ?</p>
          <p class="text-body-1">Все товары из заказа вернуться на склад.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="admin-primary" dark @click="cancelOrder" v-ripple="false">
            Да
          </v-btn>
          <v-btn @click="cancelOrderDialog = false" v-ripple="false">
            Нет
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'Order',
  components: {
    ImageComponent
  },
  data() {
    return {
      order: null,
      translatedStatus: {
        new: 'Новый',
        confirmed: 'Подтвержден',
        complete: 'Выполнен'
      },
      cancelOrderDialog: false,
      deleteProductDialog: false,
      selectedProduct: {},
      amountBack: true,
      productAmount: 0
    }
  },
  async created() {
    await this.getOrder()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    openDeleteProductDialog(item) {
      this.selectedProduct = item.product
      this.productAmount = item.productCount
      this.deleteProductDialog = true
    },
    async deleteProduct() {
      await this.$api
        .delete('/orders/product', {
          params: {
            productId: this.selectedProduct.id,
            orderId: this.order.id,
            productAmount: this.amountBack ? this.productAmount : 0
          }
        })
        .then(async () => {
          this.selectedProduct = {}
          this.amountBack = true
          this.productAmount = 0
          this.deleteProductDialog = false
          this.showSnackbar({ text: 'Продукт успешно удален', color: 'success' })
          await this.getOrder()
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    },
    async completeOrder() {
      await this.updateOrderStatus('complete')
    },
    async confirmOrder() {
      await this.updateOrderStatus('confirmed')
    },
    async updateOrderStatus(status) {
      this.$api
        .put('/orders/', {
          id: this.$route.params.id,
          status: status
        })
        .then(async () => {
          this.showSnackbar({
            text: `Заказ успешно ${status === 'complete' ? 'выполнен' : 'подтвержден'}`,
            color: 'success'
          })
          await this.getOrder()
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    },
    async cancelOrder() {
      await this.$api
        .delete('/orders/order/' + this.$route.params.id)
        .then(async () => {
          this.cancelOrderDialog = false
          this.showSnackbar({ text: 'Заказ успешно отменен', color: 'success' })
          await this.$router.back()
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    },
    async getOrder() {
      await this.$api
        .get('/orders/' + this.$route.params.id)
        .then(({ data }) => {
          this.order = data
          document.title = 'Заказ ' + this.order.code
        })
        .catch(error => {
          console.error(error)
          this.$router.back()
        })
    }
  },
  computed: {
    total() {
      let total = 0
      for (let p of this.order.products) {
        total += p.product.price * p.productCount
      }

      return total
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

.order-info {
  td {
    padding: 5px 10px 5px 0;
    font-size: 18px;
  }
}

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

  .item-name {
    font-weight: 600;
    font-size: 18px;
  }

  .link {
    color: $anchor;
  }

  .link:hover {
    color: $orange;
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

.total {
  border-top: 1px solid $border;
  width: 100%;
  padding: 24px;
  font-size: 20px;
  font-weight: 600;
}
</style>
