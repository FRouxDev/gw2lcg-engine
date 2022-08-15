<script setup lang="ts">
import type { PlayerCard } from '@/game/models/card';
import { computed, ref } from 'vue';
import CardView from './CardView.vue';
import cardsUtilsService from '@/services/cardsUtils.service';
import { CardType } from '@/game/models/types/cardType.type';
import { Sphere } from '@/game/models/types/sphere.type';
import { SPHERE_COLORS, SPHERE_FONTS } from '@/game/data/sphereIcons';
import { useDeckManagerStore } from '@/stores/deckManager';
import { storeToRefs } from 'pinia';

const { cardsData } = storeToRefs(useDeckManagerStore());
const { canAddCard } = useDeckManagerStore();

const typeFilters = ref<CardType[]>([CardType.HERO, CardType.ALLY, CardType.ATTACHMENT, CardType.EVENT]);
const sphereFilters = ref<Sphere[]>([Sphere.LEADERSHIP, Sphere.TACTICS, Sphere.SPIRIT, Sphere.LORE, Sphere.NEUTRAL]);
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
  const filteredCardsList = filtersActive.value ? cardsData.value.filter(applyFilter) : cardsData.value;
  const sortedCardsList = [...filteredCardsList].sort(cardsUtilsService.sorter);
  return sortedCardsList;
});

const toggleType = (type: CardType) => {
  typeFilters.value.includes(type)
    ? typeFilters.value.splice(typeFilters.value.indexOf(type), 1)
    : typeFilters.value.push(type);
};

const toggleSphere = (sphere: Sphere) => {
  sphereFilters.value.includes(sphere)
    ? sphereFilters.value.splice(sphereFilters.value.indexOf(sphere), 1)
    : sphereFilters.value.push(sphere);
};

const buttonType = (type: CardType) => {
  return typeFilters.value.includes(type) ? 'primary' : 'info';
};

const buttonSphere = (sphere: Sphere) => {
  return sphereFilters.value.includes(sphere) ? SPHERE_COLORS[sphere] : '#909399';
};

const attemptAdd = (card: PlayerCard) => {
  if (canAddCard(card)) {
    emit('addCards', card.uuid);
  }
};

const emit = defineEmits(['addCards']);
</script>

<template>
  <el-row>
    <el-col :span="24" class="browser__filters">
      <el-button-group class="browser__filters__type">
        <el-button @click="toggleType(CardType.HERO)" :type="buttonType(CardType.HERO)" size="large">
          Heroes
        </el-button>
        <el-button @click="toggleType(CardType.ALLY)" :type="buttonType(CardType.ALLY)" size="large">
          Allies
        </el-button>
        <el-button @click="toggleType(CardType.ATTACHMENT)" :type="buttonType(CardType.ATTACHMENT)" size="large">
          Attachments
        </el-button>
        <el-button @click="toggleType(CardType.EVENT)" :type="buttonType(CardType.EVENT)" size="large">
          Events
        </el-button>
      </el-button-group>
      <el-button-group class="browser__filters__sphere">
        <el-button
          @click="toggleSphere(Sphere.LEADERSHIP)"
          :color="buttonSphere(Sphere.LEADERSHIP)"
          class="browser__filters__sphere__button"
          size="large"
        >
          {{ SPHERE_FONTS[Sphere.LEADERSHIP] }}
        </el-button>
        <el-button
          @click="toggleSphere(Sphere.TACTICS)"
          :color="buttonSphere(Sphere.TACTICS)"
          class="browser__filters__sphere__button"
          size="large"
        >
          {{ SPHERE_FONTS[Sphere.TACTICS] }}
        </el-button>
        <el-button
          @click="toggleSphere(Sphere.SPIRIT)"
          :color="buttonSphere(Sphere.SPIRIT)"
          class="browser__filters__sphere__button"
          size="large"
        >
          {{ SPHERE_FONTS[Sphere.SPIRIT] }}
        </el-button>
        <el-button
          @click="toggleSphere(Sphere.LORE)"
          :color="buttonSphere(Sphere.LORE)"
          class="browser__filters__sphere__button"
          size="large"
        >
          {{ SPHERE_FONTS[Sphere.LORE] }}
        </el-button>
        <el-button
          @click="toggleSphere(Sphere.NEUTRAL)"
          :color="buttonSphere(Sphere.NEUTRAL)"
          class="browser__filters__sphere__button"
          size="large"
        >
          {{ SPHERE_FONTS[Sphere.NEUTRAL] }}
        </el-button>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row :gutter="24">
    <el-col :span="4" v-for="card of finalCardsList" :key="card.uuid">
      <card-view :card="card" @dblclick="attemptAdd(card)" :can-add="canAddCard(card)" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.browser {
  &__filters {
    display: flex;
    gap: $defaultMargin;

    &__type,
    &__sphere {
      margin-bottom: 2 * $defaultMargin;
    }

    &__sphere {
      &__button {
        color: $white !important;
        font-family: $iconsFont !important;
        font-size: $mediumSize;
      }
    }
  }
}
</style>
