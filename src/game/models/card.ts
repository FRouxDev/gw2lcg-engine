import type { CardSet } from './cardSet';
import type { CardType } from './types/cardType.type';
import type { Sphere } from './types/sphere.type';
export interface Card {
  uuid?: string;
  name: string;
  set: CardSet;
  traits: string[];
  cardNumber?: number;
  cardImage?: string;
  type: CardType;
}

export interface Hero extends Card {
  unique: boolean;
  sphere: Sphere;
  keywords: string[];
  threat: number;
  text?: string;
  willpower: number;
  attack: number;
  defense: number;
  health: number;
}

export interface Ally extends Card {
  unique: boolean;
  sphere: Sphere;
  keywords: string[];
  cost: number;
  text: string;
  willpower: number;
  attack: number;
  defense: number;
  health: number;
}

export interface Event extends Card {
  sphere: Sphere;
  keywords: string[];
  cost: number;
  text: string;
}

export interface Attachment extends Card {
  unique: boolean;
  sphere: Sphere;
  keywords: string[];
  cost: number;
  text: string;
}

export interface Enemy extends Card {
  unique: boolean;
  keywords: string[];
  engagement: number;
  text: string;
  shadow: string;
  threat: number;
  attack: number;
  defense: number;
  health: number;
  victoryPoints?: number;
  quantity: number;
}

export interface Location extends Card {
  unique: boolean;
  keywords: string[];
  questPoints: number;
  text: string;
  shadow: string;
  threat: number;
  victoryPoints?: number;
  quantity: number;
}

export interface Treachery extends Card {
  keywords: string[];
  text: string;
  shadow: string;
  quantity: number;
}

export interface Quest extends Card {
  text: string;
  sideText: string;
  sideCardImage?: string;
  questPoints: number;
  victoryPoints?: number;
}

export interface CardWithUuid {
  uuid: string;
  name: string;
  set: CardSet;
  traits: string[];
  cardNumber?: number;
  cardImage?: string;
  type: CardType;
}

export type PlayerCard = (Hero | Ally | Attachment | Event) & CardWithUuid;
