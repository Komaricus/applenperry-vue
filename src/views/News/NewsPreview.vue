<template>
  <div id="news-preview">
    <div class="container" v-if="!loading">
      <div class="image-container" v-if="preview.fileId">
        <div class="news-image">
          <image-component :image-src="preview.image.path"></image-component>
        </div>
      </div>
      <h1 id="title">{{ preview.name }}</h1>
      <h2 v-if="preview.subheader" id="subheader">{{ preview.subheader }}</h2>
      <div id="description" v-if="preview.description">
        {{ preview.description }}
      </div>
      <div id="separator"></div>
      <div id="content" v-html="preview.content"></div>
    </div>
  </div>
</template>

<script>
import ImageComponent from '@/components/ImageComponent'

export default {
  name: 'NewsPreview',
  components: {
    ImageComponent
  },
  data() {
    return {
      loading: false,
      preview: {}
    }
  },
  created() {
    this.$root.$emit('page-name-changed', 'Новости')
    this.getOneNews()
  },
  methods: {
    getOneNews() {
      this.loading = true
      const { section, newsUrl } = this.$route.params
      this.$api
        .get(`/open/news-list`, {
          params: { section, newsUrl }
        })
        .then(({ data }) => {
          this.preview = data
        })
        .catch(error => {
          console.error(error)
          this.$router.back()
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
#news-preview {
  .container {
    max-width: 900px;
    padding: 20px;

    .image-container {
      height: 100%;
      width: 100%;
      margin: 20px auto;

      .news-image {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        width: 100%;

        img {
          max-width: 900px;
          max-height: 600px;
        }
      }
    }

    #title {
      color: $title;
      margin-bottom: 10px;
      text-align: justify;
    }

    #subheader {
      color: $additional;
      text-align: justify;
      font-size: 18px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
    }

    #description {
      background-color: #eee;
      padding: 20px;
      margin: 20px 0;
      color: $main;
      font-style: italic;
      text-align: justify;
      font-weight: 300;
      border-radius: 3px;
    }

    #content {
      padding: 40px 0;
      border-top: 1px solid $border;
      text-align: justify;
      color: $main;

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

@media (max-width: 600px) {
  #news-preview {
    .container {
      padding: 20px;

      .image-container .news-image img {
        max-height: 400px;
      }

      #title {
        font-size: 22px;
      }

      #subheader {
        font-size: 18px;
      }

      #content {
        h1 {
          font-size: 22px;
        }

        h2 {
          font-size: 18px;
        }

        h3 {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
