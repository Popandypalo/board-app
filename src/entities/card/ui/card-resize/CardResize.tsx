import React from 'react';
import styles from '@entities/card/ui/Card.module.scss';

export const CardResize = ({ width, onResize }: { width: number, onResize: (w: number) => void }) => (
  <div className={styles.card__resize}>
    <select
      value={width}
      onChange={e => onResize(Number(e.target.value))}
      className={styles.card__select}
    >
      {Array.from({ length: 12 }, (_, i) => i + 1).map(w => (
        <option key={w} value={w}>
          {w} колонок
        </option>
      ))}
    </select>
  </div>
); 