<template>
  <div id="about-cider" v-if="!loading">
    <div class="container">
      <vue-word-cloud
        class="word-cloud"
        :words="words"
        font-family="Neucha"
        :color="randomColor"
        :spacing="0.2"
      >
        <template slot-scope="{ text, word }">
          <div class="word clickable" @click="onWordClick(word)">
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>

      <div :id="selectedWord.id" class="word-preview" v-if="selectedWord !== null">
        <h1 class="description-title">{{ selectedWord.text }}</h1>
        <div v-if="!loadingDescription" class="description">
          <div class="html-wrapper" v-html="description" />
        </div>
        <div class="container fill-height" v-else>
          <v-progress-circular
            size="30"
            indeterminate
            color="primary"
            class="mx-auto"
          ></v-progress-circular>
        </div>
      </div>
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
import VueWordCloud from 'vuewordcloud'

export default {
  name: 'AboutCider',
  components: {
    [VueWordCloud.name]: VueWordCloud
  },
  data() {
    return {
      loading: false,
      loadingDescription: false,
      colors: ['#235335', '#5b8300', '#7c8782', '#8a7271'],
      words: [],
      selectedWord: null,
      description: ''
    }
  },
  async created() {
    this.$root.$emit('page-name-changed', 'О сидре и перри')
    await this.loadWords()
  },
  methods: {
    async onWordClick(word) {
      const old = this.selectedWord
      this.selectedWord = word

      setTimeout(() => {
        const element = document.getElementById(this.selectedWord.id)

        element.scrollIntoView({ behavior: 'smooth' })
      }, 100)

      if (old === null || old.id !== word.id) await this.getDescription()
    },
    randomColor() {
      const index = Math.floor(Math.random() * this.colors.length)
      return this.colors[index]
    },
    async loadWords() {
      this.loading = true
      await this.$api
        .get(`/open/words`)
        .then(({ data }) => {
          this.words = data
        })
        .catch(error => {
          console.error(error)
          this.$router.back()
        })
        .finally(() => {
          this.loading = false
        })
    },
    async getDescription() {
      this.loadingDescription = true
      await this.$api
        .get(`/open/words/${this.selectedWord.id}`)
        .then(({ data }) => {
          this.description = data.description
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.loadingDescription = false
        })
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/colors';

#about-cider {
  .word:hover,
  .word:active {
    color: $orange !important;
  }

  .container {
    max-width: 1240px;
    padding: 20px;

    .word-cloud {
      width: 100%;
      height: 400px !important;
      margin: 0 auto;
    }

    .word-preview {
      padding-top: 70px;
      min-height: calc(100vh - 177px);

      .description-title {
        margin: 8px 0;
      }
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
}
</style>
