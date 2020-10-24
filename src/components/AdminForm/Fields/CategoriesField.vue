<template>
  <div>
    <field-label :field="field" :show="!categories.length"></field-label>
    <v-autocomplete
      color="admin-primary"
      v-model="categories"
      multiple
      item-text="name"
      item-value="id"
      return-object
      :items="items"
      solo
      :placeholder="field.placeholder || ''"
      @input="emitInputChange"
      :rules="rules"
      item-color="admin-primary"
      clearable
      :loading="loading"
      :disabled="loading"
      attach=""
    ></v-autocomplete>
    <div class="mb-5" v-if="categories.length">
      <div class="text--inactive caption">Выбранные категории:</div>
      <draggable v-model="categories" group="categories" @start="drag = true" @end="drag = false">
        <div v-for="(category, index) in categories" :key="category.id">
          <div class="item-container">
            <div class="item-number">{{ index + 1 }}</div>
            <div class="item-name">{{ category.name }}</div>
            <div class="item-actions">
              <v-btn small icon color="admin-primary" @click="categories.splice(index, 1)">
                <v-icon small>
                  fa-trash
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel'
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'CategoriesField',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  components: {
    'field-label': FieldLabel,
    draggable
  },
  data() {
    return {
      categories: [],
      items: [],
      rules: [],
      loading: true,
      drag: false
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

    if (Object.prototype.hasOwnProperty.call(this.field, 'value'))
      this.categories = this.field.value

    if (this.field.required) this.rules.push(value => value.length > 0 || 'Обязательное поле')

    if (Array.isArray(this.field.rules) && this.field.rules.length)
      this.rules = [...this.rules, ...this.field.rules]

    this.emitInputChange()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    emitInputChange() {
      this.$emit('fieldValueChanged', {
        id: this.field.id,
        value: this.categories
      })
    }
  },
  watch: {
    drag() {
      this.emitInputChange()
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';
.item-container {
  padding: 10px;
  border: 1px $border solid;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 4px;
  cursor: pointer;

  .item-number {
    color: $inactive;
    margin-right: 20px;
  }

  .item-name {
    color: $main;
    width: 100%;
  }

  .item-actions {
    margin-left: 20px;
  }
}
</style>
