import React from 'react';

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options, required = false }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="block w-full p-2 border border-gray-300 dark:border-gray-900 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-4 text-sm"
                required={required}
            >
                <option value="">Select</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
