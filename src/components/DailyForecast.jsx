import PropTypes from 'prop-types';
import { weatherCodeMap } from '../services/weatherCodeMap';

const DailyForecast = ({ weatherData }) => {
  if (!weatherData.daily) return null;

  return (
    <>
      <div className='weather-daily'>
        {weatherData &&
          weatherData.daily.time.map((forecastDay, i) => {
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const day = new Date(forecastDay);
            const dayName = days[day.getDay()];

            const weathercode = weatherData.daily.weathercode[i];
            const weather = weatherCodeMap[weathercode];

            const precipProb =
              weatherData.daily.precipitation_probability_max[i];

            const PRECIPITATION_THRESHOLD = 30;

            let precipText = 'No precipitation';

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
                key={forecastDay}
                className='weather-daily-rows'
              >
                <div>{dayName}</div>
                <div>{weather.description}</div>

                <div>
                  {precipText !== 'No precipitation' && (
                    <span>{precipProb}%</span>
                  )}
                  {precipText}
                </div>
                <div className='weather-daily-temp'>
                  <span>
                    {Math.round(weatherData.daily.temperature_2m_min[i])}
                    &#176;{' '}
                  </span>
                  <span>/</span>
                  <span>
                    {' '}
                    {Math.round(weatherData.daily.temperature_2m_max[i])}
                    &#176;
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

DailyForecast.propTypes = {
  weatherData: PropTypes.object.isRequired,
  weatherCodeMap: PropTypes.object.isRequired,
};

export default DailyForecast;