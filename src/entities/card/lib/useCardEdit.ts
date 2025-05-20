import { useState, useRef, useEffect } from 'react';

export function useCardEdit({ title, content }: { title: string, content: string }) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editBlockRef = useRef<HTMLDivElement>(null);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editMode && titleTextareaRef.current) {
      titleTextareaRef.current.style.height = 'auto';
      titleTextareaRef.current.style.height = titleTextareaRef.current.scrollHeight + 'px';
    }
  }, [editMode, editTitle]);

  useEffect(() => {
    if (editMode && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [editMode]);

  return {
    editMode,
    setEditMode,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    titleTextareaRef,
    editBlockRef,
    blurTimeout,
    textareaRef,
    titleInputRef
  };
} 