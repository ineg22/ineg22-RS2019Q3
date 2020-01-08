import renderMiniFrame from '../../view/renderMiniFrame.js';

export default function onMiniFrameAddHandler() {
  const DEFAULT_CANVAS_SIZE = 512;
  const currActiveFrame = localStorage.getItem('currentFrame');
  const frames = JSON.parse(localStorage.getItem('frames'));
  const newFrame = renderMiniFrame(frames.length);
  const addButton = document.querySelector('.mini-frame__add');
  const newCanvas = newFrame.querySelector('.mini-frame__canvas');
  const newCanvasCtx = newCanvas.getContext('2d');
  const currActiveFrameElement = document.querySelector(
    `.mini-frame-${currActiveFrame}`
  );
  const mainCanvas = document.querySelector('#main-frame');
  const mainCtx = mainCanvas.getContext('2d');
  mainCtx.clearRect(0, 0, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);

  currActiveFrameElement.classList.remove('selected');
  newFrame.classList.add('selected');
  newCanvasCtx.clearRect(0, 0, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  const emptyData = newCanvas.toDataURL();
  frames.push(emptyData);

  localStorage.setItem('currentFrame', frames.length);
  localStorage.setItem('frames', JSON.stringify(frames));

  addButton.before(newFrame);
}
