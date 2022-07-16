<script setup lang="ts">
import { useRouter } from 'vue-router';
import MenuItem from '@/components/menu/MenuItem.vue';
import GenericModal from '@/components/GenericModal.vue';
import { ref } from 'vue';
import { decks as availableDecks } from '@/game/data/decks';
import type { DeckList } from '@/game/models/deckList';

const router = useRouter();

// Component Methods
const startNewGame = () => router.push('/new-game');
const loadSavedGame = () => {
  displayModal.value = true;
};
const goToAdmin = () => router.push('/admin');
const openDeckManager = () => router.push('/deck-manager');
const openSettings = () => console.log('Settings');
const quitGame = () => window.close();
const closeModal = () => {
  displayModal.value = false;
  chosenDeck.value = undefined;
};

// Component Data
const displayModal = ref(false);
const decks = ref<DeckList[]>(availableDecks);
const chosenDeck = ref();
</script>

<template>
  <div class="menu">
    <generic-modal
      title="Choisissez votre deck."
      :display="displayModal"
      @modal-close="closeModal"
      confirm="Démarrer"
      :confirm-enabled="!!chosenDeck"
    >
      <div>
        <p>Selected deck : {{ chosenDeck }}</p>
        <el-select class="m-2" placeholder="Choisissez un deck..." size="large" v-model="chosenDeck">
          <el-option v-for="deck of decks" :key="deck.deckId" :label="deck.deckName" :value="deck.deckId" />
        </el-select>
      </div>
    </generic-modal>
    <menu-item @menu-click="startNewGame" label="Start New Game" first />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="loadSavedGame" label="Load Saved Game" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="goToAdmin" label="Administration Board" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="openDeckManager" label="Open Deck Manager" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="openSettings" label="Settings" />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="quitGame" label="Quit" last />
  </div>
</template>

<style lang="scss">
.menu {
  border-radius: $defaultRadius;
  background-color: $white;
  box-shadow: $defaultBoxShadow;

  &__divider {
    margin-top: 0px;
    margin-bottom: 0px;
    height: 0px;
  }
}
</style>
