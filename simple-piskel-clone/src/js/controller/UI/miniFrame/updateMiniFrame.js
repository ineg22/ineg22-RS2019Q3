export default function updateMiniFrame() {
  const DEFAULT_CANVAS_SIZE = 512;
  const currFrame = localStorage.getItem('currentFrame');
  const frames = JSON.parse(localStorage.getItem('frames'));
  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');
  const canvasStorageData = canvas.toDataURL();
  const canvasData = ctx.getImageData(
    0,
    0,
    DEFAULT_CANVAS_SIZE,
    DEFAULT_CANVAS_SIZE
  );

  const miniCanvas = document
    .querySelector(`.mini-frame-${currFrame}`)
    .querySelector('.mini-frame__canvas');
  const miniCtx = miniCanvas.getContext('2d');
  miniCtx.putImageData(canvasData, 0, 0);

  frames[currFrame - 1] = canvasStorageData;
  localStorage.setItem('frames', JSON.stringify(frames));
}
