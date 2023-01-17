<script setup lang="ts">
import { useRouter } from 'vue-router';
import MenuItem from '@/components/menu/MenuItem.vue';
import GenericModal from '@/components/GenericModal.vue';
import { useUserStore } from '@/stores/users';
import { ref } from 'vue';
import type { Card } from '@/game/models/card';

const router = useRouter();

const usersStore = useUserStore();

// Component Methods
const startNewGame = () => router.push('/new-game');
const loadSavedGame = () => {
  displayDeckModal.value = true;
};
const goToAdmin = () => router.push('/admin');
const openDeckManager = () => router.push('/deck-manager');
const openLobby = () => {
  displayUserInputModal.value = true;
};
const openSettings = () => console.log('Settings');
const quitGame = () => window.close();

const closeDeckModal = () => {
  displayDeckModal.value = false;
  chosenDeck.value = undefined;
};
const closeUserInputModal = () => {
  displayUserInputModal.value = false;
  userName.value = '';
};

const joinLobbyAsUser = () => {
  usersStore.setPlayer(userName.value);
  router.push('/game-lobby');
};

// Component Data
const displayDeckModal = ref(false);
const displayUserInputModal = ref(false);
const decks = ref<Card[]>([]);
const chosenDeck = ref();
const userName = ref('');
</script>

<template>
  <div class="menu">
    <generic-modal
      title="Choisissez votre deck."
      :display="displayDeckModal"
      @modal-close="closeDeckModal"
      confirm="Démarrer"
      :confirm-enabled="!!chosenDeck"
    >
      <div>
        <p>Selected deck : {{ chosenDeck }}</p>
        <el-select class="m-2" placeholder="Choisissez un deck..." size="large" v-model="chosenDeck">
          <el-option v-for="deck of decks" :key="deck.uuid" :label="deck.name" :value="deck.uuid" />
        </el-select>
      </div>
    </generic-modal>
    <generic-modal
      title="Please type your username"
      :display="displayUserInputModal"
      @modal-close="closeUserInputModal"
      @modal-submit="joinLobbyAsUser"
      confirm="Confirm"
      :confirm-enabled="!!userName"
    >
      <div>
        <el-input v-model="userName" placeholder="Your username" label="Username" />
        <br />
      </div>
    </generic-modal>
    <menu-item @menu-click="startNewGame" label="Start New Game" first />
    <el-divider class="menu__divider" />
    <menu-item @menu-click="openLobby" label="Join the Lobby" />
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
