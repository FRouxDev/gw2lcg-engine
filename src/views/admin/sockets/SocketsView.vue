<script setup lang="ts">
import { io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const lobbyPlayers = ref<string[]>([]);

onMounted(() => {
  const socket = io('http://localhost:3000');
  const playerId = `User ${Math.floor(Math.random() * 10)}`;

  socket.on('connect', () => {
    console.log('Connected');
    socket.emit('join-lobby', playerId);
  });

  socket.on('user-joined-lobby', (response: string[]) => {
    lobbyPlayers.value = response;
  });
});
</script>

<template>
  <div class="section">
    <el-row>
      <el-col :span="24" class="section__wrapper">
        <div class="section__wrapper__top">
          <h1 class="section__wrapper__top__title">Test websockets</h1>
          <p>Joueurs connectés :</p>
          <ul>
            <li v-for="player of lobbyPlayers" :key="player">
              {{ player }}
            </li>
          </ul>
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
