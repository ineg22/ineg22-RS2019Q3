import drawLine from './drawLine.js';
import drawStroke from './drawStroke.js';
import fillBucket from './fillBucket.js';
import colorPicker from './colorPicker.js';
import unicolor from './unicolor.js';

const canvas = document.querySelector('#main-frame');

function clearCanvasListeners() {
  canvas.removeEventListener('mousedown', drawLine);
  canvas.removeEventListener('mousedown', drawLine);
  canvas.removeEventListener('mousedown', drawStroke);
  canvas.removeEventListener('click', fillBucket);
  canvas.removeEventListener('click', colorPicker);
  canvas.removeEventListener('click', unicolor);
}

export default function initCanvasListeners() {
  const currentTool = localStorage.getItem('currentTool');
  clearCanvasListeners();

  switch (currentTool) {
    case 'pen':
      canvas.addEventListener('mousedown', drawLine);
      break;
    case 'eraser':
      canvas.addEventListener('mousedown', drawLine);
      break;
    case 'stroke':
      canvas.addEventListener('mousedown', drawStroke);
      break;
    case 'bucket':
      canvas.addEventListener('click', fillBucket);
      break;
    case 'picker':
      canvas.addEventListener('click', colorPicker);
      break;
    case 'unicolor':
      canvas.addEventListener('click', unicolor);
      break;
    default:
      break;
  }
}
