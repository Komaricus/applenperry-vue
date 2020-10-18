<template>
  <div class="file-picker-container">
    <div v-if="files.length">
      <v-row v-if="!loading" class="d-flex justify-center">
        <v-col v-for="file in files" :key="file.id" class="d-flex child-flex card-col">
          <v-card max-width="332">
            <v-card-title class="image-title text--main">
              <span>{{ file.originalName | cropName }}</span>
              <v-spacer />
              <span class="file-size text--inactive">{{ file.size | humanFileSize }}</span>
            </v-card-title>
            <v-card-text>
              <image-preview class="image-preview" :image-src="file.path"></image-preview>
            </v-card-text>
            <v-card-actions>
              <div v-if="mode === 'pick'">
                <v-btn v-if="selected.includes(file.id)" small disabled>Выбран</v-btn>
                <v-btn
                  v-else
                  color="admin-secondary"
                  small
                  @click="$emit('file-picked', file)"
                  v-ripple="false"
                  >Выбрать</v-btn
                >
              </div>
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
      <div
        v-else
        class="d-flex align-center fill-height justify-center"
        :class="mode !== 'pick' ? 'file-picker' : 'my-5'"
      >
        <v-progress-circular indeterminate color="admin-primary"></v-progress-circular>
      </div>
    </div>
    <div v-else>
      <p class="text-center text--inactive mt-4">Изображения не найдены</p>
    </div>
    <div v-if="files.length && !loading && mode !== 'pick' && perPage !== -1" class="text-center">
      <v-row justify="center">
        <v-col cols="8">
          <v-pagination v-model="page" :length="totalPages" color="admin-primary"></v-pagination>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="deleteDialog" max-width="500px" scrollable>
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
          <div v-else>
            <p>
              Файл невозможно удалить, так как он привязан к следующим объектам:
            </p>
            <div v-for="(value, key) in deleteConflicts" :key="key">
              <div v-if="Array.isArray(value) && value.length">
                <span class="text--title font-weight-bold">{{ itemNameById(key) }}:</span>
                <div class="mt-1 ml-3" v-for="item in value" :key="item.id">
                  <a :href="`/apple-admin/panel/list/${key}/edit/${item.id}`">
                    {{ item.name }}
                  </a>
                </div>
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
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'FilePicker',
  components: {
    'image-preview': ImagePreview
  },
  props: {
    mode: {
      type: String,
      default: ''
    },
    itemsPerPage: {
      type: Number,
      default: 0
    },
    searchValue: {
      type: String,
      default: ''
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      files: [],
      loading: false,
      deleteDialog: false,
      selectedFile: {},
      status: 'deletable',
      deleteConflicts: {},
      page: 1,
      totalPages: 1,
      perPage: 8,
      total: 0,
      search: ''
    }
  },
  async created() {
    if (this.mode === 'pick') this.perPage = -1
    this.$root.$on('files-uploaded', async payload => {
      if (payload.files && payload.files.length) {
        await this.getFiles()
      }
    })
    await this.getFiles()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getFiles() {
      this.loading = true
      await this.$api
        .get('/files/', {
          params: {
            page: this.page,
            perPage: this.perPage,
            search: this.search
          }
        })
        .then(({ data }) => {
          this.files = data.files
          this.total = data.total
          this.totalPages = Math.ceil(this.total / this.perPage)
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 300)
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
      this.status = 'deletable'
      this.deleteConflicts = {}

      await this.$api
        .get(`/files/deletable/${this.selectedFile.id}`)
        .then(({ data }) => {
          this.status = data.status
          if (this.status === 'not_deletable') {
            this.deleteConflicts = data.deleteConflicts
          }
          this.deleteDialog = true
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    }
  },
  watch: {
    async page() {
      await this.getFiles()
    },
    async itemsPerPage() {
      if (this.itemsPerPage === 0) return
      this.perPage = this.itemsPerPage
      this.page = 1
      await this.getFiles()
    },
    async searchValue() {
      this.search = this.searchValue
      this.page = 1
      await this.getFiles()
    }
  },
  computed: {
    ...mapGetters(['itemNameById'])
  }
}
</script>

<style scoped>
.image-preview {
  width: 300px !important;
  height: 150px !important;
}

.file-picker {
  height: calc(100vh - 132px);
}

.file-picker-container {
  max-width: 1424px;
  margin: 0 auto;
}

.image-title {
  font-size: 14px;
}

.file-size {
  font-size: 12px;
}

.card-col {
  max-width: 330px;
  margin: 8px;
}
</style>
