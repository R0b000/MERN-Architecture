import React, { useState } from 'react';
import './Menu.css';
import { MenuProps, MenuItemProps, SubMenuProps } from './Menu.types';

export const MenuItem: React.FC<MenuItemProps & { active?: boolean }> = ({ icon, children, onClick, active = false, className = '' }) => (
  <li className={`menu-item ${active ? 'menu-item--active' : ''} ${className}`} onClick={onClick}>
    {icon && <span className="menu-item__icon">{icon}</span>}
    <span className="menu-item__text">{children}</span>
  </li>
);

export const SubMenu: React.FC<SubMenuProps> = ({ title, icon, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className={`menu-submenu ${className}`}>
      <div className="menu-submenu__title" onClick={() => setIsOpen(!isOpen)}>
        {icon && <span className="menu-submenu__icon">{icon}</span>}
        <span className="menu-submenu__text">{title}</span>
        <span className={`menu-submenu__arrow ${isOpen ? 'menu-submenu__arrow--open' : ''}`}>›</span>
      </div>
      {isOpen && <ul className="menu-submenu__content">{children}</ul>}
    </li>
  );
};

export const Menu: React.FC<MenuProps> = ({ children, mode = 'vertical', className = '', selectedKeys = [] }) => {
  const items = React.Children.map(children, child => {
    if (React.isValidElement<MenuItemProps>(child)) {
      const key = child.key as string;
      return React.cloneElement(child, { active: selectedKeys.includes(key) });
    }
    return child;
  });

  return <ul className={`menu menu-${mode} ${className}`}>{items}</ul>;
};

export default Menu;
