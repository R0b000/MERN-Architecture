import React, { useEffect } from 'react';
import './Modal.css';
import { ModalProps } from './Modal.types';

export const Modal: React.FC<ModalProps> = ({ visible, onClose, onOk, title, children, footer = true, width = 520 }) => {
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ width }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && (
          <div className="modal__footer">
            <button className="btn btn-default" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={onOk}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
