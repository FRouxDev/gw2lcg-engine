<script setup lang="ts">
import type { PlayerCard } from '@/game/models/card';
import { computed, ref, type PropType } from 'vue';
import CardView from './CardView.vue';
import cardsUtilsService from '@/services/cardsUtils.service';
import type { CardType } from '@/game/models/types/cardType.type';
import type { Sphere } from '@/game/models/types/sphere.type';

const props = defineProps({
  cardsList: {
    type: Array as PropType<PlayerCard[]>,
    default: () => [],
  },
});

const typeFilters = ref<CardType[]>([]);
const sphereFilters = ref<Sphere[]>([]);
const textFilter = ref<string>('');

// Partie liste de cartes
const filtersActive = computed(() => {
  return typeFilters.value.length > 0 || sphereFilters.value.length > 0 || textFilter.value.length > 2;
});

const applyFilter = (card: PlayerCard) => {
  if (typeFilters.value.length > 0 && !typeFilters.value.includes(card.type)) {
    return false;
  }
  if (sphereFilters.value.length > 0 && !sphereFilters.value.includes(card.sphere)) {
    return false;
  }
  if (
    textFilter.value.length > 2 &&
    !card.text?.includes(textFilter.value) &&
    !card.name.includes(textFilter.value) &&
    !card.traits.some((trait) => trait.includes(textFilter.value))
  ) {
    return false;
  }
  return true;
};

const finalCardsList = computed(() => {
  const filteredCardsList = filtersActive.value ? props.cardsList.filter(applyFilter) : props.cardsList;
  const sortedCardsList = [...filteredCardsList].sort(cardsUtilsService.sorter);
  return sortedCardsList;
});

const emit = defineEmits(['addCards']);
</script>

<template>
  <el-row :gutter="24">
    <el-col :span="4" v-for="card of finalCardsList" :key="card.uuid">
      <card-view :card="card" @dblclick="emit('addCards', card.uuid)" />
    </el-col>
  </el-row>
</template>
