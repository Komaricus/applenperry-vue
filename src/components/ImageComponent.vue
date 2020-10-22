<template>
  <img v-if="mode === 'production'" :src="`/images/${imageSrc}`" alt="" />
  <img v-else :src="require(`./../assets/img/${imageSrc}`)" alt="" />
</template>

<script>
export default {
  name: 'ImageComponent',
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
