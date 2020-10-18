<template>
  <v-row no-gutters v-if="$route.path === '/apple-admin/panel/list/' + id">
    <v-col cols="6" class="column">
      <div class="d-flex pt-2 px-3 align-center">
        <h2 class="text-roboto mb-0 text--main">{{ itemNameById(id) }}</h2>
        <v-spacer />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="admin-primary" icon small v-bind="attrs" v-on="on">
              <v-icon small>fa-ellipsis-v</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-group @change="menuItemChanged" v-model="menu" color="admin-primary">
              <v-list-item v-for="(item, index) in menuItems" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </v-menu>
      </div>
      <div>
        <v-text-field
          v-model="search"
          placeholder="Поиск"
          prepend-inner-icon="fa-search"
          solo
          dense
          hide-details
          class="my-1 mx-2"
          clearable
          color="admin-primary"
        ></v-text-field>
      </div>
      <div class="pa-2">
        <v-list-item-group @change="itemChanged" v-model="index" color="admin-primary">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>
                fa-plus-square
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Добавить запись</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div class="separator"></div>
          <div v-if="!loading && items.length">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon v-if="item.image && item.image.path">
                <v-img
                  :src="require(`./../../assets/img/${item.image.path}`)"
                  max-width="60"
                  max-height="32"
                  contain
                ></v-img>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else-if="loading" class="text-center">
            <v-progress-circular
              indeterminate
              class="mt-5"
              color="admin-primary"
            ></v-progress-circular>
          </div>
        </v-list-item-group>
      </div>
      <div v-if="!loading && !items.length" class="text-center text--inactive">
        Нет данных
      </div>
    </v-col>
    <v-col cols="6" class="column">
      <div class="pa-2">
        <p class="text--inactive">Для добавления новой записи нажмите кнопку "Добавить запись"</p>
        <p class="text--inactive">Для редактирования выберите запись из списка</p>
        <p class="text--inactive">Для изменения сортировки нажмите на меню справа от названия</p>
      </div>
    </v-col>
  </v-row>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'List',
  data() {
    return {
      id: '',
      items: [],
      index: -1,
      menuItems: [
        { title: 'Сначала новые', sort: 'created_at', order: 'desc' },
        { title: 'Сначала старые', sort: 'created_at', order: 'asc' },
        { title: 'Сначала последние измененные', sort: 'updated_at', order: 'desc' },
        { title: 'Сначала первые измененные', sort: 'updated_at', order: 'asc' }
      ],
      menu: 0,
      search: '',
      loading: false
    }
  },
  watch: {
    async $route() {
      this.id = this.$route.params.type
      this.search = ''
      if (this.lists.indexOf(this.id) === -1) await this.$router.back()
      await this.getItems()
    },
    async search() {
      await this.getItems()
    }
  },
  async created() {
    this.id = this.$route.params.type
    if (this.lists.indexOf(this.id) === -1) await this.$router.back()
    await this.getItems()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getItems() {
      this.loading = true
      let sort = this.menuItems[this.menu].sort
      let order = this.menuItems[this.menu].order
      await this.$api
        .get(`/${this.id}/`, {
          params: {
            search: this.search,
            sort: sort,
            order: order
          }
        })
        .then(({ data }) => {
          this.index = -1
          this.items = data
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
        .finally(() => {
          this.loading = false
        })
    },
    async itemChanged() {
      if (this.index === 0) {
        if (this.index === undefined || Number(this.index) < 0) return

        await this.$router.push('/apple-admin/panel/list/' + this.id + '/create')
        return
      }

      await this.$router.push(
        '/apple-admin/panel/list/' + this.id + '/edit/' + this.items[this.index - 1].id
      )
    },
    async menuItemChanged() {
      if (this.menu === undefined) this.menu = 0
      await this.getItems()
    }
  },
  computed: {
    ...mapGetters(['lists', 'itemNameById'])
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/colors';

.column {
  height: calc(100vh - 64px);
  overflow: auto;
  border-left: 1px solid $border;
}

.separator {
  margin: 5px 0;
  border-bottom: 1px solid $border;
  width: 100%;
}
</style>
