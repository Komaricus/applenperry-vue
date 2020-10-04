<template>
  <div>
    <v-img
      v-if="mode === 'production'"
      :src="`/images/${imageSrc}`"
      contain
      max-height="300"
      max-width="300"
    ></v-img>
    <v-img
      v-else
      :src="require(`./../assets/img/${imageSrc}`)"
      contain
      max-height="300"
      max-width="300"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    imageSrc: {
      type: String,
      required: true
    }
  },
  computed: {
    mode() {
      return process.env.NODE_ENV
    }
  }
}
</script>

<style scoped></style>
