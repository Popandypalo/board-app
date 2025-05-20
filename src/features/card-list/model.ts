import { createEvent, createStore, sample } from 'effector';
import { addCard, removeCard, resizeCard, updateCard } from '@entities/card/model';
import type { Card as CardType } from '@entities/card/types';
import type { Layout } from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';

export const COLS = 12;
export const ROW_HEIGHT = 40;
export const GRID_WIDTH = 1200;

export const reorderCards = createEvent<string[]>();

export const selectCardIds = (cards: CardType[]) => cards.map(card => card.id);
export const selectCardById = (cards: CardType[], id: string) => cards.find(card => card.id === id);

export const $cardOrder = createStore<string[]>([])
  .on(reorderCards, (_, newOrder) => newOrder);

export const addCardWithId = (card: Omit<CardType, 'id'>) => {
  const id = uuidv4();
  addCard({ ...card, id });
};

sample({
  clock: addCard,
  source: $cardOrder,
  fn: (order, card) => [...order, card.id],
  target: reorderCards,
});

sample({
  clock: removeCard,
  source: $cardOrder,
  fn: (order, cardId) => order.filter(id => id !== cardId),
  target: reorderCards,
});

export const handleDelete = (id: string) => removeCard(id);

export const handleEdit = (cards: CardType[], id: string, title: string, content: string) => {
  const card = selectCardById(cards, id);
  if (card) {
    updateCard({ ...card, title, content });
  }
};

export const handleResize = (cardId: string, width: number) => resizeCard({ cardId, width });

export const handleLayoutChange = (newLayout: Layout[], reorder: (ids: string[]) => void) => {
  const sorted = [...newLayout].sort((a, b) => (a.y - b.y) || (a.x - b.x));
  const newOrder = sorted.map(item => item.i);
  reorder(newOrder);
};