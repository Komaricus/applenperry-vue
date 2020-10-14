<template>
  <div>
    <field-label :field="field" :show="!files.length" />
    <div class="mb-3">
      <v-file-input
        :rules="rules"
        ref="file-field"
        v-show="false"
        @update:error="errorUpdated"
      ></v-file-input>
      <v-btn color="admin-primary" class="text--white mb-2" @click="dialog = true"
        >Добавить файл</v-btn
      >
      <div class="error--text pl-3 err">{{ error }}</div>
    </div>

    <div v-if="files.length && !loading" class="my-3">
      <div class="text--inactive caption">Загруженные файлы:</div>
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

    <v-dialog v-model="dialog" max-width="1110">
      <v-card>
        <v-card-title class="text--title text-roboto">Выбор изображения</v-card-title>
        <v-card-text>
          <v-tabs v-model="tab">
            <v-tab>Загрузить</v-tab>
            <v-tab>Выбрать</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item class="pa-3">
              <file-uploader :multiple="false" @files-uploaded="filePicked"></file-uploader>
            </v-tab-item>
            <v-tab-item class="pa-3">
              <file-picker :mode="'pick'" @file-picked="filePicked"></file-picker>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'
import ImagePreview from '../../ImagePreview'
import FilePicker from '../../FilePicker'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'FilesField',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  components: {
    FieldLabel,
    ImagePreview,
    FilePicker,
    FileUploader
  },
  data() {
    return {
      files: [],
      rules: [],
      loading: false,
      dialog: false,
      tab: 0,
      error: ''
    }
  },
  created() {
    if (this.field.required) this.rules.push(() => this.files.length > 0 || 'Обязательное поле')

    if (this.field.value) this.files = [this.field.value]

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    emitInputChange() {
      let ids = this.files.map(f => {
        return f.id
      })

      if (this.files.length === 1) ids = this.files[0].id

      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: ids
      })
    },
    filePicked(file) {
      if (Object.prototype.hasOwnProperty.call(file, 'files')) this.files = file.files
      else this.files = [file]
      this.dialog = false
      this.$refs['file-field'].validate(true)
      this.emitInputChange()
    },
    errorUpdated(value) {
      if (value)
        for (let rule of this.rules) {
          if (rule()) this.error = rule()
        }
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

.err {
  font-size: 12px;
}
</style>
