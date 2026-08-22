import React from 'react';
import './Checkbox.css';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <label className={`checkbox ${className} ${disabled ? 'checkbox-disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="checkbox__input"
      />
      <span className="checkbox__mark"></span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
};

export default Checkbox;
