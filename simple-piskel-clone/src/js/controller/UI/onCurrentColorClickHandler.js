import { convertHex } from '../../utils.js';

export function setColors(currentColor, prevColor) {
  document.querySelector('.current-color').style.background = currentColor;
  document.querySelector('.prev-color').style.background = prevColor;

  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('prevColor', prevColor);
}

export default function onCurrentColorClickHandler() {
  const colorInput = document.querySelector('#color-input');

  let currentColor = localStorage.getItem('currentColor');
  let prevColor = localStorage.getItem('prevColor');

  if (colorInput.value !== currentColor) {
    prevColor = currentColor;
  }
  currentColor = convertHex(colorInput.value);

  setColors(currentColor, prevColor);
}
