<template>
  <div id="news" v-if="!loading">
    <div class="container">
      <div v-if="sections.length">
        <h1 class="text--title mb-2">Разделы</h1>
        <div class="sections">
          <div v-for="(section, index) in sections" :key="section.id" class="section">
            <router-link
              class="section-link"
              :to="`/apple-admin/site/news/${section.url}`"
              exact-active-class="active"
              >{{ section.name }}</router-link
            >
            <span class="text--inactive" v-if="index !== sections.length - 1">|</span>
          </div>
        </div>
      </div>
      <h1 class="text--title mb-2">{{ title }}</h1>
      <div class="last-news">
        <news-list :section="section"></news-list>
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
import NewsList from '@/components/NewsList'

export default {
  name: 'Main',
  components: {
    NewsList
  },
  data() {
    return {
      loading: false,
      section: '',
      sections: [
        {
          id: '1',
          url: '',
          name: 'Последние новости'
        }
      ],
      title: 'Последние новости'
    }
  },
  async created() {
    this.$root.$emit('page-name-changed', 'Новости')
    this.section = this.$route.params.section || 'latest'
    this.loading = true
    await this.getSections()
    this.loading = false
  },
  methods: {
    getSections() {
      this.sections = [
        {
          id: '1',
          url: '',
          name: 'Последние новости'
        }
      ]
      this.$api
        .get('/open/news-sections')
        .then(({ data }) => {
          this.sections = [...this.sections, ...data]
          const index = this.sections.findIndex(e => e.url === this.$route.params.section)
          if (index !== -1) this.title = this.sections[index].name
          else this.title = 'Последние новости'
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  watch: {
    $route() {
      this.section = this.$route.params.section || 'latest'
      const index = this.sections.findIndex(e => e.url === this.$route.params.section)
      if (index !== -1) this.title = this.sections[index].name
      else this.title = 'Последние новости'
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/colors';
#news {
  .container {
    max-width: 900px;
    padding: 20px;

    .sections {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      background-color: rgb(238, 238, 238);
      margin-bottom: 20px;

      .section {
        .section-link {
          margin: 0 10px;
          color: $main;
        }

        .section-link:hover {
          color: $orange;
        }

        .active {
          color: $orange !important;
        }
      }
    }
  }
}
</style>
