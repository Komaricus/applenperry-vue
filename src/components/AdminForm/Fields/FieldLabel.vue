<template>
  <div class="field-label d-flex">
    <span class="text--main">{{ field.label }}</span><span v-if="field.required" v-show="show" class="text--error ml-1">*</span>
    <v-spacer />
    <v-tooltip left v-if="field.tooltip" max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="admin-grey" v-bind="attrs" v-on="on">
          fa-question-circle
        </v-icon>
      </template>
      <span>{{ field.tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'FieldLabel',
  props: {
    field: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
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
