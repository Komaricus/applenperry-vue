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

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
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
import { mapMutations } from 'vuex'

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
    'html-field': HTMLField
  },
  data() {
    return {
      title: '',
      fields: [],
      valid: true,
      body: {},
      deleteDialog: false,
      deleteDialogText: ''
    }
  },
  created() {
    if (this.type === 'edit') {
      this.title = formsSettings[this.id].editTitle
      if (Object.prototype.hasOwnProperty.call(this.item, 'id')) {
        this.body.id = this.item.id
        this.fields = [
          ...formsSettings[this.id].fields.map(field => {
            if (field.type === 'files-field') {
              return Object.assign({}, field, { value: this.item.image })
            }
            return Object.assign({}, field, { value: this.item[field.id] || '' })
          })
        ]
      }
      this.deleteDialogText = formsSettings[this.id].deleteDialogText
    } else {
      this.title = formsSettings[this.id].creationTitle
      this.fields = [...formsSettings[this.id].fields]
    }
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    onFieldValueChanged(args) {
      this.body[args.id] = args.value
    },
    cancelButtonClicked() {
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
          this.$emit('closeForm')
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    },
    create() {
      this.$api
        .post(`/${this.id}/`, this.body)
        .then(() => {
          this.showSnackbar({ text: 'Запись успешно создана', color: 'success' })
          this.$emit('closeForm')
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    },
    openDeleteDialog() {
      this.deleteDialog = true
    },
    del() {
      this.$api
        .delete(`/${this.id}/${this.body.id}`)
        .then(() => {
          this.showSnackbar({ text: 'Запись успешно удалена', color: 'success' })
          this.$emit('closeForm')
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    }
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
