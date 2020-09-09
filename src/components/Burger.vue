<template>
  <div id="burger" :class="{ open: mobileMenu }" @click="toggleSideMenu">
    <span></span>
    <span></span>
    <span></span>
    <span></span></div
></template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Burger',
  computed: {
    ...mapState(['mobileMenu'])
  },
  methods: {
    ...mapMutations(['toggleSideMenu'])
  }
}
</script>

<style lang="scss" scoped>
#burger {
  display: none;
  position: absolute;
  z-index: 50;
  color: #fff;
  right: 0;
  margin: 40px;
  cursor: pointer;
  border: none;
  background: transparent;
  -webkit-appearance: none;
  width: 30px;
  height: 20px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}

#burger:hover {
  span {
    background-color: #f07d10 !important;
  }
}

#burger span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #fff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

#burger span:nth-child(1) {
  top: 0;
}

#burger span:nth-child(2),
#burger span:nth-child(3) {
  top: 10px;
}

#burger span:nth-child(4) {
  top: 20px;
}

#burger.open span:nth-child(1) {
  top: 10px;
  width: 0;
  left: 50%;
}

#burger.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#burger.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#burger.open span:nth-child(4) {
  top: 10px;
  width: 0;
  left: 50%;
}

@media (max-width: 980px) {
  #burger {
    display: block;
  }
}
</style>
