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

    <div v-if="files.length && !loading && !field.multiple" class="my-3">
      <div class="text--inactive caption">Загруженные файлы:</div>
      <v-row>
        <v-col v-for="(file, index) in files" :key="file.id" class="d-flex child-flex card-col">
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
    <div v-if="files.length && !loading && field.multiple" class="my-3">
      <div class="text--inactive caption">Загруженные файлы:</div>
      <draggable v-model="files" group="files" @start="drag = true" @end="drag = false">
        <div
          v-for="(file, index) in files"
          :key="file.id"
          class="d-inline-block child-flex card-col ma-4 pointer"
        >
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
              <span class="text--inactive ml-3">{{ index + 1 }}</span>
              <v-spacer />
              <v-btn small icon color="admin-primary" @click="files.splice(index, 1)">
                <v-icon small>
                  fa-trash
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </draggable>
    </div>
    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate class="mt-5" color="admin-primary"></v-progress-circular>
    </div>

    <v-dialog v-model="dialog" max-width="1110" scrollable>
      <v-card>
        <v-card-title class="text--title text-roboto"
          >Выбор изображения
          <v-tabs v-model="tab" fixed-tabs>
            <v-tab>Загрузить</v-tab>
            <v-tab>Выбрать</v-tab>
          </v-tabs>
          <v-text-field
            v-if="tab === 1"
            v-model="search"
            placeholder="Поиск"
            prepend-inner-icon="fa-search"
            solo
            dense
            hide-details
            class="search mx-auto mt-3"
            clearable
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item class="pa-3">
              <file-uploader
                :multiple="field.multiple"
                @files-uploaded="filePicked"
              ></file-uploader>
            </v-tab-item>
            <v-tab-item class="pa-3">
              <file-picker
                :mode="'pick'"
                :search-value="search"
                @file-picked="filePicked"
                :selected="
                  this.files.map(e => {
                    return e.id
                  })
                "
              ></file-picker>
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
import draggable from 'vuedraggable'
import { mapState, mapMutations } from 'vuex'

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
    FileUploader,
    draggable
  },
  data() {
    return {
      files: [],
      rules: [],
      loading: false,
      dialog: false,
      tab: 0,
      error: '',
      search: '',
      drag: false
    }
  },
  created() {
    if (this.field.required) this.rules.push(() => this.files.length > 0 || 'Обязательное поле')

    if (Object.prototype.hasOwnProperty.call(this.field, 'value') && this.field.value) {
      if (this.field.multiple) this.files = this.field.value
      else if (this.field.value.id) this.files = [this.field.value]
    }

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    ...mapMutations(['setForm']),
    emitInputChange() {
      let value = null
      if (this.field.multiple) value = this.files
      else if (this.files.length === 1) {
        if (this.field.id === 'icon') this.form.iconFile = this.files[0]
        else this.form.image = this.files[0]
        this.setForm(Object.assign({}, this.form))
        value = this.files[0].id
      }

      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: value
      })
    },
    filePicked(file) {
      if (this.field.multiple) {
        if (Object.prototype.hasOwnProperty.call(file, 'files')) {
          for (const f of file.files) {
            if (!this.files.some(e => e.id === f.id)) {
              this.files.push(f)
            }
          }
          this.dialog = false
        } else {
          if (!this.files.some(e => e.id === file.id)) {
            this.files.push(file)
          }
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(file, 'files')) {
          this.files = file.files
        } else {
          this.files = [file]
        }

        this.dialog = false
      }

      this.$refs['file-field'].validate(true)
      this.emitInputChange()
    },
    errorUpdated(value) {
      this.error = ''
      if (value)
        for (let rule of this.rules) {
          if (rule()) this.error = rule()
        }
    }
  },
  watch: {
    drag() {
      this.emitInputChange()
    }
  },
  computed: {
    ...mapState(['form'])
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

.search {
  max-width: 360px;
}

.pointer {
  cursor: pointer;
}

.image-preview {
  width: 300px !important;
  height: 150px !important;
}
</style>
