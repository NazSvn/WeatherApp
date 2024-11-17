import useWeatherContext from '../hooks/useWeatherContext';
import useFetch from '../hooks/useFetch';
import { useCallback, useEffect, useMemo, useState } from 'react';

const CACHE_AGE_LIMIT = 120 * 60 * 1000;

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
      'current=temperature_2m,weathercode,windspeed_10m,winddirection_10m,relative_humidity_2m,apparent_temperature&' +
      'hourly=temperature_2m,weathercode,precipitation_probability,apparent_temperature&' +
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
          console.log('using chachedWeater', cityName);
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

  return (
    <>
      <div className='weather-card'>
        {loading && (
          <div className='loading-indicator'>Loading weather data...</div>
        )}
        {error && <div className='error-message'>{error}</div>}

        {weatherData && (
          <div className='weather-info'>
            <div className='location-header'>
              <h2>
                {selectedCity.name}, {selectedCity.country}
              </h2>
              <p className='coordinates'>
                {selectedCity.latitude}°N, {selectedCity.longitude}°E
              </p>
            </div>

            <div className='weather-data'>
              <div className='weather-row'>
                <span>Temperature:</span>
                <span>
                  {weatherData.current.temperature_2m}
                  {weatherData.current_units.temperature_2m}
                </span>
              </div>

              <div className='weather-row'>
                <span>Humidity:</span>
                <span>
                  {weatherData.current.relative_humidity_2m}
                  {weatherData.current_units.relative_humidity_2m}
                </span>
              </div>

              <div className='weather-row'>
                <span>Wind Speed:</span>
                <span>
                  {weatherData.current.windspeed_10m}
                  {weatherData.current_units.windspeed_10m}
                </span>
              </div>

              <div className='weather-row'>
                <span>Wind Direction:</span>
                <span>
                  {weatherData.current.winddirection_10m}
                  {weatherData.current_units.winddirection_10m}
                </span>
              </div>
            </div>

            <div
              className='weather-hourly'
              style={{ color: 'black' }}
            >
              <h3>Next 24 Hours</h3>
              <div className='hourly-forecast'>
                {[...Array(24)].map((_, i) => {
                  const timeString = new Date(
                    weatherData.hourly.time[i]
                  ).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    hour12: true,
                  });

                  return (
                    <div
                      key={i}
                      className='hourly-item'
                    >
                      <div className='time'>{timeString}</div>
                      <div className='temp'>
                        {Math.round(weatherData.hourly.temperature_2m[i])}°
                      </div>
                      <div className='feels-like'>
                        Feels like:{' '}
                        {Math.round(weatherData.hourly.apparent_temperature[i])}
                        °
                      </div>
                      <div className='precipitation'>
                        {weatherData.hourly.precipitation_probability[i]}% rain
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherCard;
