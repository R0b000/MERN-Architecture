import { ReactNode } from 'react';

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number;
}
