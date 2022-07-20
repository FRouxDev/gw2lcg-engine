import type { CardTypeOption } from './form.mapping.type';
import { CardType } from '@/game/models/types/cardType.type';

export const typeOptions: CardTypeOption[] = [
  {
    value: CardType.HERO,
    label: 'Hero',
  },
  {
    value: CardType.ALLY,
    label: 'Ally',
  },
  {
    value: CardType.EVENT,
    label: 'Event',
  },
  {
    value: CardType.ATTACHMENT,
    label: 'Attachment',
  },
  {
    value: CardType.ENEMY,
    label: 'Enemy',
  },
  {
    value: CardType.LOCATION,
    label: 'Location',
  },
  {
    value: CardType.TREACHERY,
    label: 'Treachery',
  },
  {
    value: CardType.QUEST,
    label: 'Quest',
  },
];
