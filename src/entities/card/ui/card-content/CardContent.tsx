import React from 'react';
import styles from './CardContent.module.scss';
import { CardTextarea } from '@entities/card/ui/card-textarea/CardTextarea';

interface CardContentProps {
  editMode: boolean;
  editContent: string;
  setEditContent?: (v: string) => void;
  handleEditSave: () => void;
  handleEditCancel: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleEditBlockBlur: (e: React.FocusEvent) => void;
  handleEditBlockFocus: () => void;
  content: string;
  contentRef: React.RefObject<HTMLDivElement>;
  width: number;
}

export const CardContent = ({
  editMode,
  editContent,
  setEditContent,
  handleEditSave,
  handleEditCancel,
  textareaRef,
  handleEditBlockBlur,
  handleEditBlockFocus,
  content,
  contentRef,
  width
}: CardContentProps) => (
  <div
    className={[
      styles['card-content'],
      width ? styles[`card-content--col-${width}`] : ''
    ].join(' ')}
    ref={contentRef}
  >
    {editMode ? (
      <CardTextarea
        ref={textareaRef}
        value={editContent}
        onChange={e => setEditContent && setEditContent(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleEditSave();
          } else if (e.key === 'Escape') {
            handleEditCancel();
          }
        }}
        autoFocus
        className={styles['card-content__textarea']}
        minRows={8}
        rows={5}
        maxLength={800}
        onBlur={handleEditBlockBlur}
        onFocus={handleEditBlockFocus}
        autoGrow={false}
        style={{ resize: 'none' }}
      />
    ) : (
      <div className={styles['card-content__text']}>{content}</div>
    )}
  </div>
); 