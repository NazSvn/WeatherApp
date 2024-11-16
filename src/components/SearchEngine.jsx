import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import useFetch from './hooks/useFetch';
import useWeatherContext from './hooks/useWeatherContext';

const CAHCE_AGE_LIMIT = 120 * 60 * 1000;
const MIN_SEARCH_LENGTH = 2;
const DEBOUNCE_DELAY = 500;

const SearchEngine = () => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [cache, setCache] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { setSelectedCity } = useWeatherContext();

  const inputRef = useRef();
  const dropdownRef = useRef();

  const shouldFetch = query.length >= MIN_SEARCH_LENGTH;

  const { data, loading, error } = useFetch(
    shouldFetch
      ? `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
      : null
  );

  const handleSelection = useCallback(
    (city) => {
      setSelectedCity(city);
      setInput('');
      setCities([]);
      setSelectedIndex(-1);
      setIsDropdownOpen(false);
      inputRef.current.blur();
    },
    [setSelectedCity]
  );

  const handleQuery = useCallback(
    (e) => {
      switch (e.key) {
        case 'Escape':
          setInput('');
          setCities([]);
          setIsDropdownOpen(false);
          inputRef.current.blur();
          break;
        case 'Enter':
          if (selectedIndex >= 0 && cities[selectedIndex]) {
            handleSelection(cities[selectedIndex]);
          } else if (cities.length > 0) {
            handleSelection(cities[0]);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < cities.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));

          break;

        default:
          break;
      }
    },
    [cities, handleSelection, selectedIndex]
  );

  const checkAndUpdateFromCache = useCallback(
    (search) => {
      const cacheKey = search.toLowerCase().trim();
      const cachedResult = cache[cacheKey];

      if (
        cachedResult &&
        Date.now() - cachedResult.timestamp < CAHCE_AGE_LIMIT
      ) {
        console.log('usig cache:', search);
        setCities(cachedResult.data);
        return true;
      }
      return false;
    },
    [cache]
  );

  useEffect(() => {
    const trimedInput = input.trim();

    if (trimedInput.length < MIN_SEARCH_LENGTH) {
      setQuery('');
      setCities([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      const foundInCache = checkAndUpdateFromCache(trimedInput);
      if (!foundInCache) {
        setQuery(trimedInput);
      }
      setIsDropdownOpen(true);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(debounceTimer);
  }, [input, checkAndUpdateFromCache]);

  useEffect(() => {
    if (data?.results) {
      setCache((prevCache) => ({
        ...prevCache,
        [query.toLocaleLowerCase()]: {
          data: data.results,
          timestamp: Date.now(),
        },
      }));
      setCities(data.results);
    }
  }, [data, query]);

  return (
    <div
      className='search-container'
      ref={dropdownRef}
    >
      <div className='search-input-wrapper'>
        <input
          ref={inputRef}
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleQuery}
          placeholder='Search for a city'
          className='search-input'
          aria-label='Search for a city'
          onFocus={() =>
            input.length >= MIN_SEARCH_LENGTH && setIsDropdownOpen(true)
          }
        />
        {loading && <div className='loading-indicator'>Loading...</div>}
      </div>

      {error && (
        <div className='error-message'>
          Failed to fetch cities. Please try again.
        </div>
      )}

      {input.length > 0 && input.length < MIN_SEARCH_LENGTH && (
        <div className='min-chars-notice'>
          Please type at least {MIN_SEARCH_LENGTH} characters to search
        </div>
      )}

      {isDropdownOpen && cities.length > 0 && (
        <ul
          className='cities-dropdown'
          role='listbox'
        >
          {cities.map((city, index) => (
            <li
              key={`${city.latitude}-${city.longitude}`}
              className={`city-item ${
                selectedIndex === index ? 'selected' : ''
              }`}
              onClick={() => handleSelection(city)}
              role='option'
              aria-selected={selectedIndex === index}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchEngine;
