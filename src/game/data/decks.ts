import type { DeckList } from "../models/deckList";

export const decks: DeckList[] = [
  {
    deckId: "zojja",
    deckName: "Zojja & Friends",
    cards: [
      {
        cardId: 5,
        quantity: 1,
      },
      {
        cardId: 6,
        quantity: 1,
      },
      {
        cardId: 9,
        quantity: 1,
      },
    ],
  },
  {
    deckId: "rytlock",
    deckName: "Bromance",
    cards: [
      {
        cardId: 0,
        quantity: 1,
      },
      {
        cardId: 1,
        quantity: 1,
      },
      {
        cardId: 3,
        quantity: 1,
      },
    ],
  },
  {
    deckId: "thepack",
    deckName: "The Pact",
    cards: [
      {
        cardId: 4,
        quantity: 1,
      },
      {
        cardId: 1,
        quantity: 1,
      },
      {
        cardId: 2,
        quantity: 1,
      },
    ],
  },
];
