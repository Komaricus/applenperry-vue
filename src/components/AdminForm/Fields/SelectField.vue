<template>
  <div>
    <field-label :field="field" :show="!select"></field-label>
    <v-autocomplete
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
    >
      <template v-slot:selection="data">
        <image-preview
          v-if="data.item.hasOwnProperty('image') && data.item.image.path"
          class="select-image"
          :image-src="data.item.image.path"
        ></image-preview>
        <span>{{ data.item.name }}</span>
      </template>
      <template v-slot:item="data">
        <v-list-item-content class="d-flex align-center justify-start flex-row flex-nowrap">
          <image-preview
            v-if="data.item.hasOwnProperty('image') && data.item.image.path"
            class="select-image"
            :image-src="data.item.image.path"
          ></image-preview>
          <v-list-item-title>{{ data.item.name }}</v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'
import ImagePreview from '@/components/ImagePreview'
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
    'field-label': FieldLabel,
    ImagePreview
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
          if (this.field.id === 'parentId') {
            this.items = data.filter(e => e.parentId !== this.$route.params.id)
          } else {
            this.items = data
          }
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

<style scoped>
.select-image {
  display: inline-flex;
  width: 40px;
  height: 30px;
  margin-right: 8px;
}
</style>
