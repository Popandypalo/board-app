import React from 'react';

import { DeleteCardButton } from '@features/card-delete';
import { EditCardButton } from '@features/card-edit';
import { CardTextarea } from '@entities/card/ui/card-textarea/CardTextarea';

import styles from './CardHeader.module.scss';

interface CardHeaderProps {
  editMode: boolean;
  editTitle: string;
  setEditTitle: (v: string) => void;
  handleEditSave: () => void;
  handleEditCancel: () => void;
  handleEditClick: (e: React.MouseEvent) => void;
  onEdit?: (title: string, content: string) => void;
  onDelete?: () => void;
  title: string;
  titleInputRef: React.RefObject<HTMLTextAreaElement>;
  editBlockRef: React.RefObject<HTMLDivElement>;
  handleEditBlockBlur: (e: React.FocusEvent) => void;
  handleEditBlockFocus: () => void;
  resizeControl?: React.ReactNode;
  cardId: string;
  width: number;
}

export const CardHeader = ({
  editMode,
  editTitle,
  setEditTitle,
  handleEditSave,
  handleEditCancel,
  handleEditClick,
  onEdit,
  onDelete,
  title,
  titleInputRef,
  editBlockRef,
  handleEditBlockBlur,
  handleEditBlockFocus,
  resizeControl,
  cardId,
  width
}: CardHeaderProps) => (
  <div className={[
    styles['card-header'],
    width <= 2 ? styles['card-header--vertical'] : ''
  ].join(' ')}>
    {editMode ? (
      <div
        ref={editBlockRef}
        tabIndex={-1}
        onBlur={handleEditBlockBlur}
        onFocus={handleEditBlockFocus}
        className={styles['card-header__edit']}
      >
        <CardTextarea
          ref={titleInputRef}
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleEditSave();
            } else if (e.key === 'Escape') {
              handleEditCancel();
            }
          }}
          maxLength={120}
          autoFocus
          className={styles['card-header__textarea']}
          rows={1}
          autoGrow={false}
        />
        <div className={styles['card-header__spacer']} />
      </div>
    ) : (
      <h3 className={styles['card-header__title']} title={title}>{title}</h3>
    )}
    {width <= 2 ? (
      <div className={styles['card-header__actions--bottom']}>
        <div className={styles['card-header__actions']}>
          {onEdit && (
            <EditCardButton onClick={handleEditClick} />
          )}
          {onDelete && (
            <DeleteCardButton cardId={cardId} />
          )}
          {resizeControl}
        </div>
      </div>
    ) : (
      <div className={styles['card-header__actions']}>
        {onEdit && (
          <EditCardButton onClick={handleEditClick} />
        )}
        {onDelete && (
          <DeleteCardButton cardId={cardId} />
        )}
        {resizeControl}
      </div>
    )}
  </div>
); 