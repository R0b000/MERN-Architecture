import { ReactNode } from 'react';

export interface FormItemProps {
  label?: string;
  children: ReactNode;
  error?: string;
  className?: string;
}

export interface FormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  layout?: 'horizontal' | 'vertical';
}
