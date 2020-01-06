import { setPixelSize } from '../utils.js';

export default function initSessionView({
  currentTool,
  penSize,
  currentColor,
  prevColor,
  resolution,
  fps,
  canvasData,
}) {
  const currentToolElement = document.querySelector(`.${currentTool}`);
  const currentPenSizeElement = document.querySelector(`.pen-size-${penSize}`);
  const resolutionElement = document.querySelector(`.resolution-${resolution}`);
  const currentColorElement = document.querySelector('.current-color');
  const prevColorElement = document.querySelector('.prev-color');
  const fpsInputElement = document.querySelector('#fps-input');
  const fpsDisplayElement = document.querySelector('#fps-display');
  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');

  const img = new Image();

  img.src = canvasData;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };

  currentToolElement.classList.add('selected');
  currentPenSizeElement.classList.add('selected');
  resolutionElement.classList.add('selected');
  currentColorElement.style.backgroundColor = currentColor;
  prevColorElement.style.backgroundColor = prevColor;
  fpsInputElement.setAttribute('value', fps);
  fpsDisplayElement.textContent = `${fps} FPS`;

  setPixelSize();
}
