<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  nbRows: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
<template>
  <el-form-item :label="label">
    <el-input v-model="value" type="textarea" :rows="nbRows" :placeholder="label" />
  </el-form-item>
</template>
<style lang="scss"></style>
