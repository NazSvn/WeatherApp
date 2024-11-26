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
  WiNightClear,
  WiNightCloudy,
  WiNightFog,
  WiNightRainMix,
  WiNightRain,
  WiNightSnow,
  WiNightShowers,
  WiNightHail,
  WiNightThunderstorm,
} from 'react-icons/wi';
import { BsCloudDrizzle, BsCloudDrizzleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

const iconMap = {
  0: {
    dayIcon: WiDaySunny,
    nightIcon: WiNightClear,
    dayColor: '#FFC300',
    nightColor: '#8288a3',
  },
  1: {
    dayIcon: WiDayCloudy,
    nightIcon: WiNightCloudy,
    dayColor: '#87CEEB',
    nightColor: '#7d9ebd',
  },
  2: {
    dayIcon: WiCloudy,
    nightIcon: WiNightCloudy,
    dayColor: '#87CEEB',
    nightColor: '#564d8d',
  },
  3: {
    dayIcon: WiCloudy,
    nightIcon: WiNightCloudy,
    dayColor: '#979191',
    nightColor: '#617f9b',
  },
  45: {
    dayIcon: WiFog,
    nightIcon: WiNightFog,
    dayColor: '#A9A9A9',
    nightColor: '#4a4a4a',
  },
  48: { dayIcon: WiWindy, dayColor: '#A9A9A9' },
  51: {
    dayIcon: BsCloudDrizzle,
    nightIcon: BsCloudDrizzleFill,
    dayColor: '#87CEFA',
    nightColor: '#8288a3',
  },
  53: {
    dayIcon: BsCloudDrizzle,
    nightIcon: BsCloudDrizzleFill,
    dayColor: '#87CEFA',
    nightColor: '#8288a3',
  },
  55: {
    dayIcon: BsCloudDrizzle,
    nightIcon: BsCloudDrizzleFill,
    dayColor: '#87CEFA',
    nightColor: '#8288a3',
  },
  56: {
    dayIcon: WiRainMix,
    nightIcon: WiNightRainMix,
    dayColor: '#00BFFF',
    nightColor: '#425769',
  },
  57: {
    dayIcon: WiRainMix,
    nightIcon: WiNightRainMix,
    dayColor: '#00BFFF',
    nightColor: '#3f506d',
  },
  61: {
    dayIcon: WiRain,
    nightIcon: WiNightRain,
    dayColor: '#4682B4',
    nightColor: '#4a525e',
  },
  63: {
    dayIcon: WiRain,
    nightIcon: WiNightRain,
    dayColor: '#4682B4',
    nightColor: '#4a525e',
  },
  65: {
    dayIcon: WiRain,
    nightIcon: WiNightRain,
    dayColor: '#1E90FF',
    nightColor: '#4a525e',
  },
  66: {
    dayIcon: WiRain,
    nightIcon: WiNightRain,
    dayColor: '#00CED1',
    nightColor: '#4a525e',
  },
  67: {
    dayIcon: WiRain,
    nightIcon: WiNightRain,
    dayColor: '#00CED1',
    nightColor: '#4a525e',
  },
  71: {
    dayIcon: WiSnow,
    nigthIcon: WiNightSnow,
    dayColor: '#bfd7f8',
    nightColor: '#6b7280',
  },
  73: {
    dayIcon: WiSnow,
    nigthIcon: WiNightSnow,
    dayColor: '#bfd7f8',
    nightColor: '#6b7280',
  },
  75: {
    dayIcon: WiSnow,
    nigthIcon: WiNightSnow,
    dayColor: '#a9cbf3',
    nightColor: '#6b7280',
  },
  77: {
    dayIcon: WiSnow,
    nigthIcon: WiNightSnow,
    dayColor: '#bfd7f8',
    nightColor: '#6b7280',
  },
  80: {
    dayIcon: WiShowers,
    nightIcon: WiNightShowers,
    dayColor: '#4682B4',
    nightColor: '#334c6e',
  },
  81: {
    dayIcon: WiShowers,
    nightIcon: WiNightShowers,
    dayColor: '#1E90FF',
    nightColor: '#334c6e',
  },
  82: {
    dayIcon: WiShowers,
    nightIcon: WiNightShowers,
    dayColor: '#0000FF',
    nightColor: '#334c6e',
  },
  85: {
    dayIcon: WiSnow,
    nigthIcon: WiNightSnow,
    dayColor: '#bfd7f8',
    nightColor: '#6b7280',
  },
  86: {
    dayIcon: WiSnow,
    nigthIcon: WiNightSnow,
    dayColor: '#a9cbf3',
    nightColor: '#6b7280',
  },
  95: {
    dayIcon: WiThunderstorm,
    nightIcon: WiNightThunderstorm,
    dayColor: '#FFD700',
    nightColor: '#1e3a8a',
  },
  96: {
    dayIcon: WiHail,
    nightIcon: WiNightHail,
    dayColor: '#FFD700',
    nightColor: '#155e75',
  },
  99: {
    dayIcon: WiHail,
    nightIcon: WiNightHail,
    dayColor: '#FFA500',
    nightColor: '#155e75',
  },
};

const WeatherIcon = ({ weatherCode, size = 48, isDay }) => {
  const weatherIconCode = iconMap[weatherCode];
  const IconComponent =
    isDay === 1
      ? weatherIconCode.dayIcon
      : weatherIconCode.nightIcon || weatherIconCode.dayIcon;

  const color = isDay
    ? weatherIconCode.dayColor
    : weatherIconCode.nightColor || weatherIconCode.dayColor;

  return (
    <IconComponent
      size={size}
      color={color}
    />
  );
};

WeatherIcon.propTypes = {
  weatherCode: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  isDay: PropTypes.number.isRequired,
};

export default WeatherIcon;
