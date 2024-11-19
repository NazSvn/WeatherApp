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
      'hourly=temperature_2m,weathercode,precipitation_probability&' +
      'daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,sunrise,sunset&' +
      'timezone=auto'
    );
  }, [selectedCity?.latitude, selectedCity?.longitude]);

  const { data: fetchedWeatherData, loading, error } = useFetch(weatherApiUrl);

  const weatherCodeMap = {
    0: { description: 'Clear sky', precipitation: null },
    1: { description: 'Mainly clear', precipitation: null },
    2: { description: 'Partly cloudy', precipitation: null },
    3: { description: 'Overcast', precipitation: null },
    45: { description: 'Foggy', precipitation: null },
    48: { description: 'Depositing rime fog', precipitation: null },
    51: { description: 'Light drizzle', precipitation: 'drizzle' },
    53: { description: 'Moderate drizzle', precipitation: 'drizzle' },
    55: { description: 'Dense drizzle', precipitation: 'drizzle' },
    56: {
      description: 'Light freezing drizzle',
      precipitation: 'freezing drizzle',
    },
    57: {
      description: 'Dense freezing drizzle',
      precipitation: 'freezing drizzle',
    },
    61: { description: 'Slight rain', precipitation: 'rain' },
    63: { description: 'Moderate rain', precipitation: 'rain' },
    65: { description: 'Heavy rain', precipitation: 'rain' },
    66: { description: 'Light freezing rain', precipitation: 'freezing rain' },
    67: { description: 'Heavy freezing rain', precipitation: 'freezing rain' },
    71: { description: 'Slight snow fall', precipitation: 'snow' },
    73: { description: 'Moderate snow fall', precipitation: 'snow' },
    75: { description: 'Heavy snow fall', precipitation: 'snow' },
    77: { description: 'Snow grains', precipitation: 'snow' },
    80: { description: 'Slight rain showers', precipitation: 'rain' },
    81: { description: 'Moderate rain showers', precipitation: 'rain' },
    82: { description: 'Violent rain showers', precipitation: 'rain' },
    85: { description: 'Slight snow showers', precipitation: 'snow' },
    86: { description: 'Heavy snow showers', precipitation: 'snow' },
    95: { description: 'Thunderstorm', precipitation: 'storm' },
    96: { description: 'Thunderstorm with slight hail', precipitation: 'hail' },
    99: { description: 'Thunderstorm with heavy hail', precipitation: 'hail' },
  };

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
              <div className='weather-temp'>
                <div className='weather-temp-value'>
                  {Math.round(weatherData.current.temperature_2m)}
                </div>
                <span className='weather-temp-unit'>
                  {weatherData.current_units.temperature_2m}
                </span>
              </div>
              <div className='weather-data-rows'>
                <div className='weather-row'>
                  <span>Real feel:</span>
                  <span>
                    {weatherData.current.apparent_temperature}
                    {weatherData.current_units.temperature_2m}
                  </span>
                </div>

                <div className='weather-row'>
                  <span>Code:</span>
                  <span>
                    {
                      weatherCodeMap[weatherData.current.weathercode]
                        .description
                    }
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
            </div>

            <div className='weather-hourly'>
              <h3>24-Hours forecast</h3>
              <div className='hourly-forecast'>
                {(() => {
                  const currentTime = new Date();
                  const currentIndex = weatherData.hourly.time.findIndex(
                    (time) => {
                      const forecastTime = new Date(time);

                      return (
                        forecastTime.getHours() === currentTime.getHours() &&
                        forecastTime.getDate() === forecastTime.getDate()
                      );
                    }
                  );

                  return Array.from({ length: 24 }, (_, i) => {
                    const hourIndex =
                      (currentIndex + i) % weatherData.hourly.time.length;

                    const timeString = new Date(
                      weatherData.hourly.time[hourIndex]
                    ).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true,
                    });

                    const weathercode =
                      weatherData.hourly.weathercode[hourIndex];
                    const weather = weatherCodeMap[weathercode];

                    const precipProb =
                      weatherData.hourly.precipitation_probability[hourIndex];

                    let precipText = 'No precipitation';

                    const PRECIPITATION_THRESHOLD = 30;

                    if (
                      precipProb >= PRECIPITATION_THRESHOLD &&
                      !weather.precipitation
                    ) {
                      precipText = 'chance of precipitation';
                    } else if (precipProb > 0 && weather.precipitation) {
                      precipText = `chance of ${weather.precipitation}`;
                    }

                    return (
                      <div
                        key={hourIndex}
                        className={`hourly-item ${
                          i === 0 ? 'current-hour' : ''
                        }`}
                      >
                        <div className='time'>
                          {i === 0 ? 'Now' : timeString}
                        </div>
                        <div className='hourly-item-box temp'>
                          {Math.round(
                            weatherData.hourly.temperature_2m[hourIndex]
                          )}
                          °
                        </div>

                        <div className='hourly-item-box weather-description'>
                          {weather.description}
                        </div>

                        <div
                          className={`hourly-item-box precipitation ${
                            precipProb > PRECIPITATION_THRESHOLD
                              ? 'significant'
                              : ''
                          }`}
                        >
                          <span className='prec-prob'>
                            {precipProb}
                            <span>%</span>
                          </span>
                          <span className='prec-text'>{precipText}</span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherCard;
