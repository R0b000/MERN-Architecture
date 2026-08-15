import React from 'react';
import './Card.css';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  title,
  extra,
  children,
  className = '',
  bordered = true,
  hoverable = false,
}) => {
  return (
    <div className={`card ${className} ${bordered ? 'card-bordered' : ''} ${hoverable ? 'card-hoverable' : ''}`}>
      {(title || extra) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {extra && <div className="card__extra">{extra}</div>}
        </div>
      )}
      <div className="card__body">{children}</div>
    </div>
  );
};

export default Card;
