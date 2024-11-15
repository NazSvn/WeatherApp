import useWeatherContext from './hooks/useWeatherContext';

const WeatherCard = () => {
  const { selectedCity } = useWeatherContext();

  return (
    <>
      {selectedCity && (
        <div>
          {selectedCity.name} {selectedCity.country}
        </div>
      )}
    </>
  );
};

export default WeatherCard;
