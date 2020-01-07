import updateMiniFrame from '../UI/miniFrame/updateMiniFrame.js';

const canvas = document.querySelector('#main-frame');
const ctx = canvas.getContext('2d');

let lastX;
let lastY;
let canvasData;
let currentColor;
let pixelSize;

function drawing(evt) {
  let prevX = lastX;
  let prevY = lastY;
  const img = new Image();

  img.src = canvasData;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    const currX = evt.offsetX;
    const currY = evt.offsetY;

    const deltaX = Math.abs(currX - prevX);
    const deltaY = Math.abs(currY - prevY);

    const sx = prevX < currX ? 1 : -1;
    const sy = prevY < currY ? 1 : -1;
    let err = deltaX - deltaY;

    while (!(prevX === currX && prevY === currY)) {
      const e2 = err * 2;
      if (e2 > -deltaY) {
        err -= deltaY;
        prevX += sx;
      }
      if (e2 < deltaX) {
        err += deltaX;
        prevY += sy;
      }
      ctx.fillRect(
        Math.floor(prevX / pixelSize) * pixelSize,
        Math.floor(prevY / pixelSize) * pixelSize,
        pixelSize,
        pixelSize
      );
    }
  };
}

function clearListeners() {
  updateMiniFrame();
  canvas.removeEventListener('mousemove', drawing);
  window.removeEventListener('mouseup', clearListeners);
}

export default function drawStroke(e) {
  lastX = e.offsetX;
  lastY = e.offsetY;
  currentColor = localStorage.getItem('currentColor');
  pixelSize = localStorage.getItem('pixelSize');
  ctx.fillStyle = currentColor;

  ctx.fillRect(
    Math.floor(lastX / pixelSize) * pixelSize,
    Math.floor(lastY / pixelSize) * pixelSize,
    pixelSize,
    pixelSize
  );

  canvasData = canvas.toDataURL();

  canvas.addEventListener('mousemove', drawing);
  window.addEventListener('mouseup', clearListeners);
}
