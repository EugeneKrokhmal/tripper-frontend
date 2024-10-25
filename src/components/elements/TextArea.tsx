import React, { ChangeEvent } from 'react';

interface TextAreaProps {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    placeholder?: string;  // Add the placeholder prop here
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, required }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}
                <span className="text-red-500">
                    {required &&
                        (<>*</>)
                    }
                </span>
            </label>
            <textarea
                value={value}
                onChange={onChange}
                className="block w-full p-2 border border-gray-300 dark:border-gray-900 dark:text-gray-300 dark:bg-gray-900 rounded-md mb-4 text-sm"
            />
        </div>
    );
};

export default TextArea;
