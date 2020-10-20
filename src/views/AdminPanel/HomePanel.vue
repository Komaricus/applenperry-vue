<template>
  <div id="admin-container">
    <v-row no-gutters>
      <v-col cols="4" class="column">
        <div class="pa-2">
          <v-list-item-group @change="categoryChanged" v-model="index" color="admin-primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-col>
      <v-col cols="8" id="logo-column" v-if="$route.path === '/apple-admin/panel'">
        <img src="@/assets/images/logo-admin.png" alt="" />
      </v-col>
      <v-col cols="8" v-else>
        <router-view></router-view>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="420">
      <v-card>
        <v-card-title>
          У вас есть несохраненные изменения
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="danger"
            class="text--white"
            @click="
              dialog = false
              setNeedsAlert(false)
            "
            >Удалить</v-btn
          >
          <v-btn color="success" class="text--white" @click="navigate">Перейти</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'HomePanel',
  data() {
    return {
      index: -1,
      dialog: false
    }
  },
  async created() {
    await this.$api.get('/admins/heartbeat').catch(error => {
      console.error(error)
    })

    if (
      this.needsAlert &&
      this.$route.path !== this.link &&
      this.formId !== '' &&
      this.form !== null &&
      this.mode !== ''
    )
      this.dialog = true

    for (let i = 0; i < this.items.length; i++) {
      if (this.$route.path.indexOf(this.items[i].id) !== -1) this.index = i
    }
  },
  watch: {
    async $route() {
      if (this.$route.path === '/apple-admin/panel') {
        this.index = -1
      }
    }
  },
  methods: {
    ...mapMutations(['setNeedsAlert']),
    async categoryChanged() {
      if (this.index === undefined || Number(this.index) < 0) {
        await this.$router.push('/apple-admin/panel')
        return
      }

      await this.$router.push('/apple-admin/panel/list/' + this.items[this.index].id)
    },
    navigate() {
      this.dialog = false
      this.$router.push(this.link)
    }
  },
  computed: {
    ...mapState(['items', 'needsAlert', 'formId', 'mode', 'form']),
    link() {
      let link = `/apple-admin/panel/list/${this.formId}/${this.mode}`
      if (this.mode === 'edit') link += '/' + this.form.id
      return link
    }
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

#logo-column {
  border-left: 1px solid $border;
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  img {
    width: 100%;
    max-height: 500px;
    max-width: 500px;
    opacity: 0.2;
  }
}
</style>
