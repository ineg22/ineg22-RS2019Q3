import getImageURL from '../api/getImageURL.js';
import { showBG } from '../utils.js';

export default async function refreshHandler(tags) {
  const iconRefresh = document.querySelector('.icon-refresh');
  iconRefresh.classList.add('icon-refresh--spin');

  const imageURL = await getImageURL(tags);

  showBG(imageURL);

  iconRefresh.classList.remove('icon-refresh--spin');
}
