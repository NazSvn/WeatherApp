import PropTypes from 'prop-types';

const LocationHeader = ({ selectedCity }) => {
  if (!selectedCity) return null;
  return (
    <>
      <div className='location-header'>
        <h2>
          {selectedCity.name}, {selectedCity.country}
        </h2>
        <p className='coordinates'>
          {selectedCity.latitude}°N, {selectedCity.longitude}°E
        </p>
      </div>
    </>
  );
};

LocationHeader.propTypes = {
  selectedCity: PropTypes.object.isRequired,
};

export default LocationHeader;
