<template>
  <div id="showcase">
    <div id="container">
      <img id="logo" src="@/assets/images/logo.png" alt="" />
      <h1 id="header">
        НАШ САЙТ В РАЗРАБОТКЕ
      </h1>
      <h4 id="sub-header">Скоро открытие</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WIP'
}
</script>

<style scoped>
#showcase {
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #e8e8e8;
  flex-direction: column;
}

#container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

#logo {
  max-width: 25%;
  min-width: 250px;
}

#header {
  margin-top: 50px;
  margin-bottom: 10px;
  color: black;
  font-size: 40px;
  font-family: 'Neucha', sans-serif;
  font-weight: 100;
}

#sub-header {
  font-size: 25px;
  color: grey;
  font-family: 'Neucha', sans-serif;
  font-weight: 100;
}

@media screen and (max-width: 480px) {
  #header {
    font-size: 30px;
  }

  #sub-header {
    font-size: 18px;
  }
}

@media (min-width: 1200px) {
  #container {
    max-width: 1140px;
  }
}
@media (min-width: 992px) {
  #container {
    max-width: 960px;
  }
}
@media (min-width: 768px) {
  #container {
    max-width: 720px;
  }
}
@media (min-width: 576px) {
  #container {
    max-width: 540px;
  }
}
</style>
