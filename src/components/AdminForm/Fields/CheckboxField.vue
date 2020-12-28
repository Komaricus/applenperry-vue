<template>
  <div>
    <field-label :field="field" />
    <v-checkbox
      color="admin-primary"
      v-model="check"
      solo
      @change="emitInputChange"
      label="Да"
      hide-details
    >
    </v-checkbox>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'

export default {
  name: 'CheckboxField',
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
      check: false
    }
  },
  created() {
    if (Object.prototype.hasOwnProperty.call(this.field, 'value')) this.check = this.field.value

    this.emitInputChange()
  },
  methods: {
    emitInputChange() {
      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: this.check
      })
    }
  }
}
</script>
