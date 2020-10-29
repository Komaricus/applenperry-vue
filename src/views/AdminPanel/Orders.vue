<template>
  <div class="container">
    <div class="d-flex">
      <h1 class="text-roboto">Заказы</h1>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="orders.length"
        v-model="search"
        prepend-icon="fa-search"
        label="Поиск..."
        single-line
        hide-details
      ></v-text-field>
    </div>

    <div class="orders mt-5" v-if="orders.length">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="orders"
        :search="search"
        @click:row="rowClicked"
      >
        <template v-slot:item.date="{ item }">
          {{ new Date(item.createdAt.substring(0, 10)).toLocaleDateString('ru') }}
        </template>
        <template v-slot:item.status="{ item }">
          {{ translatedStatus[item.status] }}
        </template>
        <template v-slot:item.total="{ item }"> {{ item.total }} ₽ </template>
      </v-data-table>
    </div>
    <div v-else class="text-center mt-5">
      <p class="text--inactive">Заказов пока не поступило</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Номер',
          align: 'start',
          value: 'code'
        },
        { text: 'Покупатель', value: 'userName' },
        { text: 'Телефон', value: 'userPhone' },
        { text: 'Дата создания', value: 'date', sortable: false },
        { text: 'Статус', value: 'status' },
        { text: 'Итог', value: 'total' }
      ],
      orders: [],
      loading: false,
      translatedStatus: {
        new: 'Новый',
        confirmed: 'Подтвержден',
        complete: 'Выполнен'
      }
    }
  },
  async created() {
    this.loading = true
    await this.$api
      .get('/orders/')
      .then(({ data }) => {
        this.orders = data.map(d => {
          let total = 0
          for (let p of d.products) {
            total += p.productCount * p.product.price
          }

          d.total = total
          return d
        })
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    rowClicked({ id }) {
      this.$router.push('/apple-admin/orders/' + id)
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/colors';

.orders {
  color: $main;

  tbody {
    tr {
      cursor: pointer !important;
    }
  }
}
</style>
