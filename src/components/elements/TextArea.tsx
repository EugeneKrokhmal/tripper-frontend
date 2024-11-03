import React, { ChangeEvent } from 'react';

interface TextAreaProps {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, required }) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">{label}
                <span className="text-red-500">
                    {required &&
                        (<>*</>)
                    }
                </span>
            </label>
            <textarea
                value={value}
                onChange={onChange}
                className="block bg-gray-50 w-full p-2 border border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:bg-zinc-900 rounded-md mb-4 text-sm"
            />
        </div>
    );
};

export default TextArea;
