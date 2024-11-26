import PropTypes from 'prop-types';
import { weatherCodeMap } from '../../services/weatherCodeMap';
import WeatherIcon from '../../services/weatherIconMap';
import './hourlyForecast.css';

const HourlyForecast = ({ weatherData }) => {
  if (!weatherData || !weatherData.hourly) {
    return null;
  }

  return (
    <div className='weather-hourly'>
      <h3>24-Hours forecast</h3>
      <div className='hourly-forecast'>
        {(() => {
          const currentTime = new Date();
          const currentIndex = weatherData.hourly.time.findIndex((time) => {
            const forecastTime = new Date(time);

            return (
              forecastTime.getHours() === currentTime.getHours() &&
              forecastTime.getDate() === forecastTime.getDate()
            );
          });

          return Array.from({ length: 24 }, (_, i) => {
            const hourIndex =
              (currentIndex + i) % weatherData.hourly.time.length;

            const timeString = new Date(
              weatherData.hourly.time[hourIndex]
            ).toLocaleTimeString('en-US', {
              hour: 'numeric',
              hour12: true,
            });

            const weathercode = weatherData.hourly.weathercode[hourIndex];
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
                className={`hourly-item ${i === 0 ? 'current-hour' : ''}`}
              >
                <div className='time'>{i === 0 ? 'Now' : timeString}</div>
                <div className='hourly-item-box temp'>
                  {Math.round(weatherData.hourly.temperature_2m[hourIndex])}°
                </div>

                <div className='hourly-item-box weather-description'>
                  <span>
                    <WeatherIcon
                      weatherCode={weathercode}
                      size={40}
                      isDay={weatherData.current.is_day}
                    />
                  </span>
                </div>

                <div
                  className={`hourly-item-box precipitation ${
                    precipProb > PRECIPITATION_THRESHOLD
                      ? 'significant'
                      : 'no-precipitation'
                  }`}
                >
                  {precipProb >= PRECIPITATION_THRESHOLD && (
                    <span className='prec-prob'>
                      {precipProb}
                      <span>%</span>
                    </span>
                  )}
                  <span className='prec-text'>{precipText}</span>
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};
HourlyForecast.propTypes = {
  weatherData: PropTypes.object.isRequired,
};
export default HourlyForecast;
