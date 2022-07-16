<script setup lang="ts">
import AdminMenu from "./components/AdminMenu.vue";
import GW2Logo from "@/assets/img/gw2-eod-logo.png";
</script>

<template>
  <div class="home">
    <div class="home__logo">
      <el-image :src="GW2Logo" />
    </div>
    <admin-menu class="home__menu" />
  </div>
</template>

<style lang="scss">
.home {
  margin: 0;
  height: 100%;

  &__menu {
    margin-top: $defaultMargin * 3;
    width: 25%;
    margin: auto;
  }

  &__logo {
    width: 15%;
    margin: auto;
  }
}
</style>
