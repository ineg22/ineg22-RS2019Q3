import getImageURL from '../api/getImageURL.js';
import getForecast from '../api/getForecast.js';
import getTimezone from '../api/getTimezone.js';
import { mapPanTo } from '../api/getMap.js';

import renderWeather from '../view/renderWeather.js';

import { getDateTime, getTags, showBG } from '../utils.js';
import MAP from '../MAP.js';

export default async function searchHandler(e, map, meas, timeInterval) {
  e.preventDefault();
  clearInterval(timeInterval);

  const lang = document.querySelector('.lang-select').value.toLowerCase();

  const coords = await mapPanTo(map, lang);
  const location = { latitude: coords[0], longitude: coords[1] };

  document.querySelector('.latitude').textContent = `${
    MAP[lang].other[2]
  }: ${coords[0].toFixed(2)}`;

  document.querySelector('.longitude').textContent = `${
    MAP[lang].other[3]
  }: ${coords[1].toFixed(2)}`;

  const forecastWrapper = document.querySelector('.forecast-wrapper');
  forecastWrapper.innerHTML = '';
  forecastWrapper.classList.add('dual-ring');

  const forecast = await getForecast(location);
  const { currently } = forecast;

  const newTags = getTags(currently);
  const newImageURL = await getImageURL(newTags);
  showBG(newImageURL);

  const weatherWrap = await renderWeather(forecast, location, lang, meas);

  document.querySelector('.forecast-wrapper').replaceWith(weatherWrap);

  const timeZone = await getTimezone(location);

  const newInterval = setInterval(() => {
    document.querySelector('.date-time').textContent = getDateTime(
      timeZone.gmtOffset
    );
  }, 1000);

  return { newInterval, newTags };
}
