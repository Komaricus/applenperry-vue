<template>
  <v-row no-gutters v-if="$route.path === '/apple-admin/panel/list/' + id">
    <v-col cols="6" class="column">
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
        </v-list-item-group>
      </div>
    </v-col>
    <v-col cols="6" class="column">
      <div class="pa-2">
        <p class="text--inactive">Для добавления новой записи нажмите кнопку "Добавить запись"</p>
        <p class="text--inactive">Для редактирования выберите запись из списка</p>
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
      index: -1
    }
  },
  watch: {
    async $route() {
      this.id = this.$route.params.type
      if (this.lists.indexOf(this.id) === -1) await this.$router.back()
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
      await this.$api
        .get(`/${this.id}/`)
        .then(({ data }) => {
          this.index = -1
          this.items = data
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
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
    }
  },
  computed: {
    ...mapGetters(['lists'])
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
