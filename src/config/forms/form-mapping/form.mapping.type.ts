import type { Component } from 'vue';
import type { CardSet } from '@/game/models/cardSet';
import type { CardType } from '@/game/models/types/cardType.type';
import type { Sphere } from '@/game/models/types/sphere.type';

export interface CardSetOption {
  value: string;
  label: CardSet['name'];
}

export interface SphereOption {
  value: Sphere;
  label: string;
}

export interface CardTypeOption {
  value: CardType;
  label: string;
}

export interface KeywordOption {
  value: string;
  label: string;
}

export interface InputMapping {
  component: Component;
  options?: CardSetOption[] | SphereOption[] | CardTypeOption[] | KeywordOption[];
  minNum?: number;
  maxNum?: number;
  label?: string;
}

export interface SetMapping {
  options: CardSetOption[];
}

export interface FormMapping {
  name: InputMapping;
  set: InputMapping & SetMapping;
  traits: InputMapping;
  cardNumber: InputMapping;
  type: InputMapping;
  cardImage: InputMapping;
  unique?: InputMapping;
  sphere?: InputMapping;
  keywords?: InputMapping;
  threat?: InputMapping;
  text?: InputMapping;
  willpower?: InputMapping;
  attack?: InputMapping;
  defense?: InputMapping;
  health?: InputMapping;
  cost?: InputMapping;
  engagement?: InputMapping;
  shadow?: InputMapping;
  questPoints?: InputMapping;
  victoryPoints?: InputMapping;
  quantity?: InputMapping;
}
