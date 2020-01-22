import updateMiniFrame from '../UI/miniFrame/updateMiniFrame.js';

const canvas = document.querySelector('#main-frame');
const ctx = canvas.getContext('2d');
let currentColor;
let pixelSize;
let isEraser = false;

let lastX;
let lastY;

function drawing(evt) {
  const currX = evt.offsetX;
  const currY = evt.offsetY;

  const deltaX = Math.abs(currX - lastX);
  const deltaY = Math.abs(currY - lastY);

  const sx = lastX < currX ? 1 : -1;
  const sy = lastY < currY ? 1 : -1;
  let err = deltaX - deltaY;

  while (!(lastX === currX && lastY === currY)) {
    const e2 = err * 2;
    if (e2 > -deltaY) {
      err -= deltaY;
      lastX += sx;
    }
    if (e2 < deltaX) {
      err += deltaX;
      lastY += sy;
    }
    if (isEraser) {
      ctx.clearRect(
        Math.floor(lastX / pixelSize) * pixelSize,
        Math.floor(lastY / pixelSize) * pixelSize,
        pixelSize,
        pixelSize
      );
    } else {
      ctx.fillRect(
        Math.floor(lastX / pixelSize) * pixelSize,
        Math.floor(lastY / pixelSize) * pixelSize,
        pixelSize,
        pixelSize
      );
    }
  }
}

function clearListeners() {
  updateMiniFrame();
  canvas.removeEventListener('mousemove', drawing);
  window.removeEventListener('mouseup', clearListeners);
}

export default function drawLine(e) {
  const currentTool = localStorage.getItem('currentTool');
  currentColor = localStorage.getItem('currentColor');
  pixelSize = localStorage.getItem('pixelSize');
  ctx.fillStyle = currentColor;

  lastX = e.offsetX;
  lastY = e.offsetY;

  if (currentTool === 'eraser') {
    isEraser = true;
    ctx.clearRect(
      Math.floor(lastX / pixelSize) * pixelSize,
      Math.floor(lastY / pixelSize) * pixelSize,
      pixelSize,
      pixelSize
    );
  } else {
    isEraser = false;
    ctx.fillRect(
      Math.floor(lastX / pixelSize) * pixelSize,
      Math.floor(lastY / pixelSize) * pixelSize,
      pixelSize,
      pixelSize
    );
  }

  canvas.addEventListener('mousemove', drawing);
  window.addEventListener('mouseup', clearListeners);
}
