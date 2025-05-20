import React, { useMemo } from 'react';
import { useUnit } from 'effector-react';
import { CardComponent } from '@entities/card';
import { $cards, resizeCardHeight } from '@entities/card/model';
import { $cardOrder, reorderCards, COLS, ROW_HEIGHT, selectCardById, handleDelete, handleEdit, handleResize } from '../model';
import styles from './CardList.module.scss';
import { DndGrid } from '@features/dnd/ui/DndGrid';

const CardList = () => {
  const cards = useUnit($cards);
  const cardOrder = useUnit($cardOrder);

  const layout = useMemo(() => {
    let x = 0, y = 0;
    return cardOrder.map((id) => {
      const card = cards.find(c => c.id === id);
      const w = card?.width || 3;
      const h = card?.height || 1;
      if (x + w > COLS) {
        x = 0;
        y += h;
      }
      const item = { i: id, x, y, w, h };
      x += w;
      return item;
    });
  }, [cardOrder, cards]);

  const handleLayoutChange = (newLayout: any[]) => {
    const newOrder = [...newLayout]
      .sort((a, b) => (a.y - b.y) || (a.x - b.x))
      .map(item => item.i);
    reorderCards(newOrder);

    newLayout.forEach(item => {
      const card = cards.find(c => c.id === item.i);
      if (card) {
        if (card.width !== item.w) {
          handleResize(card.id, item.w);
        }
        if (card.height !== item.h) {
          resizeCardHeight({ cardId: card.id, height: item.h });
        }
      }
    });
  };

  const cardHeight = 8;
  const cardHeightPx = cardHeight * ROW_HEIGHT;

  return (
    <div className={styles['card-list']}>
      <DndGrid
        layout={layout}
        onLayoutChange={handleLayoutChange}
        cols={COLS}
        rowHeight={cardHeightPx}
        className={styles['card-list__grid']}
      >
        {cardOrder.map(id => {
          const card = selectCardById(cards, id);
          if (!card) return null;
          return (
            <div key={id} className={styles['card-list__item']}>
              <CardComponent
                {...card}
                height={8}
                onEdit={(title, content) => handleEdit(cards, id, title, content)}
                onDelete={() => handleDelete(id)}
                onResize={(width: number) => handleResize(id, width)}
              />
            </div>
          );
        })}
      </DndGrid>
    </div>
  );
};

export { CardList }; 