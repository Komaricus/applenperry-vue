<template>
  <section id="yo">
    <img src="@/assets/logo.png" alt="logo" />
    <div class="has-text-centered">
      <h1 class="title mt-5">Откройте природный вкус общения!</h1>
      <p class="subtitle mt-3">Для того, чтобы пользоваться сайтом укажите дату своего рождения</p>

      <div class="datepicker">
        <b-field
          :type="{ 'is-danger': !valid }"
          :message="!valid ? 'Вы ещё не достигли возраста 18 лет' : ''"
        >
          <b-datepicker
            :disabled="!valid"
            v-model="selected"
            locale="ru-RU"
            placeholder="Дата рождения"
            icon="calendar-alt"
            trap-focus
            :first-day-of-week="1"
            :max-date="new Date()"
            position="is-top-right"
            @input="dateChanged"
          />
        </b-field>

        <b-button :disabled="!valid" class="is-primary ml-2" @click="check" outlined
          >Подтвердить</b-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'YearsOldCheck',
  data() {
    return {
      selected: new Date(),
      valid: true
    }
  },
  methods: {
    ...mapMutations(['checkYearsOld']),
    dateChanged(date) {
      this.selected = date
    },
    check() {
      const now = new Date()
      const yo = now - this.selected

      if (yo >= 1000 * 3600 * 24 * 365 * 18 + 1000 * 3600 * 24 * 4) {
        sessionStorage.setItem('yo', 'true')
        window.location.reload(true)
      } else {
        this.valid = false
      }
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

  img {
    max-height: 400px;
    max-width: 400px;
    width: 70%;
  }

  .datepicker {
    display: flex;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
