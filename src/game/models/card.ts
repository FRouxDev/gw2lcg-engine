import type { CardSet } from './cardSet';
import type { Sphere } from './types/sphere.type';
export interface Card {
  uuid?: string; // Auto-généré
  name: string; // Input field
  set: CardSet; // Select
  traits: string[]; // Nuage de mots
  cardNumber?: number; // Input field small
  type: string; // Select
}

export interface Hero extends Card {
  unique: boolean; // Checkbox
  sphere: Sphere; // Select
  keywords: string[]; // Nuage de mots
  threat: number; // Select number
  text?: string; // Textarea
  willpower: number; // Select number
  attack: number; // Select number
  defense: number; // Select number
  health: number; // Select number
}

export interface Ally extends Card {
  unique: boolean; // Checkbox
  sphere: Sphere; // Select
  keywords: string[]; // Nuage de mots
  cost: number; // Select number
  text: string; // Textarea
  willpower: number; // Select number
  attack: number; // Select number
  defense: number; // Select number
  health: number; // Select number
}

export interface Event extends Card {
  sphere: Sphere; // Select
  keywords: string[]; // Nuage de mots
  cost: number; // Select number
  text: string; // Textarea
}

export interface Attachment extends Card {
  unique: boolean; // Checkbox
  sphere: Sphere; // Select
  keywords: string[]; // Nuage de mots
  cost: number; // Select number
  text: string; // Textarea
}

export interface Enemy extends Card {
  unique: boolean; // Checkbox
  keywords: string[]; // Nuage de mots
  engagement: number; // Select number
  text: string; // Textarea
  shadow: string; // Textarea
  threat: number; // Select number
  attack: number; // Select number
  defense: number; // Select number
  health: number; // Select number
  victoryPoints?: number; // Select number
  quantity: number; // Select number
}

export interface Location extends Card {
  unique: boolean; // Checkbox
  keywords: string[]; // Nuage de mots
  questPoints: number; // Select number
  text: string; // Textarea
  shadow: string; // Textarea
  threat: number; // Select number
  victoryPoints?: number; // Select number
  quantity: number; // Select number
}

export interface Treachery extends Card {
  keywords: string[]; // Nuage de mots
  text: string; // Textarea
  shadow: string; // Textarea
  quantity: number; // Select number
}

export interface Quest extends Card {
  text: string; // Textarea
  questPoints: number; // Select number
  victoryPoints?: number; // Select number
}
