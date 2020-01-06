export default function initSessionData({
  currentTool,
  penSize,
  currentColor,
  prevColor,
  resolution,
  fps,
}) {
  const currentToolElement = document.querySelector(`.${currentTool}`);
  const currentPenSizeElement = document.querySelector(`.pen-size-${penSize}`);
  const resolutionElement = document.querySelector(`.resolution-${resolution}`);
  const currentColorElement = document.querySelector('.current-color');
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

  console.log('initSessionData');
}
