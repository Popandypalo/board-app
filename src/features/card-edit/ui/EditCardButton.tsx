import React from 'react';
import styles from './EditCardButton.module.scss';

interface EditCardButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export const EditCardButton: React.FC<EditCardButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles['edit-card-button'] + ' no-drag'}
      onClick={onClick}
      aria-label="Редактировать карточку"
      title="Редактировать карточку"
      type="button"
    >
      <span className={styles['edit-card-button__icon']}>✏️</span>
    </button>
  );
}; 