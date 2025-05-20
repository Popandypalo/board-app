import { createStore, createEvent, sample } from 'effector';
import type { Card } from './types';

export const addCard = createEvent<Card>();
export const removeCard = createEvent<string>();
export const updateCard = createEvent<Card>();
export const moveCard = createEvent<{ cardId: string; parentId: string | null }>();
export const resizeCard = createEvent<{ cardId: string; width: number }>();
export const resizeCardHeight = createEvent<{ cardId: string; height: number }>();

export const $cards = createStore<Card[]>([]) 

sample({
  clock: addCard,
  source: $cards,
  fn: (cards, card) => [...cards, { ...card, height: card.height }],
  target: $cards,
});

sample({
  clock: removeCard,
  source: $cards,
  fn: (cards, cardId) => cards.filter(card => card.id !== cardId),
  target: $cards,
});

sample({
  clock: updateCard,
  source: $cards,
  fn: (cards, updatedCard) =>
    cards.map(card => (card.id === updatedCard.id ? updatedCard : card)),
  target: $cards,
});

sample({
  clock: moveCard,
  source: $cards,
  fn: (cards, { cardId, parentId }) =>
    cards.map(card => (card.id === cardId ? { ...card, parentId } : card)),
  target: $cards,
});

sample({
  clock: resizeCard,
  source: $cards,
  fn: (cards, { cardId, width }) => {
    const updated = cards.map(card => (card.id === cardId ? { ...card, width } : card));
    return updated;
  },
  target: $cards,
});

sample({
  clock: resizeCardHeight,
  source: $cards,
  fn: (cards, { cardId, height }) =>
    cards.map(card => (card.id === cardId ? { ...card, height } : card)),
  target: $cards,
}); 