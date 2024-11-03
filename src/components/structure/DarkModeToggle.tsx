// DarkModeToggle.tsx
import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Toggle dark mode and save preference
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    // Initialize the theme based on user preference or localStorage
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

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
