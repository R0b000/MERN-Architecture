import { ReactNode } from 'react';

export interface CollapsePanelProps {
  header: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export interface CollapseProps {
  children: ReactNode;
  accordion?: boolean;
  className?: string;
}
