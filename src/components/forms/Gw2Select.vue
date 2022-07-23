<script setup lang="ts">
import type { CardSetOption, SphereOption, CardTypeOption } from '@/config/forms/form-mapping/form.mapping.type';
import { computed, type PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<CardSetOption[] | SphereOption[] | CardTypeOption[]>,
    default: () => [],
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
    <el-select class="m-2" :placeholder="label" v-model="value">
      <el-option v-for="option of options" :key="option.value" :value="option.value" :label="option.label" />
    </el-select>
  </el-form-item>
</template>
<style lang="scss"></style>
