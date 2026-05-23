import React, { useState } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        return saved;
    });

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
};

export default ThemeSwitcher;
