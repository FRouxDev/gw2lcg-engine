<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';
import type { PlayerCard } from '@/game/models/card';
import type { CardSet } from '@/game/models/cardSet';
import BrowserGrid from './components/BrowserGrid.vue';
import httpRequestService from '@/services/httpRequest.service';
import DeckList from './components/DeckList.vue';
import type { DeckEntry } from '@/game/models/types/decks/deckEntry.type';

const backToMenu = () => router.push('/');

const cardsData = ref<PlayerCard[]>([]);
const cardSets = ref<CardSet[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const deckList = ref<DeckEntry[]>([]);

// Decklist
const addCard = (uuid: string) => {
  const playerCard = cardsData.value.find((card) => card.uuid === uuid);

  if (playerCard) {
    const deckHasCard = deckList.value.find((entry: DeckEntry) => entry.card.uuid === playerCard.uuid);
    if (deckHasCard) {
      deckHasCard.quantity += 1;
    } else {
      deckList.value.push({
        deck: 'Current deck',
        card: playerCard,
        quantity: 1,
      });
    }
  }
};

const loadCardsData = async () => {
  try {
    const { cards } = await httpRequestService.get('cards/player');
    const { sets } = await httpRequestService.get('sets');
    loading.value = false;
    cardsData.value = cards;
    cardSets.value = sets;
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message as string;
    }
    if (typeof e === 'string') {
      error.value = e;
    }
    loading.value = false;
  }
};

onMounted(() => {
  loadCardsData();
});
</script>

<template>
  <div class="section">
    <el-row>
      <el-col :span="24" class="section__navigation">
        <el-button link type="primary" size="small" @click="backToMenu">Back to Menu</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-container class="section__decklist">
          <el-header class="section__decklist__top">
            <h1 class="section__decklist__top__title">Decklist</h1>
          </el-header>
          <DeckList @add-cards="addCard" :deck-list="deckList" />
        </el-container>
      </el-col>
      <el-col :span="18">
        <el-container class="section__browser">
          <el-header class="section__browser__top">
            <h1 class="section__browser__top__title">Browser</h1>
          </el-header>
          <div class="section__browsers_cards-wrapper">
            <browser-grid :cards-list="cardsData" @add-cards="addCard" />
          </div>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.section {
  width: 90%;
  margin: auto;

  &__navigation {
    margin-top: $defaultMargin;
    margin-bottom: $defaultMargin;
  }

  &__decklist,
  &__browser {
    &__top {
      &__title,
      &__button {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    padding: 2 * $defaultMargin;
    border-radius: $defaultRadius;
    background-color: $white;
    box-shadow: $defaultBoxShadow;
  }
  &__browser {
    padding-left: 2 * $defaultMargin;
    padding-right: 2 * $defaultMargin;
  }
}

.box {
  border: 3px solid #666;
  background-color: #ddd;
  border-radius: $defaultRadius;
  padding: 10px;
}
</style>
