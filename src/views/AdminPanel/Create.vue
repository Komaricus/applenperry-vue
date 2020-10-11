<template>
  <div id="create">
    <admin-form :id="$route.params.type" :type="'create'" @closeForm="closeForm"></admin-form>
  </div>
</template>

<script>
import Form from '../../components/AdminForm/Form'
export default {
  name: 'Create',
  components: {
    'admin-form': Form
  },
  methods: {
    async closeForm() {
      await this.$router.push('/apple-admin/panel/list/' + this.$route.params.type)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/colors';

#create {
  height: calc(100vh - 64px);
  overflow: auto;
  border-left: 1px solid $border;
}
</style>
