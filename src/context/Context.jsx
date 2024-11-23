import { useState } from 'react';
import PropTypes from 'prop-types';
import { WeatherContext } from '../hooks/useWeatherContext';
import useDarkTheme from '../hooks/useDarkTheme';

const GlobalStateProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState([]);
  const { theme, toggleTheme, isDark } = useDarkTheme();

  const value = {
    selectedCity,
    setSelectedCity,
    theme,
    toggleTheme,
    isDark,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStateProvider;
