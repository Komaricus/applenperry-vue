<template>
  <div id="admin-container">
    <v-row no-gutters>
      <v-col cols="4" class="column">
        <div class="pa-2">
          <v-list-item-group
            v-ripple="false"
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
      <v-col cols="4" class="column" v-if="Number(selectedCategoryIndex) >= 0">
        <div class="pa-2">
          <v-list-item-group
            v-ripple="false"
            @change="itemChanged"
            v-model="selectedItemIndex"
            color="admin-primary"
          >
            <v-list-item v-for="(item, i) in categoryItems" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-col>
      <v-col cols="4" class="column" v-if="Number(selectedCategoryIndex) >= 0">
        <div class="pa-2">
          <p>Для добавления новой записи нажмите кнопку добавить</p>
          <p>Для редактирования выберите запись из списка</p>
        </div>
      </v-col>
      <v-col
        cols="8"
        id="logo-column"
        v-if="selectedCategoryIndex === undefined || Number(selectedCategoryIndex) < 0"
      >
        <img src="@/assets/logo-admin.png" alt="" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  data() {
    return {
      items: [
        {
          id: 'categories',
          name: 'Категории товара'
        }
      ],
      selectedCategoryIndex: -1,
      selectedCategory: {},
      categoryItems: [],
      selectedItemIndex: -1,
      selectedItem: {}
    }
  },
  methods: {
    async categoryChanged() {
      if (this.selectedCategoryIndex === undefined || Number(this.selectedCategoryIndex) < 0) {
        this.selectedCategory = {}
        return
      }

      this.selectedCategory = this.items[this.selectedCategoryIndex]
      await this.$api
        .get(`/${this.selectedCategory.id}/`)
        .then(({ data }) => {
          this.selectedItemIndex = -1
          this.selectedItem = {}
          this.categoryItems = data
        })
        .catch(error => {
          console.error(error)
        })
    },
    async itemChanged() {
      if (this.selectedItemIndex === undefined || Number(this.selectedItemIndex) < 0) {
        this.selectedItem = {}
        return
      }

      this.selectedItem = this.categoryItems[this.selectedItemIndex]
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
</style>
