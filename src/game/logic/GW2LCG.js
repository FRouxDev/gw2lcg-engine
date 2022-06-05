import { shuffle } from "../utils/shuffleDeck";
import { v4 as uuid } from "uuid";

export class Player {
  
  constructor(playerName, deck) {
    this.playerName = playerName;
    this.deck = deck;
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
    this.playerDeck = shuffle(this.deck);
    this.drawCards(7);
  }

  shuffleDeck() {
    this.playerDeck = shuffle(this.playerDeck);
  }

  drawCards(number) {
    for(let i = 0; i < number; i++) {
      const card = this.deck.pop();
      if (card) {
        this.hand.push(card);
      }        
    }
  }
}


export class GW2LCG {
  
  constructor() { 
    this.players = [];
  }

  addPlayer(playerName, deck) {
    this.players.push(new Player(playerName, deck));
  }

  startGame() {
    this.players.forEach(player => player.setup());
  }


};
