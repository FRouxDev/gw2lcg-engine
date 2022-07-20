import Gw2Checkbox from '@/components/forms/Gw2Checkbox.vue';
import Gw2KeywordsInput from '@/components/forms/Gw2KeywordsInput.vue';
import Gw2NumberInput from '@/components/forms/Gw2NumberInput.vue';
import Gw2Select from '@/components/forms/Gw2Select.vue';
import Gw2Textarea from '@/components/forms/Gw2Textarea.vue';
import Gw2TextInput from '@/components/forms/Gw2TextInput.vue';
import type { FormMapping } from './form.mapping.type';
import { sphereOptions } from './sphere.options';
import { typeOptions } from './types.options';

export const cardForm: FormMapping = {
  name: {
    component: Gw2TextInput,
    label: 'Card name',
  },
  set: {
    component: Gw2Select,
    label: 'Card set',
    options: [],
  },
  type: {
    component: Gw2Select,
    label: 'Card type',
    options: typeOptions,
  },
  traits: {
    component: Gw2KeywordsInput,
    label: 'Traits',
    options: [],
  },
  cardNumber: {
    component: Gw2NumberInput,
    label: 'Card number',
    minNum: 1,
    maxNum: 255,
  },
};

export const heroForm: FormMapping = {
  ...cardForm,
  unique: {
    component: Gw2Checkbox,
    label: 'Unique',
  },
  sphere: {
    component: Gw2Select,
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: Gw2KeywordsInput,
    label: 'Keywords',
    options: [],
  },
  threat: {
    component: Gw2NumberInput,
    label: 'Threat',
    minNum: 0,
    maxNum: 25,
  },
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
  willpower: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  attack: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  defense: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  health: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
};

export const allyForm: FormMapping = {
  ...cardForm,
  unique: {
    component: Gw2Checkbox,
    label: 'Unique',
  },
  sphere: {
    component: Gw2Select,
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: Gw2KeywordsInput,
    label: 'Keywords',
    options: [],
  },
  cost: {
    component: Gw2NumberInput,
    label: 'Cost',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
  willpower: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  attack: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  defense: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  health: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
};

export const eventForm: FormMapping = {
  ...cardForm,
  sphere: {
    component: Gw2Select,
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: Gw2KeywordsInput,
    label: 'Keywords',
    options: [],
  },
  cost: {
    component: Gw2NumberInput,
    label: 'Cost',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
};

export const attachmentForm: FormMapping = {
  ...cardForm,
  unique: {
    component: Gw2Checkbox,
    label: 'Unique',
  },
  sphere: {
    component: Gw2Select,
    label: 'Sphere',
    options: sphereOptions,
  },
  keywords: {
    component: Gw2KeywordsInput,
    label: 'Keywords',
    options: [],
  },
  cost: {
    component: Gw2NumberInput,
    label: 'Cost',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
};

export const enemyForm: FormMapping = {
  ...cardForm,
  unique: {
    component: Gw2Checkbox,
    label: 'Unique',
  },
  keywords: {
    component: Gw2KeywordsInput,
    label: 'Keywords',
    options: [],
  },
  engagement: {
    component: Gw2NumberInput,
    label: 'Engagement',
    minNum: 0,
    maxNum: 50,
  },
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
  shadow: {
    component: Gw2Textarea,
    label: 'Shadow effect',
  },
  threat: {
    component: Gw2NumberInput,
    label: 'Threat',
    minNum: 0,
    maxNum: 25,
  },
  attack: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  defense: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  health: {
    component: Gw2NumberInput,
    label: 'Willpower',
    minNum: 0,
    maxNum: 25,
  },
  victoryPoints: {
    component: Gw2NumberInput,
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
  quantity: {
    component: Gw2NumberInput,
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
};

export const locationForm: FormMapping = {
  ...cardForm,
  unique: {
    component: Gw2Checkbox,
    label: 'Unique',
  },
  keywords: {
    component: Gw2KeywordsInput,
    label: 'Keywords',
    options: [],
  },
  questPoints: {
    component: Gw2NumberInput,
    label: 'Quest Points',
    minNum: 0,
    maxNum: 10,
  },
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
  shadow: {
    component: Gw2Textarea,
    label: 'Shadow effect',
  },
  threat: {
    component: Gw2NumberInput,
    label: 'Threat',
    minNum: 0,
    maxNum: 25,
  },
  victoryPoints: {
    component: Gw2NumberInput,
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
  quantity: {
    component: Gw2NumberInput,
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
};

export const treacheryForm: FormMapping = {
  ...cardForm,
  keywords: {
    component: Gw2KeywordsInput,
    label: 'Keywords',
    options: [],
  },
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
  shadow: {
    component: Gw2Textarea,
    label: 'Shadow effect',
  },
  quantity: {
    component: Gw2NumberInput,
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
};

export const questForm: FormMapping = {
  ...cardForm,
  text: {
    component: Gw2Textarea,
    label: 'Card text',
  },
  questPoints: {
    component: Gw2NumberInput,
    label: 'Quest Points',
    minNum: 0,
    maxNum: 10,
  },
  victoryPoints: {
    component: Gw2NumberInput,
    label: 'Victory Points',
    minNum: 0,
    maxNum: 25,
  },
};
