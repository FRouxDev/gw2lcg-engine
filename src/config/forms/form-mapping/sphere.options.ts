import type { SphereOption } from './form.mapping.type';
import { Sphere } from '@/game/models/types/sphere.type';

export const sphereOptions: SphereOption[] = [
  {
    value: Sphere.LEADERSHIP,
    label: 'Leadership',
  },
  {
    value: Sphere.LORE,
    label: 'Lore',
  },
  {
    value: Sphere.SPIRIT,
    label: 'Spirit',
  },
  {
    value: Sphere.TACTICS,
    label: 'Tactics',
  },
  {
    value: Sphere.NEUTRAL,
    label: 'Neutral',
  },
];
