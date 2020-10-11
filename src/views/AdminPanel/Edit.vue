<template>
  <div id="edit">
    <admin-form
      v-if="item.id"
      :id="$route.params.type"
      :type="'edit'"
      @closeForm="closeForm"
      :item="item"
    ></admin-form>
  </div>
</template>

<script>
import Form from '../../components/AdminForm/Form'
import { mapGetters } from 'vuex'

export default {
  name: 'Edit',
  components: {
    'admin-form': Form
  },
  watch: {
    async $route() {
      let id = this.$route.params.type
      if (this.lists.indexOf(id) === -1) await this.$router.back()
      await this.getItem()
    }
  },
  data() {
    return {
      item: {}
    }
  },
  async created() {
    let id = this.$route.params.type
    if (this.lists.indexOf(id) === -1) await this.$router.back()
    await this.getItem()
  },
  methods: {
    async getItem() {
      this.$api
        .get(`${this.$route.params.type}/${this.$route.params.id}`)
        .then(({ data }) => {
          this.item = data
        })
        .catch(async error => {
          console.error(error)
          await this.$router.back()
        })
    },
    async closeForm() {
      await this.$router.push('/apple-admin/panel/list/' + this.$route.params.type)
    }
  },
  computed: {
    ...mapGetters(['lists'])
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/colors';

#edit {
  height: calc(100vh - 64px);
  overflow: auto;
  border-left: 1px solid $border;
}
</style>
