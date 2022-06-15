export interface CardEntry {
  cardId: number;
  quantity: number;
}

export interface DeckList {
  deckId: string;
  deckName: string;
  cards: CardEntry[];
}
