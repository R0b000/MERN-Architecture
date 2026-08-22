export interface AutoCompleteSelectOption {
  value: string;
  label: string;
}

export interface AutoCompleteSelectProps {
  options: AutoCompleteSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
