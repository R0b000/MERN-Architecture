import React, { useEffect } from 'react';
import './Drawer.css';
import { DrawerProps } from './Drawer.types';

export const Drawer: React.FC<DrawerProps> = ({ visible, onClose, title, children, placement = 'right', width = 300 }) => {
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className={`drawer drawer-${placement}`} style={{ width }} onClick={(e) => e.stopPropagation()}>
        <div className="drawer__header">
          <h3 className="drawer__title">{title}</h3>
          <button className="drawer__close" onClick={onClose}>×</button>
        </div>
        <div className="drawer__body">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
