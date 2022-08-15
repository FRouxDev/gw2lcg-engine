<script setup lang="ts">
import type { DeckEntry } from '@/game/models/types/decks/deckEntry.type';
import { computed, type PropType } from 'vue';
import { SPHERE_FONTS, SPHERE_COLORS } from '@/game/data/sphereIcons';
import { baseUrl } from '@/services/httpRequest.service';

const props = defineProps({
  deckEntry: {
    type: Object as PropType<DeckEntry>,
  },
});

const cardColor = computed<string>(() => {
  return props.deckEntry ? SPHERE_COLORS[props.deckEntry.card.sphere] : '#ffffff';
});

const cardImage = computed<string>(() => {
  if (props.deckEntry?.card.cardImage) {
    return `url(${baseUrl}${props.deckEntry?.card.cardImage})`;
  }
  return '';
});
</script>
<template>
  <div class="entry" v-if="deckEntry">
    <div class="entry__type">
      <p class="entry__type__text">{{ SPHERE_FONTS[deckEntry.card.sphere] }}</p>
    </div>
    <div class="entry__name">
      <p class="entry__name__text">{{ deckEntry.card.name }}</p>
    </div>
    <div class="entry__quantity">
      <p class="entry__quantity__text">{{ deckEntry.quantity }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.entry {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  cursor: pointer;
  height: 5 * $defaultMargin;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  background-image: v-bind(cardImage);
  background-position: 85% 15%;
  background-size: 130%;
  border-radius: $smRadius;

  &__type {
    font-family: $iconsFont;
    font-size: $mediumSize;
    color: white;
  }

  &__quantity {
    font-weight: bold;
  }

  &__type,
  &__quantity {
    width: 2.5rem;
    text-align: center;
    color: white;

    &:after {
      content: '';
      display: block;
      background: v-bind(cardColor);
      width: 5rem;
      height: 5rem;
      transform: rotate(20deg);
      margin-left: -2.5rem;
      position: absolute;
      top: -1.25rem;
      z-index: 0;
      left: 0.25rem;
    }

    &__text {
      position: relative;
      z-index: 1 !important;
      color: $white;
    }
  }

  &__name {
    font-weight: bold;
    &__text {
      color: $white;
      font-size: $mediumSize;
      text-shadow: $textShadowDark;
    }
  }

  &__quantity:after {
    left: auto;
    right: -2.25rem;
  }
}
</style>
