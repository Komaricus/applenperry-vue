<template>
  <div>
    <field-label :field="field" :show="!select"></field-label>
    <v-select
      color="admin-primary"
      v-model="select"
      item-text="name"
      item-value="id"
      :items="items"
      solo
      :placeholder="field.placeholder || ''"
      @input="emitInputChange"
      :rules="rules"
      item-color="admin-primary"
      clearable
      :loading="loading"
      :disabled="loading"
    ></v-select>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'
import { mapMutations } from 'vuex'

export default {
  name: 'SelectField',
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
      select: '',
      items: [],
      rules: [],
      loading: true
    }
  },
  created() {
    if (this.field.itemsURL) {
      this.$api
        .get(this.field.itemsURL)
        .then(({ data }) => {
          this.items = data
          const index = this.items.findIndex(e => e.id === this.$route.params.id)
          if (index !== -1) this.items.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 200)
        })
    }

    if (Object.prototype.hasOwnProperty.call(this.field, 'value')) this.select = this.field.value

    if (this.field.required) this.rules.push(value => !!value || 'Обязательное поле')

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    emitInputChange() {
      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: this.select || null
      })
    }
  }
}
</script>

<style scoped></style>
