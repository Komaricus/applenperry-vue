<template>
  <section>
    <div class="full-page-centered background-grey">
      <v-card id="login-form" min-width="400">
        <v-card-text class="text--main">
          <h1 class="text--admin-dark mb-5">Авторизация</h1>
          <v-text-field
            v-model="login"
            :rules="[rules.requiredLogin]"
            label="Логин"
            type="text"
            solo
            ref="login"
            color="admin-primary"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'fa-eye-slash' : 'fa-eye'"
            :rules="[rules.requiredPassword]"
            :type="show ? 'text' : 'password'"
            label="Пароль"
            solo
            @click:append="show = !show"
            ref="password"
            color="admin-primary"
          ></v-text-field>
          <v-alert max-width="350" class="mt-5 mx-auto" v-show="error" dense outlined type="error">
            Неверные логин или пароль
          </v-alert>
          <v-btn class="text--white" color="admin-primary" @click="tryLogIn">Вход</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import LocalStorageService from '../../plugins/LocalStorageService'
const localStorageService = LocalStorageService.getService()

export default {
  name: 'AdminLogin',
  data() {
    return {
      login: '',
      password: '',
      error: false,
      show: false,
      rules: {
        requiredLogin: value => !!value || 'Укажите логин',
        requiredPassword: value => !!value || 'Укажите пароль'
      }
    }
  },
  methods: {
    ...mapMutations(['setAuthToken']),
    tryLogIn() {
      if (!this.login || !this.password) {
        this.$refs['login'].validate(true)
        this.$refs['password'].validate(true)
        return
      }
      this.$api
        .post(`/login`, {
          login: this.login,
          password: this.password
        })
        .then(response => {
          if (response.data.code === 200) {
            localStorageService.setToken(response.data.token)
            this.$router.replace('/apple-admin/panel')
          }
        })
        .catch(error => {
          console.error(error)
          this.error = true
          this.errorMessage = 'Неверные логин или пароль'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#login-form {
  text-align: center;
  padding: 10px;

  h1 {
    font-family: Roboto, sans-serif;
  }
}
</style>
