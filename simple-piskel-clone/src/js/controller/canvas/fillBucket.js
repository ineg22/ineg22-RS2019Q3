import updateMiniFrame from '../UI/miniFrame/updateMiniFrame.js';

export default function fillBucket(e) {
  const CANVAS_DEFAULT_SIZE = 512;
  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');
  const currentColor = localStorage.getItem('currentColor');
  const pixelSize = Number(localStorage.getItem('pixelSize'));

  const targetColorArr = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const targetColor = `rgb(${targetColorArr[0]}, ${targetColorArr[1]}, ${targetColorArr[2]})`;
  ctx.fillStyle = currentColor;

  if (targetColor === currentColor) return;

  const lastX = e.offsetX;
  const lastY = e.offsetY;

  function floodFill(x, y) {
    const newPointColorArray = ctx.getImageData(x, y, 1, 1).data;
    const newPointColor = `rgb(${newPointColorArray[0]}, ${newPointColorArray[1]}, ${newPointColorArray[2]})`;
    if (targetColor !== newPointColor) return;

    ctx.fillRect(x, y, pixelSize, pixelSize);
    if (x > 0) {
      floodFill(x - pixelSize, y);
    }
    if (y > 0) {
      floodFill(x, y - pixelSize);
    }
    if (x < CANVAS_DEFAULT_SIZE - pixelSize) {
      floodFill(x + pixelSize, y);
    }
    if (y < CANVAS_DEFAULT_SIZE - pixelSize) {
      floodFill(x, y + pixelSize);
    }
  }

  try {
    floodFill(
      Math.floor(lastX / pixelSize) * pixelSize,
      Math.floor(lastY / pixelSize) * pixelSize
    );
    updateMiniFrame();
  } catch (err) {
    updateMiniFrame();
    throw new Error(err);
  }
}
