import { ReactNode } from 'react';

export interface MenuItemProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

export interface SubMenuProps {
  title: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface MenuProps {
  children: ReactNode;
  mode?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
  selectedKeys?: string[];
}
