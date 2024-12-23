import useWeatherContext from '../../hooks/useWeatherContext';
import useFetch from '../../hooks/useFetch';
import { useCallback, useEffect, useMemo, useState } from 'react';
import HourlyForecast from '../HourlyWeather/HourlyForecast';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import LocationHeader from './LocationHeader';
import DailyForecast from '../DailyWeather/DailyForecast';
import './weatherCard.css';
import { CACHE_AGE_LIMIT } from '../../services/cacheAgeLimitConfig';

const WeatherCard = () => {
  const { selectedCity } = useWeatherContext();
  const [weatherData, setWeatherData] = useState(null);
  const [weatherCache, setWeatherCache] = useState({});

  const weatherApiUrl = useMemo(() => {
    if (!selectedCity?.latitude || !selectedCity?.longitude) return null;

    return (
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${selectedCity.latitude}&` +
      `longitude=${selectedCity.longitude}&` +
      'current=temperature_2m,weathercode,windspeed_10m,winddirection_10m,relative_humidity_2m,is_day,apparent_temperature&' +
      'hourly=temperature_2m,weathercode,precipitation_probability&' +
      'daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,sunrise,sunset&' +
      'timezone=auto'
    );
  }, [selectedCity?.latitude, selectedCity?.longitude]);

  const { data: fetchedWeatherData, loading, error } = useFetch(weatherApiUrl);

  const checkCache = useCallback(
    (cityName) => {
      if (!cityName) return null;

      const cacheKey = cityName.toLowerCase().trim();
      const cachedResult = weatherCache[cacheKey];

      if (cachedResult) {
        const cacheAge = Date.now() - cachedResult.timestamp;

        if (cacheAge < CACHE_AGE_LIMIT) { 
          return cachedResult.data;
        }
      }
      return null;
    },
    [weatherCache]
  );

  useEffect(() => {
    if (!selectedCity?.name) {
      setWeatherData(null);
      return;
    }

    const cachedData = checkCache(selectedCity.name);

    if (cachedData) {
      setWeatherData(cachedData);
    }
  }, [selectedCity?.name, checkCache]);

  useEffect(() => {
    if (fetchedWeatherData && selectedCity?.name) {
      const cityKey = selectedCity.name.toLowerCase();

      setWeatherCache((prev) => ({
        ...prev,
        [cityKey]: {
          data: fetchedWeatherData,
          timestamp: Date.now(),
        },
      }));

      setWeatherData(fetchedWeatherData);
    }
  }, [fetchedWeatherData, selectedCity?.name]);

  if (!selectedCity) return null;

  if (loading) {
    return (
      <div className='weather-card'>
        <div className='loading-indicator'>Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='weather-card'>
        <div className='error-message'>{error}</div>
      </div>
    );
  }


  if (!weatherData) return null;

  return (
    <>
      {weatherData && !loading && !error && (
        <div className='weather-card'>
          <div className='weather-info'>
            <LocationHeader selectedCity={selectedCity} />
            <CurrentWeather weatherData={weatherData} />
            <HourlyForecast weatherData={weatherData} />
            <DailyForecast weatherData={weatherData} />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherCard;
