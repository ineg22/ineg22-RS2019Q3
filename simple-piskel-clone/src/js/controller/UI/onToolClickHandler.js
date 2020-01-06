import initCanvasListeners from '../canvas/initCanvasListeners.js';

export default function onToolClickHandler(e) {
  const currentTool = localStorage.getItem('currentTool');
  const currentToolElement = document.querySelector(`.${currentTool}`);

  currentToolElement.classList.toggle('selected');
  e.target.classList.toggle('selected');

  localStorage.setItem('currentTool', e.target.classList[1]);

  initCanvasListeners();
}
