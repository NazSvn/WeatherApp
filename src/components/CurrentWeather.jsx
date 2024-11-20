import PropTypes from 'prop-types';
import { weatherCodeMap } from '../services/weatherCodeMap';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) return null;
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
              {weatherData.current.windspeed_10m}
              {weatherData.current_units.windspeed_10m}
            </span>
          </div>

          <div className='weather-row'>
            <span className='weather-row-descr'>Wind Direction:</span>
            <span>
              {weatherData.current.winddirection_10m}
              {weatherData.current_units.winddirection_10m}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

CurrentWeather.propTypes = {
  weatherCodeMap: PropTypes.object.isRequired,
  weatherData: PropTypes.object.isRequired,
};
export default CurrentWeather;
