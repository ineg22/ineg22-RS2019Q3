import renderError from '../view/renderError.js';

export default async function getBelarusianGeocode(val) {
  const API_TOKEN = '9f4fd54e5d504b0fb7cb0bf97d227071';

  const URL = `https://api.opencagedata.com/geocode/v1/json?q=${val}&key=${API_TOKEN}&pretty=1&no_annotations=1&language=be&limit=1`;
  try {
    const data = await fetch(URL).then(res => res.json());
    const { city, country } = data.results[0].components;

    if (!city) return `<p>${country}</p>`;

    return `<h3>${city}, </h3><p>${country}</p>`;
  } catch (err) {
    err.name = 'getGeocode API Error';
    err.message = `something wrong. value: ${val}`;
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}
