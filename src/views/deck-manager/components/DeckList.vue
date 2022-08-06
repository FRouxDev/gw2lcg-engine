<script setup lang="ts">
import type { DeckEntry } from '@/game/models/types/decks/deckEntry.type';
import type { PropType } from 'vue';
import DeckListEntry from './DeckListEntry.vue';

defineProps({
  deckList: {
    type: Array as PropType<DeckEntry[]>,
    default: () => [],
  },
});

const handleOver = (e: DragEvent) => {
  e.preventDefault();
  return false;
};

const handleDrop = (e: DragEvent) => {
  const cardUuid: string = e.dataTransfer?.getData('card') || '';
  emit('addCards', cardUuid);
};

const emit = defineEmits(['addCards']);
</script>

<template>
  <div @dragover="handleOver" @drop="handleDrop" class="decklist">
    <div>
      <p>Drag here<br /></p>
    </div>
    <DeckListEntry v-for="entry in deckList" :deck-entry="entry" :key="entry.card.uuid" />
  </div>
</template>

<style lang="scss" scoped>
.decklist {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
