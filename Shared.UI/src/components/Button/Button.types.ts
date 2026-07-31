import { ReactNode } from 'react';

export type ButtonType = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  block?: boolean;
}
