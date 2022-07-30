<script setup lang="ts">
defineProps({
  confirm: String,
  error: String,
});
const emit = defineEmits(['close']);
</script>

<template>
  <div>
    <el-alert v-if="confirm" :title="confirm" type="success" @close="emit('close')" show-icon />
    <el-alert v-if="error" :title="error" type="error" @close="emit('close')" show-icon />
  </div>
</template>
