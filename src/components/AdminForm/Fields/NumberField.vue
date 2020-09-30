<template>
  <div>
    <field-label :field="field" :show="!num" />
    <v-text-field
      color="admin-primary"
      type="number"
      v-model="num"
      solo
      :placeholder="field.placeholder || ''"
      @input="emitInputChange"
      :counter="field.counter"
      :rules="rules"
    >
    </v-text-field>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'

export default {
  name: 'NumberField',
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
      num: '',
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

    if (this.field.value) this.num = this.field.value
    else if (this.field.default) this.num = this.field.default

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    emitInputChange() {
      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: Number(this.num)
      })
    }
  }
}
</script>
