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

  const { setSelectedCity } = useWeatherContext();

  const [requestCount, setRequestCount] = useState(0);

  const inputRef = useRef();

  const { data, loading, error } = useFetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
  );

  const handleSelection = useCallback(
    (city) => {
      setSelectedCity(city);
      setInput('');
      setCities([]);
      setSelectedIndex(-1);
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

      setRequestCount((prev) => prev + 1);
    }
  }, [data, query]);

  return (
    <>
      <div>
        {loading && <div>Loading...</div>}
        {error && (
          <div>
            <div>{error}</div>
          </div>
        )}
        <input
          ref={inputRef}
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleQuery(e)}
          placeholder='Search for a city'
        />
        <div>
          {input.length > 0 && input.length < 2 && (
            <div className='text-sm text-gray-600 mt-1'>
              Please type at least 2 characters to search
            </div>
          )}
          {cities.length > 0 && (
            <div>
              <ul>
                {cities.map((city, i) => (
                  <li
                    key={`${city.latitude}-${city.longitude}`}
                    style={{
                      border: selectedIndex === i ? '1px red solid' : '',
                    }}
                    onClick={() => handleSelection(city)}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Debug info - remove in production */}
          <div className='text-xs text-gray-500 mt-1'>
            API calls made: {requestCount}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchEngine;
