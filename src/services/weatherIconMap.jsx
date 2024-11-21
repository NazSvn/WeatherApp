import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiHail,
  WiRain,
  WiRainMix,
  WiShowers,
  WiSnow,
  WiThunderstorm,
  WiWindy, 
} from 'react-icons/wi';
import PropTypes from 'prop-types';
import { BsCloudDrizzle } from 'react-icons/bs';

const WeatherIcon = ({ weatherCode, size = 48}) => {
  const iconMap = {
    0: <WiDaySunny size={size} style={{ color: '#FFC300'}}/>,
    1: <WiDayCloudy size={size} style={{ color: '#87CEEB'}}/>,
    2: <WiCloudy size={size} style={{ color: '#87CEEB'}}/>,
    3: <WiCloudy size={size} style={{ color: '#979191'}}/>,
    45: <WiFog size={size} style={{ color: '#A9A9A9'}}/>,
    48: <WiWindy size={size} style={{ color: '#A9A9A9'}}/>,
    51: <BsCloudDrizzle size={size} style={{ color: '#87CEFA'}}/>,
    53: <BsCloudDrizzle size={size} style={{ color: '#87CEFA'}}/>,
    55: <BsCloudDrizzle size={size} style={{ color: '#87CEFA'}}/>,
    56: <WiRainMix size={size} style={{ color: '#00BFFF'}}/>,
    57: <WiRainMix size={size} style={{ color: '#00BFFF'}}/>,
    61: <WiRain size={size} style={{ color: '#4682B4'}}/>,
    63: <WiRain size={size} style={{ color: '#4682B4'}}/>,
    65: <WiRain size={size} style={{ color: '#1E90FF'}}/>,
    66: <WiRain size={size} style={{ color: '#00CED1'}}/>,
    67: <WiRain size={size} style={{ color: '#00CED1'}}/>,
    71: <WiSnow size={size} style={{ color: '#bfd7f8'}}/>,
    73: <WiSnow size={size} style={{ color: '#bfd7f8'}}/>,
    75: <WiSnow size={size} style={{ color: '#a9cbf3'}}/>,
    77: <WiSnow size={size} style={{ color: '#bfd7f8'}}/>,
    80: <WiShowers size={size} style={{ color: '#4682B4'}}/>,
    81: <WiShowers size={size} style={{ color: '#1E90FF'}}/>,
    82: <WiShowers size={size} style={{ color: '#0000FF'}}/>,
    85: <WiSnow size={size} style={{ color: '#bfd7f8'}}/>,
    86: <WiSnow size={size} style={{ color: '#a9cbf3'}}/>,
    95: <WiThunderstorm size={size} style={{ color: '#FFD700'}}/>,
    96: <WiHail size={size} style={{ color: '#FFD700'}}/>,
    99: <WiHail size={size} style={{ color: '#FFA500'}}/>,
  };

  return iconMap[weatherCode];
};

WeatherIcon.propTypes = {
  weatherCode: PropTypes.node,
};

export default WeatherIcon;
 