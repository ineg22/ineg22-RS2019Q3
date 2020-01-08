import renderMiniFrame from './renderMiniFrame.js';

export default function loadMiniFrames(frames, currentFrame, canvasData) {
  const fragment = document.createDocumentFragment();

  if (frames.length === 0) {
    const miniFrameElement = renderMiniFrame(0);
    fragment.appendChild(miniFrameElement);

    const emptyFramesArray = [canvasData];
    localStorage.setItem('frames', JSON.stringify(emptyFramesArray));
  } else {
    for (let i = 0; i < frames.length; i += 1) {
      const miniFrameElement = renderMiniFrame(i);
      fragment.appendChild(miniFrameElement);
    }
  }

  document.querySelector('.mini-frame-list').prepend(fragment);
  const currentMiniFrameElement = document.querySelector(
    `.mini-frame-${currentFrame}`
  );
  currentMiniFrameElement.classList.add('selected');

  if (frames.length === 0) {
    const miniCtx = document
      .querySelector('.mini-frame-1')
      .querySelector('.mini-frame__canvas')
      .getContext('2d');
    const img = new Image();
    img.src = canvasData;

    img.addEventListener('load', () => {
      miniCtx.drawImage(img, 0, 0);
    });
  } else {
    for (let i = 0; i < frames.length; i += 1) {
      const miniCtx = document
        .querySelector(`.mini-frame-${i + 1}`)
        .querySelector('.mini-frame__canvas')
        .getContext('2d');
      const img = new Image();
      img.src = frames[i];

      img.addEventListener('load', () => {
        miniCtx.drawImage(img, 0, 0);
      });
    }
  }
}
