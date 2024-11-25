import React from 'react';

interface InputFieldProps {
    label?: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                step="any"
                min={0}
                type={type}
                value={value}
                onChange={onChange}
                className={'block w-full p-2 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:bg-zinc-900 rounded-md mb-4 text-sm'}
            />
        </div>
    );
};

export default InputField;
