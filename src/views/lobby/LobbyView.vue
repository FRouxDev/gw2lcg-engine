<script setup lang="ts">
import { useUserStore } from '@/stores/users';
import { io, type Socket } from 'socket.io-client';
import { computed, onMounted, ref } from 'vue';
import type { LobbyRecord, LobbyMessage } from '@/game/models/types/lobby/lobby.type';

const usersStore = useUserStore();
const lobbyEntries = ref<LobbyRecord[]>([]);
const lobbyMessages = ref<LobbyMessage[]>([]);
const playerMessage = ref<string>('');
const socket = ref<Socket>();

const lobbyPlayers = computed(() => {
  return lobbyEntries.value.map((entry) => entry.player);
});

onMounted(() => {
  socket.value = io('http://localhost:3000');

  socket.value.on('connect', () => {
    console.log('Connected');
    socket.value?.emit('join-lobby', usersStore.getPlayerData);
  });

  socket.value.on('refresh-lobby', (response: LobbyRecord[]) => {
    lobbyEntries.value = response;
  });

  socket.value.on('refresh-chat', (response: LobbyMessage[]) => {
    lobbyMessages.value = response;
  });
});

const postMessage = () => {
  const lobbyMessage = {
    playerId: usersStore.name,
    message: playerMessage.value,
  };
  socket.value?.emit('post-message', lobbyMessage);
  playerMessage.value = '';
};
</script>

<template>
  <div class="section">
    <el-row>
      <el-col :span="24" class="section__wrapper">
        <div class="section__wrapper__top">
          <h1 class="section__wrapper__top__title">Test websockets</h1>
        </div>
        <div>
          <p>Joueurs connectés :</p>
          <ul>
            <li v-for="player of lobbyPlayers" :key="player.uuid">
              {{ player.name }}
            </li>
          </ul>
        </div>
        <div>
          <p>Chat :</p>
          <ul>
            <li v-for="message of lobbyMessages" :key="message.datetime">
              {{ message.author.name }}: {{ message.message }}
            </li>
          </ul>
          <div>
            <el-input v-model="playerMessage" placeholder="Your message..." />
            <el-button @click="postMessage" label="Post" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.section {
  width: 80%;
  margin: auto;

  &__wrapper {
    &__top {
      &__title,
      &__button {
        margin-top: $defaultMargin !important;
      }
      display: flex;
      justify-content: space-between;
    }

    margin-top: $defaultMargin * 3 !important;
    padding: 2 * $defaultMargin;
    border-radius: $defaultRadius;
    background-color: $white;
    box-shadow: $defaultBoxShadow;
  }
}
</style>
