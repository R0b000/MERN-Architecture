import React, { useState } from 'react';
import './Datepicker.css';
import { DatepickerProps } from './Datepicker.types';

export const Datepicker: React.FC<DatepickerProps> = ({ value, onChange, className = '', placeholder = 'Select date' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [viewDate, setViewDate] = useState(value || new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  return (
    <div className={`datepicker ${className}`} onBlur={() => setTimeout(() => setIsOpen(false), 200)}>
      <input
        type="text"
        value={selectedDate ? formatDate(selectedDate) : ''}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className="datepicker__input"
      />
      {isOpen && (
        <div className="datepicker__dropdown">
          <div className="datepicker__header">
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}>‹</button>
            <span>{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}>›</button>
          </div>
          <div className="datepicker__grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d} className="datepicker__weekday">{d}</span>)}
            {[...Array(firstDay)].map((_, i) => <span key={`empty-${i}`} />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <button key={day} className={`datepicker__day ${isSelected ? 'datepicker__day--selected' : ''}`} onClick={() => handleDateSelect(date)}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
