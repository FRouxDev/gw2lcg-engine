<script setup lang="ts">
import type { PlayerCard } from '@/game/models/card';
import { baseUrl } from '@/services/httpRequest.service';
import { computed, type PropType } from 'vue';

const props = defineProps({
  card: {
    type: Object as PropType<PlayerCard>,
    required: true,
  },
  canAdd: {
    type: Boolean,
    default: true,
  },
});

const imageUrl = (cardImage: string | undefined): string => {
  return `${baseUrl}${cardImage}`;
};

const dragStart = (e: DragEvent) => {
  if (props.canAdd) {
    e.dataTransfer?.setData('card', props.card.uuid);
  } else {
    e.preventDefault();
  }
};

const additionnalClass = computed(() => {
  return { 'image__wrapper__picture--overlay': !props.canAdd };
});
</script>

<template>
  <div class="image__wrapper" draggable="true" @dragstart="dragStart">
    <el-image
      class="image__wrapper__picture"
      :class="additionnalClass"
      :src="imageUrl(card?.cardImage)"
      loading="lazy"
    ></el-image>
  </div>
</template>

<style lang="scss" scoped>
.image {
  &__wrapper {
    margin-bottom: $defaultMargin;
    padding: 0;
    cursor: pointer;
    transform: translateY(0px);
    transition: 0.5s ease-in-out;
    filter: drop-shadow(0px 0px 0px black);
    transition-property: transform filter;
    &:hover {
      transform: translateY($defaultTransform);
      filter: drop-shadow(0px 10px 15px black);
      animation: 20s ease-in-out 1s infinite alternate card-hover;
    }

    &__picture {
      border-radius: $defaultRadius;
      &--overlay {
        filter: grayscale(75%);
        cursor: not-allowed;
      }
    }
  }
}

@keyframes card-hover {
  0% {
    transform: rotate3d(1, 1, 1, 0deg) translateY($defaultTransform);
  }
  25% {
    transform: rotate3d(1, 1, 0, 10deg) translateY($defaultTransform);
  }
  50% {
    transform: rotate3d(-1, 1, 1, 10deg) translateY($defaultTransform);
  }
  75% {
    transform: rotate3d(-1, -1, 0, 10deg) translateY($defaultTransform);
  }
  100% {
    transform: rotate3d(1, -1, 0, 10deg) translateY($defaultTransform);
  }
}
</style>
