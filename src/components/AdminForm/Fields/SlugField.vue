<template>
  <div>
    <field-label :field="field" :show="!input" />
    <v-btn @click="generate" color="admin-primary" class="my-2 text--white">Сгенерировать</v-btn>
    <v-text-field
      color="admin-primary"
      type="text"
      v-model="input"
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
import { mapState, mapMutations } from 'vuex'
import { urlSlug } from '@/plugins/urlSlug'

export default {
  name: 'SlugField',
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
      input: '',
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

    if (Object.prototype.hasOwnProperty.call(this.field, 'value')) this.input = this.field.value

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    ...mapMutations(['setSlugSource']),
    emitInputChange() {
      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: this.input
      })
    },
    generate() {
      this.input = urlSlug(this.slugSource)
      this.emitInputChange()
    }
  },
  computed: {
    ...mapState(['slugSource'])
  },
  beforeDestroy() {
    this.setSlugSource('')
  }
}
</script>
