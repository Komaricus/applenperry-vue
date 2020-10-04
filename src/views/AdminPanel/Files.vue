<template>
  <div class="container">
    <h2 class="text-roboto">Управление изображениями</h2>
    <file-picker />
  </div>
</template>

<script>
import FilePicker from '../../components/FilePicker'

export default {
  name: 'Files',
  components: {
    'file-picker': FilePicker
  }
}
</script>

<style scoped></style>
