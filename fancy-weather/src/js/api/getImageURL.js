import getRandomNumber from '../utils.js';
import renderError from '../view/renderError.js';

export default async function getImageURL(tags) {
  const [season, daytime, forecast] = tags;

  const API_TOKEN = 'a895c1a6ff42551c1897473be397d91e';
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_TOKEN}&tags='${season},${daytime},${forecast}'&tag_mode=all&sort=relevance&format=json&nojsoncallback=1`;

  try {
    const data = await fetch(URL).then(res => res.json());
    const num = getRandomNumber(data.photos.photo.length);
    const photo = data.photos.photo[num];

    const imageURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

    return imageURL;
  } catch (err) {
    err.name = 'Image API Error';
    err.message = 'www.flickr.com unavailable now';
    renderError(err);
    throw new Error(`${err.name}(${err.code}): ${err.message}`);
  }
}
