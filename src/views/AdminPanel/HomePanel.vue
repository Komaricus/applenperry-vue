<template>
  <div id="admin-container">
    <v-row no-gutters>
      <v-col cols="4" class="column">
        <div class="pa-2">
          <v-list-item-group
            @change="categoryChanged"
            v-model="selectedCategoryIndex"
            color="admin-primary"
          >
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-col>
      <v-col
        cols="4"
        class="column"
        v-if="
          Number(selectedCategoryIndex) >= 0 &&
            (selectedItemIndex === undefined || Number(selectedItemIndex) < 0)
        "
      >
        <div class="pa-2">
          <v-list-item-group
            @change="itemChanged"
            v-model="selectedItemIndex"
            color="admin-primary"
          >
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>
                  fa-plus-square
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Добавить запись</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="separator"></div>
            <v-list-item v-for="(item, i) in categoryItems" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-col>
      <v-col
        cols="4"
        class="column"
        v-if="
          Number(selectedCategoryIndex) >= 0 &&
            (selectedItemIndex === undefined || Number(selectedItemIndex) < 0)
        "
      >
        <div class="pa-2">
          <p class="text--inactive">Для добавления новой записи нажмите кнопку "Добавить запись"</p>
          <p class="text--inactive">Для редактирования выберите запись из списка</p>
        </div>
      </v-col>
      <v-col cols="8" v-if="Number(selectedItemIndex) >= 0" class="column">
        <div class="pa-5">
          <admin-form
            :id="selectedCategory.id"
            :type="type"
            @closeForm="closeForm"
            :item="selectedItem"
          ></admin-form>
        </div>
      </v-col>
      <v-col
        cols="8"
        id="logo-column"
        v-if="
          (selectedCategoryIndex === undefined || Number(selectedCategoryIndex) < 0) &&
            (selectedItemIndex === undefined || Number(selectedItemIndex) < 0)
        "
      >
        <img src="@/assets/logo-admin.png" alt="" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Form from '../../components/AdminForm/Form'
import { mapMutations } from 'vuex'

export default {
  name: 'HomePanel',
  components: {
    'admin-form': Form
  },
  data() {
    return {
      items: [
        {
          id: 'categories',
          name: 'Категории товара'
        },
        {
          id: 'about-cider',
          name: 'О сидре и перри'
        },
        {
          id: 'countries',
          name: 'Страны'
        }
      ],
      selectedCategoryIndex: -1,
      selectedCategory: {},
      categoryItems: [],
      selectedItemIndex: -1,
      selectedItem: {},
      type: 'edit'
    }
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getItems() {
      await this.$api
        .get(`/${this.selectedCategory.id}/`)
        .then(({ data }) => {
          this.selectedItemIndex = -1
          this.selectedItem = {}
          this.categoryItems = data
        })
        .catch(error => {
          console.error(error)
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    },
    async categoryChanged() {
      if (this.selectedCategoryIndex === undefined || Number(this.selectedCategoryIndex) < 0) {
        this.selectedCategory = {}
        this.selectedItem = {}
        this.selectedItemIndex = -1
        return
      }

      this.selectedCategory = this.items[this.selectedCategoryIndex]
      await this.getItems()
    },
    async itemChanged() {
      if (this.selectedItemIndex === 0) {
        this.type = 'creation'
        return
      }

      if (this.selectedItemIndex === undefined || Number(this.selectedItemIndex) < 0) {
        this.selectedItem = {}
        return
      }

      this.type = 'edit'
      this.selectedItem = this.categoryItems[this.selectedItemIndex - 1]
    },
    async closeForm() {
      this.selectedItemIndex = -1
      this.selectedItem = {}
      await this.getItems()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/colors';

.column {
  height: calc(100vh - 64px);
  overflow: auto;
  border-left: 1px solid $border;
}

#logo-column {
  border-left: 1px solid $border;
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  img {
    width: 100%;
    max-height: 500px;
    max-width: 500px;
    opacity: 0.2;
  }
}

.separator {
  margin: 5px 0;
  border-bottom: 1px solid $border;
  width: 100%;
}
</style>
