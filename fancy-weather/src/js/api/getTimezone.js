import renderError from '../view/renderError.js';

export default async function getTimezone({ latitude, longitude }) {
  const API_KEY = 'FHS2H5FLHON7';
  const URL = `https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  try {
    const data = await fetch(URL).then(res => res.json());
    return data;
  } catch (err) {
    err.name = 'Timezone API Error';
    err.message = 'api.timezonedb.com fetch error';
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}
