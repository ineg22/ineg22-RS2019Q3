import loadMiniFrames from '../../../view/loadMiniFrames.js';

let clickedFrameNumber;
let lastOverFrameNumber;

let clickedElement;
let lastOverElement;

export function onDragStartHandler(e) {
  clickedElement = e.target.closest('.mini-frame');
  const [, secondClass] = clickedElement.classList;
  [, , clickedFrameNumber] = secondClass.split('-');
  lastOverFrameNumber = clickedFrameNumber;
  lastOverElement = clickedElement;
  lastOverElement.classList.toggle('over');
}

export function onDragOverHandler(e) {
  e.preventDefault();
  const overElement = e.target.closest('.mini-frame');
  if (!overElement) return;
  const [, secondClass] = overElement.classList;
  const [, , currentOverFrameNumber] = secondClass.split('-');
  if (
    currentOverFrameNumber !== lastOverFrameNumber &&
    currentOverFrameNumber !== clickedFrameNumber
  ) {
    lastOverElement.classList.toggle('over');
    lastOverFrameNumber = currentOverFrameNumber;
    lastOverElement = overElement;
    lastOverElement.classList.toggle('over');
  }
}

export function onDropHandler(e) {
  let overElement = e.target.closest('.mini-frame');
  let dropedFrameNumber;
  if (!overElement) {
    overElement = lastOverElement;
    dropedFrameNumber = lastOverFrameNumber;
  }
  const [, secondClass] = overElement.classList;
  [, , dropedFrameNumber] = secondClass.split('-');

  const frames = JSON.parse(localStorage.getItem('frames'));
  const clickedFrameData = frames[clickedFrameNumber - 1];
  const dropedFrameData = frames[dropedFrameNumber - 1];
  frames.splice(clickedFrameNumber - 1, 1, dropedFrameData);
  frames.splice(dropedFrameNumber - 1, 1, clickedFrameData);
  localStorage.setItem('frames', JSON.stringify(frames));

  document.querySelectorAll('.mini-frame').forEach(el => el.remove());
  loadMiniFrames(frames, dropedFrameNumber, clickedFrameData);
}
