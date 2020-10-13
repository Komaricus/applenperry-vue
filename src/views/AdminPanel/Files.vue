<template>
  <div class="files-container">
    <div class="d-flex align-center">
      <h2 class="text-roboto">Управление изображениями</h2>
      <v-spacer />
      <v-btn color="admin-secondary" @click="dialog = true">Загрузить изображения</v-btn>
    </div>
    <file-picker />
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>Загрузка изображений</v-card-title>
        <v-card-text>
          <file-uploader></file-uploader>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FilePicker from '../../components/FilePicker'
import FileUploader from '@/components/FileUploader'
export default {
  name: 'Files',
  components: {
    'file-picker': FilePicker,
    FileUploader
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>
.files-container {
  max-width: 1424px;
  margin: 0 auto;
  padding: 15px;
}
</style>
