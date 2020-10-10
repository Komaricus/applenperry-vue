<template>
  <div id="edit" class="pa-5">
    <admin-form
      v-if="item.id"
      v
      :id="$route.params.type"
      :type="'edit'"
      @closeForm="closeForm"
      :item="item"
    ></admin-form>
  </div>
</template>

<script>
import Form from '../../components/AdminForm/Form'
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
      lists: ['categories', 'about-cider', 'countries', 'home-slider'],
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
