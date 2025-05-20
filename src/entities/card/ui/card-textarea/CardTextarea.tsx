import React, { useRef, useEffect, forwardRef } from 'react';
import styles from './CardTextarea.module.scss';

interface CardTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  minRows?: number;
  rows?: number;
  style?: React.CSSProperties;
  autoGrow?: boolean;
}

export const CardTextarea = forwardRef<HTMLTextAreaElement, CardTextareaProps>(({
  value,
  onChange,
  placeholder,
  maxLength,
  autoFocus,
  className = '',
  onKeyDown,
  onBlur,
  onFocus,
  minRows = 1,
  rows,
  style = {},
  autoGrow = true,
}, ref) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || innerRef;

  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value, autoGrow, textareaRef]);

  return (
    <textarea
      ref={textareaRef}
      className={`${styles.cardTextarea} ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
      rows={rows ?? minRows}
      style={{ ...style, resize: 'none', overflow: 'hidden' }}
    />
  );
});