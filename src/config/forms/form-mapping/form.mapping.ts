import Gw2Checkbox from '@/components/forms/Gw2Checkbox.vue';
import Gw2ImageInput from '@/components/forms/Gw2GenericFileInput.vue';
import Gw2KeywordsInput from '@/components/forms/Gw2KeywordsInput.vue';
import Gw2NumberInput from '@/components/forms/Gw2NumberInput.vue';
import Gw2Select from '@/components/forms/Gw2Select.vue';
import Gw2Textarea from '@/components/forms/Gw2Textarea.vue';
import Gw2TextInput from '@/components/forms/Gw2TextInput.vue';
import { shallowRef } from 'vue';
import type { CardSetOption, FormMapping, KeywordOption } from './form.mapping.type';
import { sphereOptions } from './sphere.options';
import { typeOptions } from './types.options';

export const cardForm: FormMapping = {
  name: {
    component: shallowRef(Gw2TextInput),
    label: 'Card name',
  },
  set: {
    component: shallowRef(Gw2Select),
    label: 'Card set',
    options: [] as CardSetOption[],
  },
  type: {
    component: shallowRef(Gw2Select),
    label: 'Card type',
    options: typeOptions,
  },
  traits: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Traits',
    options: [] as KeywordOption[],
  },
  cardNumber: {
    component: shallowRef(Gw2NumberInput),
    label: 'Card number',
    minNum: 1,
    maxNum: 255,
  },
  cardImage: {
    component: shallowRef(Gw2ImageInput),
    label: 'Card picture',
  },
};

export const heroForm: FormMapping = {
  ...cardForm,
  unique: {
    component: shallowRef(Gw2Checkbox),
    label: 'Unique',
  },
  sphere: {
    component: shallowRef(Gw2Select),
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Keywords',
    options: [] as KeywordOption[],
  },
  threat: {
    component: shallowRef(Gw2NumberInput),
    label: 'Threat',
    minNum: 0,
    maxNum: 25,
  },
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
  willpower: {
    component: shallowRef(Gw2NumberInput),
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  attack: {
    component: shallowRef(Gw2NumberInput),
    label: 'Attack',
    minNum: 0,
    maxNum: 25,
  },
  defense: {
    component: shallowRef(Gw2NumberInput),
    label: 'Defense',
    minNum: 0,
    maxNum: 25,
  },
  health: {
    component: shallowRef(Gw2NumberInput),
    label: 'Health',
    minNum: 0,
    maxNum: 25,
  },
};

export const allyForm: FormMapping = {
  ...cardForm,
  unique: {
    component: shallowRef(Gw2Checkbox),
    label: 'Unique',
  },
  sphere: {
    component: shallowRef(Gw2Select),
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Keywords',
    options: [],
  },
  cost: {
    component: shallowRef(Gw2NumberInput),
    label: 'Cost',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
  willpower: {
    component: shallowRef(Gw2NumberInput),
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  attack: {
    component: shallowRef(Gw2NumberInput),
    label: 'Attack',
    minNum: 0,
    maxNum: 25,
  },
  defense: {
    component: shallowRef(Gw2NumberInput),
    label: 'Defense',
    minNum: 0,
    maxNum: 25,
  },
  health: {
    component: shallowRef(Gw2NumberInput),
    label: 'Health',
    minNum: 0,
    maxNum: 25,
  },
};

export const eventForm: FormMapping = {
  ...cardForm,
  sphere: {
    component: shallowRef(Gw2Select),
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Keywords',
    options: [] as KeywordOption[],
  },
  cost: {
    component: shallowRef(Gw2NumberInput),
    label: 'Cost',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
};

export const attachmentForm: FormMapping = {
  ...cardForm,
  unique: {
    component: shallowRef(Gw2Checkbox),
    label: 'Unique',
  },
  sphere: {
    component: shallowRef(Gw2Select),
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Keywords',
    options: [] as KeywordOption[],
  },
  cost: {
    component: shallowRef(Gw2NumberInput),
    label: 'Cost',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
};

export const enemyForm: FormMapping = {
  ...cardForm,
  unique: {
    component: shallowRef(Gw2Checkbox),
    label: 'Unique',
  },
  keywords: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Keywords',
    options: [] as KeywordOption[],
  },
  engagement: {
    component: shallowRef(Gw2NumberInput),
    label: 'Engagement',
    minNum: 0,
    maxNum: 50,
  },
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
  shadow: {
    component: shallowRef(Gw2Textarea),
    label: 'Shadow effect',
  },
  threat: {
    component: shallowRef(Gw2NumberInput),
    label: 'Threat',
    minNum: 0,
    maxNum: 25,
  },
  attack: {
    component: shallowRef(Gw2NumberInput),
    label: 'Attack',
    minNum: 0,
    maxNum: 25,
  },
  defense: {
    component: shallowRef(Gw2NumberInput),
    label: 'Defense',
    minNum: 0,
    maxNum: 25,
  },
  health: {
    component: shallowRef(Gw2NumberInput),
    label: 'Health',
    minNum: 0,
    maxNum: 25,
  },
  victoryPoints: {
    component: shallowRef(Gw2NumberInput),
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
  quantity: {
    component: shallowRef(Gw2NumberInput),
    label: 'Quantity',
    minNum: 0,
    maxNum: 25,
  },
};

export const locationForm: FormMapping = {
  ...cardForm,
  unique: {
    component: shallowRef(Gw2Checkbox),
    label: 'Unique',
  },
  keywords: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Keywords',
    options: [] as KeywordOption[],
  },
  questPoints: {
    component: shallowRef(Gw2NumberInput),
    label: 'Quest Points',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
  shadow: {
    component: shallowRef(Gw2Textarea),
    label: 'Shadow effect',
  },
  threat: {
    component: shallowRef(Gw2NumberInput),
    label: 'Threat',
    minNum: 0,
    maxNum: 25,
  },
  victoryPoints: {
    component: shallowRef(Gw2NumberInput),
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
  quantity: {
    component: shallowRef(Gw2NumberInput),
    label: 'Quantity',
    minNum: 0,
    maxNum: 25,
  },
};

export const treacheryForm: FormMapping = {
  ...cardForm,
  keywords: {
    component: shallowRef(Gw2KeywordsInput),
    label: 'Keywords',
    options: [] as KeywordOption[],
  },
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
  shadow: {
    component: shallowRef(Gw2Textarea),
    label: 'Shadow effect',
  },
  quantity: {
    component: shallowRef(Gw2NumberInput),
    label: 'Quantity',
    minNum: 0,
    maxNum: 25,
  },
};

export const questForm: FormMapping = {
  ...cardForm,
  text: {
    component: shallowRef(Gw2Textarea),
    label: 'Card text',
  },
  questPoints: {
    component: shallowRef(Gw2NumberInput),
    label: 'Quest Points',
    minNum: 0,
    maxNum: 10,
  },
  victoryPoints: {
    component: shallowRef(Gw2NumberInput),
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
};
