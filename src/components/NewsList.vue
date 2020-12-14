<template>
  <div class="news">
    <div v-if="news.length" class="news-list">
      <div v-for="item in news" :key="item.id">
        <div class="news-item">
          <div class="news-content">
            <h2 class="news-title">
              {{ item.name }}
            </h2>
            <h3 class="news-subtitle">
              {{ item.subheader }}
            </h3>
            <p class="news-description">
              {{ item.description }}
            </p>
          </div>
          <v-spacer></v-spacer>
          <div class="image-container" v-if="item.fileId">
            <div class="news-image">
              <image-component :image-src="item.image.path"></image-component>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-news">
      <p>Новостей пока нет</p>
    </div>
    <div v-if="news.length && totalPages > 1" class="text-center">
      <v-row justify="center">
        <v-col cols="8">
          <v-pagination v-model="page" :length="totalPages" color="primary"></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ImageComponent from '@/components/ImageComponent'
export default {
  name: 'NewsList',
  props: {
    section: {
      type: String,
      default: ''
    }
  },
  components: {
    ImageComponent
  },
  data() {
    return {
      loading: false,
      page: 1,
      totalPages: -1,
      perPage: 10,
      total: 0,
      news: []
    }
  },
  async created() {
    await this.getNews()
  },
  methods: {
    getNews() {
      this.loading = true
      this.$api
        .get('/open/news-list/' + this.section, {
          params: {
            page: this.page,
            perPage: this.perPage,
            search: this.search
          }
        })
        .then(({ data }) => {
          this.news = data.news
          this.total = data.total
          this.totalPages = Math.ceil(this.total / this.perPage)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  watch: {
    async page() {
      await this.getNews()
    },
    async section() {
      await this.getNews()
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

.no-news {
  color: $inactive;
}

.news .news-list {
  .news-item {
    margin: 10px 0;
    padding: 10px 0;
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: start;
    height: 220px;

    .image-container {
      height: 200px;
      width: 200px;

      .news-image {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0 10px 10px;
        height: 100%;
        width: 200px;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }

    .news-content {
      padding: 10px 10px 10px 0;

      .news-title {
        color: $title;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-subtitle {
        color: #9198a0;
        font-family: 'Roboto', sans-serif;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-description {
        color: $main;
        font-family: 'Roboto', sans-serif;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}

@media (max-width: 600px) {
  .news .news-list {
    .news-item {
      margin: 10px 0;
      padding: 10px 0;
      width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: start;
      height: 280px;

      .image-container {
        height: 200px;
        width: 200px;
        margin: 0 auto;

        .news-image {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0 10px 10px;
          height: 100%;
          width: 200px;

          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }

      .news-content {
        padding: 10px 10px 10px 0;

        .news-title {
          color: $title;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-subtitle {
          display: none;
        }

        .news-description {
          display: none;
        }
      }
    }
  }
}
</style>
