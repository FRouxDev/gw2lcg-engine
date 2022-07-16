<script setup lang="ts">
import HandView from "./components/HandView.vue";
</script>

<template>
  <div class="about">
    <hand-view></hand-view>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
