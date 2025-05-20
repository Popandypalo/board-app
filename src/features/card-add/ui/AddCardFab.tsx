import React from 'react';
import styles from './add-card-fab.module.scss';
import { FiPlus } from 'react-icons/fi';
import { addCardWithId } from '@features/card-list/model';

export const AddCardFab: React.FC = () => {
  const handleAdd = () => {
    addCardWithId({
      title: 'Новая карточка',
      content: 'Содержимое карточки',
      width: 3,
      parentId: null,
    });
  };

  return (
    <button
      className={styles['add-card-fab']}
      onClick={handleAdd}
      aria-label="Добавить карточку"
      type="button"
    >
      <FiPlus size={28} className={styles['add-card-fab__icon']} />
    </button>
  );
}; 