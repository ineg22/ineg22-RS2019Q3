import { getGeocode } from '../api/getMap.js';

export default async function mapPanTo(map, lang) {
  const inputEl = document.querySelector('.input-search');
  const searchValue = inputEl.value.toString();

  const geocode = await getGeocode(searchValue, lang);

  const coords = geocode.geoObjects.get(0).geometry.getCoordinates();

  map.panTo(coords, { duration: 2000 });

  return coords;
}
