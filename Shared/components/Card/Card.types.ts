import { ReactNode } from 'react';

export interface CardProps {
  title?: ReactNode;
  extra?: ReactNode;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  hoverable?: boolean;
}
