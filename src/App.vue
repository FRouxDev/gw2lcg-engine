<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <el-container class="app">
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
