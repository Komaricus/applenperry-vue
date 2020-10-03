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
    <div v-if="files.length && !loading">
      <h3 class="text--title">Загруженные файлы</h3>
      <v-card v-for="(file, index) in files" :key="file.id" width="300px">
        <v-card-title class="image-title text--main">
          <span>{{ cropName(file.originalName) }}</span>
          <v-spacer />
          <span class="file-size text--inactive">{{ humanFileSize(file.size) }}</span>
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
    </div>
    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate color="admin-primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'
import ImagePreview from '../../ImagePreview'

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
    'image-preview': ImagePreview
  },
  data() {
    return {
      files: [],
      rules: [],
      loading: false
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
          }, 2000)
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    },
    cropName(name) {
      let cropName = name
      if (cropName.length > 22)
        cropName = name.substr(0, 10) + '...' + name.substring(name.length - 10)
      return cropName
    },
    humanFileSize(size) {
      let i = Math.floor(Math.log(size) / Math.log(1000))
      return (
        (size / Math.pow(1000, i)).toFixed(2) * 1 +
        ' ' +
        ['байт', 'КБайт', 'Мбайт', 'ГБайт', 'ТБайт'][i]
      )
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
