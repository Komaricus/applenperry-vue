<template>
  <section>
    <div class="d-flex pa-5 top">
      <h1 class="text--title">{{ title }}</h1>
      <v-spacer />
      <v-btn class="ml-2" color="admin-secondary" @click="cancelButtonClicked" v-ripple="false"
        >Отмена</v-btn
      >
      <v-btn class="ml-2" color="success" @click="save" v-ripple="false">Сохранить</v-btn>
      <v-btn
        v-if="type === 'edit'"
        class="ml-2"
        color="danger"
        dark
        @click="openDeleteDialog"
        v-ripple="false"
        :loading="deleteLoading"
        >Удалить</v-btn
      >
    </div>
    <div v-if="Array.isArray(this.fields) && this.fields.length" class="overflow-y-auto form">
      <v-form ref="form" v-model="valid" lazy-validation>
        <component
          v-for="field in fields"
          :is="field.type"
          :key="field.id"
          :field="field"
          @fieldValueChanged="onFieldValueChanged"
        ></component>
      </v-form>
    </div>

    <v-dialog v-model="deleteDialog" max-width="500px" scrollable>
      <v-card v-if="status === 'deletable'">
        <v-card-title>
          <span class="text--title">Подтверждение удаления</span>
        </v-card-title>
        <v-card-text v-if="deleteDialogText" class="text--main">
          <p class="delete-text">{{ deleteDialogText }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="admin-primary" dark @click="del" v-ripple="false">
            Да
          </v-btn>
          <v-btn @click="deleteDialog = false" v-ripple="false">
            Нет
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>

      <v-card v-else>
        <v-card-title>
          <span class="text--title">Невозможно удалить объект</span>
        </v-card-title>
        <v-card-text class="text--main">
          <p>
            Объект невозможно удалить, так как он привязан к следующим объектам:
          </p>
          <div v-for="(value, key) in deleteConflicts" :key="key">
            <div v-if="Array.isArray(value) && value.length">
              <span class="text--title font-weight-bold">{{ itemNameById(key) }}:</span>
              <div class="mt-1 ml-3" v-for="item in value" :key="item.id">
                <a
                  :href="`/apple-admin/panel/list/${key}/edit/${item.id}`"
                  @click="setNeedsAlert(false)"
                >
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text--white"
            color="admin-primary"
            @click="deleteDialog = false"
            v-ripple="false"
          >
            Закрыть
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { formsSettings } from './FormsSettings/main'
import InputField from './Fields/InputField'
import TextField from './Fields/TextField'
import SelectField from './Fields/SelectField'
import NumberField from './Fields/NumberField'
import FilesField from './Fields/FilesField'
import HTMLField from './Fields/HTMLField'
import SlugField from './Fields/SlugField'
import CategoriesField from './Fields/CategoriesField'
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'Form',
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    'input-field': InputField,
    'text-field': TextField,
    'select-field': SelectField,
    'number-field': NumberField,
    'files-field': FilesField,
    'html-field': HTMLField,
    'slug-field': SlugField,
    'categories-field': CategoriesField
  },
  data() {
    return {
      title: '',
      fields: [],
      valid: true,
      body: {},
      deleteDialog: false,
      deleteDialogText: '',
      deleteLoading: false,
      status: 'deletable',
      deleteConflicts: {}
    }
  },
  created() {
    if (this.formId === '') {
      this.setFormId(this.id)
    }
    this.setMode(this.type)
    if (this.type === 'edit') {
      this.title = formsSettings[this.id].editTitle
      if (Object.prototype.hasOwnProperty.call(this.item, 'id')) {
        this.body.id = this.item.id
        if (this.form !== null) {
          this.fields = [
            ...formsSettings[this.id].fields.map(field => {
              if (field.type === 'files-field' && !field.multiple) {
                return Object.assign({}, field, { value: this.form.image })
              }
              return Object.assign({}, field, { value: this.form[field.id] })
            })
          ]
        } else {
          this.fields = [
            ...formsSettings[this.id].fields.map(field => {
              if (field.type === 'files-field' && !field.multiple) {
                return Object.assign({}, field, { value: this.item.image })
              }
              return Object.assign({}, field, { value: this.item[field.id] })
            })
          ]
        }
      }
      this.deleteDialogText = formsSettings[this.id].deleteDialogText
    } else {
      this.title = formsSettings[this.id].creationTitle
      if (this.form !== null) {
        this.fields = [
          ...formsSettings[this.id].fields.map(field => {
            if (field.type === 'files-field' && !field.multiple) {
              return Object.assign({}, field, { value: this.form.image })
            }
            return Object.assign({}, field, { value: this.form[field.id] })
          })
        ]
      } else {
        this.fields = [...formsSettings[this.id].fields]
      }
    }
    this.setNeedsAlert(true)
  },
  methods: {
    ...mapMutations(['showSnackbar', 'setForm', 'setFormId', 'setNeedsAlert', 'setMode']),
    onFieldValueChanged(args) {
      this.body[args.id] = args.value
      if (this.form === null) this.setForm(Object.assign({}, this.body))
      else this.setForm(Object.assign(this.form, this.body))
    },
    cancelButtonClicked() {
      this.setForm(null)
      this.setFormId('')
      this.$emit('closeForm')
    },
    save() {
      this.valid = this.$refs.form.validate()
      if (!this.valid) {
        this.showSnackbar({ text: 'Заполните обязательные поля', color: 'warning' })
        return
      }

      if (this.type === 'edit') this.edit()
      else this.create()
    },
    edit() {
      this.$api
        .put(`/${this.id}/`, this.body)
        .then(() => {
          this.showSnackbar({ text: 'Запись успешно отредактирована', color: 'success' })
          this.setForm(null)
          this.setFormId('')
          this.$emit('closeForm')
        })
        .catch(error => {
          if (
            error.response.data.error.includes(
              'ERROR: duplicate key value violates unique constraint'
            )
          )
            this.showSnackbar({ text: 'Ссылка должна быть уникальной!', color: 'warning' })
          else {
            console.error(error)
            this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
          }
        })
    },
    create() {
      this.$api
        .post(`/${this.id}/`, this.body)
        .then(() => {
          this.showSnackbar({ text: 'Запись успешно создана', color: 'success' })
          this.setForm(null)
          this.setFormId('')
          this.$emit('closeForm')
        })
        .catch(error => {
          if (
            error.response.data.error.includes(
              'ERROR: duplicate key value violates unique constraint'
            )
          )
            this.showSnackbar({ text: 'Ссылка должна быть уникальной!', color: 'warning' })
          else {
            console.error(error)
            this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
          }
        })
    },
    async openDeleteDialog() {
      if (formsSettings[this.id].checkPossibleToDelete) {
        this.deleteLoading = true
        this.deleteConflicts = {}
        this.status = 'deletable'
        this.$api
          .get(`${this.id}/${this.body.id}/deletable`)
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
          .finally(() => {
            this.deleteLoading = false
          })
      } else {
        this.deleteDialog = true
      }
    },
    del() {
      this.$api
        .delete(`/${this.id}/${this.body.id}`)
        .then(() => {
          this.showSnackbar({ text: 'Запись успешно удалена', color: 'success' })
          this.setForm(null)
          this.setFormId('')
          this.$emit('closeForm')
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    }
  },
  computed: {
    ...mapGetters(['itemNameById']),
    ...mapState(['form', 'formId', 'needsAlert'])
  },
  beforeDestroy() {
    this.setNeedsAlert(false)
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

h1 {
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
}

.delete-text {
  font-size: 16px;
}

.form {
  max-height: calc(100vh - 151px);
  padding: 20px;
}

.top {
  border-bottom: 1px solid $border;
}
</style>
