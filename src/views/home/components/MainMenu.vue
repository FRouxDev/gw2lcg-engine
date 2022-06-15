<script setup lang="ts">
import { useRouter } from "vue-router";
import { ElMenu } from "element-plus";
const router = useRouter();

const startNewGame = () => router.push("/new-game");
const loadSavedGame = () => console.log("Load saved game");
const openDeckManager = () => router.push("/deck-manager");
</script>

<template>
  <div>
    <el-menu mode="vertical" class="menu">
      <el-menu-item
        index="new-game"
        @click="startNewGame"
        class="menu__item menu__item--first"
      >
        New Game
      </el-menu-item>
      <el-menu-item
        index="load-saved"
        @click="loadSavedGame"
        class="menu__item"
      >
        Load Saved Game
      </el-menu-item>
      <el-menu-item
        index="deck-manager"
        @click="openDeckManager"
        class="menu__item menu__item--last"
      >
        Deck Manager
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss">
.menu {
  border-radius: 12px;
  &__item {
    font-weight: bold;
    --el-menu-hover-bg-color: #1e9995;

    &--first {
      border-radius: 12px 12px 0px 0px;
    }

    &--last {
      border-radius: 0px 0px 12px 12px;
    }
  }
}
</style>
