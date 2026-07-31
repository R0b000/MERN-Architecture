import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  fullWidth = false,
  icon,
  iconPosition = 'left',
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;
  const disabledClasses = disabled ? 'btn-disabled' : '';
  const loadingClasses = loading ? 'btn-loading' : '';
  const widthClasses = fullWidth ? 'btn-full-width' : '';

  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${loadingClasses} ${widthClasses} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="btn-spinner"></span>}
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{label}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
};
