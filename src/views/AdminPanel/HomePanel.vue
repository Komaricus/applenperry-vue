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
        <img src="@/assets/logo-admin.png" alt="" />
      </v-col>
      <v-col cols="8" v-else>
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomePanel',
  data() {
    return {
      index: -1
    }
  },
  created() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.$route.path.indexOf(this.items[i].id) !== -1) this.index = i
    }
  },
  methods: {
    async categoryChanged() {
      if (this.index === undefined || Number(this.index) < 0) {
        await this.$router.push('/apple-admin/panel')
        return
      }

      await this.$router.push('/apple-admin/panel/list/' + this.items[this.index].id)
    }
  },
  computed: {
    ...mapState(['items'])
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
