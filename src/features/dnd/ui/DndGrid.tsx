import React from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import styles from './DndGrid.module.scss';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL) as React.ComponentType<any>;

interface DndGridProps {
  layout: Layout[];
  onLayoutChange: (layout: Layout[]) => void;
  children: React.ReactNode;
  cols?: number;
  rowHeight?: number;
  width?: number;
  className?: string;
}

export const DndGrid: React.FC<DndGridProps> = ({
  layout,
  onLayoutChange,
  children,
  cols = 12,
  rowHeight = 40,
  className = '',
}) => {
  return (
    <ReactGridLayout
      className={styles['dnd-grid__container'] + (className ? ' ' + className : '')}
      layout={layout}
      cols={cols}
      rowHeight={rowHeight}
      onLayoutChange={onLayoutChange}
      isResizable={false}
      draggableCancel=".no-drag"
    >
      {children}
    </ReactGridLayout>
  );
}; 

// наверное надо было юзать dnd-kit