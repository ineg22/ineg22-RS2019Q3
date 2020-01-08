import { setPixelSize } from '../utils.js';
import loadMiniFrames from './loadMiniFrames.js';

export default function initSessionView({
  currentTool,
  penSize,
  currentColor,
  prevColor,
  resolution,
  fps,
  canvasData,
  frames,
  currentFrame,
}) {
  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');

  const currentToolElement = document.querySelector(`.${currentTool}`);
  const currentPenSizeElement = document.querySelector(`.pen-size-${penSize}`);
  const currentColorElement = document.querySelector('.current-color');
  const resolutionElement = document.querySelector(`.resolution-${resolution}`);
  const prevColorElement = document.querySelector('.prev-color');
  const fpsInputElement = document.querySelector('#fps-input');
  const fpsDisplayElement = document.querySelector('#fps-display');

  currentToolElement.classList.add('selected');
  currentPenSizeElement.classList.add('selected');
  resolutionElement.classList.add('selected');
  currentColorElement.style.backgroundColor = currentColor;
  prevColorElement.style.backgroundColor = prevColor;
  fpsInputElement.setAttribute('value', fps);
  fpsDisplayElement.textContent = `${fps} FPS`;

  setPixelSize();

  const mainImg = new Image();
  mainImg.src = canvasData;

  mainImg.addEventListener('load', () => {
    ctx.drawImage(mainImg, 0, 0);
  });

  loadMiniFrames(frames, currentFrame, canvasData);
}
