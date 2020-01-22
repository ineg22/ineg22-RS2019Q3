import getImageURL from '../api/getImageURL.js';
import getForecast from '../api/getForecast.js';
import getTimezone from '../api/getTimezone.js';
import { mapPanTo } from '../api/getMap.js';

import renderWeather from '../view/renderWeather.js';
import renderError from '../view/renderError.js';

import {
  getDateTime,
  getTags,
  showBG,
  convertDDToDMS,
  setAnimatedIcons,
} from '../utils.js';
import MAP from '../MAP.js';

export default async function searchHandler(e, map, meas, timeInterval, tags) {
  e.preventDefault();

  const inputSearch = document.querySelector('.input-search');
  const searchValue = inputSearch.value.toString();

  if (!searchValue) {
    renderError({ name: 'Empty value', message: 'Try to write something' });
    return { timeInterval, tags };
  }

  const lang = document.querySelector('.lang-select').value.toLowerCase();
  const coords = await mapPanTo(map, lang);

  if (!coords) {
    return { timeInterval, tags };
  }

  clearInterval(timeInterval);

  const location = { latitude: coords[0], longitude: coords[1] };

  document.querySelector('.latitude').textContent = `${
    MAP[lang].other[2]
  }: ${convertDDToDMS(coords[0])}`;

  document.querySelector('.longitude').textContent = `${
    MAP[lang].other[3]
  }: ${convertDDToDMS(coords[1])}`;

  const forecastWrapper = document.querySelector('.forecast-wrapper');
  forecastWrapper.innerHTML = '';
  forecastWrapper.classList.add('dual-ring');

  const forecast = await getForecast(location);
  const { currently } = forecast;

  const newTags = getTags(currently);
  const newImageURL = await getImageURL(newTags);
  showBG(newImageURL);

  const weatherWrap = await renderWeather(forecast, location, lang, meas);

  forecastWrapper.replaceWith(weatherWrap);

  setAnimatedIcons(forecast);

  const timeZone = await getTimezone(location);

  const dateTime = document.querySelector('.date-time');

  const newInterval = setInterval(() => {
    dateTime.textContent = getDateTime(lang, timeZone.gmtOffset);
  }, 1000);
  dateTime.classList.remove('dots');

  inputSearch.value = '';
  return { newInterval, newTags };
}
