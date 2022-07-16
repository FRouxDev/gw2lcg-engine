import type { Card } from '../models/card';

export const shuffle = (deck: Card[]) => deck.sort(() => 0.5 - Math.random());
