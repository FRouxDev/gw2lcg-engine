<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <el-container class="app">
      <!--<el-header v-if="!HEADLESS_ROUTES.includes(route.name as string)">
        <el-menu mode="horizontal" router>
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/new-game">New Game</el-menu-item>
        </el-menu>
      </el-header>-->
      <el-main class="app__main">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
.app {
  height: 100vh;
  &__main {
    margin: 0px;
    padding: 0px;
    height: 100%;
    background-image: url('../src/assets/img/shing-jea-wallpaper.jpg');
  }
}
</style>
