import React from 'react';
import './Breadcrumb.css';
import { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/', className = '' }) => {
  return (
    <nav className={`breadcrumb ${className}`}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => (
          <li key={item.key || item.href || index} className="breadcrumb__item">
            {index > 0 && <span className="breadcrumb__separator">{separator}</span>}
            {item.href && !item.disabled ? (
              <a href={item.href} className="breadcrumb__link">{item.title}</a>
            ) : (
              <span className={`breadcrumb__text ${item.disabled ? 'breadcrumb__text--disabled' : ''}`}>
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
