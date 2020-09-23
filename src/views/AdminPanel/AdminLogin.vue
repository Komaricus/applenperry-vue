<template>
  <section>
    <div class="full-page-centered background-grey">
      <div id="login-form" class="box">
        <h1 class="is-size-4">Авторизация</h1>
        <div id="inputs-section">
          <b-field label="Логин" :type="!login && error ? 'is-danger' : ''">
            <b-input v-model="login" @input="error = false"></b-input>
          </b-field>
          <b-field label="Пароль" :type="!password && error ? 'is-danger' : ''">
            <b-input
              v-model="password"
              type="password"
              password-reveal
              @input="error = false"
            ></b-input>
          </b-field>
        </div>
        <div id="error-section" v-if="error && errorMessage">
          <b-message type="is-danger">
            {{ errorMessage }}
          </b-message>
        </div>
        <div id="buttons-section">
          <b-button class="is-primary" @click="tryLogIn">Вход</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AdminLogin',
  data() {
    return {
      login: '',
      password: '',
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    ...mapMutations(['setAuthToken']),
    tryLogIn() {
      if (!this.login || !this.password) {
        this.error = true
        this.errorMessage = 'Укажите логин и пароль'
        return
      }
      this.$api
        .post(`/login`, {
          login: this.login,
          password: this.password
        })
        .then(response => {
          console.log(response)
          if (response.data.code === 200) {
            this.setAuthToken(response.data.token)
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
.background-grey {
  background-color: #fcfcfc;
}

#login-form {
  width: 400px;
  //background-color: #f1f1f1;
  text-align: center;
  padding: 15px;
  //color: black;

  h1 {
    font-family: Roboto, sans-serif;
  }
}

#error-section {
  margin: 20px 30px;
}

#inputs-section {
  max-width: 300px;
  text-align: left;
  margin: 30px auto;
}
</style>
