import ymaps from 'ymaps';
import MAP from '../MAP.js';
import renderError from '../view/renderError.js';

async function getMaps(lang) {
  let langFormatted;

  switch (lang) {
    case 'en':
      langFormatted = 'en_US';
      break;
    case 'ru':
      langFormatted = 'ru_RU';
      break;
    case 'be':
      langFormatted = 'en_US';
      break;
    default:
      break;
  }

  const API_KEY = '3b84c181-81c6-43d5-81ca-6531f3f83e81';
  const url = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=${langFormatted}`;

  try {
    const maps = await ymaps.load(url);

    return maps;
  } catch (err) {
    err.name = 'getMaps API Error';
    err.message = 'just yandex';
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

export default async function getMap(loc, lang) {
  const { latitude, longitude } = loc;

  try {
    const maps = await getMaps(lang);

    document.querySelector('.map-w').classList.value = 'map-wrapper';

    document.querySelector('.latitude').textContent = `${
      MAP[lang].other[2]
    }: ${latitude.toFixed(2)}`;

    document.querySelector('.longitude').textContent = `${
      MAP[lang].other[3]
    }: ${longitude.toFixed(2)}`;

    const map = new maps.Map('map', {
      center: [latitude, longitude],
      zoom: 12,
    });

    return map;
  } catch (err) {
    err.name = 'getMap API Error';
    err.message = 'just yandex';
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}

export async function getGeocode(val, lang) {
  try {
    const maps = await getMaps(lang);
    const myGeocode = await maps.geocode(val);

    return myGeocode;
  } catch (err) {
    err.name = 'getGeocode API Error';
    err.message = `just yandex. value: ${val}, lang: ${lang}`;
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}