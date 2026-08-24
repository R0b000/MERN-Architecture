import React, { useState } from 'react';
import './Collapse.css';
import { CollapseProps, CollapsePanelProps } from './Collapse.types';

export const CollapsePanel: React.FC<CollapsePanelProps> = ({ header, children, isActive, onClick }) => {
  return (
    <div className="collapse-panel">
      <div className="collapse-panel__header" onClick={onClick}>
        <span className="collapse-panel__title">{header}</span>
        <span className={`collapse-panel__arrow ${isActive ? 'collapse-panel__arrow--active' : ''}`}>›</span>
      </div>
      {isActive && <div className="collapse-panel__content">{children}</div>}
    </div>
  );
};

export const Collapse: React.FC<CollapseProps> = ({ children, accordion = false, className = '' }) => {
  const [activeKey, setActiveKey] = useState<string | string[]>(accordion ? '' : []);

  const handlePanelClick = (key: string) => {
    if (accordion) {
      setActiveKey(activeKey === key ? '' : key);
    } else {
      const keys = Array.isArray(activeKey) ? activeKey : [];
      setActiveKey(keys.includes(key) ? keys.filter(k => k !== key) : [...keys, key]);
    }
  };

  const panels = React.Children.map(children, (child) => {
    if (React.isValidElement<CollapsePanelProps>(child)) {
      const key = child.key as string;
      const isActive = accordion ? activeKey === key : (Array.isArray(activeKey) && activeKey.includes(key));
      return React.cloneElement(child, {
        isActive,
        onClick: () => handlePanelClick(key),
      });
    }
    return child;
  });

  return <div className={`collapse ${className}`}>{panels}</div>;
};

export default Collapse;
