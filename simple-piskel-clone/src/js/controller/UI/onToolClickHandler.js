import initCanvasListeners from '../canvas/initCanvasListeners.js';

export default function onToolClickHandler(e) {
  const currentTool = localStorage.getItem('currentTool');
  const currentToolElement = document.querySelector(`.${currentTool}`);
  const clickedElement = e.target.closest('.tools-item') || currentToolElement;

  currentToolElement.classList.toggle('selected');

  clickedElement.classList.toggle('selected');

  localStorage.setItem('currentTool', clickedElement.classList[1]);

  initCanvasListeners();
}
