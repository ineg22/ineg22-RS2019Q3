import { setPixelSize } from '../../utils.js';

export default function onPixelSizeClickHandler(e) {
  const penSize = localStorage.getItem('penSize');
  const penSizeElement = document.querySelector(`.pen-size-${penSize}`);

  const newPenSizeElement = e.target.closest('.pixel-item') || penSizeElement;
  const newPenSize = newPenSizeElement.classList[1].split('-')[2];

  penSizeElement.classList.toggle('selected');
  newPenSizeElement.classList.toggle('selected');

  localStorage.setItem('penSize', newPenSize);

  setPixelSize();
}
