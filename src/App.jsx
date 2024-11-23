import './assets/styles/variables.css';
import './assets/styles/reset.css';
import './assets/styles/globalStyle.css';

import SearchEngine from './components/SearchEngine/SearchEngine';
import WeatherCard from './components/WeatherCard/WeatherCard';
import useWeatherContext from './hooks/useWeatherContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

function App() {
  const { toggleTheme, isDark } = useWeatherContext();
  return (
    <>
      <button
        className='theme-button'
        onClick={toggleTheme}
      >
        {isDark ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
      </button>
      <SearchEngine />
      <WeatherCard />
    </>
  );
}

export default App;
