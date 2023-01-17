import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Player } from '@/game/models/types/player.type';

export const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    name: '',
    playerId: '',
  }),
  getters: {
    getPlayerData() {
      const player: Player = {
        name: this.name,
        uuid: this.playerId,
      };
      return player;
    },
  },
  actions: {
    setPlayer(playerName: string) {
      this.name = playerName;
      this.playerId = uuidv4();
    },
  },
});
