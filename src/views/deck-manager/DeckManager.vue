<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';
import BrowserGrid from './components/BrowserGrid.vue';
import DeckList from './components/DeckList.vue';
import { useDeckManagerStore } from '@/stores/deckManager';

const backToMenu = () => router.push('/');

const { addCardToDeck, loadCardsData, removeCardFromDeck } = useDeckManagerStore();

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
          <DeckList @add-cards="addCardToDeck" @remove-card="removeCardFromDeck" />
        </el-container>
      </el-col>
      <el-col :span="18">
        <el-container class="section__browser">
          <div class="section__browsers_cards-wrapper">
            <browser-grid @add-cards="addCardToDeck" />
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
