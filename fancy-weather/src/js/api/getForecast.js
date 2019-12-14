import renderError from '../view/renderError.js';

export default async function getForecast(loc) {
  const API_TOKEN = 'f11901ee631628df00a73fd6b08cef3e';
  const { latitude, longitude } = loc;

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const URL = `https://api.darksky.net/forecast/${API_TOKEN}/${latitude},${longitude}?units=si&lang=en`;

  try {
    const forecast = await fetch(proxyUrl + URL).then(res => res.json());
    return forecast;
  } catch (err) {
    err.name = 'Forecast Error';
    err.message =
      'Forecast fetch error or just cors-anywhere.herokuapp.com unavailable again';
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}
