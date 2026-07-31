import React from 'react';
import './Form.css';
import { FormProps, FormItemProps } from './Form.types';

export const FormItem: React.FC<FormItemProps> = ({ label, children, error, className = '' }) => (
  <div className={`form-item ${className}`}>
    {label && <label className="form-item__label">{label}</label>}
    <div className="form-item__content">{children}</div>
    {error && <span className="form-item__error">{error}</span>}
  </div>
);

export const Form: React.FC<FormProps> = ({ children, onSubmit, className = '', layout = 'vertical' }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form className={`form form-${layout} ${className}`} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
