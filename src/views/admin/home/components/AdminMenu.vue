<script setup lang="ts">
import { useRouter } from "vue-router";
import MenuItem from "@/components/menu/MenuItem.vue";

const router = useRouter();

// Component Methods
const manageSets = () => router.push("/new-game");
const manageCards = () => router.push("/new-game");
const importCards = () => router.push("/new-game");
const back = () => router.push("/");
</script>

<template>
  <div class="menu">
    <menu-item @menu-click="manageSets" label="Manage sets" first />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="manageCards" label="Manage cards" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="importCards" label="Import cards" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="back" label="Back to Main menu" last />
  </div>
</template>

<style lang="scss">
.menu {
  border-radius: $defaultRadius;
  background-color: $white;
  box-shadow: $defaultBoxShadow;

  &__divider {
    margin-top: 0px;
    margin-bottom: 0px;
    height: 0px;
  }
}
</style>
