import { setColors } from '../UI/onCurrentColorClickHandler.js';

export default function colorPicker(e) {
  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');
  let currentColor = localStorage.getItem('currentColor');
  let prevColor = localStorage.getItem('prevColor');

  const color = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const newColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  if (newColor !== currentColor) {
    prevColor = currentColor;
    currentColor = newColor;

    setColors(currentColor, prevColor);
  }
}
