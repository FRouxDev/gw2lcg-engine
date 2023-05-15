<script setup lang="ts">
import { useRouter } from 'vue-router';
import MenuItem from '@/components/menu/MenuItem.vue';

const router = useRouter();

// Component Methods
const manageSets = () => router.push('/admin/sets-management');
const manageCards = () => router.push('/admin/cards-management');
const testSocket = () => router.push('/admin/sockets');
const back = () => router.push('/');
</script>

<template>
  <div class="menu">
    <menu-item @menu-click="manageSets" :label="$t('adminMenu.manageSets')" first />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="manageCards" :label="$t('adminMenu.manageCards')" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="testSocket" :label="$t('adminMenu.websockets')" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="back" :label="$t('adminMenu.back')" last />
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
