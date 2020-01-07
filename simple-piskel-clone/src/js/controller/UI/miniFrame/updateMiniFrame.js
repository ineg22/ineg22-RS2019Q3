export default function updateMiniFrame() {
  const currFrame = localStorage.getItem('currentFrame');
  const frames = JSON.parse(localStorage.getItem('frames'));
  const canvas = document.querySelector('#main-frame');
  const canvasData = canvas.toDataURL();

  const miniCanvas = document
    .querySelector(`.mini-frame-${currFrame}`)
    .querySelector('.mini-frame__canvas');
  const miniCtx = miniCanvas.getContext('2d');

  const img = new Image();
  img.src = canvasData;
  img.onload = () => {
    miniCtx.drawImage(img, 0, 0);
  };

  frames[currFrame - 1] = canvasData;
  localStorage.setItem('frames', JSON.stringify(frames));
  localStorage.setItem('canvasData', canvasData);
}
