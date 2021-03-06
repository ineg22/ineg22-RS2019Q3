import '../styles/main.scss';
import '../styles/bootstrap.min.css';

import getUserLocation from './api/getLocation.js';
import getImageURL from './api/getImageURL.js';
import getForecast from './api/getForecast.js';
import getMap from './api/getMap.js';

import renderLoader from './view/renderLoader.js';
import renderFrame from './view/renderFrame.js';

import initControls from './control/initControls.js';

import { getTags } from './utils.js';

const lang = localStorage.getItem('lang') || 'ru';
const meas = localStorage.getItem('meas') || 'C';

async function init() {
  const location = await getUserLocation();

  const forecast = await getForecast(location);
  const { currently } = forecast;

  const tags = getTags(currently);
  const imageURL = await getImageURL(tags);

  const timeInterval = await renderFrame(
    imageURL,
    forecast,
    location,
    lang,
    meas
  );

  const map = await getMap(location, lang);

  initControls(tags, map, meas, timeInterval);
}

renderLoader();
init();
