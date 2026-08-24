import React from 'react';
import './AutoCompleteSelect.css';
import { AutoCompleteSelectProps } from './AutoCompleteSelect.types';

export const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Search...',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(value || '');
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  React.useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    onChange?.('');
  };

  const handleOptionClick = (optionValue: string) => {
    setSearchTerm(options.find((o) => o.value === optionValue)?.label || '');
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className={`autocomplete-select ${className}`} onBlur={handleBlur}>
      <div className="autocomplete-select__input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="autocomplete-select__input"
        />
        <span className="autocomplete-select__arrow">▼</span>
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul className="autocomplete-select__dropdown">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className={`autocomplete-select__option ${
                option.value === value ? 'autocomplete-select__option--selected' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isOpen && filteredOptions.length === 0 && (
        <div className="autocomplete-select__no-results">No results found</div>
      )}
    </div>
  );
};

export default AutoCompleteSelect;
