import React from 'react';
import styles from './DeleteCardButton.module.scss';
import { removeCard } from '@entities/card/model';

interface DeleteCardButtonProps {
  cardId: string;
}

export const DeleteCardButton: React.FC<DeleteCardButtonProps> = ({ cardId }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeCard(cardId);
  };

  return (
    <button
      className={styles['delete-card-button'] + ' no-drag'}
      onClick={handleDelete}
      aria-label="Удалить карточку"
      title="Удалить карточку"
      type="button"
    >
      <span className={styles['delete-card-button__icon']}>×</span>
    </button>
  );
}; 