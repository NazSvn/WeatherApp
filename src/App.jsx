import './assets/styles/variables.css';
import './assets/styles/reset.css';
import './assets/styles/globalStyle.css';

import SearchEngine from './components/SearchEngine/SearchEngine';
import WeatherCard from './components/WeatherCard/WeatherCard';

function App() {
  return (
    <>
      <SearchEngine />
      <WeatherCard />
    </>
  );
}

export default App;
