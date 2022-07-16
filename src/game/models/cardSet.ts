export interface CardSet {
  name: string;
  type: string;
  cards: any[];
  uuid?: string;
}

export interface CardSetData {
  name: string;
  type: string;
  nbOfCards: number;
  uuid?: string;
}
