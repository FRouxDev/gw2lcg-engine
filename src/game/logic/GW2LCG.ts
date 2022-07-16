import { shuffle } from '../utils/shuffleDeck';
import { v4 as uuid } from 'uuid';
import type { Card } from '../models/card';
import type { DeckList, CardEntry } from '../models/deckList';
import { GW2Cards } from '../data/cardList';

class Player {
  playerName: string;
  deck: DeckList;
  playerId: string;
  hand: Card[];
  playerDeck: Card[];
  discardPile: Card[];
  threat: number | null;

  constructor(playerName: string, deckList: DeckList) {
    this.playerName = playerName;
    this.deck = deckList;
    this.playerId = uuid();
    this.hand = [];
    this.playerDeck = [];
    this.discardPile = [];
    this.threat = null;
  }

  getPlayerId() {
    return this.playerId;
  }

  setup() {
    this.playerDeck = this.buildDeck(this.deck);
    this.drawCards(7);
  }

  buildDeck(deck: DeckList) {
    return deck.cards.reduce((currentDeck: Card[], cardEntry: CardEntry) => {
      const card: Card = GW2Cards.find((c) => {
        return c.id === cardEntry.cardId;
      }) as Card;

      for (let i = 0; i < cardEntry.quantity; i++) {
        currentDeck.push(card);
      }
      return currentDeck;
    }, []);
  }

  shuffleDeck(): void {
    this.playerDeck = shuffle(this.playerDeck);
  }

  drawCards(number: number) {
    for (let i = 0; i < number; i++) {
      const card = this.playerDeck.pop();
      if (card) {
        this.hand.push(card);
      }
    }
  }
}

export class GW2LCG {
  players: Player[];

  constructor() {
    this.players = [];
  }

  addPlayer(playerName: string, deck: DeckList) {
    this.players.push(new Player(playerName, deck));
  }

  startGame() {
    this.players.forEach((player) => player.setup());
  }
}
