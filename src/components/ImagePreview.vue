<template>
  <div class="image-container">
    <img v-if="mode === 'production'" :src="`/images/${imageSrc}`" alt="" />
    <img v-else :src="require(`./../assets/img/${imageSrc}`)" alt="" />
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

<style scoped lang="scss">
.image-container {
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 300px;
    max-height: 200px;
  }
}
</style>
