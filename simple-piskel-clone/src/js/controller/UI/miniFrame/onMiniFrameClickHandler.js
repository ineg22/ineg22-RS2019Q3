import cloneFrame from './cloneFrame.js';
import deleteFrame from './deleteFrame.js';
import selectFrame from './selectFrame.js';

export default function onMiniFrameClickHandler(e) {
  const cloneClass = 'mini-frame__clone';
  const deleteClass = 'mini-frame__delete';
  const targetFrame = e.target.closest('.mini-frame');

  if (!targetFrame) return;

  const frameNumber = targetFrame.classList[1].split('-')[2];
  const targetElementClass = e.target.classList[0];

  switch (targetElementClass) {
    case cloneClass:
      cloneFrame(frameNumber);
      break;
    case deleteClass:
      deleteFrame(frameNumber);
      break;
    default:
      selectFrame(frameNumber);
      break;
  }
}
