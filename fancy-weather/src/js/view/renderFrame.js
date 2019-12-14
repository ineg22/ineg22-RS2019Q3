import renderWeather from './renderWeather.js'; // forecast-full
import renderForm from './renderForm.js'; // lang, meas
import renderMap from './renderMap.js';
import showBG from './showBG.js';
import { getDateTime } from '../utils.js';

export default async function renderFrame(url, forecast, location, lang, meas) {
  const { body } = document;

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  const weatherWrap = await renderWeather(forecast, location, lang, meas);
  wrapper.append(renderForm(lang, meas), weatherWrap, renderMap());

  body.innerHTML = '';
  body.appendChild(wrapper);

  showBG(url);

  const timeInterval = setInterval(() => {
    document.querySelector('.date-time').textContent = getDateTime();
  }, 1000);
  return timeInterval;
}
