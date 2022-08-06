import type { PlayerCard } from '../../card';

export interface DeckEntry {
  deck: string;
  card: PlayerCard;
  quantity: number;
}
