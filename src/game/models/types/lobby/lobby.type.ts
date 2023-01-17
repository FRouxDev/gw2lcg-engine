import type { Player } from '@/game/models/types/player.type';

export interface LobbyRecord {
  player: Player;
  deckName?: string;
}

export interface LobbyMessage {
  author: Player;
  message: string;
  datetime: number;
}
