import loadMiniFrames from '../../../view/loadMiniFrames.js';

export default function cloneFrame(number) {
  const frames = JSON.parse(localStorage.getItem('frames'));
  const insertedData = frames[number - 1];
  const mainFrameData = frames[number];

  frames.splice(number - 1, 0, insertedData);

  localStorage.setItem('currentFrame', Number(number) + 1);
  localStorage.setItem('frames', JSON.stringify(frames));

  document.querySelectorAll('.mini-frame').forEach(el => el.remove());
  loadMiniFrames(frames, Number(number) + 1, mainFrameData);

  const canvas = document.querySelector('#main-frame');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = insertedData;

  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
  });
}
