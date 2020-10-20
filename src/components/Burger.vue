<template>
  <div
    id="burger"
    :class="{
      open: mobileMenu,
      'text--white': type === 'home' || mobileMenu,
      'text-primary': type === 'shop' && !mobileMenu
    }"
    @click="toggleMobileMenu"
  >
    <span
      :class="{
        'back--white': type === 'home' || mobileMenu,
        'back--primary': type === 'shop' && !mobileMenu
      }"
    ></span>
    <span
      :class="{
        'back--white': type === 'home' || mobileMenu,
        'back--primary': type === 'shop' && !mobileMenu
      }"
    ></span>
    <span
      :class="{
        'back--white': type === 'home' || mobileMenu,
        'back--primary': type === 'shop' && !mobileMenu
      }"
    ></span>
    <span
      :class="{
        'back--white': type === 'home' || mobileMenu,
        'back--primary': type === 'shop' && !mobileMenu
      }"
    ></span></div
></template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Burger',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['mobileMenu'])
  },
  methods: {
    ...mapMutations(['toggleMobileMenu'])
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/colors';

.back--white {
  background: white !important;
}

.back--primary {
  background: $primary !important;
}

#burger {
  display: none;
  position: absolute;
  z-index: 50;
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
    background-color: $orange !important;
  }
}

#burger span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
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
</style>
