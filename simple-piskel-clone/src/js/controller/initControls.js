import onCurrentColorClickHandler from './UI/onCurrentColorClickHandler.js';
import onFpsInputHandler from './UI/onFpsInputHandler.js';
import onPixelSizeClickHandler from './UI/onPixelSizeClickHandler.js';
import onResolutionClickHandler from './UI/onResolutionClickHandler.js';
import onSwapColorClickHandler from './UI/onSwapColorClickHandler.js';
import onToolClickHandler from './UI/onToolClickHandler.js';
import onMiniFrameAddHandler from './UI/onMiniFrameAddHandler.js';
import onMiniFrameClickHandler from './UI/miniFrame/onMiniFrameClickHandler.js';
import onShortcutClickHandler from './UI/shortcut/onShortcutClickHandler.js';
import onKeyPressHandler from './UI/onKeyPressHandler.js';
import onLoginClickHandler from './UI/onLoginClickHandler.js';
import onAPNGExportClickHandler from './UI/export/onAPNGExportClickHandler.js';
import onGIFExportClickHandler from './UI/export/onGIFExportClickHandler.js';
import fullScreenHandler from './preview/fullScreenHandler.js';
import initCanvasListeners from './canvas/initCanvasListeners.js';
import {
  onDragStartHandler,
  onDragOverHandler,
  onDropHandler,
} from './UI/miniFrame/moveFrame.js';

export default function initControls() {
  document
    .querySelector('.tools-list')
    .addEventListener('click', onToolClickHandler);
  document
    .querySelector('.pixel-list')
    .addEventListener('click', onPixelSizeClickHandler);
  document
    .querySelector('.resolution-wrapper')
    .addEventListener('click', onResolutionClickHandler);
  document
    .querySelector('.swap-colors')
    .addEventListener('click', onSwapColorClickHandler);
  document
    .querySelector('.prev-color')
    .addEventListener('click', onSwapColorClickHandler);
  document
    .querySelector('#color-input')
    .addEventListener('input', onCurrentColorClickHandler);
  document
    .querySelector('#fps-input')
    .addEventListener('input', onFpsInputHandler);
  document
    .querySelector('.mini-frame__add')
    .addEventListener('click', onMiniFrameAddHandler);
  document
    .querySelector('.mini-frame-list')
    .addEventListener('click', onMiniFrameClickHandler);
  document
    .querySelector('.fullscreen')
    .addEventListener('click', fullScreenHandler);
  document
    .querySelector('.keyboard-shortcuts')
    .addEventListener('click', onShortcutClickHandler);
  document
    .querySelector('.export-apng')
    .addEventListener('click', onAPNGExportClickHandler);
  document
    .querySelector('.export-gif')
    .addEventListener('click', onGIFExportClickHandler);
  document
    .querySelector('.login')
    .addEventListener('click', onLoginClickHandler);

  document.addEventListener('dragstart', onDragStartHandler);
  document.addEventListener('dragover', onDragOverHandler);
  document.addEventListener('drop', onDropHandler);

  document.addEventListener('keypress', onKeyPressHandler);

  window.addEventListener('beforeunload', () => {
    const canvas = document.querySelector('#main-frame');
    localStorage.setItem('canvasData', canvas.toDataURL());
    localStorage.removeItem('tempFrame');
    localStorage.removeItem('intervalID');
  });

  initCanvasListeners();
}
