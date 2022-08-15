<script setup lang="ts">
import { useDeckManagerStore } from '@/stores/deckManager';
import DeckListEntry from './DeckListEntry.vue';
import { storeToRefs } from 'pinia';

const { sortedDeckList } = storeToRefs(useDeckManagerStore());

const handleOver = (e: DragEvent) => {
  e.preventDefault();
  return false;
};

const handleDrop = (e: DragEvent) => {
  const cardUuid: string = e.dataTransfer?.getData('card') || '';
  emit('addCards', cardUuid);
};

const emit = defineEmits(['addCards', 'removeCard']);
</script>

<template>
  <div @dragover="handleOver" @drop="handleDrop" class="decklist">
    <div>
      <p>Drag here<br /></p>
    </div>
    <DeckListEntry
      v-for="entry in sortedDeckList"
      :deck-entry="entry"
      :key="entry.card.uuid"
      @dblclick="emit('removeCard', entry)"
    />
  </div>
</template>

<style lang="scss" scoped>
.decklist {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
