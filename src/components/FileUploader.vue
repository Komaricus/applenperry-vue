<template>
  <div id="drag-box" @click="clicked" :class="{ drag: dragover }">
    <div v-if="!loading">
      <v-icon large>fa-file-upload</v-icon>
      <p class="mt-5">Для загрузки нажмите или перетащите сюда файлы</p>
    </div>
    <v-progress-circular
      v-else
      indeterminate
      class="mt-5"
      color="admin-primary"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'FileUploader',
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dragover: false,
      loading: false
    }
  },
  mounted() {
    const dropzone = this.$el

    if (dropzone) {
      dropzone.addEventListener('dragenter', e => {
        e.preventDefault()
        this.dragover = true
      })
      dropzone.addEventListener('dragleave', e => {
        e.preventDefault()
        this.dragover = false
      })
      dropzone.addEventListener('dragover', e => {
        e.preventDefault()
        this.dragover = true
      })
      dropzone.addEventListener('drop', async e => {
        e.preventDefault()
        if (e.dataTransfer) {
          await this.uploadFiles(e.dataTransfer.files)
        }
      })
    }
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    clicked() {
      const input = document.createElement('input')
      input.type = 'file'
      if (this.multiple) input.setAttribute('multiple', true)
      input.setAttribute('accept', 'image/*')

      input.onchange = async e => {
        await this.uploadFiles(e.target.files)
        input.remove()
      }

      input.click()
    },
    async uploadFiles(files) {
      if (!files || !files.length) return

      this.loading = true
      let promises = []

      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 8388608) {
          this.showSnackbar({
            text: 'Размер файла не должен превышать 8 Мбайт',
            color: 'warning'
          })
          continue
        }

        const formData = new FormData()
        formData.append('files', files[i])
        promises.push(
          this.$api.post('/files/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        )
      }

      Promise.all(promises)
        .then(responses => {
          let filesUploaded = []
          for (let { data } of responses) {
            filesUploaded.push(...data)
          }
          setTimeout(() => {
            this.$root.$emit('files-uploaded', { files: filesUploaded })
            this.$emit('files-uploaded', { files: filesUploaded })
            this.loading = false
            this.showSnackbar({ text: 'Файлы успешно загружены', color: 'success' })
          }, 1000)
        })
        .catch(error => {
          console.error(error)
          this.loading = false
          this.showSnackbar({ text: 'Произошла ошибка', color: 'error' })
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';
#drag-box {
  width: 100%;
  height: 300px;
  border: 2px #4a6572 dashed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

.drag {
  background-color: #d3d9e0;
  color: $admin-primary;
}
</style>
