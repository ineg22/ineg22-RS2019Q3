import renderWeather from './renderWeather.js'; // forecast-full
import renderForm from './renderForm.js'; // lang, meas
import renderMap from './renderMap.js';
import { getDateTime, showBG, setAnimatedIcons } from '../utils.js';

export default async function renderFrame(url, forecast, location, lang, meas) {
  const { body } = document;

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  const weatherWrap = await renderWeather(forecast, location, lang, meas);
  wrapper.append(renderForm(lang, meas), weatherWrap, renderMap());

  body.innerHTML = '';
  body.appendChild(wrapper);

  setAnimatedIcons(forecast);
  showBG(url);

  const dateTime = document.querySelector('.date-time');
  const timeInterval = setInterval(() => {
    dateTime.textContent = getDateTime(lang);
  }, 1000);
  dateTime.classList.remove('dots');

  return timeInterval;
}
