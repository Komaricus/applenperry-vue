<template>
  <div class="files-container">
    <div class="d-flex align-center">
      <h2 class="text-roboto">Управление изображениями</h2>
      <v-spacer />
      <span class="text--inactive caption">Элементов на странице:</span>
      <v-select
        item-color="admin-primary"
        v-model="perPage"
        :items="items"
        dense
        item-value="value"
        item-text="name"
        solo
        hide-details
        class="select ml-3"
      ></v-select>
      <v-text-field
        v-model="search"
        placeholder="Поиск"
        prepend-inner-icon="fa-search"
        solo
        dense
        hide-details
        class="search mx-3"
        clearable
      ></v-text-field>

      <v-btn color="admin-secondary" @click="dialog = true">Загрузить изображения</v-btn>
    </div>
    <file-picker :items-per-page="perPage" :search-value="search" />
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
      dialog: false,
      perPage: 8,
      items: [
        { name: '8', value: 8 },
        { name: '16', value: 16 },
        { name: '80', value: 80 },
        { name: 'Все', value: -1 }
      ],
      search: ''
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

.select {
  max-width: 100px;
}

.search {
  max-width: 300px;
}
</style>
