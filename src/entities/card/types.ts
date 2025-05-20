export interface Card {
  id: string;
  title: string;
  content: string;
  width: number;
  parentId: string | null;
  height?: number;
}

export interface CardProps extends Card {
  onEdit?: (title: string, content: string) => void;
  onDelete?: () => void;
  onResize?: (width: number) => void;
  isOverlay?: boolean;
  forwardedRef?: React.Ref<HTMLDivElement>;
  overlayWidth?: number;
  height?: number;
  onHeightChange?: (h: number, pxHeight?: number) => void;
} 