import { useEffect, useState } from 'react';

const useDarkTheme = (defaultTheme = 'light') => {
  const getSystemThemePreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('theme');

      if (storedTheme) {
        return storedTheme;
      }

      return getSystemThemePreference() || defaultTheme;
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);

      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
};

export default useDarkTheme;
