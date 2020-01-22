import updateMiniFrame from '../UI/miniFrame/updateMiniFrame.js';

export default function unicolor(e) {
  const MIN_STEP_SIZE = 4;
  const DEFAULT_CANVAS_SIZE = 512;
  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');
  const currentColor = localStorage.getItem('currentColor');

  const newColorArray = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const newColor = `rgb(${newColorArray[0]}, ${newColorArray[1]}, ${newColorArray[2]})`;

  if (currentColor === newColor) return;
  ctx.fillStyle = currentColor;

  for (let i = 0; i < DEFAULT_CANVAS_SIZE; i += MIN_STEP_SIZE) {
    for (let j = 0; j < DEFAULT_CANVAS_SIZE; j += MIN_STEP_SIZE) {
      const selectedColorArray = ctx.getImageData(i, j, 1, 1).data;
      const selectedColor = `rgb(${selectedColorArray[0]}, ${selectedColorArray[1]}, ${selectedColorArray[2]})`;

      if (selectedColor === newColor) {
        ctx.fillRect(i, j, MIN_STEP_SIZE, MIN_STEP_SIZE);
      }
    }
  }

  updateMiniFrame();
}
