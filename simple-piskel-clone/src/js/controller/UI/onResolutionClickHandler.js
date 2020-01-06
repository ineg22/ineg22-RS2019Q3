import { setPixelSize } from '../../utils.js';

export default function onResolutionClickHandler(e) {
  const resolution = localStorage.getItem('resolution');
  const resolutionElement = document.querySelector(`.resolution-${resolution}`);
  const newResolutionElement = e.target.closest('.resolution-item');
  const newResolution = newResolutionElement.classList[1].split('-')[1];

  resolutionElement.classList.toggle('selected');
  newResolutionElement.classList.toggle('selected');

  localStorage.setItem('resolution', newResolution);

  setPixelSize();
}
