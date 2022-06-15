<script setup lang="ts">
import MainMenu from "./components/MainMenu.vue";
import GW2Logo from "../../assets/img/gw2-eod-logo.png";
</script>

<template>
  <div class="home">
    <div class="home__logo">
      <el-image :src="GW2Logo" />
    </div>
    <main-menu class="home__menu" />
  </div>
</template>

<style lang="scss">
.home {
  margin: 0;
  height: 100%;

  &__menu {
    margin-top: 24px;
    width: 25%;
    margin: auto;
  }

  &__logo {
    width: 15%;
    margin: auto;
  }
}
</style>
