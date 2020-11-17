<template>
  <div id="page" v-if="!loading">
    <div class="container">
      <div class="html-wrapper" v-html="content" />
    </div>
  </div>
  <div class="container fill-height" v-else>
    <v-progress-circular
      size="50"
      indeterminate
      color="primary"
      class="mx-auto"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'Page',
  data() {
    return {
      title: '',
      content: '',
      loading: false
    }
  },
  async created() {
    await this.loadPage()
    this.$root.$emit('page-name-changed', this.title)
  },
  methods: {
    async loadPage() {
      this.loading = true
      await this.$api
        .get(`/open/pages/${this.$route.params.url}`)
        .then(({ data }) => {
          this.title = data.name
          document.title = this.title
          this.content = data.html
        })
        .catch(error => {
          this.$router.back()
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/colors';
#page {
  .container {
    max-width: 1240px;
    padding: 20px;
  }

  .html-wrapper {
    color: $main;
    text-align: justify;

    h1,
    h2,
    h3,
    p {
      font-family: 'Roboto', sans-serif;
      margin-bottom: 16px;
    }

    h1,
    h2,
    h3 {
      margin-top: 8px;
      color: $title !important;
    }

    ul {
      list-style: disc;
      margin-left: 24px;
      margin-bottom: 16px;
      p {
        margin-bottom: 8px;
      }
    }

    p img {
      max-width: 100%;
      max-height: 600px;
    }
  }
}
</style>
