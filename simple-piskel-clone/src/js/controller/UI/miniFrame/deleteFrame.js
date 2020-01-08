import loadMiniFrames from '../../../view/loadMiniFrames.js';

export default function deleteFrame(number) {
  const DEFAULT_CANVAS_SIZE = 512;

  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  const clearData = canvas.toDataURL();

  const frames = JSON.parse(localStorage.getItem('frames'));
  const currentFrameNumber = localStorage.getItem('currentFrame');
  const lastFrameNumber = frames.length;

  if (number === '1' && lastFrameNumber === 1) {
    frames[0] = clearData;
    localStorage.setItem('frames', JSON.stringify(frames));

    document.querySelectorAll('.mini-frame').forEach(el => el.remove());
    loadMiniFrames(frames, 1, clearData);

    return;
  }

  let newFrameNumber;
  if (number === currentFrameNumber) {
    if (number === lastFrameNumber || number === '1') {
      newFrameNumber = 1;
    } else {
      newFrameNumber = number - 1;
    }
  } else if (number < currentFrameNumber) {
    newFrameNumber = currentFrameNumber - 1;
  } else if (number > currentFrameNumber) {
    newFrameNumber = currentFrameNumber;
  }

  frames.splice(number - 1, 1);
  const mainFrameData = frames[newFrameNumber - 1];

  localStorage.setItem('currentFrame', newFrameNumber);
  localStorage.setItem('frames', JSON.stringify(frames));

  document.querySelectorAll('.mini-frame').forEach(el => el.remove());
  loadMiniFrames(frames, newFrameNumber, mainFrameData);

  const img = new Image();
  img.src = mainFrameData;

  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
  });
}
