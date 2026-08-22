import React from 'react';
import './Button.css';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  htmlType = 'button',
  icon,
  block = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      type={htmlType}
      className={`btn btn-${type} btn-${size} ${className} ${block ? 'btn-block' : ''} ${disabled || loading ? 'btn-disabled' : ''}`}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && <span className="btn__spinner"></span>}
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
    </button>
  );
};

export default Button;
