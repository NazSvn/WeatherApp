import { useState } from 'react';
import PropTypes from 'prop-types';
import { WeatherContext } from '../hooks/useWeatherContext';

const GlobalStateProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState([]);

  const value = {
    selectedCity,
    setSelectedCity,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStateProvider;
