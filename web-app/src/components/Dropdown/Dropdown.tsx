import { useState, useRef, useEffect } from 'react';
import {
  CustomDropdown,
  DropdownArrow,
  DropdownEmpty,
  DropdownHeader,
  DropdownItem,
  DropdownList,
  Placeholder,
} from './Dropdown.styles';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Оберіть опцію...',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <CustomDropdown ref={dropdownRef}>
      <DropdownHeader open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : <Placeholder>{placeholder}</Placeholder>}
        <DropdownArrow open={isOpen}>▼</DropdownArrow>
      </DropdownHeader>

      {isOpen && (
        <DropdownList>
          {options.length > 0 ? (
            options.map((option) => (
              <DropdownItem
                key={option.value}
                selected={option.value === value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </DropdownItem>
            ))
          ) : (
            <DropdownEmpty>Немає опцій</DropdownEmpty>
          )}
        </DropdownList>
      )}
    </CustomDropdown>
  );
};
