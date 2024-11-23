function getCardinalDirection(windDirection) {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const sectors = 16;
  const sectorSize = 360 / sectors;
  const index = Math.round(windDirection / sectorSize) % sectors;
  return directions[index];
}

export default getCardinalDirection;
