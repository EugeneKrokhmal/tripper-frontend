import React from 'react';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
    variant: "primary" | "secondary";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', variant, disabled}) => {
    const buttonClass =
        variant === 'primary'
            ? 'w-full md:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4'
            : 'w-full md:w-auto text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4';

    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonClass}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
