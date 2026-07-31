import { ReactNode } from 'react';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onOk?: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: boolean;
  width?: number;
}
