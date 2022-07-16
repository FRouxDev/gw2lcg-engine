<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  first: { type: Boolean, default: false },
  last: { type: Boolean, default: false },
  label: String,
});

defineEmits(['menu-click']);

const extraClasses = computed(() => {
  return {
    'item--first': !!props.first,
    'item--last': !!props.last,
  };
});
</script>

<template>
  <div class="item" :class="extraClasses" @click="$emit('menu-click')">
    {{ label }}
  </div>
</template>

<style lang="scss">
.item {
  font-size: $mediumSize;
  font-weight: bold;
  text-align: center;
  padding: 2 * $defaultMargin;
  text-shadow: $textShadowLight;

  &:hover {
    background-color: $darkTeal;
    color: $white;
    text-shadow: $textShadowDark;
    cursor: pointer;
  }

  &--first {
    border-radius: $defaultRadius $defaultRadius 0px 0px;
  }

  &--last {
    border-radius: 0px 0px $defaultRadius $defaultRadius;
  }
}
</style>
