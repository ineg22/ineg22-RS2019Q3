import { setPixelSize } from '../../utils.js';
import loadMiniFrames from '../../view/loadMiniFrames.js';
import initPreview from '../preview/initPreview.js';

export default function onResolutionClickHandler(e) {
  const DEFAULT_CANVAS_SIZE = 512;
  const resolution = localStorage.getItem('resolution');
  const resolutionElement = document.querySelector(`.resolution-${resolution}`);
  const newResolutionElement =
    e.target.closest('.resolution-item') || resolutionElement;
  const newResolution = newResolutionElement.classList[1].split('-')[1];

  resolutionElement.classList.toggle('selected');
  newResolutionElement.classList.toggle('selected');

  localStorage.setItem('resolution', newResolution);

  setPixelSize();

  const mainCanvas = document.querySelector('#main-frame');
  const mainCtx = mainCanvas.getContext('2d');

  mainCtx.clearRect(0, 0, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  const emptyData = mainCanvas.toDataURL();
  localStorage.setItem('frames', JSON.stringify([]));
  localStorage.setItem('currentFrame', 1);

  document.querySelectorAll('.mini-frame').forEach(el => el.remove());
  loadMiniFrames([], 1, emptyData);
  initPreview();
}
