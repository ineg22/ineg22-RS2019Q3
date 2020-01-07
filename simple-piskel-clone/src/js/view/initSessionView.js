import { setPixelSize } from '../utils.js';
import renderMiniFrame from './renderMiniFrame.js';

const canvas = document.querySelector('#main-frame');
const ctx = canvas.getContext('2d');

function loadMiniFrames(frames, currentFrame, canvasData) {
  const fragment = document.createDocumentFragment();

  if (frames.length === 0) {
    const miniFrameElement = renderMiniFrame(0);
    fragment.appendChild(miniFrameElement);

    const emptyFramesArray = [canvasData];
    localStorage.setItem('frames', JSON.stringify(emptyFramesArray));
  } else {
    for (let i = 0; i < frames.length; i += 1) {
      const miniFrameElement = renderMiniFrame(i);
      fragment.appendChild(miniFrameElement);
    }
  }

  document.querySelector('.mini-frame-list').prepend(fragment);
  const currentMiniFrameElement = document.querySelector(
    `.mini-frame-${currentFrame}`
  );
  currentMiniFrameElement.classList.add('selected');

  if (frames.length === 0) {
    const miniCtx = document
      .querySelector('.mini-frame-1')
      .querySelector('.mini-frame__canvas')
      .getContext('2d');
    const img = new Image();
    img.src = canvasData;

    img.addEventListener('load', () => {
      miniCtx.drawImage(img, 0, 0);
    });
  } else {
    for (let i = 0; i < frames.length; i += 1) {
      const miniCtx = document
        .querySelector(`.mini-frame-${i + 1}`)
        .querySelector('.mini-frame__canvas')
        .getContext('2d');
      const img = new Image();
      img.src = frames[i];

      img.addEventListener('load', () => {
        miniCtx.drawImage(img, 0, 0);
      });
    }
  }
}

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
