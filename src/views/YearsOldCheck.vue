<template>
  <section id="yo">
    <div class="image-container">
      <img src="@/assets/images/logo.png" alt="logo" />
    </div>
    <div class="text-center">
      <h1 class="heading-4 mt-5 font-weight-regular">Откройте природный вкус общения!</h1>
      <p class="mt-3 text-h6 font-weight-bold">Вам уже исполнилось 18 лет?</p>
      <v-btn
        color="primary"
        v-ripple="false"
        @click="valid = false"
        :disabled="!valid"
        outlined
        width="100"
        class="ma-1"
        >Нет</v-btn
      >
      <v-btn
        color="primary"
        v-ripple="false"
        @click="confirmYo"
        :disabled="!valid"
        width="100"
        class="ma-1"
        >Да</v-btn
      >
      <p class="text-body-1 mt-3">
        Информация, представленная на сайте предназначена для лиц, достигших 18-летнего возраста.
      </p>
      <v-alert max-width="350" class="mt-5 mx-auto" v-show="!valid" dense outlined type="error">
        Вы ещё не достигли возраста 18 лет
      </v-alert>
    </div>
  </section>
</template>

<script>
export default {
  name: 'YearsOldCheck',
  data() {
    return {
      valid: true
    }
  },
  methods: {
    confirmYo() {
      sessionStorage.setItem('yo', 'true')
      window.location.reload(true)
    }
  }
}
</script>

<style lang="scss" scoped>
#yo {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: white;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 16px;
  }

  .image-container {
    padding: 20px;

    img {
      max-height: 400px;
      max-width: 100%;
    }
  }

  .datepicker {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 420px;
    margin: 0 auto;
  }

  .margin-bottom {
    margin-bottom: 78px;
  }
}
</style>
