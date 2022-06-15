<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { HEADLESS_ROUTES } from "./config/headlessRoutes";
const route = useRoute();
console.log(route);
</script>

<template>
  <div>
    <el-container>
      <el-header v-if="!HEADLESS_ROUTES.includes(route.name as string)">
        <el-menu mode="horizontal" router>
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/new-game">New Game</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="app-main">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
.app-main {
  margin: 0px;
  padding: 0px;
  height: 100vh;
  background-image: url("../src/assets/img/shing-jea-wallpaper.jpg");
}
</style>
