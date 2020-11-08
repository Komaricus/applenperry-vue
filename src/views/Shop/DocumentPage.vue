<template>
  <div id="document-view" class="container" v-if="!loading">
    <h1 class="document-title">{{ title }}</h1>
    <div class="html-wrapper">
      <div v-html="html"></div>
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
  name: 'DocumentPage',
  data() {
    return {
      title: '',
      html: '',
      loading: false
    }
  },
  created() {
    this.loadDocument()
  },
  methods: {
    loadDocument() {
      this.loading = true

      this.$api
        .get(`/open/docs/${this.$route.params.url}`)
        .then(({ data }) => {
          this.title = data.name
          document.title = this.title
          this.html = data.html
        })
        .catch(error => {
          console.error(error)
          this.$router.back()
        })
        .finally(() => {
          this.loading = false
          window.scrollTo(0, 0)
        })
    }
  },
  watch: {
    $route() {
      this.loadDocument()
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/colors';

#document-view.container {
  max-width: 1000px;

  .document-title {
    color: $title;
    margin-bottom: 16px;
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
    }

    ul {
      list-style: disc;
      margin-left: 24px;
      margin-bottom: 16px;
      p {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
