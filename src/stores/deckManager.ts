import { isDeckValid, canAddCardToDeck } from '@/game/data/deckbuilding/deckbuilding.rules';
import type { PlayerCard } from '@/game/models/card';
import type { CardSet } from '@/game/models/cardSet';
import type { DeckEntry } from '@/game/models/types/decks/deckEntry.type';
import cardsUtilsService from '@/services/cardsUtils.service';
import httpRequestService from '@/services/httpRequest.service';
import { defineStore } from 'pinia';

export const useDeckManagerStore = defineStore({
  id: 'deck-manager',
  state: () => ({
    deckList: [] as DeckEntry[],
    cardsData: [] as PlayerCard[],
    cardsSets: [] as CardSet[],
  }),
  getters: {
    isDecklistValid: (state) => {
      return isDeckValid(state.deckList);
    },
    sortedDeckList: (state) => {
      const currentDeckList = [...state.deckList];
      return currentDeckList.sort((deckEntry1: DeckEntry, deckEntry2: DeckEntry) => {
        return cardsUtilsService.sorter(deckEntry1.card, deckEntry2.card);
      });
    },
  },
  actions: {
    async loadCardsData() {
      try {
        const { cards } = await httpRequestService.get('cards/player');
        const { sets } = await httpRequestService.get('sets');
        this.cardsData = cards;
        this.cardsSets = sets;
      } catch (e) {
        throw new Error('Error while retrieving player cards data');
      }
    },
    addCardToDeck(uuid: string) {
      const playerCard = this.cardsData.find((card) => card.uuid === uuid);
      if (playerCard) {
        const deckHasCard = this.deckList.find((entry: DeckEntry) => entry.card.uuid === playerCard.uuid);
        if (deckHasCard) {
          deckHasCard.quantity += 1;
        } else {
          this.deckList.push({
            deck: 'Current deck',
            card: playerCard,
            quantity: 1,
          });
        }
      }
    },
    removeCardFromDeck(deckEntry: DeckEntry) {
      deckEntry.quantity--;
      if (deckEntry.quantity <= 0) {
        const entryPosition = this.deckList.findIndex((entry) => entry.card.uuid === deckEntry.card.uuid);
        this.deckList.splice(entryPosition, 1);
      }
    },
    canAddCard(card: PlayerCard) {
      console.log(this.deckList);
      return canAddCardToDeck(card, this.deckList).check;
    },
  },
});
