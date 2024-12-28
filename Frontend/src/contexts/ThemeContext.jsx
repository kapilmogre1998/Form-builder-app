import React, { createContext, useState } from 'react';
import { DARK, LIGHT } from '../constant';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('themeMode') || 'dark');

    const toggleTheme = () => {
        localStorage.setItem('themeMode', theme === 'light' ? DARK : LIGHT);
        setTheme(theme === 'light' ? DARK : LIGHT);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
