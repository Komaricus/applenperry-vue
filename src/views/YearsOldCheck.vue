<template>
  <section id="yo">
    <img src="@/assets/images/logo.png" alt="logo" />
    <div class="text-center">
      <h1 class="heading-4 mt-5 font-weight-regular">Откройте природный вкус общения!</h1>
      <p class="mt-3">Для того, чтобы пользоваться сайтом укажите дату своего рождения</p>
      <div class="datepicker" :class="{ 'margin-bottom': valid }">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          :nudge-top="2"
          top
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formattedDate"
              :disabled="!valid"
              prepend-inner-icon="fa-calendar"
              readonly
              dense
              outlined
              v-bind="attrs"
              v-on="on"
              hide-details
            ></v-text-field>
          </template>
          <v-date-picker
            no-title
            color="primary"
            v-model="date"
            @input="menu = false"
            :first-day-of-week="1"
            :max="new Date().toISOString().substr(0, 10)"
            min="1920-01-01"
            ref="picker"
          ></v-date-picker>
        </v-menu>

        <v-btn
          v-ripple="false"
          height="40"
          color="primary"
          :disabled="!valid"
          class="ml-2"
          @click="check"
          >Подтвердить</v-btn
        >
      </div>
      <v-alert max-width="350" class="mt-5 mx-auto" v-show="!valid" dense outlined type="error">
        Вы ещё не достигли возраста 18 лет
      </v-alert>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'YearsOldCheck',
  data() {
    return {
      date: new Date().toLocaleDateString('fr-CA'),
      valid: true,
      menu: false
    }
  },
  methods: {
    ...mapMutations(['checkYearsOld']),
    dateChanged(date) {
      this.date = date
    },
    check() {
      const now = new Date()
      const yo = now - new Date(this.date)

      if (yo >= 1000 * 3600 * 24 * 365 * 18 + 1000 * 3600 * 24 * 4) {
        sessionStorage.setItem('yo', 'true')
        window.location.reload(true)
      } else {
        this.valid = false
      }
    },
    save(date) {
      this.$refs.menu.save(date)
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.date).toLocaleDateString('ru')
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
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

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 16px;
  }

  img {
    max-height: 400px;
    max-width: 400px;
    width: 70%;
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
