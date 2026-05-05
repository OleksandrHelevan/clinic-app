import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                      options,
                                                      value,
                                                      onChange,
                                                      placeholder = 'Оберіть опцію...',
                                                      className = ''
                                                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
            <div
                className={`dropdown-header ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={!selectedOption ? 'placeholder' : ''}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
                    ▼
                </span>
            </div>

            {isOpen && (
                <ul className="dropdown-list">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <li
                                key={option.value}
                                className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-empty">Немає опцій</li>
                    )}
                </ul>
            )}
        </div>
    );
};