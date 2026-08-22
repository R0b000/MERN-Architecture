import { ReactNode } from 'react';

export interface CarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
}
