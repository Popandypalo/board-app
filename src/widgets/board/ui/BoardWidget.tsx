import React from 'react';
import { CardList } from '@features/card-list/ui/CardList';
import styles from './BoardWidget.module.scss';

export const BoardWidget = () => {
  return (
    <div className={styles.board}>
      <h1 className={styles.title}>Доска</h1>
      <CardList />
    </div>
  );
}; 