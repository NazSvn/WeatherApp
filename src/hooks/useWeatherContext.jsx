import { createContext, useContext } from 'react';

export const WeatherContext = createContext({
  selectedCity: [],
  setSelectedCity: () => {},
  theme: 'light',
  toggleTheme: () => {}, 
});

const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      'useWeatherContext must be used with a GlobalStateProvider'
    );
  }
  return context;
};

export default useWeatherContext;
