import React, { useRef } from 'react';
import type { CardProps } from '@entities/card/types';
import styles from './Card.module.scss';
import { CardHeader } from './card-header/CardHeader';
import { CardContent } from './card-content/CardContent';
import { CardResize } from './card-resize/CardResize';
import { useCardEdit } from '@entities/card/lib/useCardEdit';
import { ROW_HEIGHT } from '@features/card-list/model';

function useCardHandlers({
  title,
  content,
  onEdit,
  edit,
}: any) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    edit.setEditMode(true);
    setTimeout(() => {
      if (edit.titleTextareaRef.current) {
        edit.titleTextareaRef.current.focus();
        const len = edit.titleTextareaRef.current.value.length;
        edit.titleTextareaRef.current.setSelectionRange(len, len);
      }
    }, 0);
  };

  const handleEditSave = () => {
    if (onEdit && (edit.editTitle !== title || edit.editContent !== content)) {
      onEdit(edit.editTitle, edit.editContent);
    }
    edit.setEditMode(false);
  };

  const handleEditCancel = () => {
    edit.setEditTitle(title);
    edit.setEditContent(content);
    edit.setEditMode(false);
  };

  const handleEditBlockBlur = (e: React.FocusEvent) => {
    edit.blurTimeout.current = setTimeout(() => {
      if (!edit.editBlockRef.current?.contains(document.activeElement)) {
        handleEditSave();
      }
    }, 0);
  };
  const handleEditBlockFocus = () => {
    if (edit.blurTimeout.current) clearTimeout(edit.blurTimeout.current);
  };

  return {
    handleEditClick,
    handleEditSave,
    handleEditCancel,
    handleEditBlockBlur,
    handleEditBlockFocus,
  };
}

export const Card = ({
  id,
  title,
  content,
  width,
  onEdit,
  onDelete,
  onResize,
  height = 4,
}: CardProps) => {
  const edit = useCardEdit({ title, content });
  const cardRef = useRef<HTMLDivElement>(null);
  const contentDivRef = useRef<HTMLDivElement>(null);

  const handlers = useCardHandlers({
    title,
    content,
    onEdit,
    edit,
    onDelete,
    onResize,
    height,
    contentDivRef,
  });

  return (
    <div
      ref={cardRef}
      className={[
        styles.card,
        styles[`card--col-${width}`]
      ].join(' ')}
      style={{
        gridColumn: `span ${width}`,
        boxSizing: 'border-box',
        height: height ? height * ROW_HEIGHT : undefined,
      }}
    >
      <CardHeader
        editMode={edit.editMode}
        editTitle={edit.editTitle}
        setEditTitle={edit.setEditTitle}
        handleEditSave={handlers.handleEditSave}
        handleEditCancel={handlers.handleEditCancel}
        handleEditClick={handlers.handleEditClick}
        onEdit={onEdit}
        onDelete={onDelete}
        title={title}
        titleInputRef={edit.titleInputRef}
        editBlockRef={edit.editBlockRef}
        handleEditBlockBlur={handlers.handleEditBlockBlur}
        handleEditBlockFocus={handlers.handleEditBlockFocus}
        cardId={id}
        width={width}
      />
      <CardContent
        editMode={edit.editMode}
        editContent={edit.editContent}
        setEditContent={edit.setEditContent}
        handleEditSave={handlers.handleEditSave}
        handleEditCancel={handlers.handleEditCancel}
        textareaRef={edit.textareaRef}
        handleEditBlockBlur={handlers.handleEditBlockBlur}
        handleEditBlockFocus={handlers.handleEditBlockFocus}
        content={content}
        contentRef={contentDivRef}
        width={width}
      />
      {onResize && (
        <div className={styles['card__resize']}>
          <CardResize width={width} onResize={onResize} />
        </div>
      )}
    </div>
  );
}; 