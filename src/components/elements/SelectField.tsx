import React, { useState } from 'react';

interface SelectFieldProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options, required = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false); // Close dropdown after selecting
    };

    return (
        <div className="relative">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div
                className="relative block w-full p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-2 text-sm cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <svg
                    className={`absolute end-3 w-3 top-0 bottom-0 my-auto transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
                {value ? options.find(option => option.value === value)?.label : 'Select'}
            </div>
            {isOpen && (
                <div className="absolute left-0 right-0 z-10 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-md mt-1 shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className={`text-sm p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                option.value === value ? 'bg-gray-200 dark:bg-gray-700' : ''
                            }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectField;
