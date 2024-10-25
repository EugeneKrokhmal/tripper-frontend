import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    label?: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;  // Add the placeholder prop here
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required }) => {
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}
                <span className="text-red-500">
                    {required &&
                        (<>*</>)
                    }
                </span>
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="block w-full p-2 border border-gray-300 dark:border-gray-900 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-4 text-sm"
            />
        </>
    );
};

export default InputField;
