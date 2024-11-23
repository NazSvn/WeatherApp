import PropTypes from 'prop-types';
import { weatherCodeMap } from '../../services/weatherCodeMap';
import './currentWeather.css';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) return null;
  function getCardinalDirection(windDirection) {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const sectors = 16;
    const sectorSize = 360 / sectors;
    const index = Math.round(windDirection / sectorSize) % sectors;
    return directions[index];
  }

  return (
    <>
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
            <span className='weather-row-descr'>Real feel:</span>
            <span>
              {weatherData.current.apparent_temperature}
              {weatherData.current_units.temperature_2m}
            </span>
          </div>

          <div className='weather-row'>
            <span className='weather-row-descr'>Code:</span>
            <span>
              {weatherCodeMap[weatherData.current.weathercode].description}
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
