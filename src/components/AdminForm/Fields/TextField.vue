<template>
  <div>
    <field-label :field="field" :show="!text" />
    <v-textarea
      color="admin-primary"
      type="text"
      v-model="text"
      solo
      :placeholder="field.placeholder || ''"
      @input="emitInputChange"
      rows="1"
      auto-grow
      :counter="field.counter"
      :rules="rules"
    >
    </v-textarea>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'

export default {
  name: 'TextField',
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
      text: '',
      rules: []
    }
  },
  created() {
    if (this.field.required) this.rules.push(value => !!value || 'Обязательное поле')

    if (this.field.counter)
      this.rules.push(
        value =>
          (value || '').length <= this.field.counter || `Максимум ${this.field.counter} символов`
      )

    if (this.field.value) this.text = this.field.value

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    emitInputChange() {
      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: this.text
      })
    }
  }
}
</script>

<style scoped>
.field-label {
  margin-bottom: 8px;
  margin-left: 4px;
}
</style>
