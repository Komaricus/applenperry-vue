<template>
  <div id="shop-contacts-container">
    <div class="container">
      <h1>Контакты</h1>
      <v-row>
        <v-col cols="12" md="6">
          <h2>Телефон</h2>
          <p class="phone contact-paragraph">
            <a href="tel: +79653714731">+7 (965) 371-47-31</a>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Адрес</h2>
          <p class="contact-paragraph">г. Москва, Лесная улица, дом 20, стр. 1</p>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Почта</h2>
          <p class="contact-paragraph">
            <span>
              По заказам:
              <a class="mail" href="mailto:purchase@applenperry.ru">purchase@applenperry.ru</a>
            </span>
            <br />
            <span>
              По предложениям:
              <a class="mail" href="mailto:marketing@applenperry.ru">marketing@applenperry.ru</a>
            </span>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Ближайшее метро</h2>
          <ul class="metro">
            <li class="d-flex">
              <v-icon color="rgb(162, 165, 180)" class="dot">
                fas fa-circle
              </v-icon>
              Менделеевская
              <v-spacer></v-spacer>
              <v-icon small color="main" class="mr-1">fas fa-walking</v-icon>
              640 м
            </li>
            <li class="d-flex">
              <v-icon color="rgb(127, 0, 0)" class="dot">
                fas fa-circle
              </v-icon>
              Белорусская
              <v-spacer></v-spacer>
              <v-icon small color="main" class="mr-1">fas fa-walking</v-icon>
              650 м
            </li>
            <li class="d-flex">
              <v-icon color="rgb(127, 0, 0)" class="dot">
                fas fa-circle
              </v-icon>
              Новослободская
              <v-spacer></v-spacer>
              <v-icon small color="main" class="mr-1">fas fa-walking</v-icon>
              770 м
            </li>
          </ul>
        </v-col>
      </v-row>
      <div>
        <h2>Карта</h2>
        <p>Вход со стороны Лесной улицы</p>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A7416d95f4c8f26e861fc357a13035e0d74f7d9d0333e36516701d44953409fa4&amp;source=constructor"
          width="100%"
          height="400"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contacts'
}
</script>

<style scoped lang="scss">
@import 'src/assets/colors';

#shop-contacts-container {
  width: 100%;

  .container {
    max-width: 840px;
    padding: 20px;
  }

  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  .contact-paragraph {
    margin: 10px 0;
    color: $main;
    font-size: 18px;
  }

  .phone {
    a {
      color: $main;
    }
  }

  .phone:hover {
    a {
      color: $orange;
    }
  }

  a.mail {
    color: $anchor;
  }

  a.mail:hover {
    color: $orange !important;
  }

  .metro {
    margin: 10px 0;
    color: $main;
    font-size: 18px;
    padding-left: 0;

    .dot {
      font-size: 0.6rem;
      margin-right: 10px;
    }

    li {
      max-width: 240px;
    }
  }
}
</style>
