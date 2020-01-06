import onCurrentColorClickHandler from './UI/onCurrentColorClickHandler.js';
import onFpsInputHandler from './UI/onFpsInputHandler.js';
import onPixelSizeClickHandler from './UI/onPixelSizeClickHandler.js';
import onResolutionClickHandler from './UI/onResolutionClickHandler.js';
import onSwapColorClickHandler from './UI/onSwapColorClickHandler.js';
import onToolClickHandler from './UI/onToolClickHandler.js';

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
}
