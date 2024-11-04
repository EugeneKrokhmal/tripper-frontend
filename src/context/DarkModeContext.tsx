// DarkModeContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.documentElement.classList.toggle('dark', newMode);
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            setIsDarkMode(savedTheme === 'dark');
        } else {
            document.documentElement.classList.toggle('dark', prefersDarkMode);
            setIsDarkMode(prefersDarkMode);
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const newMode = e.matches;
            setIsDarkMode(newMode);
            document.documentElement.classList.toggle('dark', newMode);
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};
