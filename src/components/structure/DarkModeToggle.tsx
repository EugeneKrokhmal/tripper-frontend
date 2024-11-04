import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';

const DarkModeToggle: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="self-start text-xs p-2 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
