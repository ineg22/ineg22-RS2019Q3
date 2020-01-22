export default function getSessionData() {
  const shortcuts = {
    pen: 'KeyP',
    stroke: 'KeyT',
    bucket: 'KeyB',
    unicolor: 'KeyU',
    eraser: 'KeyE',
    picker: 'KeyO',
    fullscreen: 'KeyF',
    'swap-colors': 'KeyS',
    'color-input': 'KeyL',
    'mini-frame__add': 'KeyN',
    'mini-frame__clone': 'KeyC',
    'mini-frame__delete': 'KeyD',
    'export-apng': 'KeyA',
    'export-gif': 'KeyG',
    'pen-size-1': 'Digit1',
    'pen-size-2': 'Digit2',
    'pen-size-3': 'Digit3',
    'pen-size-4': 'Digit4',
  };
  if (!localStorage.getItem('currentTool')) {
    const canvas = document.querySelector('#main-frame');

    localStorage.setItem('canvasData', canvas.toDataURL());
    localStorage.setItem('frames', JSON.stringify([]));
    localStorage.setItem('prevColor', 'rgb(255, 215, 0)');
    localStorage.setItem('currentColor', 'rgb(0, 0, 1)');
    localStorage.setItem('currentTool', 'pen');
    localStorage.setItem('resolution', '64');
    localStorage.setItem('fps', '4');
    localStorage.setItem('penSize', '2');
    localStorage.setItem('currentFrame', '1');
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
  }

  const session = {
    currentTool: localStorage.getItem('currentTool'),
    penSize: localStorage.getItem('penSize'),
    currentColor: localStorage.getItem('currentColor'),
    prevColor: localStorage.getItem('prevColor'),
    resolution: localStorage.getItem('resolution'),
    fps: localStorage.getItem('fps'),
    canvasData: localStorage.getItem('canvasData'),
    frames: JSON.parse(localStorage.getItem('frames')),
    currentFrame: localStorage.getItem('currentFrame'),
    shortcuts: JSON.parse(localStorage.getItem('shortcuts')),
  };

  return session;
}
