<template>
  <div>
    <v-row v-if="!loading">
      <v-col v-for="file in files" :key="file.id" class="d-flex child-flex" cols="4">
        <v-card max-width="300">
          <v-card-title class="image-title text--main">
            <span>{{ file.originalName | cropName }}</span>
            <v-spacer />
            <span class="file-size text--inactive">{{ file.size | humanFileSize }}</span>
          </v-card-title>
          <v-card-text class="image-preview">
            <image-preview :image-src="file.path"></image-preview>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="mode === 'pick'"
              color="admin-secondary"
              small
              @click="$emit('file-picked', file)"
              >Выбрать</v-btn
            >
            <v-spacer />
            <v-btn small icon color="admin-primary" @click="openDeleteDialog(file)">
              <v-icon small>
                fa-trash
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="fill-height ma-0" align="center" justify="center">
      <v-progress-circular class="mt-5" indeterminate color="admin-primary"></v-progress-circular>
    </v-row>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text--title">{{
            status === 'deletable' ? 'Подтверждение удаления' : 'Невозможно удалить файл'
          }}</span>
        </v-card-title>
        <v-card-text class="text--main">
          <div v-if="status === 'deletable'" class="delete-text">
            <p>Вы уверены что хотите удалить файл {{ selectedFile.originalName || '' }}?</p>
          </div>
          <div v-else class="overflow-auto">
            <p>
              Файл невозможно удалить, так как он привязан к следующим объектам:
            </p>
            <div v-if="countries.length">
              <span class="text--title font-weight-bold">Страны:</span>
              <div class="mt-1 ml-3" v-for="country in countries" :key="country.id">
                {{ country.name }}
              </div>
            </div>
            <div v-if="homeSlides.length">
              <span class="text--title font-weight-bold">Слайды на главной странице:</span>
              <div class="mt-1 ml-3" v-for="slide in homeSlides" :key="slide.id">
                {{ slide.name }}
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions v-if="status === 'deletable'">
          <v-spacer />
          <v-btn color="admin-primary" dark @click="deleteFile" v-ripple="false">
            Да
          </v-btn>
          <v-btn @click="deleteDialog = false" v-ripple="false">
            Нет
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ImagePreview from './ImagePreview'
import { mapMutations } from 'vuex'

export default {
  name: 'FilePicker',
  components: {
    'image-preview': ImagePreview
  },
  props: {
    mode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      files: [],
      loading: false,
      deleteDialog: false,
      selectedFile: {},
      status: 'deletable',
      countries: [],
      homeSlides: []
    }
  },
  async created() {
    await this.getFiles()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getFiles() {
      this.loading = true
      await this.$api
        .get('/files/')
        .then(({ data }) => {
          this.files = data
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
        .finally(() => {
          this.loading = false
        })
    },
    async deleteFile() {
      this.$api
        .delete(`/files/`, {
          data: this.selectedFile
        })
        .then(async () => {
          this.showSnackbar({ text: 'Файл успешно удален', color: 'success' })
          await this.getFiles()
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
        .finally(() => {
          this.deleteDialog = false
        })
    },
    async openDeleteDialog(file) {
      this.selectedFile = file
      this.countries = []
      this.status = 'deletable'

      await this.$api
        .get(`/files/deletable/${this.selectedFile.id}`)
        .then(({ data }) => {
          this.status = data.status
          if (this.status === 'not_deletable') {
            this.countries = data.countries
            this.homeSlides = data.homeSlides
          }
          this.deleteDialog = true
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    }
  }
}
</script>

<style scoped>
.image-title {
  font-size: 14px;
}

.file-size {
  font-size: 12px;
}
</style>
