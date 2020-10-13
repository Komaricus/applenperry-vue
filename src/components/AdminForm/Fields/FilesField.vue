<template>
  <div>
    <field-label :field="field" :show="!files.length" />
    <v-file-input
      accept="image/*"
      color="admin-primary"
      solo
      clearable
      chips
      :placeholder="field.placeholder || ''"
      :multiple="field.multiple"
      @change="filesAdded"
      :rules="rules"
      ref="file-field"
    ></v-file-input>
    <div class="d-flex align-center mb-3">
      <div class="text--main">Или выберите из уже загруженных файлов:</div>
      <v-btn class="ml-5" color="white" @click="libraryDialog = true">Открыть изображения</v-btn>
    </div>
    <div v-if="files.length && !loading" class="my-3">
      <h3 class="text--title">Загруженные файлы:</h3>
      <v-row>
        <v-col v-for="(file, index) in files" :key="file.id" class="d-flex child-flex card-col">
          <v-card max-width="332">
            <v-card-title class="image-title text--main">
              <span>{{ file.originalName | cropName }}</span>
              <v-spacer />
              <span class="file-size text--inactive">{{ file.size | humanFileSize }}</span>
            </v-card-title>
            <v-card-text class="image-preview">
              <image-preview :image-src="file.path"></image-preview>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn small icon color="admin-primary" @click="files.splice(index, 1)">
                <v-icon small>
                  fa-trash
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate class="mt-5" color="admin-primary"></v-progress-circular>
    </div>

    <v-dialog v-model="libraryDialog" max-width="1100">
      <v-card>
        <v-card-title class="text--title text-roboto">Выбор изображения</v-card-title>
        <v-card-text>
          <file-picker :mode="'pick'" @file-picked="filePicked"></file-picker>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'
import ImagePreview from '../../ImagePreview'
import FilePicker from '../../FilePicker'
import { mapMutations } from 'vuex'

export default {
  name: 'FilesField',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  components: {
    'field-label': FieldLabel,
    'image-preview': ImagePreview,
    'file-picker': FilePicker
  },
  data() {
    return {
      files: [],
      rules: [],
      loading: false,
      libraryDialog: false
    }
  },
  created() {
    if (this.field.required) this.rules.push(() => this.files.length > 0 || 'Обязательное поле')

    if (this.field.value && !this.field.multiple) this.files = [this.field.value]

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async filesAdded(files) {
      if (!files || (Array.isArray(files) && !files.length)) return
      this.loading = true
      const formData = new FormData()
      if (this.field.multiple) {
        for (const file of files) {
          formData.append('files', file)
        }
      } else formData.append('files', files[0])

      await this.$api
        .post('/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data }) => {
          setTimeout(() => {
            this.files = data
            this.emitInputChange()
            this.loading = false
            this.$refs['file-field'].validate(true)
            this.showSnackbar({ text: 'Файл успешно загружен', color: 'success' })
          }, 2000)
        })
        .catch(error => {
          console.error(error)
          this.loading = false
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    },
    emitInputChange() {
      let ids = this.files.map(f => {
        return f.id
      })

      if (!this.field.multiple && this.files.length === 1) ids = this.files[0].id

      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: ids
      })
    },
    filePicked(file) {
      this.files = [file]
      this.libraryDialog = false
      this.$refs['file-field'].validate(true)
      this.emitInputChange()
    }
  }
}
</script>
<style scoped lang="scss">
.image-title {
  font-size: 14px;
}

.file-size {
  font-size: 12px;
}

h3 {
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
