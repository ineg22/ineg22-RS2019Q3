import convertHex from '../utils.js';

function onToolClickHandler(e) {
  const currentTool = localStorage.getItem('currentTool');
  const currentToolElement = document.querySelector(`.${currentTool}`);

  currentToolElement.classList.toggle('selected');
  e.target.classList.toggle('selected');

  localStorage.setItem('currentTool', e.target.classList[1]);
}

function onPixelSizeClickHandler(e) {
  const penSize = localStorage.getItem('penSize');
  const penSizeElement = document.querySelector(`.pen-size-${penSize}`);

  const newPenSizeElement = e.target.closest('.pixel-item');
  const newPenSize = newPenSizeElement.classList[1].split('-')[2];

  penSizeElement.classList.toggle('selected');
  newPenSizeElement.classList.toggle('selected');

  localStorage.setItem('penSize', newPenSize);
}

function onResolutionClickHandler(e) {
  const resolution = localStorage.getItem('resolution');
  const resolutionElement = document.querySelector(`.resolution-${resolution}`);
  const newResolutionElement = e.target.closest('.resolution-item');
  const newResolution = newResolutionElement.classList[1].split('-')[1];

  resolutionElement.classList.toggle('selected');
  newResolutionElement.classList.toggle('selected');

  localStorage.setItem('resolution', newResolution);
}

function onCurrentColorClickHandler() {
  const colorInput = document.querySelector('#color-input');

  let currentColor = localStorage.getItem('currentColor');
  let prevColor = localStorage.getItem('prevColor');

  if (colorInput.value !== currentColor) {
    prevColor = currentColor;
  }
  currentColor = convertHex(colorInput.value);

  document.querySelector('.current-color').style.background = currentColor;
  document.querySelector('.prev-color').style.background = prevColor;

  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('prevColor', prevColor);
}

function onSwapColorClickHandler() {
  const currentColor = localStorage.getItem('currentColor');
  const prevColor = localStorage.getItem('prevColor');

  document.querySelector('.current-color').style.background = prevColor;
  document.querySelector('.prev-color').style.background = currentColor;

  localStorage.setItem('currentColor', prevColor);
  localStorage.setItem('prevColor', currentColor);
}

function onFpsInputHandler(e) {
  const newFps = e.target.value;
  localStorage.setItem('fps', newFps);
  document.querySelector('#fps-display').textContent = `${newFps} FPS`;
}

export default function initControls() {
  document
    .querySelector('.tools-list')
    .addEventListener('click', onToolClickHandler);

  document
    .querySelector('.pixel-list')
    .addEventListener('click', onPixelSizeClickHandler);

  document
    .querySelector('.resolution-wrapper')
    .addEventListener('click', onResolutionClickHandler);

  document
    .querySelector('.swap-colors')
    .addEventListener('click', onSwapColorClickHandler);

  document
    .querySelector('.prev-color')
    .addEventListener('click', onSwapColorClickHandler);

  document
    .querySelector('#color-input')
    .addEventListener('input', onCurrentColorClickHandler);

  document
    .querySelector('#fps-input')
    .addEventListener('input', onFpsInputHandler);

  console.log('initControls');
}
