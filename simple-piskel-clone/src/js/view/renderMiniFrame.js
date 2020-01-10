export default function renderMiniFrame(count) {
  const counterElement = document.createElement('div');
  counterElement.classList.add('mini-frame__counter');
  counterElement.textContent = count + 1;

  const cloneElement = document.createElement('div');
  cloneElement.classList.add('mini-frame__clone');
  cloneElement.setAttribute('title', 'click "C" to copy frame');

  const deleteElement = document.createElement('div');
  deleteElement.classList.add('mini-frame__delete');
  deleteElement.setAttribute('title', 'click "D" to delete frame');

  const dragndropElement = document.createElement('div');
  dragndropElement.classList.add('mini-frame__dragndrop');
  dragndropElement.setAttribute('title', 'click to move frame');

  const canvasElement = document.createElement('canvas');
  canvasElement.classList.add('mini-frame__canvas');
  canvasElement.setAttribute('width', '512');
  canvasElement.setAttribute('height', '512');
  canvasElement.setAttribute('draggable', 'true');

  const miniFrameElement = document.createElement('li');
  miniFrameElement.classList.value = `mini-frame mini-frame-${count + 1}`;
  miniFrameElement.append(
    canvasElement,
    counterElement,
    cloneElement,
    deleteElement,
    dragndropElement
  );

  return miniFrameElement;
}
