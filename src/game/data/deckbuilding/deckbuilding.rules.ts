import type { PlayerCard } from '@/game/models/card';
import { CardType } from '@/game/models/types/cardType.type';
import type { DeckEntry } from '@/game/models/types/decks/deckEntry.type';

const MAX_CARD_QUANTITY = 3;
const MAX_HERO_CARD_QUANTITY = 1;
const MAX_TOTAL_HEROES_QUANTITY = 3;
const MIN_TOTAL_HEROES_QUANTITY = 1;
const MIN_CARDS_IN_DECK = 50;

// Can we add the specified card to the deck?
export const canAddCardToDeck = (card: PlayerCard, deck: DeckEntry[]) => {
  const maxAmountPossible = card.type === CardType.HERO ? MAX_HERO_CARD_QUANTITY : MAX_CARD_QUANTITY;

  const hasReachedMaxQuantity = !!deck.find((cardEntry) => {
    return cardEntry.card.uuid === card.uuid && cardEntry.quantity === maxAmountPossible;
  });

  const heroesCardsInDeck = deck.filter((deckEntry) => {
    return deckEntry.card.type === CardType.HERO;
  }).length;

  const hasReachedMaxHeroesQuantity =
    card.type === CardType.HERO ? heroesCardsInDeck === MAX_TOTAL_HEROES_QUANTITY : false;

  return {
    check: !(hasReachedMaxQuantity || hasReachedMaxHeroesQuantity),
    rulesDetails: {
      maxQuantity: hasReachedMaxQuantity,
      maxHeroesQuantity: hasReachedMaxHeroesQuantity,
    },
  };
};

export const isDeckValid = (deck: DeckEntry[]) => {
  const heroesQuantity = deck.reduce((acc: number, cardEntry: DeckEntry) => {
    if (cardEntry.card.type === CardType.HERO) {
      acc += cardEntry.quantity;
    }
    return acc;
  }, 0);

  const hasValidHeroesQuantiy = heroesQuantity >= MIN_TOTAL_HEROES_QUANTITY && heroesQuantity <= MAX_HERO_CARD_QUANTITY;

  const hasEnoughCards =
    deck.reduce((acc: number, cardEntry: DeckEntry) => {
      acc += cardEntry.quantity;
      return acc;
    }, 0) >= MIN_CARDS_IN_DECK;

  return {
    check: hasValidHeroesQuantiy && hasEnoughCards,
    rulesDetails: {
      enoughHeroes: hasValidHeroesQuantiy,
      enoughCards: hasEnoughCards,
    },
  };
};
