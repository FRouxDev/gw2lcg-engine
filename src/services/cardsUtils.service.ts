import type { PlayerCard } from '@/game/models/card';
import { CardType } from '@/game/models/types/cardType.type';
import { Sphere } from '@/game/models/types/sphere.type';

const typesOrder = {
  [CardType.HERO]: 4,
  [CardType.ALLY]: 3,
  [CardType.ATTACHMENT]: 2,
  [CardType.EVENT]: 1,
};

const spheresOrder = {
  [Sphere.LEADERSHIP]: 5,
  [Sphere.TACTICS]: 4,
  [Sphere.SPIRIT]: 3,
  [Sphere.LORE]: 2,
  [Sphere.NEUTRAL]: 1,
};

class CardsService {
  sorter(card1: PlayerCard, card2: PlayerCard): number {
    if (card1.type !== card2.type) {
      return typesOrder[card1.type as keyof typeof typesOrder] > typesOrder[card2.type as keyof typeof typesOrder]
        ? -1
        : 1;
    }
    if (card1.sphere !== card2.sphere) {
      return spheresOrder[card1.sphere as keyof typeof spheresOrder] >
        spheresOrder[card2.sphere as keyof typeof spheresOrder]
        ? -1
        : 1;
    }
    return card1.name > card2.name ? -1 : 1;
  }
}

export default new CardsService();
