import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import lineMdSunRisingLoop from '@iconify-icons/line-md/sun-rising-loop';
import lineMdMoonAltLoop from '@iconify-icons/line-md/moon-alt-loop';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Initial state is false, will be updated on client

  useEffect(() => {
    const root = document.documentElement;
    // Check localStorage first, then system preference
    const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialDarkMode = storedTheme === 'dark' || (storedTheme === null && prefersDark);
    setIsDarkMode(initialDarkMode);

    // Apply initial theme class
    if (initialDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update class and localStorage on subsequent changes
    const updateTheme = (darkMode) => {
      if (darkMode) {
        root.classList.add('dark');
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', 'dark');
        }
      } else {
        root.classList.remove('dark');
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('theme', 'light');
        }
      }
    };
    
    updateTheme(initialDarkMode); // Apply initial theme immediately

    // Listener for system theme changes (optional, but good practice)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('theme') === null) { // Only react to system changes if no explicit theme is set
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);

  }, []); // Empty dependency array means this runs once on mount

  // Separate useEffect to handle class and localStorage changes based on isDarkMode state
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full text-yellow-500 ${isDarkMode ? 'hover:bg-white' : 'hover:bg-gray-700'} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Icon icon={lineMdSunRisingLoop} className="w-6 h-6" />
      ) : (
        <Icon icon={lineMdMoonAltLoop} className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle; 