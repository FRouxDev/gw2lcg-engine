import {
  allyForm,
  attachmentForm,
  cardForm,
  enemyForm,
  eventForm,
  heroForm,
  locationForm,
  questForm,
  treacheryForm,
} from './form.mapping';

export const FORM_MAP = {
  Card: cardForm,
  Hero: heroForm,
  Ally: allyForm,
  Event: eventForm,
  Attachment: attachmentForm,
  Enemy: enemyForm,
  Location: locationForm,
  Treachery: treacheryForm,
  Quest: questForm,
};
