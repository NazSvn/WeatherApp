import PropTypes from 'prop-types';
import { weatherCodeMap } from '../../services/weatherCodeMap';
import './currentWeather.css';
import getCardinalDirection from '../../services/windDirection';
import WeatherIcon from '../../services/weatherIconMap';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) return null;

  const weathercode = weatherData.current.weathercode;

  return (
    <>
      <div className='weather-data'>
        <div className='weather-temp-container'>
          <div className='weather-temp'>
            <div className='weather-temp-value'>
              {Math.round(weatherData.current.temperature_2m)}
            </div>
            <span className='weather-temp-unit'>
              {weatherData.current_units.temperature_2m}
            </span>
          </div>
          <div className='weather-temp-descr'>
            <span className='weather-temp-text'>
              {weatherCodeMap[weatherData.current.weathercode].description}
            </span>
            <span className='weather-icon'>
              <WeatherIcon
                weatherCode={weathercode}
                size={50}
              />
            </span>
          </div>
        </div>
        <div className='weather-data-rows'>
          <div className='weather-row'>
            <span className='weather-row-descr'>Real feel:</span>
            <span>
              {Math.round(weatherData.current.apparent_temperature)}
              {weatherData.current_units.temperature_2m}
            </span>
          </div> 
          <div className='weather-row'>
            <span className='weather-row-descr'>Humidity:</span>
            <span>
              {weatherData.current.relative_humidity_2m}
              {weatherData.current_units.relative_humidity_2m}
            </span>
          </div>

          <div className='weather-row'>
            <span className='weather-row-descr'>Wind Speed:</span>
            <span>
              {weatherData.current.windspeed_10m}{' '}
              {weatherData.current_units.windspeed_10m}
            </span>
          </div>

          <div className='weather-row'>
            <span className='weather-row-descr'>Wind Direction:</span>
            <span>
              {getCardinalDirection(weatherData.current.winddirection_10m)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

CurrentWeather.propTypes = {
  weatherData: PropTypes.object.isRequired,
};
export default CurrentWeather;
