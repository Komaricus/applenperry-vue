<template>
  <div>
    <field-label :field="field" :show="!files.length" />
    <v-file-input
      accept="image/*"
      color="admin-primary"
      solo
      clearable
      chips
      show-size
      counter
      :placeholder="field.placeholder || ''"
      :multiple="field.multiple"
      @change="filesAdded"
      :rules="rules"
    ></v-file-input>
    <img src="@/assets/img/image_2020-10-01_10-27-16.png" alt="" />
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'

export default {
  name: 'FilesField',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  components: {
    'field-label': FieldLabel
  },
  data() {
    return {
      files: [],
      rules: []
    }
  },
  created() {
    if (this.field.required) this.rules.push(value => !!value || 'Обязательное поле')

    // if (this.field.value) this.input = this.field.value

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    // this.emitInputChange()
  },
  methods: {
    async filesAdded(files) {
      console.log(files)
      if (!files || (Array.isArray(files) && !files.length)) return
      const formData = new FormData()
      if (this.field.multiple) {
        for (const file of files) {
          formData.append('files', file)
        }
      } else formData.append('files', files)

      await this.$api
        .post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    emitInputChange() {
      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: this.input
      })
    }
  }
}
</script>
